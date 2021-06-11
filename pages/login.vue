<template>
  <div class="login">
    <div class="p-login">
      <div class="p-login__content">
    <!-- v-if='!user'をdivに追加するとログインしたときは見えなくなる。 -->
    <div class="p-login__title">
    <h2 class="">Login</h2>
    </div>
    <div class="p-login__notice">
     <p v-if='errors.length'>
      <b>未入力の項目があります</b>
      <ul>
        <li v-for='error in errors'>{{error}}
        </li>
      </ul>
    </p>
</div>

  <div class="p-login__form">
    <p>テストログインできるよう、入力欄の初期値はテストユーザーの情報にしています。</p>
    <form class="form" @submit.prevent>
      <div class="p-login__form__item">
        <div class="p-login__form__left">
      <label for='email' class="p-login__form__label"
        >E-mail
      </label>
        </div>
      <div class="p-login__form__right">
        <validation-provider v-slot="{ errors }" rules="required|email" name="E-mail">
        <input id='email' class="p-login__form__input" type="email" v-model="email" required>
       <p v-show="errors.length" class="p-login__form__error">
        {{ errors[0] }}
             </p>
           </validation-provider>
      </div>
      </div>
      <div class="p-login__form__item">
<div class="p-login__form__left">
      <label for='password' class="p-login__form__label"
        >Password
      </label>
</div>
<div class="p-login__form__right">
        <validation-provider v-slot="{ errors }" rules="required" name="Password">
        <input id='password' class="p-login__form__input" type="password" v-model="password" required>
       <p v-show="errors.length" class="p-login__form__error">
        {{ errors[0] }}
             </p>
           </validation-provider>
        </div>
</div>
<div class="p-login__form__submit">
      <button class="p-login__form__button" type="submit" @click="login">Sign in with E-mail</button>
      </div>
      <div class="p-login__form__google">

      <button class="c-button__google" type="submit" @click="loginGoogle">
        Sign in with Google
      </button>
</div>
    </form>
  </div><!--p-login__form-->
  
        </div>
      </div>
  </div>
</template>
<script>


export default {
  computed: {
    user() {
      return this.$store.getters["login/user"];
    },
  },
  data() {
    return {
      //test login 対応
      errors:[],
      email: "test@test.com",
      password: "testtest",
      updateName: "",
    };
  },
  methods: {
    login(email, password) {
       this.errors = [];
      if (!this.email) {
        this.errors.push("E-mailが未記入です。");
      } else if (!this.checkString(this.email)) {
        this.errors.push("メールアドレス形式で入力してください。");
      }
      if (!this.password) {
        this.errors.push("Passwordが未記入です。");
      }
      if (!this.errors.length) {
      console.log("methods発火");
      this.$store.dispatch("login/login", {
        email: this.email,
        password: this.password,
      });

      // if (this.$store.getters["login/user"]) {
      //   console.log("loginしてトップへ");
      //   // this.$router.push("/");
      // }
      }
    },
    loginGoogle() {
      console.log("googleLogin発火");
      this.$store.dispatch("login/loginGoogle", {});

      // if (this.$store.getters["login/user"]) {
      //   console.log("loginしてトップへ");
      //   this.$router.push("/");
      // }
    },
    update(updateName) {
      this.$store.dispatch("login/update", this.updateName);
    },
    checkString(email) {
      var regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      return regex.test(email);
    },
  },
};
</script>
<template>
  <div class="login">
    <!-- v-if='!user'をdivに追加するとログインしたときは見えなくなる。 -->
    <h1 class="text">ログイン</h1>
     <p v-if='errors.length'>
      <b>未入力の項目があります</b>
      <ul>
        <li v-for='error in errors'>{{error}}
        </li>
      </ul>
    </p>
    <p class="text">Your Email: {{ user.email }}</p>
    <p class="text">Your Name: {{ user.name }}</p>

<div class="update">
    <input v-model="updateName" type="text" />
    <button @click="update">update</button>
</div>

  <div class="p-login__form">
    <form class="form" @submit.prevent>
      <div class="label">
      <label for='email' class="label"
        >email
      </label>
      </div>
      <div class="c-input">
        <validation-provider v-slot="{ errors }" rules="required|email" name="E-mail">
        <input id='email' class="input" type="email" v-model="email" required>
       <p v-show="errors.length" class="help is-danger">
        {{ errors[0] }}
             </p>
           </validation-provider>
      </div>
<div class="label">
      <label for='password' class="label"
        >password
      </label>
</div>
<div class="c-input">
        <validation-provider v-slot="{ errors }" rules="required" name="Password">
        <input id='password' class="input" type="password" v-model="password" required>
       <p v-show="errors.length" class="help is-danger">
        {{ errors[0] }}
             </p>
           </validation-provider>
</div>
<div class="c-button">
      <button class="button" type="submit" @click="login">Login</button>
      </div>
      <div class="c-button">
      <button class="button" type="submit" @click="loginGoogle">
        Googleアカウントでログイン
      </button>
</div>
    </form>
  </div><!--p-login__form-->
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
      errors:[],
      email: "",
      password: "",
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
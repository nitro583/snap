<template>
  <div class="register">
    <!-- v-if='!user'をdivに追加するとログインしたときは見えなくなる。 -->
    <h1 class="text">新規登録</h1>
    <p v-if='errors.length'>
      <b>未入力の項目があります</b>
      <ul>
        <li v-for='error in errors'>{{error}}
        </li>
      </ul>
    </p>

    <p class="text">Your Email: {{ user.email }}</p>
    <div class="p-register__form">
    <form class="form" @submit.prevent>
      <div class="label">
      <label class="label" for='name'
        >User Name
      </label>
      </div>
      <div class="c-input">
        <validation-provider v-slot="{ errors }" rules="required" name="User Name">
        <input id='name' class="input" type="text" v-model="name" required>
       <p v-show="errors.length" class="help is-danger">
        {{ errors[0] }}
             </p>
           </validation-provider>
      </div>
      <div class="label">
      <label for='email' class="label"
        >E-mail
      </label>
      </div>
      <div class="c-input">
        <validation-provider v-slot="{ errors }" rules="required|email" name='E-mail'>
        <input id='email' class="input" type="email" v-model="email" required>
               <p v-show="errors.length" class="help is-danger">
               {{ errors[0] }}
             </p>
           </validation-provider>
      </div>
<div class="label">
      <label for='password' class="label"
        >Password
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
      <button class="button" type="submit" @click= "register">Signup</button>
</div>
    </form>
    </div><!--register__form-->
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
      errors: [],
      email: "",
      password: "",
      name: "",
    };
  },
  methods: {
    register() {
      this.errors = [];
      if (!this.name) {
        this.errors.push("Nameが未記入です。");
      }
      if (!this.email) {
        this.errors.push("E-mailが未記入です。");
      } else if (!this.checkString(this.email)) {
        this.errors.push("メールアドレス形式で入力してください。");
      }
      if (!this.password) {
        this.errors.push("Passwordが未記入です。");
      }
      if (!this.errors.length) {
        this.$store.dispatch("login/register", {
          email: this.email,
          password: this.password,
          name: this.name,
        });
      
      }
    },
    checkString(email) {
      var regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      return regex.test(email);
    },
  },
};
</script>
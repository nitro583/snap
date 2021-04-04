<template>
  <div class="register">
    <div class='p-signup'>
    <div class='p-signup__content'>

    <!-- v-if='!user'をdivに追加するとログインしたときは見えなくなる。 -->
    <div class="p-signup__title">
    <h2>Sign up</h2>
    </div>
    <div class="p-signup__notice">
    <p v-if='errors.length'>
      未入力の項目があります。
      <ul>
        <li v-for='error in errors'>{{error}}
        </li>
      </ul>
    </p>
    </div>
    <div class="p-signup__form">
    <form class="" @submit.prevent>
      <div class="p-signup__form__item">
        <div class="p-signup__form__left">
      <label class='p-signup__form__label'for='name'
        >User Name
      </label>
        </div>
      <div class="p-signup__form__right">
        <validation-provider v-slot="{ errors }" rules="required" name="User Name">
        <input id='name' class="p-signup__form__input" type="text" v-model="name" required>
       <p v-show="errors.length" class="p-signup__form__error">
        {{ errors[0] }}
             </p>
           </validation-provider>
      </div>
      </div> 
      <div class="p-signup__form__item">
          <div class="p-signup__form__left">
      <label class='p-signup__form__label' for='email' 
        >E-mail
      </label>
      </div>
      <div class="p-signup__form__right">
        <validation-provider v-slot="{ errors }" rules="required|email" name='E-mail'>
        <input id='email' class="p-signup__form__input" type="email" v-model="email" required>
               <p v-show="errors.length" class="p-signup__form__error">
               {{ errors[0] }}
             </p>
           </validation-provider>
      </div>
      </div>
      <div class="p-signup__form__item">

<div class="p-signup__form__left">
      <label for='password' class="p-signup__form__label"
        >Password
      </label>
</div>
<div class="p-signup__form__right">
        <validation-provider v-slot="{ errors }" rules="required" name="Password">
        <input id='password' class="p-signup__form__input" type="password" v-model="password" required>
               <p v-show="errors.length" class="p-signup__form__error">
               {{ errors[0] }}
             </p>
           </validation-provider>
</div>
      </div>
<div class="p-signup__form__submit">
      <button class="p-signup__form__button" type="submit" @click= "register">Signup</button>
</div>
    </form>
    </div><!--register__form-->
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
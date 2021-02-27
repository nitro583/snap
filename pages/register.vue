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
    <form class="form" @submit.prevent>
      <label class="label"
        >User Name
        <input class="input" type="text" v-model="name" required>
      </label>

      <label class="label"
        >email
        <input class="input" type="email" v-model="email" required>
      </label>

      <label class="label"
        >password
        <input class="input" type="password" v-model="password" required>
      </label>

      <button class="button" type="submit" @click= "register">Signup</button>
    </form>
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
      if (this.name && this.email && this.password) {
        this.$store.dispatch("login/register", {
          email: this.email,
          password: this.password,
          name: this.name,
        });
        this.$router.push("/");
      }
      this.errors = [];
      if (!this.name) {
        this.errors.push("Nameが未記入です。");
      }
      if (!this.email) {
        this.errors.push("E-mailが未記入です。");
      }
      if (!this.password) {
        this.errors.push("Passwordが未記入です。");
      }
    },
  },
};
</script>
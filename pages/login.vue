<template>
  <div class="login">
    <!-- v-if='!user'をdivに追加するとログインしたときは見えなくなる。 -->
    <h1 class="text">ログイン</h1>
    <p class="text">Your Email: {{ user.email }}</p>
    <p class="text">Your Email: {{ user.name }}</p>
    <input v-model="updateName" type="text" />
    <button @click="update">update</button>
    <form class="form" @submit.prevent>
      <label class="label"
        >email
        <input class="input" type="email" v-model="email" />
      </label>

      <label class="label"
        >password
        <input class="input" type="password" v-model="password" />
      </label>

      <button class="button" type="submit" @click="login">Login</button>
      <button class="button" type="submit" @click="loginGoogle">
        Googleアカウントでログイン
      </button>
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
      email: "",
      password: "",
      updateName: "",
    };
  },
  methods: {
    login(email, password) {
      console.log("methods発火");
      this.$store.dispatch("login/login", {
        email: this.email,
        password: this.password,
      });

      if (this.$store.getters["login/user"]) {
        console.log("loginしてトップへ");
        this.$router.push("/");
      }
    },
    loginGoogle() {
      console.log("googleLogin発火");
      this.$store.dispatch("login/loginGoogle", {});

      if (this.$store.getters["login/user"]) {
        console.log("loginしてトップへ");
        this.$router.push("/");
      }
    },
    update(updateName) {
      this.$store.dispatch("login/update", this.updateName);
    },
  },
};
</script>
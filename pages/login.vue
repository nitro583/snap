<template>
  <div class="login">
    <!-- v-if='!user'をdivに追加するとログインしたときは見えなくなる。 -->
    <h1 class="text">ログイン</h1>
    <p class="text">{{ user }}</p>
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
    };
  },
  methods: {
    login(email, password) {
      console.log("methods発火");
      this.$store.dispatch("login/login", {
        email: this.email,
        password: this.password
      });

      if (this.$store.getters["login/user"]) {
        console.log("loginしてトップへ");
        this.$router.push("/");
      }
    },
  },
};
</script>
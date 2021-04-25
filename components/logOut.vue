<template>
  <div>

          <button v-if='user.login' @click='logOut'>Logout</button>
  </div>
</template>

<script>

export default {
    computed: {
    user() {
      return this.$store.getters["login/user"];
    }
    },
  methods: {
    logOut() {
      this.$store.dispatch('login/logOut')
      this.$router.push("/");
    },
  },
}
</script>
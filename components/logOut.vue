<template>
  <div>

          <a href='' v-if='user.login' @click.prevent='logOut'>Logout</a>
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
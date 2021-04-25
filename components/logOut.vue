<template>
  <div>

          <button @click='logOut'>Logout</button>
  </div>
</template>

<script>

export default {
  methods: {
    logOut() {
      this.$store.dispatch('login/logOut')
      this.$router.push("/");
    },
  },
}
</script>
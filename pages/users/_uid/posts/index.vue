<template>
  <div class="login">
    <!-- v-if='!user'をdivに追加するとログインしたときは見えなくなる。 -->
    <h1 class="text">Posts</h1>
    <p class="text">Your Email: {{ user.email }}</p>
    <p class="text">Your Name: {{ user.name }}</p>


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
    
    update(updateName) {
      this.$store.dispatch("login/update", this.updateName);
    },

  },
};
</script>
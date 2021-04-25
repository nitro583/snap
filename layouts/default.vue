<template>
  <div>
    <header class="l-header">
      <div class="l-header__inner">
        <div class="l-header__inner__left">
          <h1><NuxtLink to="/">SNAP×SNAP</NuxtLink></h1>
        </div>
        <div class="header__inner__right">
          <ul class="l-header__nav">
            <li class="l-header__nav__item">
              <NuxtLink to="/">About</NuxtLink>
            </li>
            <li class="l-header__nav__item">
              <NuxtLink to="/post">Post</NuxtLink>
            </li>
            <li class="l-header__nav__item" v-if="!user.login">
              <NuxtLink to="/register">Signup</NuxtLink>
            </li>
            <li class="l-header__nav__item" v-if="!user.login">
              <NuxtLink to="/login">Login</NuxtLink>
            </li>
            <li class="l-header__nav__item" v-if="user.login">
              <NuxtLink :to="{ name: 'users-id', params: { id: user.uid } }">{{
                user.name
              }}</NuxtLink>
            </li>
            <li class="l-header__nav__item"><logOut></logOut></li>
          </ul>
        </div>
      </div>
    </header>
    <div class="l-wrapper">
      <Nuxt class="fadein"/>
    </div>
  </div>
</template>
<script>
import logOut from "~/components/logOut";
export default {
  data() {
    return {};
  },
  components: {
    logOut
  },
  computed: {
    user() {
      return this.$store.getters["login/user"];
    }
  },
  methods: {}
};
</script>
<style></style>

<template>
  <div>
    <header class="l-header">
      <div class="l-header__inner">
        <div class="l-header__inner__left">
          <h1><NuxtLink to="/">SNAP×SNAP</NuxtLink></h1>
        </div>
        <div class="l-header__inner__right" :class="{ isOpen: isOpen }">
          <ul class="l-header__nav " @click="isOpen = false">
            <li class="l-header__nav__item with-smart-phone" v-if="user.login">
              <NuxtLink
                class="with-smart-phone"
                :to="{ name: 'users-id', params: { id: user.uid } }"
                ><img
                  class="l-header__nav__icon with-smart-phone"
                  v-if="user.icon !== null"
                  :src="user.icon"
                  :alt="user.name"/><img
                  class="l-header__nav__icon with-smart-phone"
                  v-else
                  src="~/assets/icon.png"
                  :alt="user.name"
              /></NuxtLink>
            </li>
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
            <li class="l-header__nav__item" 　v-if="user.login">
              <logOut class="l-header__nav__logout"></logOut>
            </li>
            <li class="l-header__nav__item with-pc" v-if="user.login">
              <NuxtLink :to="{ name: 'users-id', params: { id: user.uid } }"
                ><img
                  class="l-header__nav__icon"
                  v-if="user.icon !== null"
                  :src="user.icon"
                  :alt="user.name"/>
                <img
                  class="l-header__nav__icon"
                  v-else
                  src="~/assets/icon.png"
                  :alt="user.name"
              /></NuxtLink>
            </li>
          </ul>
        </div>
        <button
          class="c-burger__btn"
          @click="isOpen = !isOpen"
          :class="{ isOpen: isOpen }"
        >
          <span class="p-bars">
            <span class="p-bar p-bar__top"></span>
          </span>
        </button>
      </div>
    </header>
    <div class="l-wrapper" @click="isOpen = false">
      <Nuxt class="fadein" />
    </div>
  </div>
</template>
<script>
import logOut from "~/components/logOut";
export default {
  data() {
    return {
      isOpen: false
    };
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

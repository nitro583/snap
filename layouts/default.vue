<template>
  <div>
    <v-app>
      <v-navigation-drawer app>
        <!-- -->

      </v-navigation-drawer>

      <v-app-bar app>
        
        <div><NuxtLink to="/">Index</NuxtLink></div>
        <div><NuxtLink to="upload">アップロード</NuxtLink></div>
        <div><NuxtLink to="post">ぽすと</NuxtLink></div>
        <div><NuxtLink to="register">新規登録</NuxtLink></div>
        <div><NuxtLink to="login">ログイン</NuxtLink></div>
        <NuxtLink to="todos">Todosｓ</NuxtLink>

        <logOut></logOut> </v-app-bar
      ><!-- アプリケーションのコンポーネントに基づいてコンテンツのサイズを決定 --><v-main
        ><!-- アプリケーションに適切なgutterを提供します -->
        
        <v-container fluid
          ><!-- vue-routerを使用している場合 -->
          <router-view>
          <Nuxt />
          </router-view>
        </v-container>
      </v-main>

      <v-footer app>
        <!-- -->
      </v-footer>
    </v-app>
    <div></div>

    <div></div>
  </div>
</template>
<script>
import logOut from "~/components/logOut"
export default {
  components: {
    logOut
  }
}
</script>
<style>

</style>

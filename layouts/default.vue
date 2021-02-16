<template>
  <div>
    <v-app>
      <v-navigation-drawer app>
        <!-- -->

      </v-navigation-drawer>

      <v-app-bar app>
        <div><NuxtLink to="/">index</NuxtLink></div>
        <div><NuxtLink to="/">index</NuxtLink></div>
        <div><NuxtLink to="/">index</NuxtLink></div>
        <NuxtLink to="todos">Todos</NuxtLink> 
        </v-app-bar
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

<style>

</style>

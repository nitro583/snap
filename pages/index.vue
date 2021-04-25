<template>
  <div class="p-index  fadein">
<div class="p-index__mainVisual">
    <h2>日常の一瞬を、共有しよう。</h2>
  <p class="c-index__lead">「SNAP×SNAP」はスナップ写真に文字を添えて投稿できるSNSです。</p>
  <div class="p-index__mainVisual__start"> <NuxtLink class="c-button c-index__signupButton" to="/register">Signupして始める</NuxtLink></div>
</div>
<div class="p-index__about">
  <div class="p-index__about__left">
  <h3 class="p-index__about__title">SNAP×SNAPとは</h3>
<p>SNAP×SNAPはスナップ写真に文字を添えて投稿できるシンプルなSNSです。「いいな」と思った写真には「いいね」や「コメント」ができます。
  <br>スナップ写真とは「下準備なく日常の出来事や光景を撮影した写真」のこと。要するに、何気なく撮影した写真を指します。最近ではスマートフォンに搭載されているカメラの性能が上がり、写真を撮ることがより身近となりました。<br>
何気なく撮影した日常の一瞬を、より良い思い出として残すために、SNAP×SNAPを通じて写真を気軽に公開し、もっと写真を楽しんでみましょう。</p>
  </div>
  <div class="p-index__about__right">
    
  </div>
  
</div>
<div class="p-index__recent-snaps">
  <h3 class="p-index__recent-snaps__title">Recent Snaps</h3>
    <div
        class="p-post__card"
        v-for="(todo, index) in recentPosts"
        v-bind:key="todo.id"
      >
        <div class="p-post__card__image"><img :src="todo.imgUrl" alt="" /></div>
        <div class="p-post__card__text">
          <div class="p-post__card__date">
            <p>
              <fa :icon="['far', 'clock']" /> {{ todo.date.toDate() | moment }}
            </p>
          </div>
          <div class="p-post__card__author">
            <p>
             <NuxtLink :to="{ name: 'users-id', params: { id: todo.uid } }"><fa :icon="['fas', 'user-circle']" /> {{
                todo.author
              }}</NuxtLink></p>
          </div>
          <div class="p-post__card__note">
            <p>{{ todo.todo }}</p>
          </div>
          <div class="p-post__card__location">
            <p><fa :icon="['fas', 'map-marker-alt']" /> {{ todo.comment }}</p>
          </div>
        </div>
        <div class="p-post__card__button">
          <div class="p-post__card__delete">
            <button v-on:click="deleteTodo(index)" v-if="todo.uid === user.uid">
              <fa :icon="['fas', 'trash-alt']" />
            </button>
          </div>
          <div class="p-post__card__comment">
            <Nuxt-link
              :to="{
                name: 'users-uid-posts-postDetail',
                params: { uid: todo.uid, postDetail: todo.id }
              }"
              ><fa :icon="['far', 'comment']" />
            </Nuxt-link>

          </div>
          <div class="p-post__card__like">
            <button v-bind:disabled='isPush'
              v-on:click="likePost(todo.id)"
              v-if="user.login && likedPosts.every(val => val.id !== todo.id)"
            >
              <fa :icon="['fas', 'heart']" /> {{ todo.likePostCount }}
            </button>
            <button
              class="is-like" v-bind:disabled='isPush'
              v-on:click="notLikePost(todo.id)"
              v-if="user.login && likedPosts.some(val => val.id === todo.id)"
            >
              <fa :icon="['fas', 'heart']" /> {{ todo.likePostCount }}
            </button>
          </div>
        </div>
      </div>


  </div>

<div class="p-index__more">
<NuxtLink class="c-button c-index__moreButton" to="/post">もっと見る</NuxtLink>
</div>
  
</div>

</template>

<script>

export default {
    async fetch({ store }) {
    console.log("await");
    await store.dispatch("getTodos");
  },
  data() {
    return {
       todo: "",
      comment: "",
      thumbnail: "",
      show: true,
      isPush:false,
      user: {
        name: "",
        email: "",
      },
       postData: {
        thumbnail: ""
      },
      dbData:""
    };
  },
   computed: {
    todos() {
      console.log("computed todos");
      return this.$store.getters["todos"];
    },
    // getThumbnail() {
    //   return this.$store.getters["thumbnail"];
    // },
    user() {
      return this.$store.getters["login/user"];
    },
    likedPosts() {
      return this.$store.getters["login/likedPosts"];
    },
    recentPosts(){
      return this.todos.slice(0,3)
    }
  },
  methods: {
//     submit() {
// const db = firebase.firestore()
//       let dbUsers = db.collection("users");
//       dbUsers
//         .add({
//           name: this.user.name,
//           email: this.user.email,
//         })
//         .then((ref) => {
//           console.log("ADD ID: ", ref.id);
//         });
//     },
    // getData () {
    //   const db = firebase.firestore()
    //   let docUsers = db.collection('users').doc('Uq8Yne3Z7JMORW53wDHn')
    //   let dbData = []
    //   this.dbData =dbData
    //   docUsers.get().then(function(doc) {
    //     dbData.push(doc.data().name)
    //   })
    // }
  },
};
</script>

<style>
</style>

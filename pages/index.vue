<template>
  <div class="p-index  fadein">
    <div class="p-index__mainVisual">
      <h2>日常の一瞬を、共有しよう。</h2>
      <p class="c-index__lead">
        「SNAP×SNAP」はスナップ写真に文字を添えて投稿できるSNSです。
      </p>
      <div class="p-index__mainVisual__start">
        <NuxtLink class="c-button c-index__signupButton" to="/register"
          >Signupして始める</NuxtLink
        >
      </div>
    </div>
    <div class="p-index__about">
      <div class="p-index__about__left">
        <h3 class="p-index__about__title">SNAP×SNAPとは</h3>
        <p>
          SNAP×SNAPはスナップ写真に文字を添えて投稿できるシンプルなSNSです。「いいな」と思った写真には「いいね」や「コメント」ができます。
          <br />スナップ写真とは「下準備なく日常の出来事や光景を撮影した写真」のこと。要するに、何気なく撮影した写真を指します。最近ではスマートフォンに搭載されているカメラの性能が上がり、写真を撮ることがより身近となりました。<br />
          何気なく撮影した日常の一瞬を、より良い思い出として残すために、SNAP×SNAPを通じて写真を気軽に公開し、もっと写真を楽しんでみましょう。
        </p>
      </div>
      <div class="p-index__about__right"></div>
    </div>
    <div class="p-index__recent-snaps">
      <h3 class="p-index__recent-snaps__title">Recent Snaps</h3>
      <div
        class="p-post__card"
        v-for="(post, index) in recentPosts"
        v-bind:key="post.id"
      >
        <div class="p-post__card__image"><img :src="post.imgUrl" alt="" /></div>
        <div class="p-post__card__text">
          <div class="p-post__card__date">
            <p>
              <fa :icon="['far', 'clock']" /> {{ post.date.toDate() | moment }}
            </p>
          </div>
          <div class="p-post__card__author">
            <p>
              <NuxtLink :to="{ name: 'users-id', params: { id: post.uid } }"
                ><fa :icon="['fas', 'user-circle']" />
                {{ post.author }}</NuxtLink
              >
            </p>
          </div>
          <div class="p-post__card__note">
            <p>{{ post.comment }}</p>
          </div>
          <div class="p-post__card__location">
            <p><fa :icon="['fas', 'map-marker-alt']" /> {{ post.location }}</p>
          </div>
        </div>
        <div v-if='user.login' class="p-post__card__button">
          <div class="p-post__card__delete">
            <button v-on:click="deletePost(index)" v-if="post.uid === user.uid">
              <fa :icon="['fas', 'trash-alt']" />
            </button>
          </div>
          <div class="p-post__card__comment">
            <Nuxt-link
              :to="{
                name: 'users-uid-posts-postDetail',
                params: { uid: post.uid, postDetail: post.id }
              }"
              ><fa :icon="['far', 'comment']" />
            </Nuxt-link>
          </div>
          <div class="p-post__card__like">
            <button
              v-bind:disabled="isPush"
              v-on:click="likePost(post.id)"
              v-if="user.login && likedPosts.every(val => val.postId !== post.id)"
            >
              <fa :icon="['fas', 'heart']" /> {{ post.likePostCount }}
            </button>
            <button
              class="is-like"
              v-bind:disabled="isPush"
              v-on:click="notLikePost(post.id)"
              v-if="user.login && likedPosts.some(val => val.postId === post.id)"
            >
              <fa :icon="['fas', 'heart']" /> {{ post.likePostCount }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="p-index__more">
      <NuxtLink class="c-button c-index__moreButton" to="/post"
        >もっと見る</NuxtLink
      >
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
export default {
  // async fetch({ store }) {
  //   if(store.getters['posts'].length){
  //     return
  //   }
  //   await store.dispatch("getPosts");
  //   console.log("await");
  // },
  data() {
    return {
      location: "",
      comment: "",
      thumbnail: "",
      show: true,
      isPush: false,
      count: 6,
    };
  },
 created() {
    this.$store.dispatch("getPosts");
    console.log("created");
  },
  computed: {
    ...mapGetters(['posts']),
    posts() {
      console.log("computed");
      const posts = this.$store.getters["posts"];
      console.log(posts);
      return this.$store.getters["posts"];
    },
    user() {
      return this.$store.getters["login/user"];
    },
    likedPosts() {
      return this.$store.getters["login/likedPosts"];
    },
    recentPosts() {
      return this.posts.slice(0, this.count);
    }
  },
  //   watch:{
  //   posts(){
  //     this.$nextTick(()=>
  //     console.log('変更されました'))
  //   }
  // },
  methods: {
deletePost(index) {
      console.log(index);
      this.$store.dispatch("deletePost", this.posts[index].id);
    },
    endPush() {
      this.isPush = false;
    },
    likePost(post) {
      this.isPush = true;
      console.log(post);
      console.log(this.user.uid);
      this.$store.dispatch("login/likePost", {
        post: post,
        uid: this.user.uid
      });
      setTimeout(this.endPush, 1000);
    },
    notLikePost(post) {
      this.isPush = true;
      console.log(post);
      console.log(this.user.uid);
      this.$store.dispatch("login/notLikePost", {
        post: post,
        uid: this.user.uid
      });
      setTimeout(this.endPush, 1000);
    },

  }
};
</script>

<style></style>

<template>
  <div class="post">
    <h2>Snaps</h2>
    <div class="p-post__content">
      <div
        class="p-post__card"
        v-for="(post, index) in posts"
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
            <p><fa :icon="['fas', 'map-marker-alt']" /> {{ post.location}}</p>
          </div>
        </div>
        <div class="p-post__card__button">
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
              v-if="user.login && likedPosts.every(val => val.id !== post.id)"
            >
              <fa :icon="['fas', 'heart']" /> {{ post.likePostCount }}
            </button>
            <button
              class="is-like"
              v-bind:disabled="isPush"
              v-on:click="notLikePost(post.id)"
              v-if="user.login && likedPosts.some(val => val.id === post.id)"
            >
              <fa :icon="['fas', 'heart']" /> {{ post.likePostCount }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="inputform" v-if="user.login">
      <form v-on:submit.prevent="submitPost">
        <input type="file" accept="img/*" @change="changeImg" v-if="show" />
        <input v-model="comment" type="text" placeholder="Add a comment" />
        <input v-model="location" type="text" placeholder="Add a location" />
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  async fetch({ store }) {
    console.log("await");
    await store.dispatch("getPosts");
  },
  //     async fetch({ store }) {
  //   await store.dispatch("getLikedPosts",user.uid);
  // },
  data() {
    return {
      location: "",
      comment: "",
      thumbnail: "",
      show: true,
      isPush: false,
      postData: {
        thumbnail: ""
      }
    };
  },
  created() {
    console.log("created");
  },
  computed: {
    // todos() {
    //   return this.$store.getters["todos"];
    // },
    posts() {
      return this.$store.getters["posts"];
    },
    getThumbnail() {
      return this.$store.getters["thumbnail"];
    },
    user() {
      return this.$store.getters["login/user"];
    },
    likedPosts() {
      return this.$store.getters["login/likedPosts"];
    }
  },

  methods: {
    changeImg(e) {
      this.thumbnail = e.target.files[0];
      console.log(this.thumbnail);

      if (this.thumbnail) {
        const reader = new FileReader();
        reader.onload = () => {
          this.postData.thumbnail = reader.result + "";
        };
        reader.readAsDataURL(this.thumbnail);
        console.log("選択完了");
        // this.submitImg(this.thumbnail)
      }
    },
    submitPost() {
      if (this.thumbnail && this.location && this.comment) {
        this.$store.dispatch("submitPost", {
          location: this.location,
          comment: this.comment,
          img: this.thumbnail,
          author: this.user.name,
          uid: this.user.uid
        });
        this.thumbnail = "";
        this.location = "";
        this.comment = "";
        this.show = false;
        this.$nextTick(function() {
          this.show = true;
        });
      }
    },
    getImg() {
      this.$store.dispatch("getImg", this.thumbnail);
    },
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
    liked(post) {
      const arr = Object.entries(likedPosts);
      const result = arr.find(([id, data]) => data.id === post);
      console.log(result);
      if (result === undefined) {
        return true;
      } else {
        return false;
      }
    },
    updatePost() {
      if (this.post) {
        this.$store.dispatch("updatePost", this.post);
        this.post = "";
      }
    }
  }
};
</script>
<style></style>

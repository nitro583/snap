<template>
  <div class="post">
    <h2>Snaps</h2>
    <div class="p-post__content">
      <div
        class="p-post__card"
        v-for="(todo, index) in todos"
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
    <div class="inputform" v-if="user.login">
      <form v-on:submit.prevent="submitTodo">
        <input type="file" accept="img/*" @change="changeImg" v-if="show" />
        <input v-model="todo" type="text" placeholder="Add a comment" />
        <input v-model="comment" type="text" placeholder="Add a location" />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  async fetch({ store }) {
    console.log("await");
    await store.dispatch("getTodos");
  },
  //     async fetch({ store }) {
  //   await store.dispatch("getLikedPosts",user.uid);
  // },
  data() {
    return {
      todo: "",
      comment: "",
      thumbnail: "",
      show: true,
      isPush:false,
      postData: {
        thumbnail: ""
      }
    };
  },
  created() {
    console.log("created");
  },
  computed: {
    todos() {
      console.log("computed todos");
      return this.$store.getters["todos"];
    },
    getThumbnail() {
      return this.$store.getters["thumbnail"];
    },
    user() {
      return this.$store.getters["login/user"];
    },
    likedPosts() {
      return this.$store.getters["login/likedPosts"];
    },

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
    submitTodo() {
      if (this.thumbnail && this.todo && this.comment) {
        this.$store.dispatch("submitPost", {
          todo: this.todo,
          comment: this.comment,
          img: this.thumbnail,
          author: this.user.name,
          uid: this.user.uid
        });
        this.thumbnail = "";
        this.todo = "";
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
    deleteTodo(index) {
      console.log(index);
      this.$store.dispatch("deleteTodo", this.todos[index].id);
    },
    endPush(){
      this.isPush=false
    },
    likePost(post) {
      this.isPush = true
      console.log(post);
      console.log(this.user.uid);
      this.$store.dispatch("login/likePost", {
        post: post,
        uid: this.user.uid
      });
      setTimeout(this.endPush,1000)
    },
    notLikePost(post) {
      this.isPush = true
      console.log(post);
      console.log(this.user.uid);
      this.$store.dispatch("login/notLikePost", {
        post: post,
        uid: this.user.uid
      });
      setTimeout(this.endPush,1000)


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
    updateTodo() {
      if (this.todo) {
        this.$store.dispatch("updateTodo", this.todo);
        this.todo = "";
      }
    }
  }
};
</script>
<style></style>

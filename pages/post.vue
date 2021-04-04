<template>
  <div class="page">
    <h1>Dash board</h1>
    <div v-for="(todo, index) in todos" v-bind:key="todo.id">
      <div><img :src="todo.imgUrl" alt="" /></div>
      <div>
        <p>
          Posted at {{ todo.date.toDate() | moment }} Photo by {{ todo.author }}
        </p>
        <p>{{ todo.todo }}{{ todo.uid }}</p>
        <p>Location:{{ todo.comment }}</p>
      </div>
      <button v-on:click="deleteTodo(index)" v-if="todo.uid === user.uid">
        Delete
      </button>
      <NuxtLink
        :to="{
          name: 'users-uid-posts-postDetail',
          params: { uid: todo.uid, postDetail: todo.id }
        }"
        >コメントする</NuxtLink
      >
      <button
        v-on:click="likePost(todo.id)"
        v-if="user.login && likedPosts.every(val => val.id !== todo.id)"
      >
        like!({{todo.likePostCount}})
      </button>
      <button
        v-on:click="notLikePost(todo.id)"
        v-if="user.login && likedPosts.some(val => val.id === todo.id)"
      >
        delike!({{todo.likePostCount}})
      </button>
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
    likePost(post) {
      console.log(post);
      console.log(this.user.uid);
      this.$store.dispatch("login/likePost", { post: post, uid: this.user.uid });
    },
        notLikePost(post) {
      console.log(post);
      console.log(this.user.uid);
      this.$store.dispatch("login/notLikePost", { post: post, uid: this.user.uid });
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

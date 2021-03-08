<template>
  <div class="page">
    <h1>Todo list</h1>
    <ul>
      <li v-for="(todo, index) in todos" v-bind:key="todo.id">
        {{ todo.todo }}
        {{ todo.comment }}
        <img :src='todo.imgUrl' alt="">
        <button v-on:click="deleteTodo(index)">Delete</button>
      </li>
    </ul>
    <div class="inputform">
      <form v-on:submit.prevent="submitTodo">
        <input type="file" accept="img/*" @change="changeImg" v-if="show" />
        <input v-model="todo" type="text" placeholder="Add a Todo" />
        <input v-model="comment" type="text" placeholder="Add a comment" />
        <button tyoe="submit">Add Todo</button>
      </form>
    </div>
    <div>
      <button v-on:click="getThumbnail">画像取得</button>
    </div>
  </div>
</template>
<script>
export default {
  async fetch({ store }) {
    await store.dispatch("getTodos");
  },
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
  computed: {
    todos() {
      return this.$store.getters["todos"];
    },
    getThumbnail () {
      return this.$store.getters['thumbnail']
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
      if (this.todo) {
        this.$store.dispatch("submitPost", {
          todo: this.todo,
          comment: this.comment,
          img: this.thumbnail
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

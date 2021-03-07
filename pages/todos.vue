<template>
  <div class="page">
    <h1>Todo list</h1>
    <ul>
      <li v-for="(todo, index) in todos" v-bind:key="todo.id">
        {{ todo.todo }}
        {{todo.comment}}
        <button v-on:click="deleteTodo(index)">Delete</button>
      </li>
    </ul>
    <div class="inputform">
      <form v-on:submit.prevent="submitTodo">
        <input v-model="todo" type="text" placeholder="Add a Todo" />
        <input v-model="comment" type="text" placeholder="Add a comment" />
        <button tyoe="submit">Add Todo</button>
      </form>
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
      comment: ""
    };
  },
  computed: {
    todos() {
      return this.$store.getters["todos"];
    }
  },
  methods: {
    submitTodo() {
      if (this.todo) {
        this.$store.dispatch("submitTodo", {
          todo: this.todo,
          comment: this.comment
        });
        this.todo = "";
        this.comment = "";
      }
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

<template>
  <div class="page">
    <h1>Todo list</h1>
    <ul>
      <li v-for="(todo, index) in todos" v-bind:key="todo.id">
        {{ todo.todo }}
        <button v-on:click="deleteTodo(index)">Delete</button>
      </li>
    </ul>
    <div class="inputform">
      <form v-on:submit.prevent="submitTodo">
        <input v-model="todo" type="text" placeholder="Add a Todo" />
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
    };
  },
  computed: {
    todos() {
      return this.$store.getters["todos"];
    },
  },
  methods: {
    submitTodo() {
      if (this.todo) {
        this.$store.dispatch("submitTodo", this.todo);
        this.todo = "";
      }
    },
    deleteTodo(index) {
      console.log(index);
      this.$store.dispatch("deleteTodo", this.todos[index].id);
    },
  },
};
</script>
<style>
</style>
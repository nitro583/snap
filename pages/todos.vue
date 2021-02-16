<template>
  <div class="page">
    <h1>Todo list</h1>
    <ul>
      <li
        v-for="(todo,index) in todos"
        v-bind:key="todo.id"

      >
        {{ todo }}
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
  data() {
    return {
      todos: ["これと", "それと", "あれと"],
      todo: "",
    };
  },
  methods: {
    submitTodo() {
      if (this.todo) {
        this.todos.push(this.todo);
        this.todo = "";
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
      console.log(index);
    },
  },
};
</script>
<style>
</style>
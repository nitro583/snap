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
      todo: "",
    };
  },
  computed: {
    todos() {
      return this.$store.getters['todos']
    }
  },
  methods: {
    submitTodo() {
      if (this.todo) {
        this.$store.commit('submitTodo',this.todo);
        this.todo = "";
      }
    },
    deleteTodo(index) {
      console.log(index);
      this.$store.commit('deleteTodo',index);
    },
  },
};
</script>
<style>
</style>
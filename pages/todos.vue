<template>
  <div class="page">
    <ul>
      <li v-for="todo in todos" v-bind:key="todo.id" v-on:click=>
        {{ todo }}
      </li>
    </ul>
    <div class="inputform">
      <form v-on:submit.prevent="submitTodo">
        <input v-model="todo"
        type="text"
        placeholder="Add a Todo"
        >
        <button tyoe="submit">
          Add Todo
        </button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      todos: ["これと", "それと", "あれと"],
      todo:"",
    };
  },
  methods: {
    submitTodo() {
      if(this.todo) {
        this.todos.push(this.todo)
        this.todo = ''
      }
    }
  },
};
</script>
<style>

</style>
export const state = () => ({
  todos: ['これと', 'あれと', 'それ', '追加']
})

export const getters = {
  todos: state => {
    return state.todos
  },
}

export const actions = {

}

export const mutations = {
  submitTodo(state, todo) {
    state.todos.push(todo)
  },
  deleteTodo(state, index) {
    state.todos.splice(index, 1)
  },
}

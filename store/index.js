import firebase from '@/plugins/firebase'

export const state = () => ({
  todos: [],
})

export const getters = {
  todos: state => {
    return state.todos
  },
}

export const actions = {
  getTodos({
    commit
  }) {
    firebase.firestore().collection('todos').orderBy("todo", "asc").get()
      .then((res) => {
        const todos = []
        res.forEach(x => {
          todos.push(x.data())
          console.log(x.data())
        })
        commit('getTodos', todos)
      })
  },
  submitTodo({
    dispatch
  }, todo) {
    firebase.firestore().collection('todos').add({})
      .then((res) => {
        firebase.firestore().collection('todos').doc(res.id)
          .set({
            todo: todo,
            id: res.id,
          }).then(() => {
            dispatch('getTodos', todo)
            console.log(todo, res.id)
          })
      })
  },
  deleteTodo({
    dispatch
  }, id) {
    firebase.firestore().collection('todos').doc(id).delete()
    .then((res) => {
    dispatch('getTodos')
    console.log('削除しました')
    })
  },
  updateTodo({
    dispatch
  }, id) {
    firebase.firestore().collection('todos').doc(id)
    .update({
      todo: todo,
    })
    .then(() => {
      dispatch('getTodos', todo)
      console.log(todo, res.id)
    })
  },

}

export const mutations = {
  getTodos(state, todos) {
    state.todos = todos
  },
  deleteTodo(state, index) {
    state.todos.splice(index, 1)
  },
}

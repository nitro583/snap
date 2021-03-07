import firebase from '@/plugins/firebase'

export const state = () => ({
  todos: [],
  comments:[],
  thumbnail:[],
})

export const getters = {
  todos: state => {
    return state.todos
  },
  thumbnail: state => {
    return state.thumbnail
  }
}

export const actions = {
  getTodos({
    commit
  },todo) {
    firebase.firestore().collection('todos').orderBy("todo", "asc")
    .get()
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
  }, {todo:todo,comment:comment}) {
    firebase.firestore().collection('todos').add({})
      .then((res) => {
        firebase.firestore().collection('todos').doc(res.id)
          .set({
            todo: todo,
            comment: comment,
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
  submitImg({context},image){
    let storage = firebase.storage()
    let storageRef = storage.ref().child(image.name)
    storageRef.put(image)
    .then(res=> console.log(res))
    .catch(error => console.log(error))
    
  },
  getImg({commit},image){
    let storage = firebase.storage()
    let storageRef = storage.ref().child(image.name)
    storageRef.getDownloadURL()
    .then(res => {
      console.log(res)
      commit('getData',res)
    })
  }

}

export const mutations = {
  getTodos(state, todos) {
    state.todos = todos
  },
  deleteTodo(state, index) {
    state.todos.splice(index, 1)
  },
  getData(state,image){
    state.thumbnail = image
  }
}

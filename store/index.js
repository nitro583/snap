import firebase from '@/plugins/firebase'

export const state = () => ({
  todos: [],
  comments: [],
  thumbnail: [],
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
  }, todo) {
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
  }, {
    todo: todo,
    comment: comment
  }) {
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
  submitImg({
    context
  }, image) {
    let storage = firebase.storage()
    let storageRef = storage.ref().child(image.name)
    storageRef.put(image)
      .then(res => console.log(res))
      .catch(error => console.log(error))


  },
  //   getImg({commit},todo){
  //   let storage = firebase.storage()
  //   let storageRef = storage.ref().child('NGIiXtMwmZ7h5rQYFavp')
  //   storageRef.getDownloadURL()
  //   .then(res => {
  //     console.log(res)
  //     commit('getData',res)
  //   })
  // },
  getImg({
    commit
  }, image) {
    let storage = firebase.storage()
    let storageRef = storage.ref().child(image.name)
    storageRef.getDownloadURL()
      .then(res => {
        console.log(res)
        commit('getData', res)
      })
  },
  submitPost({
    dispatch
  }, {
    todo: todo,
    comment: comment,
    img: img
  }) {
    let imgName = ''
    let imgUrl = ''
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
            imgName = res.id
            let storage = firebase.storage()
            let storageRef = storage.ref().child(imgName)
            storageRef.put(img)
              .then((res) => {
                console.log(res)
                storageRef.getDownloadURL()
                  .then(res => {
                    console.log(res)
                    imgUrl = res
                    firebase.firestore().collection('todos').doc(imgName)
                      .update({
                        imgUrl: imgUrl,
                      }).then(() => {
                        dispatch('getTodos', todo)
                        console.log(todo, comment, imgUrl)
                      })
                  })
                  .catch(error => console.log(error))

              })
          })


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
  getData(state, image) {
    state.thumbnail = image
  }
}

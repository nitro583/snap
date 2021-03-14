import firebase from '~/plugins/firebase'


export const state = () => ({
  user: {
    uid: '',
    email: '',
    name: '',
    icon: '',
    login: false,
  },
})

export const getters = {
  user: state => {
    return state.user
  }
}

export const actions = {
  login({
    dispatch
  }, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        console.log('成功')
        dispatch('checkLogin')
        dispatch('goTop')
      }).catch((error) => {
        alert(error)
      })
  },
  update({
    dispatch
  }, name) {
    firebase.auth().currentUser.updateProfile({
        displayName: name
      })
      .then(() => {
        console.log('Update successful')
        dispatch('checkLogin')

      })
      .catch((error) => {
        alert(error)
      })
  },

  submitImg({
    dispatch
  }, {
    img: img,
    uid: uid,
  }) {
    let imgUrl = ''
    let storage = firebase.storage()
    let storageRef = storage.ref().child('/icon/' + uid)
    storageRef.put(img)
      .then((res) => {
        console.log(res)
        storageRef.getDownloadURL()
          .then(res => {
            console.log(res)
            imgUrl = res
            firebase.auth().currentUser.updateProfile({
                photoURL: imgUrl
              })
              .then(function () {
                dispatch('checkLogin')
              })
              .catch((error) => {
                alert(error)
              })
          })
      })
  },
  loginGoogle({
    dispatch
  }) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then(function (result) {
        dispatch('checkLogin')
        dispatch('goTop')
      }).catch(function (error) {
        alert(error)
      })
  },
  checkLogin({
    commit
  }) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('checklogin発火')
        console.log(user.displayName)

        commit('getData', {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          icon: user.photoURL
        })
      }
    })
  },
  goTop() {
    this.$router.push("/");
  },


  register({
    dispatch
  }, payload) {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        console.log(user)
        dispatch('update', payload.name)
        dispatch('checkLogin')
      }).catch(function (error) {
        alert(error)
      })
  },
  logOut({
    commit
  }) {
    firebase.auth().signOut()
      .then(() => {
        commit('logOut')
        console.log('ログアウトしました')
      })
      .catch((error) => {
        alert(error)
      })
  },
}

export const mutations = {
  getData(state, user) {
    state.user = user
  },
  logOut(state) {
    state.user = ''

  }
}

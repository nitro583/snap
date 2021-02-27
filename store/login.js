import firebase from '~/plugins/firebase'


export const state = () => ({
user: {
  uid: '',
  email: '',
  name:'新規ユーザー',
  login: false,
},
})

export const getters = {
user: state => {
  return state.user
}
}

export const actions = {
  login({dispatch},payload) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    .then(user => {
      console.log('成功')
      dispatch('checkLogin')
    }).catch((error)=> {
      alert(error)
    })
  },
  update({dispatch} ,name){
    firebase.auth().currentUser.updateProfile({
      displayName: name
    })
    .then(user=>{
      console.log('Update successful')
      dispatch('checkLogin')

    })
    .catch((error)=>{
      console.log(error)
    })
  },
  loginGoogle({dispatch}){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
  .signInWithPopup(provider)
  .then(function(result) {
    dispatch('checkLogin')
  }).catch(function(error){
    console.log(error)
  })
  },
  checkLogin({commit}) {
    firebase.auth().onAuthStateChanged(function (user){
      if(user){
        console.log('checklogin発火')
        commit('getData',{uid: user.uid , email: user.email,name:user.displayName})
      }
    })
  },

  register({dispatch},payload) {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then(user=> {
      console.log(user)
      dispatch('update',payload.name)
      dispatch('checkLogin')
    }).catch(function(error){
      console.log({'code':error.code,'message':error.message})
    })
  },
  logOut({commit}) {
    firebase.auth().signOut()
    .then(()=>{
      console.log('ログアウトしました')
      commit('logOut')
    })
    .catch((error)=> {
      console.log(error)
    })
  },
}
 
  export const mutations = {
    getData (state, user) {
      state.user = user
    },
    logOut(state){
      state.user = ''
      
    }
  }
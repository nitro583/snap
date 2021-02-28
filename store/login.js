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
      alert(error)
    })
  },
  loginGoogle({dispatch}){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
  .signInWithPopup(provider)
  .then(function(result) {
    dispatch('checkLogin')
  }).catch(function(error){
    alert(error)
  })
  },
  checkLogin({commit}) {
    const that = this
    firebase.auth().onAuthStateChanged(function (user){
      if(user){
        console.log('checklogin発火')
        commit('getData',{uid: user.uid , email: user.email,name:user.displayName})
        that.$router.push("/");
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
      alert(error)
    })
  },
  logOut({commit}) {
    firebase.auth().signOut()
    .then(()=>{
      commit('logOut')
      console.log('ログアウトしました')
    })
    .catch((error)=> {
      alert(error)
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
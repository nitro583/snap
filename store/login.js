import firebase from '~/plugins/firebase'


export const state = () => ({
  user: {
    uid: '',
    email: '',
    name: '',
    icon: '',
    login: false,
  },
  likedPosts:[],
})

export const getters = {
  user: state => {
    return state.user
  },
  likedPosts: state => {
    return state.likedPosts
  },
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
    commit,dispatch
  }) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('checklogin発火')
        console.log(user.displayName)

        commit('getData', {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          icon: user.photoURL,
          login: true
        })
        dispatch('getLikedPosts',user.uid)
      }
    })
  },
  goTop() {
    this.$router.push("/");
  },

  likePost({
    dispatch
  }, {post,uid}) {
    const postRef = post
      const anotherUserRef = uid
      console.log('postRef: '+ post)
      console.log('anotherUserRef: '+ uid)
      let date = firebase.firestore.Timestamp.now();
      const batch = firebase.firestore().batch()

      firebase.firestore().collection('todos').doc(postRef).collection('likedUsers').doc(anotherUserRef).get()
      .then((ref)=>{

        if(ref.exists){
          console.log(ref.data())
          console.log('Likeされています')
        } else {
          console.log('Likeされていません')

          batch.set(
            firebase.firestore()
            .collection('todos')
            .doc(postRef)
            .collection('likedUsers')
            .doc(anotherUserRef), {
              id: anotherUserRef,
              createTime: date,
            }
          )
      
          batch.set(
            firebase.firestore()
            .collection('users')
            .doc(anotherUserRef)
            .collection('likedPosts')
            .doc(postRef), {
              id: postRef,
              createTime: date
            }
          )
      
          batch.update(
            firebase.firestore()
            .collection('todos')
            .doc(postRef),{
              likePostCount: firebase.firestore.FieldValue.increment(1)
            }
          )
          batch.commit()
          .then(() => {
            dispatch('getLikedPosts',uid)
            dispatch('getTodos',uid,{root: true})
            console.log('Likeしました')
          })
      
        }
      })
      .catch((error)=>{
        // 追加
        console.log(error)
      })
  },

  notLikePost({dispatch},{post:post,uid:uid}){
    const batch =  firebase.firestore().batch()

    batch.delete(
      firebase.firestore()
      .collection('todos')
      .doc(post)
      .collection('likedUsers')
      .doc(uid),
    )
    
    batch.delete(
      firebase.firestore()
      .collection('users')
      .doc(uid)
      .collection('likedPosts')
      .doc(post), 
    )

    batch.update(
      firebase.firestore()
      .collection('todos')
      .doc(post),{
        likePostCount: firebase.firestore.FieldValue.increment(-1)
      })
    
  batch.commit()
  .then(() => {
    dispatch('getLikedPosts',uid)
    dispatch('getTodos',uid,{root: true})
    console.log('Like解除しました')
  })
  },


  getLikedPosts({
    commit
  }, uid) {
    console.log('getLikedPosts取得' + uid)
    firebase.firestore().collection('users').doc(uid).collection('likedPosts').orderBy("createTime", 'desc')
    .get()
    .then((res) => {
      console.log(res)
      const likedPosts = []
      res.forEach(x => {
        likedPosts.push(x.data())
        console.log(x.data())
      })
      commit('getLikedPosts', likedPosts)
      console.log('getLikedPosts ')})

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

  },
  getLikedPosts(state, likedPosts) {
    console.log('likedPosts:' + likedPosts)
    state.likedPosts = likedPosts
  },
}

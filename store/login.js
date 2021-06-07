import {
  faCaretSquareLeft
} from '@fortawesome/free-solid-svg-icons'
import { dimensions } from 'vee-validate/dist/rules'
import firebase from '~/plugins/firebase'


export const state = () => ({
  user: [],
  postUser: [],
  likedPosts: [],
  usersLikedPosts:[],
  usersLikedPostsIds:[],

})

export const getters = {
  user: state => {
    return state.user
  },
  postUser: state => {
    return state.postUser
  },
  introduction: state => {
    return state.postUser[0].introduction
  },
  likedPosts: state => {
    return state.likedPosts
  },
  usersLikedPosts: state => {
    return state.usersLikedPosts
  },
  usersLikedPostsIds: state => {
    return state.usersLikedPostsIds
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
  }, {
    name,
    uid
  }) {

    const batch = firebase.firestore().batch()
    firebase.auth().currentUser.updateProfile({
        displayName: name
      })
      .then(() => {
        console.log('Update successful')
        console.log(name)
        console.log(uid)

        batch.set(
          firebase.firestore()
          .collection('users')
          .doc(uid), {
            uid: uid,
            name: name,
            introduction: '',
          }, {
            merge: true
          }
        )

        batch.commit()
          .then(() => {
            console.log('profile updated.')
          })

        dispatch('checkLogin')

      })
      .catch((error) => {
        alert(error)
      })
  },


  updateProfile({
    dispatch
  }, {
    uid,
    name,
    introduction
  }) {

    const batch = firebase.firestore().batch()

    firebase.auth().currentUser.updateProfile({
        displayName: name

      })
      .then(() => {
        console.log('Update successful')


        batch.set(
          firebase.firestore()
          .collection('users')
          .doc(uid), {
            uid: uid,
            name: name,
            introduction: introduction,
          }, {
            merge: true
          }
        )

        batch.commit()
          .then(() => {
            console.log('profile updated.')
            dispatch('getUser', uid)
            dispatch('checkLogin')

          })

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
    const batch = firebase.firestore().batch()
    let imgUrl = ''
    let storage = firebase.storage()
    let storageRef = storage.ref().child('/icon/' + uid)
    storageRef.putString(img, 'data_url')
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

                batch.set(
                  firebase.firestore()
                  .collection('users')
                  .doc(uid), {
                    photoURL: imgUrl
                  }, {
                    merge: true
                  }
                )
                batch.commit()
                  .then(() => {
                    dispatch('getUser', uid)
                    console.log('profile updated.')
                    dispatch('checkLogin')
                  })
              })
              .catch((error) => {
                alert(error)
              })
          })
      })
  },

  async getUser({
    commit,
  }, uid) {
    await firebase.firestore().collection('users').doc(uid)
      .get()
      .then((res) => {
        const user = []
        user.push(res.data())
        console.log(res.data())
        console.log('取得完了')
        commit('getUser', user)
        console.log('commit')


      })
  },


  loginGoogle({
    dispatch
  }) {
    const batch = firebase.firestore().batch()
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then(function (result) {
        firebase.firestore().collection('users').doc(result.user.uid).get()
          .then((ref) => {
            if (!ref.exists) {
              batch.set(
                firebase.firestore()
                .collection('users')
                .doc(result.user.uid), {
                  uid: result.user.uid,
                  name: result.user.displayName,
                  photoURL: result.user.photoURL,
                  introduction: '',
                }, {
                  merge: true
                }
              )
              batch.commit()
                .then(() => {
                  dispatch('getUser', result.user.uid)
                  console.log('profile registered.')
                  dispatch('checkLogin')
                  dispatch('goTop')
                })
            } else {
              dispatch('getUser', result.user.uid)
              console.log('profile checked.')
              dispatch('checkLogin')
              dispatch('goTop')
            }
          })

      }).catch(function (error) {
          alert(error)


        }


      )
  },
  checkLogin({
    commit,
    dispatch
  }) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('checklogin発火')
        console.log(user.displayName)
        console.log('ユーザーアイコン' + user.photoURL)
        commit('getData', {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          icon: user.photoURL,
          login: true
        })
        dispatch('getLikedPosts', user.uid)
      }
    })
  },
  goTop() {
    this.$router.push("/");
  },

  likePost({
    dispatch
  }, {
    post,
    uid
  }) {
    const postRef = post
    const anotherUserRef = uid
    console.log('postRef: ' + post)
    console.log('anotherUserRef: ' + uid)
    let date = firebase.firestore.Timestamp.now();
    const batch = firebase.firestore().batch()

    firebase.firestore().collection('posts').doc(postRef).collection('likedUsers').doc(anotherUserRef).get()
      .then((ref) => {

        if (ref.exists) {
          console.log(ref.data())
          console.log('Likeされています')
        } else {
          console.log('Likeされていません')

          batch.set(
            firebase.firestore()
            .collection('posts')
            .doc(postRef)
            .collection('likedUsers')
            .doc(anotherUserRef), {
              uid: anotherUserRef,
              createTime: date,
            }
          )
          batch.set(
            firebase.firestore()
            .collection('users')
            .doc(anotherUserRef)
            .collection('likedPosts')
            .doc(postRef), {
              uid: anotherUserRef,
              postId: postRef,
              createTime: date
            }
          )

          batch.update(
            firebase.firestore()
            .collection('posts')
            .doc(postRef), {
              likePostCount: firebase.firestore.FieldValue.increment(1)
            }
          )
          batch.commit()
            .then(() => {
              dispatch('getLikedPosts', uid)
              dispatch('getPosts', uid, {
                root: true
              })
              console.log('Likeしました')
            })

        }
      })
      .catch((error) => {
        console.log(error)
      })
  },

  notLikePost({
    dispatch
  }, {
    post: post,
    uid: uid
  }) {
    const batch = firebase.firestore().batch()

    firebase.firestore().collection('posts').doc(post).collection('likedUsers').doc(uid).get()
      .then((ref) => {

        if (ref.exists) {
          console.log(ref.data())
          console.log('Likeされています')

          batch.delete(
            firebase.firestore()
            .collection('posts')
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
            .collection('posts')
            .doc(post), {
              likePostCount: firebase.firestore.FieldValue.increment(-1)
            })

          batch.commit()
            .then(() => {
              dispatch('getLikedPosts', uid)
              dispatch('getPosts', uid, {
                root: true
              })
              console.log('Like解除しました')
            })
        } else {
          console.log('Likeされていません')
        }
      })
  },


  getUsersLikedPosts({
    commit
  },{uid,count}) {
    console.log('getUsersLikedPosts取得' + uid)
    firebase.firestore().collection('users').doc(uid).collection('likedPosts').orderBy("createTime", 'desc')
      .get()
      .then((res) => {
        console.log(res)
        const likedPostIds = []
        res.forEach(x => {
          likedPostIds.push(x.data().postId)
          console.log(x.data().postId)
        })

        if (likedPostIds.length){
          console.log('getLikedPostsIds ')
          const end = count * 6
          const start = end - 6;
          const recentLikedPostIds = likedPostIds.slice( start, end)
          commit('usersLikedPostsIds', likedPostIds)
          console.log(recentLikedPostIds)
  
          firebase.firestore().collection('posts').where(firebase.firestore.FieldPath.documentId(),'in',recentLikedPostIds).get().then((res) => {
            const posts = []
            res.forEach(x => {
              posts.push(x.data())
            })
            console.log('getUsersLikedPosts')
            commit('usersLikedPosts', posts)
          })
          
        } else {
          console.log('LikeしているPostがありません')
          commit('usersLikedPostsIds', null)
          commit('usersLikedPosts', null)
        }
      })


            // const likedPostIds = []
        // likedPosts.forEach(x => {
        //   console.log(x.postId)
        //   likedPostIds.push(x.postId)
        // })
        // 
        // dispatch('getUsersLikedPosts',recentLikedPostIds)

  },

  getLikedPosts({
    commit
  },uid) {
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
        console.log('getLikedPosts ')
      })
  },


  register({
    dispatch
  }, payload) {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {

        dispatch('update', {
          name: payload.name,
          uid: firebase.auth().currentUser.uid
        })
        dispatch('checkLogin')
        dispatch('goTop')
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
  getUser(state, user) {
    state.postUser = user
  },
  logOut(state) {
    state.user = ''

  },
  updateUserName(state, name) {
    state.postUser[0].name = name
  },
  updateIntroduction(state, message) {
    state.postUser[0].introduction = message
  },

  getLikedPosts(state, likedPosts) {
    console.log('likedPosts:' + likedPosts)
    state.likedPosts = likedPosts
  },
  usersLikedPostsIds(state, likedPostsIds) {
    state.usersLikedPostsIds = likedPostsIds
  },
  usersLikedPosts(state, likedPosts) {
    state.usersLikedPosts = likedPosts
  },
}

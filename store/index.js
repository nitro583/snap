import firebase from '@/plugins/firebase'

export const state = () => ({
  posts: [],
  post: [],
  postComments: [],
  likedUsers: [],

})

export const getters = {
  todos: state => {
    return state.todos
  },
  posts: state => {
    console.log('getters')
    return state.posts
  },
  post: state => {
    return state.post
  },
  postComments: state => {
    return state.postComments
  },
  likedUsers: state => {
    return state.likedUsers
  },
  likedPosts: state => {
    return state.likedPosts
  },
}

export const actions = {
    getPosts({
      commit
    }) {
      firebase.firestore().collection('posts').orderBy("date", 'desc').get().then((res) => {
        const posts = []
        res.forEach(x => {
          posts.push(x.data())
        })
        console.log('commit')
        commit('getPosts', posts)
      })
    },

    async getPost({
      commit
    }, postId) {
      console.log('postID' + postId)
      firebase.firestore().collection('posts').doc(postId)
        .get()
        .then((res) => {
          const post = []
          post.push(res.data())
          console.log(res.data())
          console.log('取得完了')
          commit('getPost', post)
          console.log('commit')

          // firebase.firestore().collection('todos').doc(postId).collection('comments').orderBy("date",'desc')
          // .get()
          // .then((res) => {
          //   const postComments = []
          //   postComments.push(res.data())
          //   console.log(res.data())
          //   console.log('取得完了')
          //   commit('getPostComment', postComments)
          //   console.log('commit')
          // })
        })
    },
    getPostComments({
      commit
    }, postId) {
      console.log('comments取得用postID' + postId)
      firebase.firestore().collection('posts').doc(postId).collection('comments').orderBy("date", 'desc').get()
        .then((res) => {
          const postComments = []
          res.forEach(x => {
            postComments.push(x.data())
            console.log(x.data())
          })
          commit('getPostComments', postComments)
          console.log('commit' + postComments)

        })

    },

    getLikedPosts({
      commit
    }, uid) {
      firebase.firestore().collection('users').doc(uid).collection(likedPosts).orderBy("createTime", 'desc')
        .get()
        .then((res) => {
          const likedPosts = []
          res.forEach(x => {
            likedPosts.push(x.data())
            console.log(x.data())
          })
          commit('getLikedPosts', likedPosts)
          console.log('getLikedPosts ')
        })

    },
    // submitTodo({
    //   dispatch
    // }, todo) {
    //   firebase.firestore().collection('todos').add({})
    //     .then((res) => {
    //       firebase.firestore().collection('todos').doc(res.id)
    //         .set({
    //           todo: todo,
    //           id: res.id,
    //         }).then(() => {
    //           dispatch('getTodos', todo)
    //           console.log(todo, res.id)
    //         })
    //     })
    // },
    submitComment({
      dispatch
    }, {
      comment: comment,
      author: author,
      uid: uid,
      postId: postId
    }) {
      let date = firebase.firestore.Timestamp.now();
      firebase.firestore().collection('posts').doc(postId).collection('comments').add({
          comment: comment,
          uid: uid,
          author: author,
          date: date,
        })
        .then((res) => {

          dispatch('getPostComments', postId)
          console.log(comment, res.id)

        })
    },





    deletePost({
      dispatch
    }, id) {
      const likedPostsSnapshot = firebase.firestore()
        .collectionGroup('likedPosts')
        .where('postId', '==', id);
      console.log(likedPostsSnapshot);
      const batch = firebase.firestore().batch()
      likedPostsSnapshot.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              batch.delete(doc);
            })
          })
          const post = firebase.firestore().collection('posts').doc(id)
          batch.delete(post)

          batch.commit()
          .then((res) => {
            dispatch('getPosts')
            console.log('削除しました')
          })
      },



        // updateTodo({
        //   dispatch
        // }, id) {
        //   firebase.firestore().collection('posts').doc(id)
        //     .update({
        //       post: post,
        //     })
        //     .then(() => {
        //       dispatch('getPosts', post)
        //       console.log(post, res.id)
        //     })
        // },



        submitImg({
          context
        }, image) {
          let storage = firebase.storage()
          let storageRef = storage.ref().child(image.name)
          storageRef.put(image)
            .then(res => console.log(res))
            .catch(error => console.log(error))


        },

        getImg({
          context
        }, image) {
          let storage = firebase.storage()
          let storageRef = storage.ref().child(image.name)
          storageRef.getDownloadURL()
            .then(res => {
              console.log(res)
              context.commit('getData', res)
            })
        },
        submitPost({
          dispatch
        }, {
          location: location,
          comment: comment,
          img: img,
          author: author,
          uid: uid
        }) {
          let imgName = ''
          let imgUrl = ''
          let date = firebase.firestore.Timestamp.now();
          firebase.firestore().collection('posts').add({
              location: location,
              comment: comment,
              author: author,
              uid: uid,
              date: date,
              likePostCount: 0,
            })
            .then((res) => {
              // firebase.firestore().collection('posts').doc(res.id)
              //   .set({
              //     location: location,
              //     comment: comment,
              //     author: author,
              //     uid: uid,
              //     id: res.id,
              //     date: date,
              //   }).then(() => {
              dispatch('getPosts')
              console.log(comment, res.id)
              imgName = res.id
              let storage = firebase.storage()
              let storageRef = storage.ref().child(imgName)
              storageRef.putString(img, 'data_url')
                .then((res) => {
                  console.log(res)
                  storageRef.getDownloadURL()
                    .then(res => {
                      console.log(res)
                      imgUrl = res
                      firebase.firestore().collection('posts').doc(imgName)
                        .update({
                          imgUrl: imgUrl,
                          id: imgName,
                        }).then(() => {
                          dispatch('getPosts')
                          console.log(comment, location, imgUrl)
                        })
                    })
                    .catch(error => console.log(error))

                })
              // })


            })
        }

    }

    export const mutations = {
      getTodos(state, todos) {
        state.todos = todos
      },
      getPosts(state, posts) {
        state.posts = posts
        console.log('mutations')
      },
      getPost(state, post) {
        console.log('post:' + post)
        state.post = post
      },
      getPostComments(state, postComments) {
        console.log('postComment:' + postComments)
        state.postComments = postComments
      },
      getLikedUsers(state, likedUsers) {
        console.log('likedUsers:' + likedUsers)
        state.likedUsers = likedUsers
      },

      getLikedPosts(state, likedPosts) {
        console.log('likedPosts:' + likedPosts)
        state.likedPosts = likedPosts
      },
      deletePost(state, index) {
        state.todos.splice(index, 1)
      },
    }

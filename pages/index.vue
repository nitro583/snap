<template>
  <div class="p-index  fadein">
<div class="p-index__mainVisual">
    <h2>日常の一瞬を、共有しよう。</h2>
  <p class="c-index__lead">「SNAP×SNAP」はスナップ写真に文字を添えて投稿できるSNSです。</p>
  <div class="p-index__mainVisual__start"> <NuxtLink class="c-button c-index__signupButton" to="/register">Signupして始める</NuxtLink></div>
</div>
<div class="p-index__about">
  <div class="p-index__about__left">
  <h3 class="p-index__about__title">SNAP×SNAPとは？</h3>
<p>SNAP×SNAPはスナップ写真を投稿できるシンプルなSNSです。そもそも「スナップ写真」とは「下準備なく日常の出来事や光景を撮影した写真」のことで、要するに気兼ねなく、何気なく撮影した写真を指します。最近ではスマートフォンに搭載されているカメラの性能が上がり、より写真を撮ることが身近となりました。<br>
一方で、ストレージの容量を満たしているだけで、見返すこともないまま眠ってしまっている写真がたくさんあるでしょう。</p>
  </div>
  <div class="p-index__about__right">
    
  </div>
</div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
      },
      dbData:""
    };
  },
  methods: {
    submit() {
const db = firebase.firestore()
      let dbUsers = db.collection("users");
      dbUsers
        .add({
          name: this.user.name,
          email: this.user.email,
        })
        .then((ref) => {
          console.log("ADD ID: ", ref.id);
        });
    },
    getData () {
      const db = firebase.firestore()
      let docUsers = db.collection('users').doc('Uq8Yne3Z7JMORW53wDHn')
      let dbData = []
      this.dbData =dbData
      docUsers.get().then(function(doc) {
        dbData.push(doc.data().name)
      })
    }
  },
};
</script>

<style>
</style>

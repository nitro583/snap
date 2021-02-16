<template>
  <div class="container">
    <h1>Snap</h1>

    <label
      >name
      <input type="text" v-model="user.name" />
    </label>
    <label
      >mail
      <input type="text" v-model="user.email" />
    </label>
    <button type="button" v-on:click= "submit">submit</button>

    <button type="button" v-on:click= "getData">
      Fetch Data
    </button>
      <p>{{ dbData }}</p>
  </div>
</template>

<script>
import firebase from 'firebase'
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

<template>
  <div>
    <div>
      <form class="form" @submit.prevent="submitImg">
        <input type="file" accept="img/*" @change="changeImg" />
        <button type="submit" class="button">
          post
        </button>

        <div>
          <p>
            {{ thumbnail }}
          </p>
          <p>{{ postData.thumbnail }}</p>
          <img :src="postData.thumbnail" alt="" />
        </div>
      </form>
    </div>
    <div>
      <button class="button" @click="getImg()">画像取得</button>
      <img :src="getThumbnail" alt="" />
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";

export default {
  data() {
    return {
      thumbnail: "",
      postData: {
        thumbnail: ""
      },
    };
  },
  computed: {
    getThumbnail () {
      return this.$store.getters['thumbnail']
    },
  },
  methods: {
    changeImg(e) {
      this.thumbnail = e.target.files[0];
      console.log(this.thumbnail);

      if (this.thumbnail) {
        const reader = new FileReader();
        reader.onload = () => {
          this.postData.thumbnail = reader.result + "";
        };
        reader.readAsDataURL(this.thumbnail);
        console.log("選択完了");
        // this.submitImg(this.thumbnail)
      }
    },

    submitImg() {
      this.$store.dispatch("submitImg", this.thumbnail);
      this.postData.thumbnail = 'Uploaded.';
    },
    getImg(){
      this.$store.dispatch('getImg',this.thumbnail)
    }
    // getImg() {
    //   let storage = firebase.storage();
    //   let storageRef = storage.ref().child(this.thumbnail.name);
    //   storageRef.getDownloadURL().then(res => {
    //     console.log(res);
    //     this.getData.thumbnail = res;
    //   });
    // }
  }
};
</script>

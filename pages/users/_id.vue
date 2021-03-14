<template>
  <div class="login">
    <!-- v-if='!user'をdivに追加するとログインしたときは見えなくなる。 -->
    <h1 class="text">User</h1>
    <p class="text">Your Email: {{ user.email }}</p>
    <p class="text">Your Name: {{ user.name }}{{user.icon}}</p>
    <p class="text">Your Icon: <img v-if='user.icon' :src="user.icon" alt="" />
    <img v-else src="~/assets/icon.png" alt="" /></p>
    <form v-on:submit.prevent="submitImg">
      <input type="file" accept="img/*" @change="changeImg" v-if='show' />
      <button tyoe="submit">ChangeIcon</button>
    </form>
  </div>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.getters["login/user"];
    }
  },
  data() {
    return {
      email: "",
      password: "",
      updateName: "",
      thumbnail: "",
      show:true,
      postData: {
        thumbnail: ""
      }
    };
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
    getImg() {
      this.$store.dispatch("getImg", this.thumbnail);
    },

    updateImg(thumbnail) {
      this.$store.dispatch("login/updateImg", this.thumbnail);
    },

    submitImg() {
      if (this.thumbnail) {
        this.$store.dispatch("login/submitImg", {
          img: this.thumbnail,
          uid: this.user.uid
        });
        this.thumbnail = "";
        this.postData.thumbnail = "";
                this.show = false;
        this.$nextTick(function() {
          this.show = true
        })
      }
    }
  }
};
</script>

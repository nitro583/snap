<template>
  <div class="login">
    <div class="p-id__profile">
    <div class="p-id__profile__title">
    <h2 class="p-id__profile__name">{{ user.name }}</h2>
      <button class="c-button" v-on:click="openModal">プロフィールを編集する</button>
    </div>
<div class="p-id__profile__left">
    <div class="p-id__profile__image">
    <img v-if='user.icon' :src="user.icon" :alt='user.name' />
    <img v-else src="~/assets/icon.png" :alt="user.name" /></p>
    </div>
    </div>
<div class="p-id__profile__right">
  <div class="p-id__profile__introduction">
    <p>あいうえおかきくけこさしすせそ</p>
  </div>
</div>
  </div>
  <transition name="modal">

  <div v-show="showModal" @click.self="closeModal" class="p-id__profile__modal">
    
   <div class="p-id__profile__edit">

  <div class="p-id__profile__changeImage">
    <h3>プロフィールを編集</h3>
    <h4>アイコンの変更</h4>
  <form v-on:submit.prevent="submitImg">
    <input type="file" accept="img/*" @change="changeImg" v-if='show' />
    <button type="submit">ChangeIcon</button>
    <div class="p-id__profile__closeButton" @click="closeModal"></div>
  </form>
  <h4>自己紹介の変更</h4>
  </div>
    </div> 

  </div>
  </transition>
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
      showModal:false,
      postData: {
        thumbnail: ""
      }
    };
  },
  methods: {
    openModal(){
      this.showModal = true
    },
    closeModal(){
      this.showModal = false
    },
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

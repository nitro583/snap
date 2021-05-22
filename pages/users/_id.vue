<template>
  <div class="">
    <div v-if='postUser[0]' class="p-id__profile">
      <div class="p-id__profile__title">
        <h2 class="p-id__profile__name">{{ postUser[0].name}}</h2>
        <button
          v-if="postUser[0].uid === user.uid"
          class="c-button"
          v-on:click="openModal"
        >
          プロフィールを編集する
        </button>
      </div>
      <div class="p-id__profile__left">
        <div class="p-id__profile__image">
          <img
            v-if="postUser[0].photoURL"
            :src="postUser[0].photoURL"
            :alt="postUser[0].uid"
          />
          <img v-else src="~/assets/icon.png" :alt="postUser[0].uid" />
        </div>
      </div>
      <div class="p-id__profile__right">
        <div class="p-id__profile__introduction">
          <p>{{ postUser[0].introduction }}</p>
        </div>
      </div>
    </div>
    <transition name="modal">
      <div
        v-show="showModal"
        @click.self="closeModal"
        class="p-id__profile__modal"
      >
        <div class="p-id__profile__edit">
          <div class="p-id__profile__closeButton" @click="closeModal"></div>
          <validation-observer v-slot="{ invalid, passes }">
            <!-- <div class="p-id__profile__edit__title"> -->
            <h3 class="p-id__profile__edit__h3">プロフィールを編集</h3>

            <div class="p-id__profile__edit__image">
              <image-input :show="imgShow" v-model="image" />
            </div>
            <form class="" @submit.prevent>
              <div class="p-id__profile__edit__label-area">
                <label class="p-id__profile__edit__label" for="name"
                  >User Name
                </label>
              </div>
              <div class="p-id__profile__edit__input-area">
                <validation-provider
                  v-slot="{ errors }"
                  rules="required|max:15"
                  name="User Name"
                >
                  <input
                    

                    id="name"
                    class="c-input p-id__profile__edit__input"
                    type="text"
                    v-model="userName"
                    required
                  />
                  <p v-show="errors.length" class="p-id__profile__edit__error">
                    {{ errors[0] }}
                  </p>
                </validation-provider>
                <div class="p-id__profile__edit__label-area">
                  <label class="p-id__profile__edit__label" for="introduction"
                    >introduction
                  </label>
                </div>
              </div>
              <div class="p-id__profile__edit__input-area">
                <validation-provider
                  v-slot="{ errors }"
                  rules="max:140"
                  name="Introduction"
                >
                  <textarea
                   
                    rows="5"
                    id="introduction"
                    class="c-input p-id__profile__edit__text-area"
                    type="text"
                    v-model="introduction"
         
                  ></textarea>
                  <p v-show="errors.length" class="p-id__profile__edit__error">
                    {{ errors[0] }}
                  </p>
                </validation-provider>
              </div>
              <div class="p-id__profile__edit__button-area">
                <button
                  class="c-button p-id__profile__edit__button"
                  type="submit"
                  :disabled="invalid"
                  @click="updateProfile"
                >
                  変更する
                </button>
              </div>
            </form>
          </validation-observer>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ImageInput from "@/components/imageInput.vue";
export default {
  async fetch({ store, params }) {
    console.log("params.id" + params.id);
    await store.dispatch("login/getUser", params.id);
    console.log("getUserしました");
  },
  head() {
    return {
      bodyAttrs: {
        class: this.scrollLock
      }
    };
  },
  computed: {
    postUser() {
      return this.$store.getters["login/postUser"];

    },
    user() {
      return this.$store.getters["login/user"];
    },
    userName: {
      get() {
        const postUser = this.$store.getters["login/postUser"];
        return postUser[0].name;
      },
      set(value) {
        this.$store.commit("login/updateUserName", value);
      }
    },
    introduction: {
      get() {
        const postUser = this.$store.getters["login/postUser"];
        return postUser[0].introduction;
      },
      set(value) {
        this.$store.commit("login/updateIntroduction", value);
      }
    }
    
  },
  created(){
    // this.$store.dispatch("login/getUser", this.$route.params.id),
    this.$store.dispatch("login/checkLogin");

    // this.introduction = this.postUser[0].introduction
  },
  

  components: {
    ImageInput
  },
  data() {
    return {
      email: "",
      password: "",
      updateName: "",
      thumbnail: "",

      uid: this.$route.params.id,
      show: true,
      imgShow: false,
      showModal: false,
      scrollLock: "",
      error: "",
      image: {}
    };
  },
  methods: {
    updateProfile() {
      console.log("updateProfile");
      this.errors = [];
      if (!this.user.name) {
        this.errors.push("Nameが未記入です。");
      }
      if (!this.errors.length) {
        this.$store.dispatch("login/updateProfile", {
          uid: this.user.uid,
          name: this.userName,
          introduction: this.introduction
        });
        this.submitImg();
        this.closeModal();
      }
    },
    checkString(email) {
      var regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      return regex.test(email);
    },
    openModal() {
      this.showModal = true;
      this.scrollLock = "lock";
    },
    closeModal() {
      this.showModal = false;
      this.scrollLock = "";

      this.$store.dispatch("login/getUser", this.user.uid);
    },
    // changeImg(e) {
    //   this.thumbnail = e.target.files[0];
    //   // this.thumbnail = this.image

    //   console.log(this.thumbnail);
    //   if (this.thumbnail.size / 1000000 > 5) {
    //     this.error =
    //       "ファイルサイズが大きすぎます（" +
    //       Math.round(this.thumbnail.size / 1000000) +
    //       "MB /5MB）";
    //   }
    //   if (this.error) {
    //     //errorsが存在する場合は内容をalert
    //     alert(this.error);
    //     e.currentTarget.value = "";
    //     this.thumbnail = "";
    //     this.error = "";
    //   }
    //   if (this.thumbnail) {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       this.postData.thumbnail = reader.result + "";
    //     };
    //     reader.readAsDataURL(this.thumbnail);
    //     console.log("選択完了");

    //     return false;
    //   }
    // },
    getImg() {
      this.$store.dispatch("getImg", this.thumbnail);
    },

    updateImg(thumbnail) {
      this.$store.dispatch("login/updateImg", this.thumbnail);
    },

    submitImg() {
      this.thumbnail = this.image.src;
      console.log("aaaaaaaaaaa" + this.thumbnail);
      if (this.thumbnail) {
        this.$store.dispatch("login/submitImg", {
          img: this.thumbnail,
          uid: this.user.uid
        });
        this.thumbnail = "";
        // this.image='';
        // this.image='';
        // this.postData.thumbnail = "";
        this.imgShow = true;
        this.show = false;

        this.$nextTick(function() {
          this.show = true;
          this.imgShow = false;
        });
      }
    }
  }
};
</script>

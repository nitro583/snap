<template>
  <div class="login">
    <div class="p-id__profile">
      <div class="p-id__profile__title">
        <h2 class="p-id__profile__name">{{ userName }}</h2>
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
            :alt="userName"
          />
          <img v-else src="~/assets/icon.png" :alt="user.name" />
        </div>
      </div>
      <div class="p-id__profile__right">
        <div class="p-id__profile__introduction">
          <p>{{ introduction }}</p>
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
          <div class="p-id__profile__changeImage">
            <h3>プロフィールを編集</h3>
            <h4>アイコンの変更</h4>
            <form v-on:submit.prevent="submitImg">
              <input
                type="file"
                accept="image/*"
                @change="changeImg"
                v-if="show"
              />
              <div class="p-id__profile__closeButton" @click="closeModal"></div>
            </form>

            <h4>自己紹介の変更</h4>
            <form class="" @submit.prevent>
              <div class="p-signup__form__left">
                <label class="p-signup__form__label" for="name"
                  >User Name
                </label>
              </div>
              <div class="p-signup__form__right">
                <validation-provider
                  v-slot="{ errors }"
                  rules="required|max:15"
                  name="User Name"
                >
                  <input
                    id="name"
                    class="p-signup__form__input"
                    type="text"
                    v-model="userName"
                    required
                  />
                  <p v-show="errors.length" class="p-signup__form__error">
                    {{ errors[0] }}
                  </p>
                </validation-provider>
                <label class="p-signup__form__label" for="introduction"
                  >introduction
                </label>
              </div>
              <div class="p-signup__form__right">
                <validation-provider
                  v-slot="{ errors }"
                  rules="max:140"
                  name="Introduction"
                >
                  <textarea
                    rows="5"
                    id="introduction"
                    class="p-signup__form__input"
                    type="text"
                    v-model="introduction"
                  ></textarea>
                  <p v-show="errors.length" class="p-signup__form__error">
                    {{ errors[0] }}
                  </p>
                </validation-provider>
                <button
                  class="p-signup__form__button"
                  type="submit"
                  :disabled="invalid"
                  @click="updateProfile"
                >
                  変更する
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  //   async fetch({ route,store }) {
  //   console.log("await");
  //   await store.dispatch("login/getUser",route.params.id);
  // },

  async fetch({ store, params }) {
    console.log("params.id" + params.id);
    await store.dispatch("login/getUser", params.id);
    console.log("getUserしました");
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
  data() {
    return {
      email: "",
      password: "",
      updateName: "",
      thumbnail: "",
      uid: this.$route.params.id,
      show: true,
      showModal: false,
      error: "",
      postData: {
        thumbnail: ""
      }
    };
  },
  methods: {
    updateProfile() {
      console.log("updateProfile");
      this.errors = [];
      if (!this.user.name) {
        this.errors.push("Nameが未記入です。");
      }
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
    },
    closeModal() {
      this.showModal = false;
      this.$store.dispatch("login/getUser", this.user.uid);
    },
    changeImg(e) {
      this.thumbnail = e.target.files[0];
      console.log(this.thumbnail);
      if (this.thumbnail.size / 1000000 > 5) {
        this.error =
          "ファイルサイズが大きすぎます（" +
          Math.round(this.thumbnail.size / 1000000) +
          "MB /5MB）";
      }
      if (this.error) {
        //errorsが存在する場合は内容をalert
        alert(this.error);
        e.currentTarget.value = "";
        this.thumbnail = "";
        this.error = "";
      }
      if (this.thumbnail) {
        const reader = new FileReader();
        reader.onload = () => {
          this.postData.thumbnail = reader.result + "";
        };
        reader.readAsDataURL(this.thumbnail);
        console.log("選択完了");
        // this.submitImg(this.thumbnail)
        return false;
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
          this.show = true;
        });
      }
    }
  }
};
</script>

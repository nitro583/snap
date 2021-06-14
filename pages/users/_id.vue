<template>
  <div class="">
    <div v-if="postUser[0]" class="p-id__profile">
      <div class="p-id__profile__title">
        <h2 class="p-id__profile__name">{{ postUser[0].name }}</h2>
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

          <h2>Like Snaps</h2>

<div class="p-post__content">
      <div
        class="p-post__card"
        v-for="(post, index) in usersLikedPosts"
        v-bind:key="post.id"
      >
        <div class="p-post__card__image"><img :src="post.imgUrl" alt="" /></div>
        <div class="p-post__card__text">
          <div class="p-post__card__date">
            <p>
              <fa :icon="['far', 'clock']" /> {{ post.date.toDate() | moment }}
            </p>
          </div>
          <div class="p-post__card__author">
            <p>
              <NuxtLink :to="{ name: 'users-id', params: { id: post.uid } }">
                <fa :icon="['fas', 'user-circle']" />
                {{ post.author }}</NuxtLink
              >
            </p>
          </div>
          <div class="p-post__card__note">
            <p>{{ post.comment }}</p>
          </div>
          <div class="p-post__card__location">
            <p><fa :icon="['fas', 'map-marker-alt']" /> {{ post.location }}</p>
          </div>
        </div>
        <div v-if="user.login" class="p-post__card__button">
          <div class="p-post__card__delete">
            <button v-on:click="deletePost(index)" v-if="post.uid === user.uid">
              <fa :icon="['fas', 'trash-alt']" />
            </button>
          </div>
          <div class="p-post__card__comment">
            <Nuxt-link
              :to="{
                name: 'users-uid-posts-postDetail',
                params: { uid: post.uid, postDetail: post.id }
              }"
            >
              <fa :icon="['far', 'comment']" />
            </Nuxt-link>
          </div>
          <div class="p-post__card__like">
            <button
              v-bind:disabled="isPush"
              v-on:click="likePost(post.id)"
              v-if="
                user.login && likedPosts.every(val => val.postId !== post.id)
              "
            >
              <fa :icon="['fas', 'heart']" /> {{ post.likePostCount }}
            </button>
            <button
              class="is-like"
              v-bind:disabled="isPush"
              v-on:click="notLikePost(post.id)"
              v-if="
                user.login && likedPosts.some(val => val.postId === post.id)
              "
            >
              <fa :icon="['fas', 'heart']" /> {{ post.likePostCount }}
            </button>
          </div>
        </div>
      </div>
</div>

<paginate  v-if="(getPageCount > 1)"
        :page-count="getPageCount"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickCallback"
        :prev-text="'前へ'"
        :next-text="'次へ'"
        :container-class="'pagination '"
        :page-class="'pagination-item'"
        :page-link-class="'pagination-item__link'"
        :prev-class="'pagination-btn pagination-prev'"
        :prev-link-class="'pagination-btn__link'"
        :next-class="'pagination-btn pagination-next'"
        :next-link-class="'pagination-btn__link'"
        :hide-prev-next="true"
        >
      </paginate>

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
import { mapGetters } from "vuex";
export default {
  async fetch({ store, params }) {
    console.log("params.id" + params.id);
    await store.dispatch("login/getUser", params.id);
    console.log("getUserしました");
  },
  //   async fetch({ store, params }) {
  //    await store.dispatch("login/getUsersLikedPosts", {
  //     uid: params.id,
  //     count: 1
  //   });
  // },
  head() {
    return {
      bodyAttrs: {
        class: this.scrollLock
      }
    };
  },

  computed: {
    ...mapGetters(["posts"]),
    posts() {
      return this.$store.getters["posts"];
    },
    recentPosts() {
      return this.posts.slice(0, this.count);
    },
    postUser() {
      return this.$store.getters["login/postUser"];
    },
    user() {
      return this.$store.getters["login/user"];
    },
    likedPosts() {
      return this.$store.getters["login/likedPosts"];
    },
    usersLikedPosts() {
      return this.$store.getters["login/usersLikedPosts"];
    },
        usersLikedPostsIds() {
      return this.$store.getters["login/usersLikedPostsIds"];
    },
        getPageCount: function() {
      return Math.ceil(this.usersLikedPostsIds.length / this.parPage);
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
  created() {
    // this.$store.dispatch("login/getUser", this.$route.params.id),
    this.$store.dispatch("getPosts");
    this.$store.dispatch("login/checkLogin");
    this.$store.dispatch("login/getUsersLikedPosts", {
      uid: this.$route.params.id,
      count: this.count
    });
    console.log("created");

    // this.introduction = this.postUser[0].introduction
  },
  watch: {
        posts: function(newVal, oldVal) {
      this.$store.dispatch("login/getUsersLikedPosts", {
        uid: this.$route.params.id,
        count: this.currentPage
      });
      console.log("変更されました。");
    },
    likedPosts: function(newVal, oldVal) {
      this.$store.dispatch("login/getUsersLikedPosts", {
        uid: this.$route.params.id,
        count: this.currentPage
      });
      console.log("変更されました。");
    },
    currentPage: function(newVal, oldVal) {
      this.$store.dispatch("login/getUsersLikedPosts", {
        uid: this.$route.params.id,
        count: this.currentPage
      });
      console.log("変更されました。");
    }
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
      image: {},
      isPush: false,
      parPage:'6',
      currentPage:'1',

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
    },

    deletePost(index) {
      console.log('index =>',index);
      this.$store.dispatch("deletePost", this.usersLikedPosts[index].id);
    },
    endPush() {
      this.isPush = false;
    },
    likePost(post) {
      this.isPush = true;
      console.log(post);
      console.log(this.user.uid);
      this.$store.dispatch("login/likePost", {
        post: post,
        uid: this.user.uid
      });
      setTimeout(this.endPush, 1000);
    },
    notLikePost(post) {
      this.isPush = true;
      console.log(post);
      console.log(this.user.uid);
      this.$store.dispatch("login/notLikePost", {
        post: post,
        uid: this.user.uid
      });
      setTimeout(this.endPush, 1000);
    },
    // pageChangeHandler(selectedPage) {
    //   this.currentPage = selectedPage;
    // }

        clickCallback: function (pageNum) {
      this.currentPage = Number(pageNum);
      window.scrollTo({
    top: 500,
    behavior: "smooth"
});
    }
  }
};
</script>

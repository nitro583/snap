<template>
  <div class="post">
    <h2>Snaps</h2>
    <div class="p-post__content">
      <div
        class="p-post__card"
        v-for="(post, index) in recentPosts"
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
        <div  v-if='user.login' class="p-post__card__button">
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
              v-if="user.login && likedPosts.every(val => val.id !== post.id)"
            >
              <fa :icon="['fas', 'heart']" /> {{ post.likePostCount }}
            </button>
            <button
              class="is-like"
              v-bind:disabled="isPush"
              v-on:click="notLikePost(post.id)"
              v-if="user.login && likedPosts.some(val => val.id === post.id)"
            >
              <fa :icon="['fas', 'heart']" /> {{ post.likePostCount }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <infinite-loading
      ref="infiniteLoading"
      spinner="spiral"
      @infinite="infiniteHandler"
    >
      <span slot="no-more">全てのPostの読み込みが完了しました。</span>
    </infinite-loading>
    <div v-if="user.login" class="">
      <button class="c-button p-post__submit-button" @click="openModal">
        写真を投稿する
      </button>
    </div>
    <transition name="modal">
      <div v-show="showModal" @click.self="closeModal" class="p-post__modal">
        <div class="p-post__modal__content">
          <div class="p-post__closeButton" @click="closeModal"></div>
          <h3 class="p-post__modal__h3">写真を投稿する</h3>
          <validation-observer v-slot="{ invalid, passes }">
            <form v-on:submit.prevent="passes(submitPost)">
              <div class="p-post__modal__image">
                <image-input
                  @loadImage="loadImage"
                  :show="imgShow"
                  v-model="image"
                />
              </div>
              <div class="p-post__modal__comment">
                <validation-provider
                  v-slot="{ errors }"
                  rules="required|max:200"
                  name="Comment"
                >
                  <p v-show="errors.length" class="p-id__profile__edit__error">
                    {{ errors[0] }}
                  </p>
                  <textarea
                    class="c-input  p-post__modal__input"
                    v-model="comment"
                    type="text"
                    placeholder="Add a comment"
                  />
                </validation-provider>
              </div>
              <div class="p-post__modal__location">
                <validation-provider
                  v-slot="{ errors }"
                  rules="required|max:30"
                  name="Location"
                >
                  <p v-show="errors.length" class="p-id__profile__edit__error">
                    {{ errors[0] }}
                  </p>
                  <input
                    class="c-input"
                    v-model="location"
                    type="text"
                    placeholder="Add a location"
                  />
                </validation-provider>
              </div>
              <div class="p-post__modal__button-area">
                <button class="c-button p-post__modal__button" type="submit">
                  Submit
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
  async fetch({ store }) {
    console.log("await");
    await store.dispatch("getPosts");
  },
  //     async fetch({ store }) {
  //   await store.dispatch("getLikedPosts",user.uid);
  // },
  data() {
    return {
      location: "",
      comment: "",
      thumbnail: "",
      show: true,
      isPush: false,
      postData: {
        thumbnail: ""
      },
      show: true,
      imgShow: false,
      showModal: false,
      scrollLock: "",
      error: "",
      image: {},
      count: 6
    };
  },
  created() {
    console.log("created");
  },
  components: {
    ImageInput
  },
  computed: {
    // todos() {
    //   return this.$store.getters["todos"];
    // },
    posts() {
      return this.$store.getters["posts"];
    },
    recentPosts() {
      return this.posts.slice(0, this.count);
    },
    getThumbnail() {
      return this.$store.getters["thumbnail"];
    },
    user() {
      return this.$store.getters["login/user"];
    },
    likedPosts() {
      return this.$store.getters["login/likedPosts"];
    }
  },

  methods: {
    openModal() {
      this.showModal = true;
      this.scrollLock = "lock";
    },
    closeModal() {
      this.showModal = false;
      this.scrollLock = "";
      this.$store.dispatch("login/getUser", this.user.uid);
    },
    loadImage() {
      this.imgShow = true;
      console.log(this.imgShow);
    },
    infiniteHandler() {
      setTimeout(() => {
        if (this.count < this.posts.length) {
          this.count += 6;
          this.$refs.infiniteLoading.stateChanger.loaded();
        } else {
          this.$refs.infiniteLoading.stateChanger.complete();
        }
      }, 1000);
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
    submitPost() {
      if (this.imgShow && this.location && this.comment) {
        this.$store.dispatch("submitPost", {
          location: this.location,
          comment: this.comment,
          img: this.image.src,
          author: this.user.name,
          uid: this.user.uid
        });
        this.thumbnail = "";
        this.location = "";
        this.comment = "";
        this.show = false;
        this.closeModal();
        this.$nextTick(function() {
          this.show = true;
          this.imgShow = false;
        });
      }
    },
    getImg() {
      this.$store.dispatch("getImg", this.thumbnail);
    },
    deletePost(index) {
      console.log(index);
      this.$store.dispatch("deletePost", this.posts[index].id);
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
    liked(post) {
      const arr = Object.entries(likedPosts);
      const result = arr.find(([id, data]) => data.id === post);
      console.log(result);
      if (result === undefined) {
        return true;
      } else {
        return false;
      }
    },
    updatePost() {
      if (this.post) {
        this.$store.dispatch("updatePost", this.post);
        this.post = "";
      }
    }
  }
};
</script>

<style></style>

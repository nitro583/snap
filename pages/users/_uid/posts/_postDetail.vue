<template>
  <div class="page">
    <h1>Post Detail</h1>
    <h2>User:{{ uid }}</h2>
    <h2>post:{{ postDetail }}</h2>
    <div><img :src="post[0].imgUrl" alt="" /></div>
    <div>
      <p>Posted at {{ post[0].location }} Photo by {{ post[0].author }}</p>
      <p>{{ post[0].todo }}</p>
      <p>Location:{{ post[0].comment }}</p>
      <!-- <button v-on:click="deleteTodo(0)" v-if="post[0].uid === user.uid">
        Delete
      </button> -->
    </div>
    <div class="inputform" v-if="user">
      <form v-on:submit.prevent="submitComment">
        <input v-model="comment" type="text" placeholder="Add a comment" />
        <button type="submit">Add a Comment</button>
      </form>
    </div>
          <div v-for="(postComment, index) in postComments" v-bind:key="postComments.id">
            <p>               {{ postComment.comment }}</p>
              <p>Commented at {{postComment.date.toDate() | moment}} Comment by {{postComment.author}}
 
              </p>
        <p>
          </p>
       </div>

      </div>
  </div>
</template>
<script>
export default {
  async fetch({ store, params }) {
    console.log(params);

 await store.dispatch("getPostComments", params.postDetail);
     console.log('getPostCommentsしました');
 await store.dispatch("getPost", params.postDetail);
     console.log('getPostしました');
  },


  data() {
    return {
      postDetail: this.$route.params.postDetail,
      uid: this.$route.params.uid,
      comment: "",
      show: true
    };
  },
  computed: {
    post() {
      return this.$store.getters["post"];
    },
    postComments() {
      return this.$store.getters["postComments"];
    },
    user() {
      return this.$store.getters["login/user"];
    }
  },
  methods: {
    // deleteTodo(index) {
    //   console.log(index);
    //   this.$store.dispatch("deleteTodo", this.todos[index].id);
    // },
    submitComment() {
      if (this.comment) {
        this.$store.dispatch("submitComment", {
          comment: this.comment,
          author: this.user.name,
          uid: this.user.uid,
          postId: this.postDetail
        });
        this.comment = "";
        this.show = false;
        this.$nextTick(function() {
          this.show = true;
        });
      }
    }
  }
};
</script>
<style></style>

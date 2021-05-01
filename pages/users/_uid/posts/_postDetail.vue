<template>
    <div class="p-post-detail__content">
    
        <h2>Post Detail</h2>
        <div class="p-post-detail__post">
    
            <div class='p-post-detail__image'>
                <img :src="post[0].imgUrl" alt="" />
            </div>
            <!-- p-post-detail__image -->
    
            <div class='p-post-detail__info'>
                <p>
                    <fa :icon="['far', 'clock']" /> {{ post[0].date.toDate() | moment }}
                    <fa :icon="['fas', 'map-marker-alt']" /> {{ post[0].location }}
                </p>
                <p>
    
                    <NuxtLink :to="{ name: 'users-id', params: { id: post[0].uid } }">
                        <fa :icon="['fas', 'user-circle']" /> {{ post[0].author }}</NuxtLink>
                </p>
            </div>
            <div class="p-post-detail__text">
                <p>{{ post[0].comment }}</p>
            </div>
    
        </div>
        <!-- p-post-detail__content -->
        <div class="p-post-detail__comment-input" v-if="user">
            <form v-on:submit.prevent="submitComment">
                <input class='c-input' v-model="comment" type="text" placeholder="コメントする" />
                <div class="p-post-detail__submit">
                    <button class='c-button' type="submit">投稿する</button>
                </div>
            </form>
        </div>
    
    
        <div class="p-post-detail__comments" v-for="(postComment, index) in postComments" v-bind:key="postComments.id">
            <p>{{ postComment.comment }}</p>
            <p>
            <fa :icon="['far', 'clock']" /> {{postComment.date.toDate() | moment}}
            <NuxtLink :to="{ name: 'users-id', params: { id: postComment.uid } }">
                <fa :icon="['fas', 'user-circle']" /> {{ postComment.author}}</NuxtLink>
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
        console.log("getPostCommentsしました");
        await store.dispatch("getPost", params.postDetail);
        console.log("getPostしました");
    },

    data() {
        return {
            postDetail: this.$route.params.postDetail,
            uid: this.$route.params.uid,
            comment: "",
            show: true,
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
        },
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
                    postId: this.postDetail,
                });
                this.comment = "";
                this.show = false;
                this.$nextTick(function() {
                    this.show = true;
                });
            }
        },
    },
};
</script>

<style>

</style>

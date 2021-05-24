(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{293:function(t,e,o){var content=o(296);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(72).default)("8a4438c0",content,!0,{sourceMap:!1})},294:function(t,e,o){"use strict";o.r(e);o(115);var n={show:"ImageInput",props:{show:{type:Boolean,default:!1}},watch:{show:function(t){this.imgShow=t}},computed:{image:{set:function(t){this.$emit("input",t)},get:function(){return this.value}}},data:function(){return{isDragOver:!1,thumbnail:"",error:"",imgShow:this.show}},methods:{onDrag:function(t){this.isDragOver="over"===t},onDrop:function(t){this.isDragOver=!1;var e=t.dataTransfer.files;1===e.length&&0===e[0].type.indexOf("image")&&this.readImage(e[0])},onChange:function(t){var e=t.target.files;1===e.length&&0===e[0].type.indexOf("image")&&this.readImage(e[0])},readImage:function(t){if(console.log(t.size),t.size/1e6>5&&(console.log(t.size),this.error="ファイルサイズが大きすぎます（"+Math.round(t.size/1e6)+"MB /5MB）",alert(this.error),this.error="",t=null),t){var e=new FileReader;e.onload=this.loadImage,e.readAsDataURL(t)}},loadImage:function(t){var image=new Image;image.src=t.target.result,this.image=image,this.thumbnail=image.src,this.imgShow=!0,this.$emit("loadImage")}}},r=(o(295),o(47)),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"image-input"},[o("div",{staticClass:"image-input__field",class:{over:t.isDragOver},on:{dragover:function(e){return e.preventDefault(),t.onDrag("over")},dragleave:function(e){return t.onDrag("leave")},drop:function(e){return e.stopPropagation(),t.onDrop(e)}}},[this.imgShow?o("img",{attrs:{src:this.thumbnail}}):t._e(),t._v(" "),this.imgShow?t._e():o("p",{staticClass:"image-input__icon"},[o("fa",{attrs:{icon:["fas","camera"]}})],1),t._v(" "),o("input",{attrs:{type:"file",title:""},on:{change:t.onChange}})])])}),[],!1,null,null,null);e.default=component.exports},295:function(t,e,o){"use strict";o(293)},296:function(t,e,o){(e=o(71)(!1)).push([t.i,".image-input{width:100%;height:100%}.image-input__field{width:100%;height:100%;position:relative;display:flex;justify-content:center;align-items:center}.image-input__field.over{background-color:#666}.image-input__field>input{position:absolute;width:100%;height:100%;top:0;left:0;opacity:0;cursor:pointer}.image-input__field>p{color:#aaa;text-align:center}.image-input__icon{font-size:24px}",""]),t.exports=e},298:function(t,e,o){"use strict";o.r(e);o(91),o(36),o(60);var n=o(20),r=o(294),l=o(86);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var h={head:function(){return{bodyAttrs:{class:this.scrollLock}}},data:function(){var t;return t={location:"",comment:"",thumbnail:"",show:!0,isPush:!1,postData:{thumbnail:""}},Object(n.a)(t,"show",!0),Object(n.a)(t,"imgShow",!1),Object(n.a)(t,"showModal",!1),Object(n.a)(t,"scrollLock",""),Object(n.a)(t,"error",""),Object(n.a)(t,"image",{}),Object(n.a)(t,"count",6),t},created:function(){this.$store.dispatch("getPosts"),console.log("created")},mounted:function(){},components:{ImageInput:r.default},watch:{},computed:d(d({},Object(l.b)(["posts"])),{},{posts:function(){return this.$store.getters.posts},recentPosts:function(){return this.posts.slice(0,this.count)},getThumbnail:function(){return this.$store.getters.thumbnail},user:function(){return this.$store.getters["login/user"]},likedPosts:function(){return this.$store.getters["login/likedPosts"]}}),methods:{openModal:function(){this.showModal=!0,this.scrollLock="lock"},closeModal:function(){this.showModal=!1,this.scrollLock="",this.$store.dispatch("login/getUser",this.user.uid)},loadImage:function(){this.imgShow=!0,console.log(this.imgShow)},infiniteHandler:function(){var t=this;setTimeout((function(){t.count<t.posts.length?(t.count+=6,t.$refs.infiniteLoading.stateChanger.loaded()):t.$refs.infiniteLoading.stateChanger.complete()}),1e3)},changeImg:function(t){var e=this;if(this.thumbnail=t.target.files[0],console.log(this.thumbnail),this.thumbnail){var o=new FileReader;o.onload=function(){e.postData.thumbnail=o.result+""},o.readAsDataURL(this.thumbnail),console.log("選択完了")}},submitPost:function(){this.imgShow&&this.location&&this.comment&&(this.$store.dispatch("submitPost",{location:this.location,comment:this.comment,img:this.image.src,author:this.user.name,uid:this.user.uid}),this.thumbnail="",this.location="",this.comment="",this.show=!1,this.closeModal(),this.$nextTick((function(){this.show=!0,this.imgShow=!1})))},deletePost:function(t){console.log(t),this.$store.dispatch("deletePost",this.posts[t].id)},endPush:function(){this.isPush=!1},likePost:function(t){this.isPush=!0,console.log(t),console.log(this.user.uid),this.$store.dispatch("login/likePost",{post:t,uid:this.user.uid}),setTimeout(this.endPush,1e3)},notLikePost:function(t){this.isPush=!0,console.log(t),console.log(this.user.uid),this.$store.dispatch("login/notLikePost",{post:t,uid:this.user.uid}),setTimeout(this.endPush,1e3)}}},m=o(47),component=Object(m.a)(h,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"post"},[o("h2",[t._v("Snaps")]),t._v(" "),o("div",{staticClass:"p-post__content"},t._l(t.recentPosts,(function(e,n){return o("div",{key:e.id,staticClass:"p-post__card"},[o("div",{staticClass:"p-post__card__image"},[o("img",{attrs:{src:e.imgUrl,alt:""}})]),t._v(" "),o("div",{staticClass:"p-post__card__text"},[o("div",{staticClass:"p-post__card__date"},[o("p",[o("fa",{attrs:{icon:["far","clock"]}}),t._v(" "+t._s(t._f("moment")(e.date.toDate()))+"\n          ")],1)]),t._v(" "),o("div",{staticClass:"p-post__card__author"},[o("p",[o("NuxtLink",{attrs:{to:{name:"users-id",params:{id:e.uid}}}},[o("fa",{attrs:{icon:["fas","user-circle"]}}),t._v("\n              "+t._s(e.author))],1)],1)]),t._v(" "),o("div",{staticClass:"p-post__card__note"},[o("p",[t._v(t._s(e.comment))])]),t._v(" "),o("div",{staticClass:"p-post__card__location"},[o("p",[o("fa",{attrs:{icon:["fas","map-marker-alt"]}}),t._v(" "+t._s(e.location))],1)])]),t._v(" "),t.user.login?o("div",{staticClass:"p-post__card__button"},[o("div",{staticClass:"p-post__card__delete"},[e.uid===t.user.uid?o("button",{on:{click:function(e){return t.deletePost(n)}}},[o("fa",{attrs:{icon:["fas","trash-alt"]}})],1):t._e()]),t._v(" "),o("div",{staticClass:"p-post__card__comment"},[o("Nuxt-link",{attrs:{to:{name:"users-uid-posts-postDetail",params:{uid:e.uid,postDetail:e.id}}}},[o("fa",{attrs:{icon:["far","comment"]}})],1)],1),t._v(" "),o("div",{staticClass:"p-post__card__like"},[t.user.login&&t.likedPosts.every((function(t){return t.postId!==e.id}))?o("button",{attrs:{disabled:t.isPush},on:{click:function(o){return t.likePost(e.id)}}},[o("fa",{attrs:{icon:["fas","heart"]}}),t._v(" "+t._s(e.likePostCount)+"\n          ")],1):t._e(),t._v(" "),t.user.login&&t.likedPosts.some((function(t){return t.postId===e.id}))?o("button",{staticClass:"is-like",attrs:{disabled:t.isPush},on:{click:function(o){return t.notLikePost(e.id)}}},[o("fa",{attrs:{icon:["fas","heart"]}}),t._v(" "+t._s(e.likePostCount)+"\n          ")],1):t._e()])]):t._e()])})),0),t._v(" "),t.user.login?o("div",{},[o("button",{staticClass:"c-button p-post__submit-button",on:{click:t.openModal}},[t._v("\n      写真を投稿する\n    ")])]):t._e(),t._v(" "),o("transition",{attrs:{name:"modal"}},[o("div",{directives:[{name:"show",rawName:"v-show",value:t.showModal,expression:"showModal"}],staticClass:"p-post__modal",on:{click:function(e){return e.target!==e.currentTarget?null:t.closeModal(e)}}},[o("div",{staticClass:"p-post__modal__content"},[o("div",{staticClass:"p-post__closeButton",on:{click:t.closeModal}}),t._v(" "),o("h3",{staticClass:"p-post__modal__h3"},[t._v("写真を投稿する")]),t._v(" "),o("validation-observer",{scopedSlots:t._u([{key:"default",fn:function(e){e.invalid;var n=e.passes;return[o("form",{on:{submit:function(e){return e.preventDefault(),n(t.submitPost)}}},[o("div",{staticClass:"p-post__modal__image"},[o("image-input",{attrs:{show:t.imgShow},on:{loadImage:t.loadImage},model:{value:t.image,callback:function(e){t.image=e},expression:"image"}})],1),t._v(" "),o("div",{staticClass:"p-post__modal__comment"},[o("validation-provider",{attrs:{rules:"required|max:200",name:"Comment"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.errors;return[o("p",{directives:[{name:"show",rawName:"v-show",value:n.length,expression:"errors.length"}],staticClass:"p-post__modal__error"},[t._v("\n                  "+t._s(n[0])+"\n                ")]),t._v(" "),o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.comment,expression:"comment"}],staticClass:"c-input  p-post__modal__input",attrs:{type:"text",placeholder:"Add a comment"},domProps:{value:t.comment},on:{input:function(e){e.target.composing||(t.comment=e.target.value)}}})]}}],null,!0)})],1),t._v(" "),o("div",{staticClass:"p-post__modal__location"},[o("validation-provider",{attrs:{rules:"required|max:30",name:"Location"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.errors;return[o("p",{directives:[{name:"show",rawName:"v-show",value:n.length,expression:"errors.length"}],staticClass:"p-post__modal__error"},[t._v("\n                  "+t._s(n[0])+"\n                ")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.location,expression:"location"}],staticClass:"c-input",attrs:{type:"text",placeholder:"Add a location"},domProps:{value:t.location},on:{input:function(e){e.target.composing||(t.location=e.target.value)}}})]}}],null,!0)})],1),t._v(" "),o("div",{staticClass:"p-post__modal__button-area"},[o("button",{staticClass:"c-button p-post__modal__button",attrs:{type:"submit"}},[t._v("\n                Submit\n              ")])])])]}}])})],1)])]),t._v(" "),o("no-ssr",[o("infinite-loading",{ref:"infiniteLoading",attrs:{spinner:"spiral"},on:{infinite:t.infiniteHandler}},[o("span",{attrs:{slot:"no-more"},slot:"no-more"},[t._v("全てのPostの読み込みが完了しました。")])])],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ImageInput:o(294).default})}}]);
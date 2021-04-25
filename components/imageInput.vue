<template>
  <div class="image-input">
    <div
      class="image-input__field"
      :class="{ over: isDragOver }"
      @dragover.prevent="onDrag('over')"
      @dragleave="onDrag('leave')"
      @drop.stop="onDrop"
    >
      <img v-if='this.imgShow'  :src="this.thumbnail" />
      <p v-if='!this.imgShow' class="image-input__icon"><fa :icon="['fas', 'camera']" /></p>
      <input type="file" title @change="onChange" />
    </div>
  </div>
</template>

<script>
export default {
  show:'ImageInput',
 props: {
   show:{
     type:Boolean,
     default: false,
   }
 },
 watch: {
      show(show) {
        this.imgShow = show;
      }
    },
  computed: {
    image: {
      set(value) {
        this.$emit("input", value);
      },
      get() {
        return this.value;
      }
    }
  },
  data() {
    return {
      isDragOver: false,
      thumbnail: "",
      error: "",
      imgShow:this.show,
    };
  },
  methods: {
    onDrag(type) {
      this.isDragOver = type === "over";
    },
    onDrop(event) {
      this.isDragOver = false;
      let files = event.dataTransfer.files;

      if (files.length !== 1 || files[0].type.indexOf("image") !== 0) {
        return;
      }
      this.readImage(files[0]);
    },
    onChange(event) {
      const files = event.target.files;
      if (files.length !== 1 || files[0].type.indexOf("image") !== 0) {
        return;
      }
      this.readImage(files[0]);
    },
    readImage(file) {
      console.log(file.size);

      if (file.size / 1000000 > 5) {
        console.log(file.size);
        this.error =
          "ファイルサイズが大きすぎます（" +
          Math.round(file.size / 1000000) +
          "MB /5MB）";
        alert(this.error);
        this.error = "";
        file = null;
      }

      if (file) {
        let reader = new FileReader();
        reader.onload = this.loadImage;
        reader.readAsDataURL(file);
      }
    },
    loadImage(e) {
      let image = new Image();
      image.src = e.target.result;

      this.image = image;
      this.thumbnail = image.src;
      this.imgShow= true;
    }
  }
};
</script>
<style>
.image-input {
  background-image: ;
  width: 100%;
  height: 100%;
}
.image-input__field {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-input__field.over {
  background-color: #666;
}
.image-input__field > input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}
.image-input__field > p {
  color: #aaa;
  text-align: center;
}
.image-input__icon{
  font-size: 24px;
}
</style>

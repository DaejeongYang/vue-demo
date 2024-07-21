<template>
  <div id="app">
    <h1>이미지 업로드 및 미리보기</h1>
    <input type="file" @change="onFileChange" accept="image/*" />
    <div v-if="imageUrl">
      <h2>미리보기:</h2>
      <img :src="imageUrl" alt="미리보기 이미지" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: null,
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        this.imageUrl = URL.createObjectURL(file);
      } else {
        alert('이미지 파일을 선택해주세요.');
      }
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

input[type="file"] {
  margin: 20px 0;
}

img {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 4px;
}
</style>

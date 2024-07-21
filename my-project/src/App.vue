<template>
  <div id="app">
    <h1>이미지 업로드 및 점 세기</h1>
    <input type="file" @change="onFileChange" accept="image/*" />
    <div v-if="imageUrl">
      <h2>미리보기:</h2>
      <img :src="imageUrl" alt="미리보기 이미지" />
      <button @click="countDots">점 세기</button>
    </div>
    <div v-if="dotCount !== null">
      <h2>점 개수: {{ dotCount }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: null,
      imageFile: null,
      dotCount: null,
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        this.imageUrl = URL.createObjectURL(file);
        this.imageFile = file;
      } else {
        alert('이미지 파일을 선택해주세요.');
      }
    },
    async countDots() {
      if (!this.imageFile) return;
      const formData = new FormData();
      formData.append('image', this.imageFile);
      try {
        const response = await fetch('http://localhost:5000/count-dots', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        if (response.ok) {
          this.dotCount = result.dot_count;
        } else {
          alert(result.error);
        }
      } catch (error) {
        alert('Error: ' + error.message);
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

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>

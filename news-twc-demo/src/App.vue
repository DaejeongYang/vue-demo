<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Latest News</h1>
    <nav class="mb-8">
      <ul class="flex space-x-4">
        <li v-for="category in categories" :key="category.name">
          <router-link :to="{ name: 'category', params: { category: category.name } }"
            class="text-blue-500 hover:text-blue-700">
            {{ category.text }}
          </router-link>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const categories = ref([
  { name: "general", text: "일반" },
  { name: "world", text: "국제" },
  { name: "nation", text: "미국" },
  { name: "business", text: "비즈니스" },
  { name: "technology", text: "기술" },
  { name: "entertainment", text: "연예" },
  { name: "sports", text: "스포츠" },
  { name: "science", text: "과학" },
  { name: "health", text: "건강" },
]);
</script>
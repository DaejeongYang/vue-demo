<template>
  <div>
    <button @click="fetchNews" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-8">
      새 기사 불러오기
      <svg v-if="loading" class="inline-block animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>
    </button>
    <p v-if="news.length === 0" class="text-gray-600">
      조회된 뉴스가 없습니다.
    </p>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="(article, index) in news" :key="index" class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="relative h-48 w-full">
          <img v-if="article.image" :src="article.image" :alt="article.title" @error="handleImageError"
            class="absolute inset-0 w-full h-full object-cover" />
          <div v-else class="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <span class="text-gray-400">이미지 없음</span>
          </div>
        </div>
        <div class="p-6">
          <h2 class="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{{ article.title }}</h2>
          <p class="text-gray-600 text-sm line-clamp-3">{{ article.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const news = ref([]);
const loading = ref(false);

const fetchNews = async () => {
  loading.value = true;
  const category = route.params.category || 'general';
  const query = `&category=${category}`;

  try {
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?apikey=${import.meta.env.VITE_GNEWS_API_KEYS}${query}`
    );
    const data = await response.json();
    news.value = data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  loading.value = false;
};

const handleImageError = (event) => {
  event.target.style.display = 'none';
  event.target.nextElementSibling.style.display = 'flex';
};

onMounted(() => {
  fetchNews();
});

watch(() => route.params.category, () => {
  fetchNews();
});
</script>
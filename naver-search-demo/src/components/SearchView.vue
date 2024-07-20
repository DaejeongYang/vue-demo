<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 검색 관련 상태 변수들 정의
const searchType = ref(route.params.searchType)
const query = ref('')
const display = ref(10)
const start = ref(1)
const results = ref([])
const total = ref(0)

// 한 페이지에 표시할 결과 수 옵션
const displayOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

// 현재 검색 유형에 따른 페이지 제목 계산
const pageTitle = computed(() => {
  return route.meta.title?.[searchType.value] || '검색'
})

// 검색 상태 초기화 함수
const resetSearch = () => {
  query.value = ''
  start.value = 1
  results.value = []
  total.value = 0
}

// 검색 유형 변경 감지 및 상태 초기화
watchEffect(() => {
  const newSearchType = route.params.searchType
  if (newSearchType !== searchType.value) {
    searchType.value = newSearchType
    resetSearch()
  }
})

// 검색 수행 함수
const search = async () => {
  const url = new URL(`http://localhost:8080/api/search/${searchType.value}`)
  url.searchParams.append('query', query.value)
  url.searchParams.append('start', start.value)
  url.searchParams.append('display', display.value)

  try {
    const response = await fetch(url)
    const data = await response.json()
    results.value = data.items
    total.value = data.total
  } catch (error) {
    console.error('Error fetching search results:', error)
  }
}

// 다음 페이지로 이동
const nextPage = () => {
  start.value += display.value
  search()
}

// 이전 페이지로 이동
const prevPage = () => {
  start.value = Math.max(1, start.value - display.value)
  search()
}

// 다음 페이지 존재 여부 확인
const canGoNext = () => {
  return start.value + display.value <= total.value
}

// 이전 페이지 존재 여부 확인
const canGoPrev = () => {
  return start.value > 1
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">{{ pageTitle }}</h1>
    <div class="mb-4">
      <input v-model="query" @keyup.enter="search" class="border p-2 mr-2" placeholder="검색어를 입력하세요">
      <select v-model="display" class="border p-2 mr-2">
        <option v-for="option in displayOptions" :key="option" :value="option">
          {{ option }} results
        </option>
      </select>
      <button @click="search" class="bg-blue-500 text-white p-2 rounded">검색</button>
    </div>
    <div v-if="results.length > 0">
      <ul class="space-y-4">
        <li v-for="item in results" :key="item.link" class="border p-4 rounded">
          <h2 class="text-xl font-semibold" v-html="item.title"></h2>
          <p v-html="item.description"></p>
          <a :href="item.link" target="_blank" class="text-blue-500 hover:underline">더 보기</a>
        </li>
      </ul>
      <div class="mt-4 flex justify-between">
        <button @click="prevPage" :disabled="!canGoPrev()" class="bg-gray-300 p-2 rounded"
          :class="{ 'opacity-50 cursor-not-allowed': !canGoPrev() }">Previous</button>
        <button @click="nextPage" :disabled="!canGoNext()" class="bg-gray-300 p-2 rounded"
          :class="{ 'opacity-50 cursor-not-allowed': !canGoNext() }">Next</button>
      </div>
    </div>
    <p v-else-if="query" class="text-center mt-4">No results found.</p>
  </div>
</template>
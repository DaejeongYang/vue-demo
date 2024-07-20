<template>
  <nav class="bg-gray-800 p-4">
    <ul class="flex space-x-4">
      <li><router-link to="/search/blog" class="text-white hover:text-gray-300">블로그 검색</router-link></li>
      <li><router-link to="/search/book" class="text-white hover:text-gray-300">책 검색</router-link></li>
      <li><router-link to="/search/webkr" class="text-white hover:text-gray-300">웹 검색</router-link></li>
    </ul>
  </nav>
  <router-view></router-view>
</template>
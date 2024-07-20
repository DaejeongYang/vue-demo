import { createRouter, createWebHistory } from 'vue-router'
import SearchComponent from '../components/SearchView.vue'

const routes = [
  {
    path: '/search/:searchType',
    name: 'search',
    component: SearchComponent,
    meta: {
      title: {
        blog: '블로그 검색',
        book: '책 검색',
        webkr: '웹 검색',
      }
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
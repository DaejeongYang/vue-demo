import { createRouter, createWebHistory } from 'vue-router'
import NewsView from '../components/NewsView.vue'

const routes = [
  { path: '/', redirect: '/category/general' },
  { path: '/category/:category', name: 'category', component: NewsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/home/HomeView.vue'
import CheckoutView from '@/pages/checkout/CheckoutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/checkout', component: CheckoutView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})

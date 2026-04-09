import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Calculator from '../views/Calculator.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: Calculator
  }
]

const router = createRouter({
  history: createWebHistory('/FIRE/'),
  routes
})

export default router

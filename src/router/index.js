import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import TodoView from '../views/TodoView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/Todo/:id',
    name: 'todo',
    component: TodoView
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

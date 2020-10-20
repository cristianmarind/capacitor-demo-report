import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import CreateReport from '@/views/CreateReport.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/createReport',
    name: 'CreateReport',
    component: CreateReport
  },
]

const router = new VueRouter({
  routes
})

export default router
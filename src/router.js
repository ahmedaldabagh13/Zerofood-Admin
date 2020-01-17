import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Dashboard from '@/views/Dashboard'
import Categories from '@/views/Categories'
import Products from '@/views/Products'
import Orders from '@/views/Orders'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresVisitor: true }
    },
    {
      path: '/',
      name: 'dashboard',
      redirect: '/products',
      meta: { requiresAuth: true }
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories,
      meta: { requiresAuth: true }
    },
    {
      path: '/products',
      name: 'products',
      component: Products,
      meta: { requiresAuth: true }
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      meta: { requiresAuth: true }
    }
  ]
})

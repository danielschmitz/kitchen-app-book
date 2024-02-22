import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoriesView from '../views/categories/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView,
      children: [
        {
          path: '',
          name: 'ListCategories',
          component: () => import('../views/categories/ListView.vue')
        },
        {
          path: 'create',
          name: 'CreateCategory',
          component: () => import('../views/categories/CreateView.vue')
        },
        {
          path: 'edit/:id',
          name: 'EditCategory',
          component: () => import('../views/categories/EditView.vue')
        }
      ]
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/products/IndexView.vue'),
      children: [
        {
          path: '',
          name: 'ListProduct',
          component: () => import('../views/products/ListView.vue')
        },
        {
          path: 'create',
          name: 'CreateProduct',
          component: () => import('../views/products/CreateView.vue')
        },
        {
          path: 'edit/:id',
          name: 'EditProduct',
          component: () => import('../views/products/EditView.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }    
  ]
})

export default router

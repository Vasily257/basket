import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { PagePath } from '@/types/page'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: PagePath.Home,
      name: 'home',
      component: HomeView
    },
    {
      path: PagePath.Basket,
      name: 'basket',
      component: () => import('../views/BasketView.vue')
    },
    {
      path: PagePath.Catalog,
      name: 'catalog',
      component: () => import('../views/CatalogView.vue')
    },
    {
      path: PagePath.About,
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: PagePath.Contacts,
      name: 'contacts',
      component: () => import('../views/ContactsView.vue')
    }
  ]
})

export default router

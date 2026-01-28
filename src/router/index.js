import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/BooksView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: () => import('../views/CarritoView.vue'),
    }, 
    {
      path: '/new-book',
      name: 'new-book',
      component: () => import('../views/FormBookView.vue'),
    },
    {
      path: '/edit-book/:id',
      name: 'edit-book',
      component: () => import('../views/FormBookView.vue'),
    }
  ],
})

export default router

import { useUtilStore } from '@/stores/utils';
import { createRouter, createWebHistory } from 'vue-router';
import LoginVue from '../views/Login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL + 'test'),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginVue,
    },
    {
      meta: {
        requiresAuth: true,
      },
      path: '/home',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      meta: {
        requiresAuth: true,
      },
      path: '/vlans',
      name: 'Vlans',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/VlansView.vue'),
    },
  ],
});

router.beforeEach((to, _from) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!useUtilStore().isLoggedIn) {
      return { name: 'Login' }; // go to wherever I'm going
    }
  }
});

export default router;

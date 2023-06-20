import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import FavPage from '../views/FavPage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/fav/:id',
    name: 'FavPage',
    component: FavPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;



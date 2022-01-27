import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// import { defineAsyncComponent } from '@vue/runtime-core';
// https://v3.cn.vuejs.org/api/global-api.html#defineasynccomponent

const Home = () => import('./pages/Home/Home.vue');
const Main = () => import('./pages/Main/Main.vue');
const Instruction = () => import('./pages/Instruction/Instruction.vue')
const NotFound = () => import('./pages/NotFound/NotFound.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
  },
  {
    path: '/instruction',
    name: 'instruction',
    component: Instruction,
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
  },
  {
    path: '/:foo',
    redirect: '/404'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HelloWorld from '@/pages/HelloWorld.vue';
import Signup from '@/pages/Signup.vue';
import Login from '@/pages/Login.vue';
import Invite from '@/pages/Invite.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  { path: '/dashboard', component: { template: '<div>Dashboard</div>' } },
  {
    path: '/transaction/add',
    component: { template: '<div>Add Transaction</div>' },
  },
  { path: '/transactions', component: { template: '<div>Transactions</div>' } },
  { path: '/analysis', component: { template: '<div>Analysis</div>' } },
  {
    path: '/notifications',
    component: { template: '<div>Notifications</div>' },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/invite',
    name: 'Invite',
    component: Invite,
  },
  { path: '/settings', component: { template: '<div>Settings</div>' } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export { routes, router };

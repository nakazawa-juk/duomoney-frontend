import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HelloWorld from "@/pages/HelloWorld.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "HelloWorld",
    component: HelloWorld,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

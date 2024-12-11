import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

routes.push({
  path: "/admin",
  redirect: "/admin/profile",
});
routes.push({
  path: "/community",
  redirect: "/community/comprehensive",
});

export default router;

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import localCache from "@/utils/cache";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login", // 登录页面
    name: "login",
    component: () => import("@/views/login/Login.vue")
  },
  {
    path: "/main", // 首页布局
    name: "main",
    component: () => import("@/views/main/Main.vue"),
    children: [
      // {
      //   path: 'system/user', // 用户管理 页面（使用动态注册）
      //   name: 'user',
      //   component: () => import('@/views/main/system/user/user.vue')
      // }
    ]
  },

  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/not-found/NotFound.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
// 导航守卫
router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = localCache.getCache("token");
    if (!token) {
      return "/login";
    }
  }
  if (to.path === "/main") {
    // todo 暂时写成跳出到用户列表页
    return "/main/system/user";
  }
});
export default router;

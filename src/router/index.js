/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description router全局配置，如有必要可分文件抽离
 */

import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layouts";
import EmptyLayout from "@/layouts/EmptyLayout";
import { publicPath, routerMode } from "@/config/settings";

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/register",
    component: () => import("@/views/register/index"),
    hidden: true,
  },
  {
    path: "/401",
    name: "401",
    component: () => import("@/views/401"),
    hidden: true,
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404"),
    hidden: true,
  },
];

/*当settings.js里authentication配置的是intelligence时，views引入交给前端配置*/
export const asyncRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("@/views/index/index"),
        meta: {
          title: "首页",
          icon: "home",
          affix: true,
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: "/userManagement",
    component: Layout,
    redirect: "/userManagement",
    children: [
      {
        path: "/userManagement",
        name: "UserManagement",
        component: () =>
          import("@/views/project/personnelManagement/userManagement/index"),
        meta: {
          title: "用户管理",
          icon: "user-cog",
        },
      },
    ],
  },
  {
    path: "/category",
    component: Layout,
    redirect: "/category",
    children: [
      {
        path: "/category",
        name: "Category",
        component: () => import("@/views/project/category/index"),
        meta: {
          title: "分类管理",
          icon: "puzzle-piece",
        },
      },
    ],
  },
  {
    path: "/freight",
    component: Layout,
    redirect: "/freight",
    children: [
      {
        path: "/freight",
        name: "Freight",
        component: () => import("@/views/project/freight/index"),
        meta: {
          title: "运费管理",
          icon: "donate",
        },
      },
    ],
  },

  {
    path: "/article",
    component: Layout,
    redirect: "noRedirect",
    name: "Article",
    meta: {
      title: "文章管理",
      icon: "users-cog",
      permissions: ["admin"],
    },
    children: [
      {
        path: "/curd",
        name: "Curd",
        component: () => import("@/views/project/article/curd"),
        meta: {
          title: "文章列表",
          icon: "list-ul",
          noKeepAlive: true,
        },
      },
      {
        path: "/editor",
        name: "Editor",
        component: () => import("@/views/project/article/editor"),
        meta: {
          title: "编辑文章",
          icon: "edit",
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: "/personnelManagement",
    component: Layout,
    redirect: "noRedirect",
    name: "PersonnelManagement",
    meta: { title: "权限管理", icon: "users-cog", permissions: ["admin"] },
    children: [
      {
        path: "roleManagement",
        name: "RoleManagement",
        component: () =>
          import("@/views/project/personnelManagement/roleManagement/index"),
        meta: { title: "角色管理" },
      },
      {
        path: "menuManagement",
        name: "MenuManagement",
        component: () =>
          import("@/views/project/personnelManagement/menuManagement/index"),
        meta: { title: "菜单管理" },
      },
    ],
  },
  {
    path: "/personalCenter",
    component: Layout,
    hidden: true,
    redirect: "personalCenter",
    children: [
      {
        path: "personalCenter",
        name: "PersonalCenter",
        component: () => import("@/views/personalCenter/index"),
        meta: {
          title: "个人中心",
        },
      },
    ],
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const router = new VueRouter({
  base: routerMode === "history" ? publicPath : "",
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
});
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
/* const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
}; */

export function resetRouter() {
  router.matcher = new VueRouter({
    base: routerMode === "history" ? publicPath : "",
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher;
}

export default router;

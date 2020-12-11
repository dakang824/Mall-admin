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
        component: () => import("@/views/project/userManagement"),
        meta: {
          title: "用户管理",
          icon: "user-cog",
        },
      },
    ],
  },
  {
    path: "/company",
    component: Layout,
    redirect: "/company",
    children: [
      {
        path: "/company",
        name: "Company",
        component: () => import("@/views/project/company"),
        meta: {
          title: "单位管理",
          icon: "school",
        },
      },
    ],
  },
  {
    path: "/professions",
    component: Layout,
    redirect: "professions",
    children: [
      {
        path: "/professions",
        name: "Professions",
        component: () => import("@/views/project/professions"),
        meta: {
          title: "专业管理",
          icon: "sitemap",
        },
      },
    ],
  },
  {
    path: "/module",
    component: Layout,
    redirect: "/module",
    children: [
      {
        path: "/module",
        name: "Module",
        component: () => import("@/views/project/module"),
        meta: {
          title: "模块管理",
          icon: "boxes",
        },
      },
    ],
  },
  {
    path: "/group",
    component: Layout,
    redirect: "/group",
    children: [
      {
        path: "/group",
        name: "Group",
        component: () => import("@/views/project/group"),
        meta: {
          title: "专业组管理",
          icon: "layer-group",
        },
      },
    ],
  },
  {
    path: "/questions",
    component: Layout,
    redirect: "/questions",
    children: [
      {
        path: "/questions",
        name: "Questions",
        component: () => import("@/views/project/questions"),
        meta: {
          title: "题库管理",
          icon: "question-circle",
        },
      },
    ],
  },
  {
    path: "/mockTest",
    component: Layout,
    redirect: "/mockTest",
    children: [
      {
        path: "/mockTest",
        name: "MockTest",
        component: () => import("@/views/project/mockTest"),
        meta: {
          title: "模拟考配置",
          icon: "pen-nib",
        },
      },
    ],
  },
  {
    path: "/userScore",
    component: Layout,
    redirect: "/userScore",
    children: [
      {
        path: "/userScore",
        name: "UserScore",
        component: () => import("@/views/project/userScore"),
        meta: {
          title: "成绩管理",
          icon: "marker",
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
    },
    children: [
      {
        path: "list",
        name: "List",
        component: () => import("@/views/project/article/list.vue"),
        meta: {
          title: "文章管理",
          icon: "list-ul",
        },
      },
      {
        path: "editor",
        hidden: true,
        component: () => import("@/views/project/article/editor.vue"),
        meta: {
          title: "编辑文章",
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: "/finance",
    component: Layout,
    redirect: "noRedirect",
    name: "Order",
    meta: {
      title: "系统设置",
      icon: "cogs",
    },
    children: [
      {
        path: "/navigation",
        name: "Navigation",
        component: () => import("@/views/project/navigation"),
        meta: {
          title: "导航管理",
          icon: "location-arrow",
        },
      },
      {
        path: "/opinion",
        name: "Opinion",
        component: () => import("@/views/project/opinion"),
        meta: {
          title: "意见反馈",
          icon: "envelope",
        },
      },
      {
        path: "/setting",
        name: "Setting",
        component: () => import("@/views/project/account"),
        meta: {
          title: "后台账号管理",
          icon: "cog",
        },
      },
    ],
  },

  {
    path: "/order",
    component: Layout,
    redirect: "noRedirect",
    name: "Order",
    hidden: true,
    meta: {
      title: "订单管理",
      icon: "shopping-cart",
    },
    children: [
      {
        path: "/recharge",
        name: "Recharge",
        hidden: true,
        component: () => import("@/views/project/order/recharge"),
        meta: {
          title: "充值订单",
          icon: "funnel-dollar",
          noKeepAlive: true,
        },
      },
      {
        path: "/orderGoods",
        name: "OrderGoods",
        component: () => import("@/views/project/order/goods"),
        meta: {
          title: "订单管理",
          icon: "shopping-bag",
          noKeepAlive: true,
        },
      },
      {
        path: "/remittance",
        name: "Remittance",
        hidden: true,
        component: () => import("@/views/project/order/remittance"),
        meta: {
          title: "汇款订单",
          icon: "file-invoice-dollar",
          noKeepAlive: true,
        },
      },
      {
        path: "/businessGoods",
        name: "BusinessGoods",
        hidden: true,
        component: () => import("@/views/project/order/business-goods"),
        meta: {
          title: "商家订单查询",
          icon: "shopping-bag",
          noKeepAlive: true,
        },
      },
    ],
  },

  {
    path: "/personnelManagement",
    component: Layout,
    hidden: true,
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

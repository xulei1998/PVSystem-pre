/*
 * @Author: zyl
 * @Date: 2022-12-08 14:32:37
 * @LastEditors: zyl zyl14730@cnki.net
 * @LastEditTime: 2022-12-12 15:54:01
 * @Description:
 */
import Vue from "vue";
import VueRouter from "vue-router";

// 注册 vue-router（需在 VueRouter 实例创建之前调用）
Vue.use(VueRouter);

import Layout from "@/layout";

// 设置路由规则
export const routes = [
  {
    path: "/",
    name: "home",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/index"),
        name: "index",
      },
      {
        path: "meteorological",
        component: () => import("@/views/meteorological.vue"),
        name: "Meteorological",
      },
      {
        path: "power",
        component: () => import("@/views/power.vue"),
        name: "power",
      },
      {
        path: "errorStatistics",
        component: () => import("@/views/errorStatistics.vue"),
        name: "errorStatistics",
      },
    ],
  },
  {
    path: "/power",
    name: "power",
    component: () => import("../views/power.vue"),
  },
  {
    path: "/index",
    name: "index",
    component: () => import("../views/index/index.vue"),
  },
];

const router = new VueRouter({ routes }); // 创建 VueRouter 实例

// 导出路由
export default router;

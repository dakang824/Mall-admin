/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2020-10-11 14:21:05
 * @LastEditTime: 2021-02-21 09:34:22
 */
import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";
import "./plugins";
/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description 生产环境与演示环境默认都使用mock，如果正式用于生产环境时，记得去掉
 */

// if (
//   process.env.NODE_ENV === "preview" ||
//   process.env.NODE_ENV === "production"
// ) {
//   const { mockXHR } = require("@/config/static");
//   mockXHR();
// }

Vue.config.productionTip = false;

new Vue({
  el: "#vue-admin-beautiful",
  router,
  store,
  render: (h) => h(App),
});

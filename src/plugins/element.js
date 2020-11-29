/*
 * @Author: yukang 1172248038@qq.com
 * @Description:添加f-render | 基于 ElementUI 的表单设计器
 * @Date: 2020-08-07 22:33:30
 * @LastEditTime: 2020-11-29 22:49:08
 */
import Vue from "vue";
import ElementUI from "element-ui";
import EleForm from "vue-ele-form";
import FRender from "f-render";
import "element-ui/lib/theme-chalk/display.css";
import LbTable from "@/components/lb-table/lb-table";

import "@/styles/element-variables.scss";

Vue.use(ElementUI, {
  size: "small",
});
Vue.use(EleForm);
Vue.component("f-render", FRender);
Vue.component("lb-table", LbTable);

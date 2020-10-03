## 安装

```bash
# 克隆项目
git clone https://github.com/dakang824/MallAdmin.git
# 进入项目目录
cd vue-admin-beautiful
# 安装依赖
cnpm i
# 本地开发 启动项目
cnpm run serve
```

## install

```bash
# Clone project
git clone https://github.com/dakang824/MallAdmin.git
# Enter project directory
cd vue-admin-beautiful
# Installation dependency
cnpm i
# Start project
cnpm run serve
```

## setting.js 配置

- 说明：这里有好多你会用到的配置项。
- 位置：src/config/settings.js
- 示例代码：

```js
/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description 全局变量配置
 */
module.exports = {
  // 开发以及部署时的URL
  publicPath: "",
  // 生产环境构建文件的目录名
  outputDir: "dist",
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "static",
  // 开发环境每次保存时是否输出为eslint编译警告
  lintOnSave: true,
  // 进行编译的依赖
  transpileDependencies: ["vue-echarts", "resize-detector", "zx-layouts"],
  // 默认的接口地址 如果是开发环境和生产环境走vab-mock-server，当然你也可以选择自己配置成需要的接口地址
  baseURL:
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "preview"
      ? "vab-mock-server"
      : "http://your.website.com",
  //标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
  title: "vue-admin-beautiful",
  //简写
  abbreviation: "vab",
  //开发环境端口号
  devPort: "80",
  //版本号
  version: process.env.VUE_APP_VERSION,
  //烦请保留package.json作者信息 保留版权可免费商用
  copyright: process.env.VUE_APP_AUTHOR,
  //是否显示页面底部版权信息，建议您显示，当然您也可以选择不显示，不管您是付费用户还是未付费用户您都有选择显示或者不显示的权利
  footerCopyright: process.env.NODE_ENV !== "development" ? true : false,
  //是否显示右上角github图标
  githubCorner: process.env.NODE_ENV !== "development" ? true : false,
  //是否显示顶部进度条
  progressBar: true,
  //缓存路由的最大数量
  keepAliveMaxNum: 99,
  // 路由模式，可选值为 history 或 hash
  routerMode: "hash",
  //不经过token校验的路由
  routesWhiteList: ["/login", "/register", "/404", "/401"],
  //加载时显示文字
  loadingText: "正在加载中...",
  //token名称
  tokenName: "accessToken",
  //token在localStorage、sessionStorage、cookie存储的key的名称
  tokenTableName: "vue-admin-beautiful",
  //token存储位置localStorage sessionStorage cookie
  storage: "localStorage",
  //token失效回退到登录页时是否记录本次的路由
  recordRoute: true,
  //是否显示logo，不显示时设置false，显示时请填写remixIcon图标名称，暂时只支持设置remixIcon
  logo: "vuejs-fill",
  //是否国定头部 固定fixed 不固定noFixed
  header: "fixed",
  //横纵布局 horizontal vertical
  layout: "vertical",
  //是否开启主题配置按钮
  themeBar: true,
  //是否显示多标签页
  tabsBar: true,
  //是否显示骨架屏
  skeleton: false,
  //配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: "application/json;charset=UTF-8",
  //消息框消失时间
  messageDuration: 3000,
  //最长请求时间
  requestTimeout: 5000,
  //操作正常code
  successCode: 200,
  //登录失效code
  invalidCode: 402,
  //无权限code
  noPermissionCode: 401,
  //是否显示在页面高亮错误
  errorLog: ["development", "test", "production"],
  //是否开启登录拦截
  loginInterception: true,
  //是否开启登录RSA加密
  loginRSA: false,
  //是否依据mock数据生成webstorm HTTP Request请求文件
  httpRequestFile: false,
  //intelligence和all两种方式，前者后端权限只控制permissions不控制view文件的import（前后端配合，减轻后端工作量），all方式完全交给后端前端只负责加载
  authentication: "intelligence",
  //vertical布局时是否只保持一个子菜单的展开
  uniqueOpened: true,
  //vertical布局时默认展开的菜单path，使用逗号隔开建议只展开一个
  defaultOopeneds: ["/vab"],
  //需要加loading层的请求，防止重复提交
  debounce: ["doEdit"],
  //需要自动注入并加载的模块
  providePlugin: { maptalks: "maptalks", "window.maptalks": "maptalks" },
  //npm run build时是否自动生成7z压缩包
  build7z: false,
  //代码生成机生成在view下的文件夹名称
  templateFolder: "project",
};
```

## variables.scss 配置

- 说明：这里可以修改你项目的配色方案，简单修改即可实现风格大变。
- 位置：src/styles/variables.scss

```scss
/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description 全局主题变量配置，VIP文档内提供多种好看的配色方案（ant-design风格、layui风格、iview风格），请查看VIP文档主题配置篇
 */
/* stylelint-disable */
@charset "utf-8";
//框架默认主题色
$base-color-default: #1890ff;
//默认层级
$base-z-index: 999;
//横向布局纵向布局时菜单背景色
$base-menu-background: #001529;
//菜单文字颜色
$base-menu-color: hsla(0, 0%, 100%, 0.95);
//菜单选中文字颜色
$base-menu-color-active: hsla(0, 0%, 100%, 0.95);
//菜单选中背景色
$base-menu-background-active: $base-color-default;
//标题颜色
$base-title-color: #fff;
//字体大小配置
$base-font-size-small: 12px;
$base-font-size-default: 14px;
$base-font-size-big: 16px;
$base-font-size-bigger: 18px;
$base-font-size-max: 22px;
$base-font-color: #606266;
$base-color-blue: $base-color-default;
$base-color-green: #13ce66;
$base-color-white: #fff;
$base-color-black: #000;
$base-color-yellow: #ffba00;
$base-color-orange: #ff6700;
$base-color-red: #ff4d4f;
$base-color-gray: rgba(0, 0, 0, 0.65);
$base-main-width: 1279px;
$base-border-radius: 2px;
$base-border-color: #dcdfe6;
//输入框高度
$base-input-height: 32px;
//默认paddiing
$base-padding: 20px;
//默认阴影
$base-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
//横向布局时top-bar、logo、一级菜单的高度
$base-top-bar-height: 65px;
//纵向布局时logo的高度
$base-logo-height: 75px;
//顶部nav-bar的高度
$base-nav-bar-height: 60px;
//顶部多标签页tags-bar的高度
$base-tags-bar-height: 55px;
//顶部多标签页tags-bar中每一个item的高度
$base-tag-item-height: 34px;
//菜单li标签的高度
$base-menu-item-height: 50px;
//app-main的高度
$base-app-main-height: calc(
  100vh - #{$base-nav-bar-height} - #{$base-tags-bar-height} -
    #{$base-padding} - #{$base-padding} - 55px - 30px
);
//纵向布局时左侧导航未折叠时的宽度
$base-left-menu-width: 230px;
//纵向布局时左侧导航未折叠时右侧内容的宽度
$base-right-content-width: calc(100% - #{$base-left-menu-width});
//纵向布局时左侧导航已折叠时的宽度
$base-left-menu-width-min: 65px;
//纵向布局时左侧导航已折叠时右侧内容的宽度
$base-right-content-width-min: calc(100% - #{$base-left-menu-width-min});
//默认动画
$base-transition: all 0.2s;
//默认动画时长
$base-transition-time: 0.2s;

:export {
  //菜单文字颜色变量导出
  menu-color: $base-menu-color;
  //菜单选中文字颜色变量导出
  menu-color-active: $base-menu-color-active;
  //菜单背景色变量导出
  menu-background: $base-menu-background;
  //菜单选中背景色变量导出
  menu-background-active: $base-menu-background-active;
  //多标签页选中背景色变量导出
  tag-background-active: $base-color-blue;
  //默认按钮背景色变量导出
  button-background: $base-color-blue;
  //分页选中背景色变量导出
  pagination-background-active: $base-color-blue;
}
```

## element-ui 组件尺寸配置

- 说明：这里可以修改你 element-ui 组件尺寸，element-ui 组件的尺寸一共分为 large、default、small 、mini，本项目默认使用的是 small。
- 位置：src/plugins/element.js
- 示例代码：

```js
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/display.css";

import "@/styles/element-variables.scss";

Vue.use(ElementUI, {
  size: "small", // element-ui组件的尺寸一共分为large、default、small 、mini
});
```

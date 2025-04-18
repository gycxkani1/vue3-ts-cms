import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "normalize.css";
import "./assets/css/index.less";

const app = createApp(App);
app.use(router);
app.use(store);
// app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");

// 测试hyRequest中显示加载进度的功能
// import hyRequest from "./service";
// hyRequest.request({
//   url: "/get",
//   method: "GET",
//   showLoading: true
// });

// 测试环境变量
// console.log(process.env.NODE_ENV);
// console.log(process.env.VUE_APP_BASE_URL);
// console.log(process.env.VUE_APP_ENV);

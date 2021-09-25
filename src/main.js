import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import * as antIcons from "@ant-design/icons-vue";
import "ant-design-vue/dist/antd.css";

const app = createApp(App);
// 注册组件
Object.keys(antIcons).forEach((key) => {
  app.component(key, antIcons[key]);
});
// 添加到全局
app.config.globalProperties.$antIcons = antIcons;
app.config.productionTip = false;

app.use(Antd);
app.mount("#app");

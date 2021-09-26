import { createApp, h } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import * as antIcons from "@ant-design/icons-vue";
import "ant-design-vue/dist/antd.css";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import NotFoundPage from "./components/NotFoundPage.vue";

const routes = {
  "/": Home,
  "/login": Login,
  "/404": NotFoundPage,
};

const SimpleRouter = {
  data: () => ({
    currentRoute: window.location.pathname,
  }),

  computed: {
    CurrentComponent() {
      let userID = localStorage.getItem("userID");
      if (this.currentRoute === "/login" && userID) {
        return routes["/"];
      } else if (userID) {
        return routes[this.currentRoute] || NotFoundPage;
      } else {
        return routes["/login"];
      }
    },
  },

  render() {
    return h(this.CurrentComponent);
  },
};

const app = createApp(SimpleRouter);
// 注册组件
Object.keys(antIcons).forEach((key) => {
  app.component(key, antIcons[key]);
});
// 添加到全局
app.config.globalProperties.$antIcons = antIcons;
app.config.productionTip = false;

app.use(Antd);
app.mount("#app");

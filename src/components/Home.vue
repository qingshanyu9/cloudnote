<script setup>
import { ref } from "vue";
import Header from "./Header.vue";
import Sider from "./Sider.vue";
import Content from "./Content.vue";

// defineProps({
//   msg: String,
// });

// const count = ref(0);
</script>

<template>
  <a-layout id="components-layout">
<<<<<<< HEAD
    <a-layout>
      <a-layout-sider class="layout-sider">
        <SiderMenu></SiderMenu>
      </a-layout-sider>
      <a-layout-content class="layout-content">
        <TodoList></TodoList>
      </a-layout-content>
=======
    <a-layout-sider width="260"><Sider /></a-layout-sider>
    <a-layout>
      <a-layout-header><Header /></a-layout-header>
      <a-layout-content><Content /></a-layout-content>
      <!-- <a-layout-footer>Footer</a-layout-footer> -->
>>>>>>> 718221a67ec32cb1f7e6d6c7ed9fc3a15bb65a80
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
#components-layout {
  height: 100%;
  .ant-layout-header {
    background: #fff;
    height: 40px;
    font-size: 14px;
    user-select: none;
    opacity: 1;
    transform: opacity 0.5s;
    padding: 0;
    position: fixed;
    width: 100%;
    z-index: 100;
  }
  .ant-layout-sider {
    background: #fafafa;
  }
}
#components-layout .layout-sider {
  background-color: #fafafa;
}

#components-layout .layout-content {
  background-color: #fff;
}
</style>

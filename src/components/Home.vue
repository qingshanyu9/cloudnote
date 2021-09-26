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
    <a-layout-sider width="260"><Sider /></a-layout-sider>
    <a-layout>
      <a-layout-header><Header /></a-layout-header>
      <a-layout-content><Content /></a-layout-content>
      <!-- <a-layout-footer>Footer</a-layout-footer> -->
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
</style>

<script setup>
import SiderMenu from "./SiderMenu.vue";
import TodoList from "./TodoList.vue";
</script>

<template>
  <a-layout id="components-layout">
    <a-layout>
      <a-layout-sider class="layout-sider">
        <SiderMenu></SiderMenu>
      </a-layout-sider>
      <a-layout-content class="layout-content">
        <TodoList></TodoList>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
#components-layout {
  height: 100%;
}
#components-layout .layout-sider {
  background-color: #fafafa;
}

#components-layout .layout-content {
  background-color: #fff;
}
</style>

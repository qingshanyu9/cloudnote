<!--
 * @Description: 
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-09-25 20:04:39
-->
<template>
  <div id="app">
    <nav-menu class="navmenu"></nav-menu>
    <router-view class="routerView" />
  </div>
</template>

<script>
import NavMenu from "./components/content/NavMenu.vue";
export default {
  components: { NavMenu },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
@import "./assets/css/base.css";

#app {
  height: 100vh;
  background-color: #f5f5f5;
}

.navmenu {
  position: fixed;
  width: 150px;
  height: 100%;
  z-index: 999;
}

.routerView {
  padding: 20px 30px 20px 180px;
  /* margin-left: 180px; */
}

.shadowsBox {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.breadCrumb {
  display: flex;
  align-items: center;

  padding: 20px;

  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.breadCrumb > div {
  margin-right: 30px;
  font-size: 14px;
}
</style>

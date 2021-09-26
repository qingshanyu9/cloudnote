<!--
 * @Description: 
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-09-25 20:03:26
-->
<template>
  <div class="menu">
    <el-col style="height: 100%">
      <el-menu :default-active="index"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               style="height: 100%">>
        <el-menu-item index="1"
                      @click="switchoverPage('/home')">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2"
                      @click="switchoverPage('/user')">
          <i class="el-icon-user"></i>
          <span slot="title">用户详情</span>
        </el-menu-item>
        <el-menu-item index="3"
                      @click="switchoverPage('/data')">
          <i class="el-icon-odometer"></i>
          <span slot="title">数据统计</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    switchoverPage (path) {
      this.$router.push({
        path,
      });
    },
  },
  mounted () {
    switch (this.$route.path) {
      case "/user":
        this.index = "2";
        break;
      case "/data":
        this.index = "3";
        break;
      default:
        this.index = "1";
        break;
    }
  },
  data () {
    return {
      index: "0",
    };
  },
};
</script>

<style scoped>
</style>
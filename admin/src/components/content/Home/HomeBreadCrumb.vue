<!--
 * @Description: 
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-09-05 22:28:42
-->
<template>
  <div class="breadCrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>主页</el-breadcrumb-item>
    </el-breadcrumb>
    <div>已运行时间：{{ (currentTime / 86400).toFixed(2) }} 天</div>
  </div>
</template>

<script>
export default {
  props: {
    currentTime: {
      default: 0,
    },
  },
  computed: {},
};
</script>

<style>
</style>
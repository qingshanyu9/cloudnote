<!--
 * @Description: 
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-09-06 09:58:23
-->
<template>
  <div>
    <data-draw
      :title="'受喜爱的视频'"
      :pirctureId="'favorite'"
      :list="list"
    ></data-draw>
  </div>
</template>

<script>
import DataDraw from "./DataDraw.vue";
export default {
  components: { DataDraw },
  props: {
    list: [],
  },
  methods: {},
};
</script>

<style>
</style>
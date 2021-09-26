<!--
 * @Description: 
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-09-26 15:48:44
-->
<template>
  <div>
    <data-draw :title="'地域比重'"
               :pirctureId="'favorite'"
               :list="list"></data-draw>
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
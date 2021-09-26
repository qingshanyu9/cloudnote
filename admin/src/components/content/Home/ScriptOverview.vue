<!--
 * @Description: 
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-09-25 20:34:40
-->
<template>
  <div class="scriptOverview">
    <simple-box :title="'当前账号数'"
                :particulars="accountCount.toString()"></simple-box>
    <simple-box :title="'当前笔记数'"
                :particulars="nodeCount.toString()"></simple-box>
  </div>
</template>

<script>
import SimpleBox from "../../common/SimpleBox.vue";
export default {
  components: { SimpleBox },
  props: {
    accountCount: {
      type: Number,
      default: 0,
    },
    nodeCount: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style>
.scriptOverview {
  margin-top: 30px;
  background-color: #fff;

  display: flex;
  flex-wrap: wrap;
}
</style>
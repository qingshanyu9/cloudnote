<!--
 * @Description: 
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-09-05 15:12:28
-->
<template>
  <div class="simpleBox">
    <div style="height: 50px">{{ title }}</div>
    <div style="height: 70px">{{ particulars }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "undefined",
    },
    particulars: {
      type: String,
      default: "undefined",
    },
  },
};
</script>

<style>
.simpleBox {
  width: 280px;
  padding-top: 20px;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  margin: 50px 20px 30px 50px;

  background-color: #99999920;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
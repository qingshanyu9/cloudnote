<!--
 * @Description: 
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-09-06 09:59:26
-->
<template>
  <div>
    <data-bread-crumb class="shadowsBox"></data-bread-crumb>
    <data-overview class="shadowsBox" :list="list"></data-overview>
  </div>
</template>

<script>
import DataBreadCrumb from "../components/content/DataStatistics/DataBreadCrumb.vue";
import DataOverview from "../components/content/DataStatistics/DataOverview.vue";
export default {
  components: { DataBreadCrumb, DataOverview },
  created() {
    this.axios
      .get(this.$store.state.requestURL + "/videofavorite")
      .then((result) => {
        if (result.status == 200) {
          result = result.data.data;
          for (let i in result) {
            this.list.push({
              name: i,
              value: result[i],
            });
          }
        }
      });
  },
  data() {
    return {
      list: [],
    };
  },
};
</script>

<style>
</style>
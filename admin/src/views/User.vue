<!--
 * @Description: 
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-09-26 09:43:34
-->
<template>
  <div>
    <user-bread-crumb class="shadowsBox"></user-bread-crumb>
    <user-details class="shadowsBox"
                  :tableData="tableData"></user-details>
  </div>
</template>

<script>
import UserBreadCrumb from "../components/content/User/UserBreadCrumb.vue";
import UserDetails from "../components/content/User/UserDetails.vue";
export default {
  components: { UserBreadCrumb, UserDetails },
  mounted () {
    this.axios.get(this.$store.state.requestURL + "/alluser").then((result) => {
      if (result.status == 200) {
        let { user } = result.data;
        for (let i of user) {
          i.editFlag = false;
          i.showPassword = false;
          i.newName = '';
          i.newPassword = ''
        }
        this.tableData = user;
      }
    });
  },
  data () {
    return {
      tableData: [],
    };
  },
};
</script>

<style>
</style>
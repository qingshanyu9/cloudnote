<!--
 * @Description: 
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-09-25 21:07:18
-->
<template>
  <div class="home">
    <home-bread-crumb class="shadowsBox"
                      :currentTime="currentTime"></home-bread-crumb>
    <system-overview class="shadowsBox"
                     :loadavg="loadavg"
                     :freemem="freemem"
                     :totalmem="totalmem"></system-overview>
    <script-overview class="shadowsBox"
                     :accountCount="accountCount"
                     :nodeCount="nodeCount"></script-overview>
  </div>
</template>

<script>
import HomeBreadCrumb from "../components/content/Home/HomeBreadCrumb.vue";
import ScriptOverview from "../components/content/Home/ScriptOverview.vue";
import SystemOverview from "../components/content/Home/SystemOverview.vue";
// @ is an alias to /src

export default {
  name: "Home",
  components: { HomeBreadCrumb, SystemOverview, ScriptOverview },
  mounted () {
    this.updata();
    this.interval = setInterval(() => {
      this.updata();
    }, 5000);
  },
  data () {
    return {
      interval: "",
      currentTime: 0,
      loadavg: [],
      totalmem: 0,
      freemem: 0,
      accountCount: 0,
      nodeCount: 0
    };
  },
  methods: {
    updata () {
      this.axios
        .get('http://121.36.10.13:30000' + "/systemoverview")
        .then((result) => {
          if (result.status == 200) {
            result = result.data;
            this.currentTime = result.currentTime;
            this.loadavg = result.loadavg;
            this.freemem = result.freemem;
            this.totalmem = result.totalmem;
            this.accountCount = result.accountCount;
            this.nodeCount = result.nodeCount;
          }
        });
    },
  },
  beforeDestroy () {
    clearInterval(this.interval);
  },
};
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
}
</style>

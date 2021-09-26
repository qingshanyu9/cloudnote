<!--
 * @Description: 
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-09-05 22:37:58
-->
<template>
  <div class="systemOverview">
    <circle-progress
      :title="'负载状态'"
      :canvasId="'loadConditions'"
      :progress="loadConditionsProgress"
      :per="(loadavg[0] * 100).toFixed(0)"
    ></circle-progress>
    <circle-progress
      :title="'内存使用率'"
      :canvasId="'internalStorage'"
      :progress="internalStorageProgress"
      :per="
        totalmem == 0 ? 0 : (((totalmem - freemem) / totalmem) * 100).toFixed(0)
      "
    ></circle-progress>
  </div>
</template>

<script>
import CircleProgress from "../../common/CircleProgress.vue";
export default {
  components: { CircleProgress },
  props: {
    loadavg: {
      type: Array,
      default: function () {
        return [];
      },
    },
    totalmem: {
      type: Number,
      default: 0,
    },
    freemem: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      memoryPercent: 0,
      loadConditionsPercent: 0,
    };
  },
  computed: {
    loadConditionsProgress() {
      if (this.loadConditionsPercent < 50) return "运行流畅";
      else if (this.loadConditionsPercent < 80) return "运行卡顿";
      else return "系统堵塞";
    },
    internalStorageProgress() {
      if (this.totalmem == 0) return "NAN";
      else if (this.totalmem / 1024 < 10240) {
        let freemem = this.freemem / 1024;
        let totalmem = this.totalmem / 1024;
        return (
          (totalmem - freemem).toFixed(0).toString() +
          " / " +
          totalmem.toFixed(0).toString() +
          " (KB)"
        );
      } else if (this.totalmem / 1024 / 1024 < 10240) {
        let freemem = this.freemem / 1024 / 1024;
        let totalmem = this.totalmem / 1024 / 1024;
        return (
          (totalmem - freemem).toFixed(0).toString() +
          " / " +
          totalmem.toFixed(0).toString() +
          " (MB)"
        );
      } else if (this.totalmem / 1024 / 1024 / 1024 < 10240) {
        let freemem = this.freemem / 1024 / 1024 / 1024;
        let totalmem = this.totalmem / 1024 / 1024 / 1024;
        return (
          (totalmem - freemem).toFixed(0).toString() +
          " / " +
          totalmem.toFixed(0).toString() +
          " (GB)"
        );
      }
    },
  },
};
</script>

<style>
.systemOverview {
  margin-top: 30px;
  background-color: #fff;

  display: flex;
  flex-wrap: wrap;
}
</style>
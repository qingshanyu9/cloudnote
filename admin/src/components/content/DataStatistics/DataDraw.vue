<!--
 * @Description: 
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-09-06 09:59:07
-->
<template>
  <div :id="pirctureId" class="dataDraw"></div>
</template>

<script>
export default {
  props: {
    title: "",
    pirctureId: "",
    list: [],
  },
  methods: {
    drawPircture() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementById(this.pirctureId)
      );
      // 绘制图表
      myChart.setOption({
        title: {
          text: this.title,
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "人员总数",
            type: "pie",
            radius: "50%",
            data: this.list,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
  },
  watch: {
    list(newValue, oldValue) {
      this.drawPircture();
    },
  },
};
</script>

<style>
.dataDraw {
  margin-top: 30px;
  padding: 20px;
  height: 300px;
}
</style>
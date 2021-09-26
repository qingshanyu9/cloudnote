<!--
 * @Description: 
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-09-05 16:47:26
-->
<template>
  <div class="circleProgress">
    <div>{{ title }}</div>
    <div :id="canvasId"></div>
    <div>{{ progress }}</div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.init(document.getElementById(this.canvasId), 130, 130);
    });
  },
  components: {},
  props: {
    title: {
      type: String,
      default: "undefined",
    },
    progress: {
      type: String,
      default: "NaN",
    },
    canvasId: {
      type: String,
      default: "",
    },
    per: {
      default: 0,
    },
  },
  data() {
    return {
      width: 0,
      height: 0,
      circle: "",
    };
  },
  methods: {
    init(dom, width, height) {
      this.circle = document.createElement("canvas");
      dom.appendChild(this.circle);
      this.width = width;
      this.height = height;
      this.circle.width = this.width;
      this.circle.height = this.height;
      this.draw(0);
    },
    draw(load) {
      let ctx = this.circle.getContext("2d");
      let circle = this.circle;
      let end = load * 3.6 - 90;
      //每次加载前清除画布
      ctx.clearRect(0, 0, circle.width, circle.height);
      ctx.beginPath();
      // 灰色底框
      ctx.strokeStyle = "#eee"; //底框的背景颜色
      ctx.lineWidth = 5; //底框的宽度
      //底框显示的位置想x,y,r,start,end

      ctx.arc(
        circle.width / 2,
        circle.height / 2,
        circle.height / 2.5,
        0,
        2 * Math.PI
      );
      ctx.stroke(); //绘制底框，空心圆
      // 开始新的路径
      ctx.beginPath();
      // 绘制新的圆环
      ctx.strokeStyle = load >= 80 ? "red" : "lightgreen";
      ctx.lineWidth = 5;
      //从顶点位置开始
      ctx.arc(
        circle.width / 2,
        circle.height / 2,
        circle.height / 2.5,
        (-90 * Math.PI) / 180,
        (end * Math.PI) / 180
      );
      ctx.stroke();
      // 设置中间的文字字体和大小
      ctx.font = "18px SimHei";
      ctx.textAlign = "center";
      // 设置图形文字
      ctx.fillText(load + "%", circle.width / 2, circle.height / 2);
    },
  },
  watch: {
    per(newValue, oldValue) {
      this.draw(newValue);
    },
  },
};
</script>

<style>
.circleProgress {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 20px 10px 20px;
  color: #999999;
}
</style>
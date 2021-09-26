<template>
  <div id="content">
    <div class="content_margin"></div>
    <div class="main"></div>
    <div id="content_bottom">
      <a-button shape="circle" size="large" title="点击查看任务积分">
        <template #icon>
          <icon-font type="icon-icon6" />
        </template>
      </a-button>
      <a-button shape="circle" size="large" title="提交问题">
        <template #icon>
          <icon-font type="icon-shouye23" />
        </template>
      </a-button>
      <a-button shape="circle" size="large" title="查看帮助信息">
        <template #icon> ? </template>
      </a-button>
    </div>
  </div>
</template>
<script>
import { createFromIconfontCN } from "@ant-design/icons-vue";
import { defineComponent } from "vue";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2834657_08igj41drhyo.js",
});
export default defineComponent({
  components: {
    IconFont,
  },
});
</script>
<style lang="less" scoped>
#content {
  position: relative;
  width: 100%;
  height: 100%;
  .content_margin {
    height: 40px;
  }
}
.main {
  width: 100%;
  height: calc(100% - 40px);
  background: #fff;
}
#content_bottom {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 20px;
  button {
    margin: 8px;
    box-shadow: 0 4px 12px #00000026;
    border: none;
    font-size: 20px;
    span {
      font-size: 20px;
    }
  }
  button:first-child {
    color: #ffc107;
  }
}
</style>

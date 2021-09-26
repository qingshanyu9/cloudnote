<template>
  <header id="header">
    <div class="header-left">
      <span class="header_fileName">
        <span class="icon"><icon-font type="icon-cat" /></span>
        <span> 开发文档</span>
      </span>
    </div>
    <div class="header-right">
      <ul class="header_fileHandleList">
        <li><icon-font type="icon-shouye13" title="查看页面编辑记录" /></li>
        <li><icon-font type="icon-gengduoguanxi" title="页面关系图" /></li>
        <li><icon-font type="icon-shoucang" title="收藏" /></li>
        <li><icon-font type="icon-fenxiang" title="分享页面" /></li>
        <li><icon-font type="icon-gengduo" title="页面设置" /></li>
      </ul>
    </div>
  </header>
</template>
<script>
import { createFromIconfontCN } from "@ant-design/icons-vue";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2834657_h3qqcn1n3rs.js",
});
export default {
  components: {
    IconFont,
  },
};
</script>
<style lang="less" scoped>
@yodn-hover-bg: #eeecec;

#header {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 480px;
  line-height: 40px;
  padding: 0 10px;
  overflow: hidden;
  &:deep(.anticon) {
    width: 14px;
  }
  .header-left {
    text-align: left;
    height: 40px;
    .header_fileName {
      .icon {
        font-size: 20px;
        margin-right: 8px;
        vertical-align: bottom;
      }
    }
  }
  .header-right {
    height: 40px;
    font-size: 20px;
  }
  .header_fileHandleList {
    clear: both;
    display: flex;
    li {
      width: 24px;
      margin: 0 10px;
      span {
        width: 100%;
      }
    }
  }

  .header_fileName,
  .header_fileHandleList > li > span {
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    &:hover {
      background: @yodn-hover-bg;
    }
  }
}
</style>

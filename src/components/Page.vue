<template>
  <ul class="myPage">
    <li>
      <div class="page_left">
        <span class="left_1"><RightOutlined /></span>
        <span class="left_2"><GithubOutlined /></span>
        <span>开发文档</span>
      </div>
      <div class="page_right">
        <span><EllipsisOutlined /></span>
        <span><PlusOutlined /></span>
      </div>
    </li>
    <li>
      <div class="page_left">
        <span class="left_1"><RightOutlined /></span>
        <span class="left_2"><GithubOutlined /></span>
        <span>开发文档</span>
      </div>
      <div class="page_right">
        <span><EllipsisOutlined /></span>
        <span><PlusOutlined /></span>
      </div>
    </li>
    <li>
      <div class="page_left">
        <span class="left_1"><RightOutlined /></span>
        <span class="left_2"><GithubOutlined /></span>
        <span>开发文档</span>
      </div>
      <div class="page_right">
        <span><EllipsisOutlined /></span>
        <span><PlusOutlined /></span>
      </div>
    </li>
    <li>
      <div class="page_left">
        <span class="left_1"><RightOutlined /></span>
        <span class="left_2"><GithubOutlined /></span>
        <span>开发文档</span>
      </div>
      <div class="page_right">
        <span><EllipsisOutlined /></span>
        <span><PlusOutlined /></span>
      </div>
    </li>
  </ul>
</template>
<script>
import {
  PlusOutlined,
  EllipsisOutlined,
  GithubOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    PlusOutlined,
    EllipsisOutlined,
    GithubOutlined,
    RightOutlined,
  },
});
</script>
<style lang="less" scoped>
.myPage {
  width: 100%;
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 0 10px;
    line-height: 34px;
    font-size: 14px;
    &:hover {
      // background: rgba(255, 71, 71, 0.1);
      background: #eeecec;
    }
    .page_left {
      display: flex;
      justify-content: baseline;
      align-items: center;
      span {
        padding: 0 1px;
      }
      .left_1 {
        font-size: 10px;
        color: #655757;
      }
      .left_2 {
        font-size: 16px;
      }
    }
    .page_right {
      display: none;
      span {
        padding: 2px;
        border-radius: 2px;
        &:hover {
          background: #cacaca;
        }
      }
    }
    &:hover {
      .page_right {
        color: #bcb3b3;
        display: block;
      }
    }
  }
}
</style>

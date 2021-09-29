<template>
  <div class="page" v-if="msg !== 'collect' || pagelist.collect.length > 0">
    <div class="page-title">
      <span>{{
        msg === "collect"
          ? "收藏页面"
          : msg === "public"
          ? "公共页面"
          : "私有页面"
      }}</span>
      <span><PlusOutlined @click="addPage(pagelist[msg])" /></span>
    </div>
    <ul class="myPage">
      <li
        v-if="pagelist[msg].length === 0"
        style="color: #999; font-size: 12px"
        @click="addPage(pagelist[msg])"
      >
        <div class="page_left">
          <span class="left_1"><PlusOutlined /></span>
          <span class="left_2"> </span>
          <span>创建新页面</span>
        </div>
        <div class="page_right">
          <span></span>
          <span></span>
        </div>
      </li>
      <template v-for="item in pagelist[msg]" :key="item.text">
        <li>
          <div class="page_left">
            <span class="left_1">
              <RightOutlined
                v-if="item.children.length > 0 && !item.show"
                @click="item.show = !item.show"
              />
              <DownOutlined
                v-else-if="item.children.length > 0 && item.show"
                @click="item.show = !item.show"
              />
              <icon-font type="icon-dian" v-else />
            </span>
            <span class="left_2">
              <icon-font :type="item.icon" :title="item.text"
            /></span>
            <span
              ><input
                :id="item.page_id"
                class="pageInput"
                disabled
                :value="item.text"
                @keydown.enter="enterReName(item)"
                @blur="enterReName(item)"
            /></span>
          </div>
          <div class="page_right">
            <SiderDropdown :item="item" @rename="rename(item)" />
            <span><PlusOutlined @click="addPage(item.children, item)" /></span>
          </div>
        </li>
        <ul v-if="item && item.show && item.children.length > 0">
          <li v-for="itm in item.children" :key="itm.text" class="page_child">
            <div class="page_left">
              <span class="left_1">
                <icon-font type="icon-dian" />
              </span>
              <span class="left_2">
                <icon-font :type="itm.icon" />
              </span>
              <span
                ><input
                  :id="itm.page_id"
                  class="pageInput"
                  disabled
                  :value="itm.text"
                  @keydown.enter="enterReName(itm)"
                  @blur="enterReName(itm)"
              /></span>
            </div>
            <div class="page_right">
              <SiderDropdown :item="itm" @rename="rename(itm)" />
              <span></span>
            </div>
          </li>
        </ul>
      </template>
    </ul>
  </div>
</template>
<script>
import {
  PlusOutlined,
  EllipsisOutlined,
  GithubOutlined,
  RightOutlined,
  DownOutlined,
  createFromIconfontCN,
} from "@ant-design/icons-vue";
import { defineComponent } from "vue";
import SiderDropdown from "./SiderDropdown.vue";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2834657_75h2fk6wx0y.js",
});
export default defineComponent({
  props: {
    pagelist: Object,
    msg: String,
  },
  components: {
    PlusOutlined,
    EllipsisOutlined,
    GithubOutlined,
    RightOutlined,
    DownOutlined,
    IconFont,
    SiderDropdown,
  },
  setup() {
    const addPage = (obj, par) => {
      // console.log(obj, 111);
      let newPage = {
        icon: "icon-icon19",
        text: "新页面",
        show: true,
        created_by: "Yodn",
        created_time: Date.now(),
        edited_by: "Yodn",
        edited_time: Date.now(),
        status: 1,
        children: [],
        page_id: Number(
          Math.random().toString().substr(3, length) + Date.now()
        ).toString(36),
      };
      obj.push(newPage);
      // console.log(par);
      if (par) par.show = true;
    };
    const rename = (item) => {
      // console.log(item.page_id, 111);
      let input = document.querySelector(`#${item.page_id}`);
      // console.log(input.__proto__);
      input.removeAttribute("disabled");
      input.classList.add("rename");
    };
    const enterReName = (item) => {
      let input = document.querySelector(`#${item.page_id}`);
      input.setAttribute("disabled", "disabled");
      input.classList.remove("rename");
    };
    return {
      addPage,
      rename,
      enterReName,
    };
  },
});
</script>
<style lang="less" scoped>
.pageInput {
  border: none;
  background: unset;
  height: 24px;
  width: 100%;
  color: unset;
}
.rename {
  background: #fff;
  border-radius: 4px;
  height: 24px;
  border: none;
  color: #000;
}
.page {
  display: flex;
  flex-direction: column;
  .page-title {
    padding: 0 10px;
    color: #bcb3b3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 40px;
    span {
      cursor: pointer;
    }
    span:first-child {
      font-size: 12px;
    }
    span:last-child {
      font-size: 14px;
      display: none;
    }
    &:hover > span:last-child {
      display: block;
      span {
        display: block;
      }
    }
  }
}
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
      min-width: 40px;
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
.page_child {
  padding: 0 30px !important;
}
</style>

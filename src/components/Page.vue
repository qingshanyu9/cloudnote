<template>
  <div
    class="page"
    v-show="
      type !== 0 ||
      pagelist.filter((item) => item.type === type && item.status === 1)
        .length > 0
    "
  >
    <div class="page-title">
      <span>{{
        type === 0 ? "收藏页面" : type === 1 ? "公共页面" : "私有页面"
      }}</span>
      <span><PlusOutlined @click="addPage" /></span>
    </div>
    <ul class="myPage">
      <li
        v-show="
          pagelist.filter((item) => item.type === type && item.status === 1)
            .length === 0
        "
        style="color: #999; font-size: 12px"
        @click="addPage"
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
      <template
        v-for="item in pagelist.filter(
          (item) => item.type === type && item.status === 1
        )"
        :key="item.text"
      >
        <li>
          <div class="page_left">
            <span class="left_1">
              <RightOutlined
                v-if="
                  item.children.filter((item) => item.status === 1).length >
                    0 && !item.show
                "
                @click="item.show = !item.show"
              />
              <DownOutlined
                v-else-if="
                  item.children.filter((item) => item.status === 1).length >
                    0 && item.show
                "
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
            <span><PlusOutlined @click="addPage(item)" /></span>
          </div>
        </li>
        <ul v-show="item && item.show && item.children.length > 0">
          <li
            v-for="itm in item.children.filter((item) => item.status === 1)"
            :key="itm.text"
            class="page_child"
          >
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
              <!-- <span></span> -->
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
import { defineComponent, reactive } from "vue";
import SiderDropdown from "./SiderDropdown.vue";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2834657_75h2fk6wx0y.js",
});
export default defineComponent({
  props: {
    pagelist: Object,
    type: String,
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
  setup(props) {
    const type = Number(props.type);
    const pagelist = props.pagelist;
    // const list = reactive(pagelist.filter((item) => item.type === type));
    const addPage = (obj) => {
      // console.log(obj, obj.page_id);
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
        type: type,
        parent_id: obj.page_id,
      };
      if (obj.page_id) {
        obj.children.push(newPage);
        obj.show = true;
      } else {
        // list.push(newPage);
        pagelist.push(newPage);
      }
    };
    const rename = (item) => {
      // console.log(item.page_id, 111);
      let input = document.querySelector(`#${item.page_id}`);
      // console.log(input.__proto__);
      input.removeAttribute("disabled");
      input.classList.add("rename");
      input.select();
      input.focus();
    };
    const enterReName = (item) => {
      let input = document.querySelector(`#${item.page_id}`);
      input.setAttribute("disabled", "disabled");
      input.classList.remove("rename");
      input.blur();
    };
    return {
      type,
      // list,
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

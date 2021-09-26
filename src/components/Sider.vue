<template>
  <div id="sider">
    <div id="user">
      <div class="user_avater">
        <a-avatar shape="square">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <span class="user_name">yodn的团队空间</span>
      </div>
      <div class="btn">
        <DownOutlined />
      </div>
    </div>
    <div id="sider_handleList">
      <SearchOutlined title="打开搜索框" @click="search_showModal" />
      <icon-font type="icon-gengduoguanxi" title="页面关系图" />
      <icon-font type="icon-shandianjiaji" title="今日速记" />
      <icon-font type="icon-bangzhu" title="帮助" />
      <icon-font type="icon-guidang" title="打开消息箱" />
      <EllipsisOutlined />
    </div>
    <div id="publicPage" class="page">
      <div class="page-title">
        <span>公共页面</span>
        <span><PlusOutlined @click="addPage('public')" /></span>
      </div>
      <Page :pagelist="pageList.public" />
    </div>
    <div id="myPage" class="page">
      <div class="page-title">
        <span>私有页面</span>
        <span><PlusOutlined @click="addPage('private')" /></span>
      </div>
      <Page :pagelist="pageList.private" />
    </div>
    <div id="silder_bottom">
      <div title="删除的页面都在垃圾桶">
        <span><icon-font type="icon-icon25" /></span>
        <span>垃圾桶</span>
      </div>
      <div title="打开模板中心">
        <span><icon-font type="icon-webpack" /></span>
        <span>模板中心</span>
      </div>
    </div>
    <a-modal
      v-model:visible="search_visible"
      @ok="search_handleOk"
      :closable="false"
      :footer="null"
    >
      <a-input-search
        v-model:value="value"
        placeholder="在yodn的团队空间 中搜索"
        style="width: 100%; border: none"
        @search="onSearch"
      />
    </a-modal>
  </div>
</template>
<script>
import {
  DownOutlined,
  UserOutlined,
  SearchOutlined,
  PlusOutlined,
  EllipsisOutlined,
  createFromIconfontCN,
} from "@ant-design/icons-vue";
import { defineComponent, ref, reactive } from "vue";
import Page from "./Page.vue";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2834657_08igj41drhyo.js",
});
export default defineComponent({
  components: {
    UserOutlined,
    DownOutlined,
    SearchOutlined,
    PlusOutlined,
    EllipsisOutlined,
    Page,
    IconFont,
  },
  setup() {
    const pageList = reactive({
      collect: [],
      public: [],
      private: [],
    });
    const search_visible = ref(false);
    const search_showModal = () => {
      search_visible.value = true;
    };

    const search_handleOk = (e) => {
      search_visible.value = false;
    };
    const addPage = (e) => {
      let newPage = {
        icon: "icon-icon19",
        text: "新页面",
      };
      pageList[e].push(newPage);
    };
    return {
      search_visible,
      search_showModal,
      search_handleOk,
      pageList,
      addPage,
    };
  },
});
</script>
<style lang="less" scoped>
#sider {
  height: 100%;
  padding: 10px 0;
  position: relative;
  #user {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    .user_name {
      font-weight: bold;
      margin-left: 4px;
    }
    .btn {
      font-size: 10px;
    }
  }
  #sider_handleList {
    padding: 0 10px;
    font-size: 18px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    align-items: center;
    grid-column-gap: 20px;
    height: 24px;
    margin: 10px 0;
    span {
      border-radius: 4px;
      line-height: 24px;
      padding-top: 4px;
    }
    span:hover {
      background: #eeecec;
    }
  }
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
#silder_bottom {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 50px;
  border-top: 1px solid #e9e9e9;

  div {
    width: 50%;
    height: 100%;
    float: left;
    line-height: 50px;
    cursor: pointer;
    &:hover {
      background: #e9e9e9;
    }
    span {
      margin: 0 2px;
    }
  }
  div:first-child {
    border-right: 1px solid #e9e9e9;
  }
}
</style>

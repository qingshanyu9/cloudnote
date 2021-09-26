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
        <li @click="collectHandle">
          <icon-font
            :type="collect ? 'icon-shoucang' : 'icon-shoucang1'"
            title="收藏"
          />
        </li>
        <li><icon-font type="icon-fenxiang" title="分享页面" /></li>
        <li @click="showDrawer">
          <icon-font type="icon-gengduo" title="页面设置" />
        </li>
      </ul>
    </div>
    <a-drawer
      title="页面选项"
      placement="right"
      :closable="false"
      :visible="visible"
      @close="onClose"
    >
      <ul class="drawer">
        <li>
          <div><icon-font type="icon-shouye22" class="icon" /> 自适应宽度</div>
          <div><a-switch v-model:checked="checked1" size="small" /></div>
        </li>
        <li>
          <div><icon-font type="icon-shouye22" class="icon" /> 小字体</div>
          <div><a-switch v-model:checked="checked2" size="small" /></div>
        </li>
        <li>
          <div><icon-font type="icon-shouye22" class="icon" /> 悬浮目录</div>
          <div><a-switch v-model:checked="checked3" size="small" /></div>
        </li>
        <li>
          <div><icon-font type="icon-shouye22" class="icon" /> 编辑保护</div>
          <div><a-switch v-model:checked="checked4" size="small" /></div>
        </li>
        <li>
          <div><icon-font type="icon-shouye22" class="icon" /> 删除页面</div>
          <div><a-switch v-model:checked="checked5" size="small" /></div>
        </li>
        <li>
          <div><icon-font type="icon-shouye22" class="icon" /> 移动到...</div>
        </li>
        <li>
          <div><icon-font type="icon-shouye22" class="icon" /> 嵌入到...</div>
        </li>
        <li>
          <div>
            <icon-font type="icon-shouye22" class="icon" /> 复制访问链接
          </div>
        </li>
        <li>
          <div>
            <icon-font type="icon-shouye22" class="icon" /> 行内页面引用
          </div>
        </li>
        <li>
          <div>
            <icon-font type="icon-shouye22" class="icon" /> 嵌入页面引用
          </div>
        </li>
        <li>
          <div><icon-font type="icon-shouye22" class="icon" /> 导出页面</div>
        </li>
        <li>
          <div><icon-font type="icon-shouye22" class="icon" /> 页面历史</div>
        </li>
      </ul>
    </a-drawer>
  </header>
</template>
<script>
import { createFromIconfontCN } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2834657_34hlxiwtnzl.js",
});
export default defineComponent({
  components: {
    IconFont,
  },
  setup() {
    const visible = ref(false);
    const showDrawer = () => {
      visible.value = true;
    };

    const onClose = () => {
      visible.value = false;
    };
    const checked1 = ref(false);
    const checked2 = ref(false);
    const checked3 = ref(false);
    const checked4 = ref(false);
    const checked5 = ref(false);
    const collect = ref(false);
    const collectHandle = () => {
      console.log(collect.value);
      collect.value = !collect.value;
    };
    return {
      visible,
      showDrawer,
      onClose,
      visible,
      checked1,
      checked2,
      checked3,
      checked4,
      checked5,
      collect,
      collectHandle,
    };
  },
});
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
.drawer > li {
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  align-items: center;
  line-height: 30px;
}
.icon {
  font-size: 16px;
}
.ant-switch-checked {
  background-color: #cf5659;
}
</style>

<script setup>
import {
  EllipsisOutlined,
  SnippetsOutlined,
  VerticalAlignBottomOutlined,
  EnterOutlined,
  LinkOutlined,
  ContactsOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
const props = defineProps({
  item: Object,
});
const rotate1 = -90;
const rotate2 = 180;
const openPage = () => {};
const movePage = () => {};
const copyPageId = () => {};
const copyPage = () => {};
const delectPage = () => {
  console.log(props.item);
  props.item.status = 0;
};
</script>

<template>
  <span>
    <a-dropdown :trigger="['click']" placement="bottomCenter">
      <a class="ant-dropdown-link" @click.prevent style="color: unset">
        <EllipsisOutlined />
        <slot></slot>
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item key="0">
            <VerticalAlignBottomOutlined
              style="font-size: 14px"
              :rotate="rotate1"
            />
            在右侧编辑区打开
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="1">
            <EnterOutlined
              style="font-size: 14px"
              :rotate="rotate2"
              @click="openPage"
            />
            移动到...
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="2">
            <LinkOutlined style="font-size: 14px" @click="movePage" />
            复制访问链接
          </a-menu-item>
          <a-menu-item key="3">
            <ContactsOutlined style="font-size: 14px" @click="copyPageId" />
            复制页面ID
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="4">
            <SnippetsOutlined style="font-size: 14px" @click="copyPage" />
            拷贝副本
          </a-menu-item>
          <a-menu-item key="5" @click="$emit('rename', item)">
            <FormOutlined style="font-size: 14px" />
            重命名
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="6" @click="delectPage">
            <DeleteOutlined style="font-size: 14px" />
            删除
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </span>
</template>

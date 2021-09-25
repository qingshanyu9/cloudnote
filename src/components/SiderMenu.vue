<template>
  <div>
    <a-menu
      style="width: 200px"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      :mode="mode"
      :theme="theme"
    >
      <a-menu-item key="1">
        <template #icon>
          <CheckSquareTwoTone />
        </template>
        待办列表
      </a-menu-item>
      <a-menu-item key="2">
        <template #icon>
          <CalendarOutlined />
        </template>
        Navigation Two
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>Navigation Three</template>
        <a-menu-item key="3">Option 3</a-menu-item>
        <a-menu-item key="4">Option 4</a-menu-item>
        <a-sub-menu key="sub1-2" title="Submenu">
          <a-menu-item key="5">Option 5</a-menu-item>
          <a-menu-item key="6">Option 6</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #icon>
          <SettingOutlined />
        </template>
        <template #title>Navigation Four</template>
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import {
  CheckSquareTwoTone,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  setup() {
    const state = reactive({
      mode: "inline",
      theme: "light",
      selectedKeys: ["1"],
      openKeys: ["sub1"],
    });

    return { ...toRefs(state) };
  },

  data() {
    return {
      menuList: [
        {
          key: "1",
          icon: 'CheckSquareTwoTone',
          title: "待办事项",
        },
        {
          key: "2",
          icon: 'EditTwoTone',
          title: "会议纪要",
        },
        {
          key: "3",
          icon: 'SnippetsTwoTone',
          title: "简单看板",
        },
        {
          key: "4",
          icon: 'FundTwoTone',
          title: "数据趋势",
        },
        {
          key: "5",
          icon: 'Html5TwoTone',
          title: "前端注意事项",
        },
      ],
    };
  },
});
</script>

<style scoped>
</style>
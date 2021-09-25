<template>
  <div>
    <a-menu
      style="width: 200px"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      :mode="mode"
      :theme="theme"
    >
      <a-menu-item v-for="menu of menuList" :key="menu.key" @click="onMenuItemClick(menu)">
        <component :is="$antIcons[menu.icon]" />
        <span>{{menu.title}}</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
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
      ],
    };
  },

  methods: {
      onMenuItemClick(item) {
          console.log(item.title);
      },
  }
});
</script>

<style scoped>
</style>
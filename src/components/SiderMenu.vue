<template>
  <div class="siderbar-container">
    <div class="siderbar-menu">
      <a-menu
        style="width: 200px"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        :mode="mode"
        :theme="theme"
      >
        <a-menu-item
          v-for="menu of menuList"
          :key="menu.key"
          @click="onMenuItemClick(menu)"
        >
          <component :is="$antIcons[menu.icon]" />
          <span>{{ menu.title }}</span>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="bottom-menu">
      <a-button size="large" @click="onLogOut"> 退出登陆 </a-button>
      <a-button size="large"> 模板中心 </a-button>
    </div>
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
          icon: "CheckSquareTwoTone",
          title: "待办事项",
        },
        {
          key: "2",
          icon: "EditTwoTone",
          title: "会议纪要",
        },
        {
          key: "3",
          icon: "SnippetsTwoTone",
          title: "简单看板",
        },
        {
          key: "4",
          icon: "FundTwoTone",
          title: "数据趋势",
        },
        {
          key: "5",
          icon: "Html5TwoTone",
          title: "前端注意事项",
        },
      ],
    };
  },

  methods: {
    onMenuItemClick(item) {
      console.log(item.title);
    },
    onLogOut() {
        window.localStorage.removeItem("userID");
        window.location.replace("http://localhost:3000/login");
    },
  },
});
</script>

<style scoped>
.siderbar-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.siderbar-menu {
  flex: auto;
}
.bottom-menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
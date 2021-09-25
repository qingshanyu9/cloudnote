<template>
  <div>
    <a-row type="flex" id="header-row">
      <a-col flex="auto">待办列表</a-col>
      <a-col flex="auto"></a-col>
      <a-col flex="300px" id="header-menu">
        <a-button type="text" @click="onStar">
          <template #icon><StarTwoTone /></template>
        </a-button>
        <a-button type="text" @click="onDel">
          <template #icon><DeleteTwoTone /></template>
        </a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8"></a-col>
      <a-col :span="8"></a-col>
      <a-col :span="8"></a-col>
    </a-row>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import {
  StarTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons-vue";
export default defineComponent({
  setup() {
    const state = reactive({
      //   mode: "inline",
      //   theme: "light",
      //   selectedKeys: ["1"],
      //   openKeys: ["sub1"],
    });

    return { ...toRefs(state) };
  },

  methods: {
    onStar() {
      console.log('star');
    },

    onDel() {
      console.log('del');
    }

  },

  components: {
    StarTwoTone,
    DeleteTwoTone,
  },
  
});
</script>

<style scoped>
#header-row {
  padding: 10px;
  font-size: 20px;
}
#header-menu {
  display: flex;
  align-items: center;
  justify-content: right;
}
#header-menu > * {
  margin-right: 10px;
}
</style>
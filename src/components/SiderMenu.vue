<template>
  <div class="siderbar-container">
    <div>
      <a-button type="text" @click="onAddMenuItem">添加</a-button>
    </div>
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
          :key="menu.id"
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
import { message } from "ant-design-vue";
import APIS from "../common/apis";
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

  mounted() {
    this.getUserAllNotes();
  },

  data() {
    return {
      menuList: [
        {
          id: "1632628460036",
          icon: "ProfileTwoTone",
          title: "待办事项",
        },
        // {
        //   key: "2",
        //   icon: "EditTwoTone",
        //   title: "会议纪要",
        // },
        // {
        //   key: "3",
        //   icon: "SnippetsTwoTone",
        //   title: "简单看板",
        // },
        // {
        //   key: "4",
        //   icon: "FundTwoTone",
        //   title: "数据趋势",
        // },
        // {
        //   key: "5",
        //   icon: "Html5TwoTone",
        //   title: "前端注意事项",
        // },
      ],
    };
  },

  methods: {
    async onAddMenuItem() {
      // 创建文件，获得id 推入列表
      const { id } = await this.createNewNote();
      this.menuList.push({
        id: id,
        icon: "ProfileTwoTone",
        title: "我的笔记",
      });
    },
    async onMenuItemClick(item) {
      // TODO 获取id代表的内容
      const { context, noteID } = await this.getNoteContext(item);
      document.dispatchEvent(
        new CustomEvent("onClickMenuItem", { detail: { context, noteID } })
      );
      console.log(context, noteID);
    },
    onLogOut() {
      window.localStorage.removeItem("userID");
      window.location.replace("http://localhost:3000/login");
    },
    createNewNote() {
      let params = {
        id: window.localStorage.getItem("userID"),
        title: "新页面",
        context: "",
      };
      let init = {
        body: JSON.stringify(params), //json字符串和对象都可以，推荐使用json字符串，这样可以在控制台network里看到请求参数
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        method: "POST",
      };
      let key = "add_note";
      message.loading({
        content: "正在新建...",
        key,
      });
      return new Promise((resolve, reject) => {
        fetch(APIS.ADD_NOTE, init)
          .then(function (res) {
            return res.json();
          })
          .then(function (json) {
            console.log(json);
            let { errcode, errmessage = "新建失败", nodeid } = json;
            if (Number(errcode) === 200) {
              // 成功
              message.success({
                content: "新建成功!",
                key,
                duration: 2,
              });
              resolve({ id: nodeid });
            } else {
              // 失败
              message.error({
                content: errmessage,
                key,
                duration: 2,
              });
              reject();
            }
            return json;
          })
          .catch(function (err) {
            message.error({
              content: "网络异常",
              key,
              duration: 2,
            });
          });
      });
    },
    getNoteContext(item) {
      let params = {
        nodeid: item.id,
      };
      let init = {
        body: JSON.stringify(params), //json字符串和对象都可以，推荐使用json字符串，这样可以在控制台network里看到请求参数
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        method: "POST",
      };
      let key = "add_note";
      message.loading({
        content: "正在获取...",
        key,
      });
      return new Promise((resolve, reject) => {
        fetch(APIS.FIND_CONTEXT, init)
          .then(function (res) {
            return res.json();
          })
          .then(function (json) {
            console.log(json);
            let { errcode, errmessage = "获取失败" } = json;
            if (Number(errcode) === 200) {
              // 成功
              let { context = "" } = json;
              message.success({
                content: "获取成功!",
                key,
                duration: 2,
              });
              resolve({ context, noteID: item.id });
            } else {
              // 失败
              message.error({
                content: errmessage,
                key,
                duration: 2,
              });
              reject();
            }
            return json;
          })
          .catch(function (err) {
            message.error({
              content: "网络异常",
              key,
              duration: 2,
            });
          });
      });
    },
    getUserAllNotes() {
      const self = this;
      let params = {
        id: window.localStorage.getItem("userID"),
      };
      let init = {
        body: JSON.stringify(params), //json字符串和对象都可以，推荐使用json字符串，这样可以在控制台network里看到请求参数
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        method: "POST",
      };
      let key = "GET_NODE_DETAILS";
      return new Promise((resolve, reject) => {
        fetch(APIS.GET_NODE_DETAILS, init)
          .then(function (res) {
            return res.json();
          })
          .then(function (json) {
            console.log(json);
            let { errcode, errmessage = "获取失败" } = json;
            if (Number(errcode) === 200) {
              // 成功
              message.success({
                content: "获取成功!",
                key,
                duration: 2,
              });
              let { node } = json;
              let count = 0;
              self.menuList = node.map((item) => {
                let obj = { title: "我的笔记", icon: "ProfileTwoTone" };
                obj.id = item;
                return obj;
              });
              resolve(true);
            } else {
              // 失败
              message.error({
                content: errmessage,
                key,
                duration: 2,
              });
              reject();
            }
            return json;
          })
          .catch(function (err) {
            console.log(err);
            message.error({
              content: "网络异常",
              key,
              duration: 2,
            });
          });
      });
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
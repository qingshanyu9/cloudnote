<template>
  <div>
    <a-row type="flex" id="header-row">
      <a-col flex="auto">我的笔记</a-col>
      <a-col flex="auto"></a-col>
      <a-col flex="300px" id="header-menu">
        <!-- <a-button type="text" @click="onStar">
          <template #icon><StarTwoTone /></template>
        </a-button> -->
        <a-button type="text" @click="onDel">
          <template #icon><DeleteTwoTone /></template>
        </a-button>
      </a-col>
    </a-row>
    <div id="eidt-area-container">
      <div
        v-for="(con, i) in conList"
        :key="i"
        class="edit-content-area"
        contenteditable="true"
        @input="onChangeText"
        @blur="onBlurText(i)"
        @keydown.enter.prevent="enterMsg"
      >
        <!-- @keydown.backspace.prevent="delContent" -->
        {{ con }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, nextTick, ref } from "vue";
import { StarTwoTone, DeleteTwoTone } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import APIS from "../common/apis";
const SPLIT_TAG = "|";
export default defineComponent({
  setup() {
    
  },

  mounted() {
    document.addEventListener("onClickMenuItem", (params) =>
      this.loadContent(params)
    );
  },

  data() {
    return {
      conList: [], // TODO 有可能会有多段，用数组存储
      editValue: null, // 记录当前正在编辑的值
      placeholder: "可在此处编辑",
      nodeid: null,
    };
  },

  methods: {
    loadContent(params) {
      const { context, noteID } = params.detail;
      this.nodeid = noteID;
      if (String(context).indexOf(SPLIT_TAG) !== -1) {
        this.conList = context.split(SPLIT_TAG);
      } else if(context){
        this.conList = [context];
      } else {
        this.conList = [' '];
      }
    },
    onStar() {
      console.log("star");
    },
    async onDel() {
      const noteID = this.nodeid
      const result = await this.delNote();
      document.dispatchEvent(
        new CustomEvent("onDelNote", { detail: { noteID } })
      );
    },
    onChangeText(event) {
      const content = event.target.textContent;
      this.editValue = content;
      console.log(content);
    },
    async enterMsg(event) {
      const target = event.target;
      // 新建可编辑div
      this.editValue = null;
      this.conList.push("");
      await nextTick();
      const len = this.conList.length;
      const editAreaList = document.querySelectorAll(".edit-content-area");
      editAreaList[len - 1].focus();
    },
    // delContent() {
    //   if() {

    //   }
    // },
    async onBlurText(index) {
      if (this.editValue !== null) {
        const editAreaList = document.querySelectorAll(".edit-content-area");
        // editAreaList[index].innerHTML = '';
        // await nextTick();
        this.conList[index] = String(this.editValue);
        const result = await this.editContext(this.conList.join(SPLIT_TAG));
        this.editValue = null;
      }
    },
    editContext(context) {
      let params = {
        nodeid: this.nodeid,
        context,
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
      return new Promise((resolve, reject) => {
        fetch(APIS.EDIT_CONTEXT, init)
          .then(function (res) {
            return res.json();
          })
          .then(function (json) {
            console.log(json);
            let { errcode, errmessage = "保存失败" } = json;
            if (Number(errcode) === 200) {
              // 成功
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
            message.error({
              content: "网络异常",
              key,
              duration: 2,
            });
          });
      });
    },
    delNote() {
      let params = {
        id: window.localStorage.getItem('userID'),
        nodeid: this.nodeid,
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
      let key = "DELETE_NOTE";
      return new Promise((resolve, reject) => {
        fetch(APIS.DELETE_NOTE, init)
          .then(function (res) {
            return res.json();
          })
          .then(function (json) {
            console.log(json);
            let { errcode, errmessage = "删除失败" } = json;
            if (Number(errcode) === 200) {
              // 成功
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
            message.error({
              content: "网络异常",
              key,
              duration: 2,
            });
          });
      });
    },
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

.edit-content-area {
  outline: none;
  padding: 5px 10px;
  font-size: 16px;
}
</style>
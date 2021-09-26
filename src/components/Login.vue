<script>
import { defineComponent, reactive, toRaw } from "vue";
import { message } from 'ant-design-vue';
import APIS from "../common/apis";
export default defineComponent({
  setup() {},

  data() {
    return {
      account: "",
      password: "",
    };
  },

  methods: {
    onLogin() {
      console.log("onLogin", this.account, this.password);
      let params = {
        account: this.account,
        password: this.password,
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
      let key = "login";
      message.loading({
        content: '正在登陆...',
        key,
      });
      fetch(APIS.AUTH_VERIFY, init)
        .then(function (res) {
          return res.json();
        })
        .then(function (json) {
          console.log(json);
          let { errcode, errmessage = "登陆失败" } = json;
          if (Number(errcode) === 200) {
            // 成功
            message.success({
              content: '登陆成功!',
              key,
              duration: 2,
            });
            window.localStorage.setItem("userID", json.id);
            window.location.replace("http://localhost:3000");
          } else {
            // 失败
            message.error({
              content: errmessage,
              key,
              duration: 2,
            });
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
    },
    onRegister() {
      console.log("onRegister", this.account, this.password);
      let params = {
        account: this.account,
        password: this.password,
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
      let key = "register";
      message.loading({
        content: '正在注册...',
        key,
      });
      fetch(APIS.AUTH_SIGN, init)
        .then(function (res) {
          // fetch第一次拿到的是整个Response对象，要调用json()方法转成含有json数据的Promise
          return res.json();
        })
        .then((json) => {
          console.log(json);
          let { errcode, errmessage = "注册失败" } = json;
          if (Number(errcode) === 200) {
            // 成功
            let { id } = json;
            message.success({
              content: '注册成功!',
              key,
              duration: 2,
            });
            window.localStorage.setItem("userID", json.id);
            window.location.replace("http://localhost:3000");
          } else {
            // 失败
            message.error({
              content: errmessage,
              key,
              duration: 2,
            });
          }
        })
        .catch(function (err) {
            message.error({
              content: "网络异常",
              key,
              duration: 2,
            });
        });
      console.log("onRegister", this.account, this.password);
    },
  },
});
</script>

<template>
  <div id="container">
    <a-card title="Cloud Note" :bordered="false" style="width: 300px">
      <a-row class="row-class">
        <a-col :span="24">
          用户名：<a-input v-model:value="account" placeholder="用户名" />
        </a-col>
      </a-row>
      <a-row class="row-class">
        <a-col :span="24">
          密码：<a-input v-model:value="password" placeholder="密码" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" align="center">
          <a-button type="primary" @click="onLogin"> 登陆 </a-button>
        </a-col>
        <a-col :span="12" align="center">
          <a-button type="default" @click="onRegister"> 注册 </a-button>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  height: 100%;
  width: 100%;
}
.row-class {
  margin-bottom: 20px;
}
</style>

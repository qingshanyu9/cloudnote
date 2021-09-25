/*
 * @Description: 
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-09-25 14:45:03
 */
const koa = require('koa');
const bodyparser = require('koa-bodyparser');
const app = new koa();
const server = require('http').createServer(app.callback());
// 支持跨域
app.use(require('koa2-cors')());
app.use(bodyparser())
// 路由注册
const registerRouter = require('./routers')
app.use(registerRouter())

let port = 30000

server.listen(port, () => {
  console.log("start: http://localhost:" + port);
})
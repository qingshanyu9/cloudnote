/*
 * @Description: 
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-09-26 13:39:15
 */
const router = require('koa-router')()
const userdb = require('../tool/mongoose')
const sequelize = require('../tool/sequelize')
const os = require('os')

router.get('/systemoverview', async ctx => {
  let accountCount = 0
  let nodeCount = 0
  await userdb.findAllCount().then(result => {
    accountCount = result.length
  })
  await sequelize.findAllCount().then(result => {
    nodeCount = result.length
  })
  let currentTime = process.uptime()
  let loadavg = os.loadavg()
  let freemem = os.freemem()
  let totalmem = os.totalmem()
  ctx.response.body = {
    currentTime,
    loadavg,
    freemem,
    totalmem,
    accountCount,
    nodeCount
  }
})

module.exports = router
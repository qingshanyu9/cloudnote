const router = require('koa-router')()
const userdb = require('../tool/mongoose')
const sequelize = require('../tool/sequelize')
const ipdb = require('../tool/system')
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

router.get("/userplace", async ctx => {
    let message = {}
    console.log("asd");
    await ipdb.findAll().then(result => {
        for (let i of result) {
            let place = i.dataValues.place
            if (message[place] === undefined) {
                message[place] = 1
            } else {
                message[place] += 1
            }
        }
    })
    ctx.response.body = message
})

module.exports = router
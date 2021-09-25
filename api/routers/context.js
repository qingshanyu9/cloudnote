const router = require('koa-router')()
const sequelize = require('../tool/sequelize')

router.post('/findcontext', async ctx => {
    let { body } = ctx.request
    await sequelize.findNode({ id: body.nodeid })
        .then(result => {
            ctx.response.body = {
                errcode: 200,
                errmessage: '查找成功',
                context: result[0].dataValues.context
            }
            // console.log(ctx.response.body);
        })
        .catch(error => {
            ctx.response.body = {
                errcode: 500,
                errmessage: '系统错误',
                context: ''
            }
            // console.log(error);
        })
})

router.post('/editcontext', async ctx => {
    let { body } = ctx.request
    await sequelize.update({ nodeid: body.nodeid, context: body.context })
        .then(result => {
            ctx.response.body = {
                errcode: 200,
                errmessage: '修改成功'
            }
        })
        .catch(error => {
            ctx.response.body = {
                errcode: 500,
                errmessage: '系统错误'
            }
            console.log(error);
        })
})

module.exports = router

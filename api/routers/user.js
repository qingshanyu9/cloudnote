const router = require('koa-router')()
const userdb = require('../tool/mongoose')

router.post('/sign', async ctx => {
    let { body } = ctx.request
    await userdb.create({
        name: body.name,
        password: body.password,
        account: body.account
    }).then(result => {
        ctx.response.body = {
            errcode: 200,
            errmessage: '',
            id: result
        }
    })
})

router.post('/verify', async ctx => {
    let { body } = ctx.request
    await userdb.verify({
        account: body.account,
        password: body.password
    }).then(result => {
        if (result) {
            ctx.response.body = {
                errcode: 200,
                errmessage: '',
                id: result._id.toString(),
                name: result.name
            }
        } else {
            ctx.response.body = {
                errcode: 500,
                errmessage: '验证失败'
            }
        }
    })
})

module.exports = router
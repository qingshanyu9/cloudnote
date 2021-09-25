const router = require('koa-router')()
const userdb = require('../tool/mongoose')
const sequelize = require('../tool/sequelize')

router.post('/getnodedetails', async ctx => {
    let { body } = ctx.request
    await userdb.findNode({ _id: body.id })
        .then(result => {
            ctx.response.body = {
                errcode: 200,
                errmessage: '请求成功',
                options: '寻找所有标题',
                node: result
            }
        })
})

router.post('/addnode', async ctx => {
    let { body } = ctx.request
    await sequelize.create({ title: body.title, context: body.context })
        .then(async result => {
            // console.log();
            await userdb.addNode({ _id: body.id, id: result.dataValues.id, parentTitle: body.parent || '' })
                .then(result => {
                    if (result) {
                        ctx.response.body = {
                            errcode: 200,
                            errmessage: ''
                        }
                    } else {
                        ctx.response.body = {
                            errcode: 500,
                            errmessage: '创建失败'
                        }
                    }
                })
        })
})

// 暂定收藏功能
router.post('/addnodeid', async ctx => {
    let { body } = ctx.request
    await userdb.addNode({ _id: body.id, id: body.nodeid, parentTitle: body.parent || '' })
        .then(result => {
            if (result) {
                ctx.response.body = {
                    errcode: 200,
                    errmessage: '创建成功',
                    id: result
                }
            } else {
                ctx.response.body = {
                    errcode: 500,
                    errmessage: '创建失败',
                    id: ''
                }
            }
        })
})

router.post('/createNodeFolder', async ctx => {
    let { body } = ctx.request
    await userdb.createNodeFolder({ _id: body.id, title: body.title }).then(result => {
        if (result) {
            ctx.response.body = {
                errcode: 200,
                errmessage: '创建成功',
            }
        } else {
            ctx.response.body = {
                errcode: 500,
                errmessage: '创建失败',
            }
        }
    })
})

router.post('/deletenode', async ctx => {
    let { body } = ctx.request
    await userdb.deleteNode({ _id: body.id, nodeid: body.nodeid })
        .then(result => {
            if (result) {
                ctx.response.body = {
                    errcode: 200,
                    errmessage: '删除成功'
                }
            }
        })
})

module.exports = router
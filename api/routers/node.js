/*
 * @Description: 
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-09-26 13:25:24
 */
const router = require('koa-router')()
const userdb = require('../tool/mongoose')
const sequelize = require('../tool/sequelize')

router.post('/getnodedetails', async ctx => {
  let { body } = ctx.request
  try {
    await userdb.findNode({ _id: body.id })
      .then(result => {
        ctx.response.body = {
          errcode: 200,
          errmessage: '请求成功',
          node: result
        }
      })
  } catch (error) {
    ctx.response.body = {
      errcode: 500,
      errmessage: '系统错误',
      node: result
    }
  }
})

router.post('/addnode', async ctx => {
  let { body } = ctx.request
  try {
    await sequelize.create({ title: body.title, context: body.context })
      .then(async result => {
        // console.log();
        await userdb.addNode({ _id: body.id, id: result.dataValues.id, parentTitle: body.parent || '' })
          .then(result => {
          console.log(result)
            if (result) {
              ctx.response.body = {
                errcode: 200,
                errmessage: '',
                nodeid: result
              }
            } else {
              ctx.response.body = {
                errcode: 500,
                errmessage: '创建失败'
              }
            }
          })
      })
  } catch (err) {
    ctx.response.body = {
      errcode: 500,
      errmessage: '创建失败'
    }
  }
})

// 暂定收藏功能
router.post('/addnodeid', async ctx => {
  let { body } = ctx.request
  try {
    await userdb.addNode({ _id: body.id, id: body.nodeid, parentTitle: body.parent || '' })
      .then(result => {
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
  } catch (error) {
    ctx.response.body = {
      errcode: 500,
      errmessage: '创建失败',
    }
  }
})

router.post('/createNodeFolder', async ctx => {
  let { body } = ctx.request
  try {
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
  } catch (error) {
    ctx.response.body = {
      errcode: 500,
      errmessage: '创建失败',
    }
  }
})

router.post('/deletenode', async ctx => {
  let { body } = ctx.request
  try {
    await userdb.deleteNode({ _id: body.id, nodeid: body.nodeid })
      .then(result => {
        if (result) {
          ctx.response.body = {
            errcode: 200,
            errmessage: '删除成功'
          }
        }
      })
  } catch (error) {
    ctx.response.body = {
      errcode: 500,
      errmessage: '删除失败'
    }
  }
})

module.exports = router
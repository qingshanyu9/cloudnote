const router = require('koa-router')()
const userdb = require('../tool/mongoose')

router.post('/sign', async ctx => {
  let { body } = ctx.request
  try {
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
  } catch (error) {
    ctx.response.body = {
      errcode: 500,
      errmessage: '系统错误'
    }
  }
})

router.post('/verify', async ctx => {
  let { body } = ctx.request
  try {
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
  } catch (error) {
    ctx.response.body = {
      errcode: 500,
      errmessage: '系统错误'
    }
  }
})

// 获取所有用户
router.get('/alluser', async ctx => {
  try {
    await userdb.findAllCount().then(result => {
      let arr = []
      for (let i of result) {
        arr.push({
          _id: i._id.toString(),
          account: i.account,
          name: i.name,
          password: i.password
        })
      }
      ctx.response.body = {
        errcode: 200,
        errmessage: '',
        user: arr
      }
    })
  } catch (error) {
    ctx.response.body = {
      errcode: 200,
      errmessage: '',
      user: arr
    }
  }
})

// 传入用户Id, 用户名称, 用户密码
router.post('/edituser', async ctx => {
  let { body } = ctx.request
  try {
    await userdb.editUser({ _id: body.id, name: body.name, password: body.password })
      .then(result => {
        if (result) {
          ctx.response.body = {
            errcode: 200,
            errmessage: '',
          }
        } else {
          ctx.response.body = {
            errcode: 500,
            errmessage: '',
          }
        }
      })
  } catch (error) {
    ctx.response.body = {
      errcode: 500,
      errmessage: '',
    }
  }
})

// 删除指定用户
router.post('/deleteuser', async ctx => {
  let { body } = ctx.request
  try {
    await userdb.deleteUser({ _id: body.id }).then(result => {
      if (result) {
        ctx.response.body = {
          errcode: 200,
          errmessage: '删除成功'
        }
      } else {
        ctx.response.body = {
          errcode: 500,
          errmessage: '系统错误'
        }
      }
    })
  } catch (error) {
    ctx.response.body = {
      errcode: 500,
      errmessage: '系统错误'
    }
  }
})

module.exports = router
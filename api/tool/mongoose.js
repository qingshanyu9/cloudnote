var mongoose = require('mongoose')
var Schema = mongoose.Schema;
//连接数据库
mongoose.connect('mongodb://localhost:27017/node', {
    useNewUrlParser: true
})

//监听数据库连接状态
mongoose.connection.once('open', () => {
    console.log('数据库连接成功……')
})
mongoose.connection.once('close', () => {
    console.log('数据库断开……')
})

//创建Schema对象（约束）
var stuSchema = new Schema({
    name: String,
    account: String,
    password: String,
    node: Array,
})

//将stuSchema映射到一个MongoDB collection并定义这个文档的构成
var userModle = mongoose.model('users', stuSchema)

module.exports = {
    // 新建账户名
    create(obj) {
        return new Promise(function (resolve, reject) {
            userModle.create({
                name: obj.name,
                account: obj.account,
                password: obj.password,
                node: []
            }, (err, docs) => {
                if (!err) {
                    resolve(docs._id.toString())
                } else {
                    reject(err)
                }
            })
        })
    },
    // 验证账户名称
    verify(obj) {
        return new Promise(function (resolve, reject) {
            userModle.findOne({ account: obj.account, password: obj.password }, (err, docs) => {
                if (!err) {
                    resolve(docs._id.toString())
                } else {
                    reject(false)
                }
            })
        })
    },

    // 获取所有笔记粗略信息
    findNode(obj) {
        return new Promise(function (resolve, reject) {
            userModle.findById(obj._id, (err, docs) => {
                // console.log(typeof obj._id);
                if (!err) {
                    resolve(docs.node)
                } else {
                    reject(err)
                }
            })
        })
    },

    // 增加笔记粗略信息
    addNode(obj) {
        return new Promise(function (resolve, reject) {
            userModle.findById(obj._id, (err, docs) => {
                if (!err) {
                    // resolve(false)
                    if (obj.parentTitle == '' && docs.node.indexOf(obj.id) == -1) {
                        docs.node.push(obj.id)
                    } else {
                        for (let i in docs.node) {
                            if (docs.node[i].parentTitle == obj.parentTitle && docs.node[i].node.indexOf(obj.id) == -1) {
                                docs.node[i].node.push(obj.nodeid)
                            }
                        }
                    }
                    docs.save()
                    resolve(true)
                } else {
                    reject(err)
                }
            })
        })
    },
    // 创建文件夹
    createNodeFolder(obj) {
        return new Promise((resolve, reject) => {
            // 查询是否具有重复文件夹
            this.findNodeFolder({ _id: obj._id, title: obj.title }).then(result => {
                if (!result) {
                    userModle.findById(obj._id, (err, docs) => {
                        docs.node.push({ title: obj.title, node: [] })
                        docs.save()
                    })
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    },
    // 寻找文件夹
    findNodeFolder(obj) {
        return new Promise((resolve, reject) => {
            userModle.findById(obj._id, (err, docs) => {
                if (!err) {
                    for (let i in docs.node) {
                        if (docs.node[i].title == obj.title) {
                            resolve(true)
                        }
                    }
                    resolve(false)
                } else {
                    reject(err)
                }
            })
        })
    },

    // 删除笔记粗略信息
    deleteNode(obj) {
        return new Promise((resolve, reject) => {
            userModle.findById(obj._id, (err, docs) => {
                if (!err) {
                    docs = deleteChildren(docs, obj.nodeid)
                    docs.save()
                    resolve(true)
                } else {
                    reject(err)
                }
            })
        })
    }

}

function deleteChildren(docs, id) {
    for (let i in docs.node) {
        if (typeof docs.node[i] === 'string') {
            console.log(docs.node[i], id);
            if (docs.node[i] === id) {
                docs.node.splice(i, 1)
            }
        } else {
            if (docs.node[i].node != undefined && docs.node[i] != null) {
                docs.node.splice(i, 1, { title: docs.node[i].title, node: deleteChildren(docs.node[i], id).node })
            }
        }
    }
    return docs
}
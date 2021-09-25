const Sequelize = require('sequelize')

// 连接数据库
const sequelize = new Sequelize('nodes', 'account', 'password', {
    host: 'localhost',
    dialect: 'mysql', // 这里可以改成任意一种关系型数据库

    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
})

let contextModule = sequelize.define('nodes', {
    id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
    },
    title: Sequelize.STRING(32),
    context: Sequelize.TEXT
}, {
    timestamps: false
});

sequelize.authenticate().then(() => {
    console.log('MySql连接成功');
}).catch(error => {
    console.error('Unable to connect to the database:', error);
})

module.exports = {
    create(obj) {
        return contextModule.create({
            id: new Date().getTime().toString(),
            title: obj.title.toString(),
            context: obj.context.toString(),
        })
    },

    findNode(obj) {
        return contextModule.findAll({
            where: {
                id: obj.id
            }
        })
    },

    update(obj) {
        return contextModule.update({
            context: obj.context + ""
        }, {
            where: {
                id: obj.nodeid
            }
        })
    }
}
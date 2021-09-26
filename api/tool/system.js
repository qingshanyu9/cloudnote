const Sequelize = require('sequelize')
const axios = require('axios')

// 连接数据库
const sequelize = new Sequelize('nodes', 'nodes', '620dfafd79', {
    host: 'localhost',
    dialect: 'mysql', // 这里可以改成任意一种关系型数据库

    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
})

let ipModule = sequelize.define('ip_where', {
    ip: Sequelize.STRING(16),
    place: Sequelize.STRING(64),
    account: Sequelize.STRING(32)
}, {
    timestamps: false
});

sequelize.authenticate().then(() => {
    console.log('ip连接成功');
}).catch(error => {
    console.error('Unable to connect to the database:', error);
})

module.exports = {
    async create(obj) {
        let place = ''
        let account = obj.account === undefined ? '*' : obj.account
        await axios.get("https://restapi.amap.com/v3/ip?ip=" + obj.ip + "&output=JSON&key=273159bd451e39b7c24d21a56fa975ef").then(result => {
            let { data } = result
            place = data.city
        })
        place = typeof place === 'object' ? 'localhost' : place
        return ipModule.create({
            ip: obj.ip,
            place: place,
            account: account,
        })
    },

    findAll() {
        return ipModule.findAll()
    }
}
# cloudnote

## 启动

``` sh
# npm
$ npm install
$ npm run dev

# yarn
$ yarn install
$ yarn dev
```

# BaseURL http://121.36.10.13:30000

# 登录

| API     | 输入             | 备注                   | 请求方式 | 返回值   |
| ------- | ---------------- | ---------------------- | -------- | -------- |
| /verify | account,password | 返回唯一标识符ID和名称 | POST     | name、id |

返回示例

`{
    "errcode": 200,
    "errmessage": "",
    "id": "614df1e30aab0adc97c3af9a",
    "name": "asd"
}`

# 注册

| API   | 输入                  | 备注             | 请求方式 | 返回值 |
| ----- | --------------------- | ---------------- | -------- | ------ |
| /sign | account,password,name | 返回唯一标识符ID | POST     | id     |

返回示例

` {
    "errcode": 200,
    "errmessage": "",
    "id": "614ea68dda5c0c0a6fadbdd3"
}`

# 返回用户所有标题

| API             | 输入 | 备注                   | 请求方式 | 返回值 |
| --------------- | ---- | ---------------------- | -------- | ------ |
| /getnodedetails | id   | 用唯一标识符，返回数组 | POST     | node   |

` {
    "errcode": 200,
    "errmessage": "请求成功",
    "options": "寻找所有标题",
    "node": [
        "1632531661700",
        "1632531661701"
    ]
}`

# 增加笔记

| API      | 输入    | 备注             | 请求方式 | 返回值  |
| -------- | ------- | ---------------- | -------- | ------- |
| /addnode | id      | 账户唯一标识符   | POST     | boolean |
|          | title   | 文章标题         |          |         |
|          | context | 文章内容         |          |         |
|          | parent  | 文件夹（可不填） |          |         |

`{`
    `"errcode": 200,`
    `"errmessage": "",`
    `"id": true`
`}`

# 增加文件夹

| API               | 输入  | 备注           | 请求方式 | 返回值 |
| ----------------- | ----- | -------------- | -------- | ------ |
| /createNodeFolder | id    | 账户唯一标识符 | POST     |        |
|                   | title | 文件夹标题     |          |        |

`{`
    `"errcode": 200,`
    `"errmessage": "创建成功"`
`}`

# 删除笔记

| API         | 输入   | 备注           | 请求方式 | 返回值 |
| ----------- | ------ | -------------- | -------- | ------ |
| /deletenode | id     | 账户唯一标识符 | POST     |        |
|             | nodeid | node唯一标识符 |          |        |

`{`
    `"errcode": 200,`
    `"errmessage": "删除成功"`
`}`

# 获取笔记详细内容

| API          | 输入   | 备注       | 请求方式 | 返回值 |
| ------------ | ------ | ---------- | -------- | ------ |
| /findcontext | nodeid | node标识符 | POST     |        |

`{`
    `"errcode": 200,`
    `"errmessage": "查找成功",`
    `"context": "123"`
`}`

# 修改笔记详细内容

| API          | 输入    | 备注       | 请求方式 | 返回值 |
| ------------ | ------- | ---------- | -------- | ------ |
| /editcontext | nodeid  | node标识符 | POST     |        |
|              | context | 文本内容   |          |        |



`{`
    `"errcode": 200,`
    `"errmessage": "修改成功"`
`}`
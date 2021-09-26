<!--
 * @Description: 
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-09-26 09:51:43
-->
<template>
  <div class="userDetails">
    <el-table :data="table"
              style="width: 100%">
      <el-table-column label="账号"
                       width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.account }}</span>
        </template>
      </el-table-column>

      <el-table-column label="账户名"
                       width="180">
        <template slot-scope="scope">
          <el-input v-if="scope.row.editFlag"
                    :placeholder="scope.row.name"
                    v-model="scope.row.newName"></el-input>
          <span v-else
                style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="密码"
                       width="180">
        <template slot-scope="scope">
          <el-input v-if="scope.row.editFlag"
                    :placeholder="scope.row.password"
                    v-model="scope.row.newPassword"
                    :minlength=3
                    :maxlength=16></el-input>
          <span v-else
                style="margin-left: 10px">{{ scope.row.password }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="primary"
                     @click="editing(scope.$index, scope.row)"
                     v-if='!scope.row.editFlag'>编辑</el-button>
          <el-button size="mini"
                     type="primary"
                     @click="edited(scope.$index, scope.row)"
                     v-else>完成</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: [],
  },
  data () {
    return {
      name: '',
      password: '',
      table: [],
    };
  },
  methods: {
    handleDelete (index, row) {
      console.log(index, row);
      this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.axios
          .post(this.$store.state.requestURL + "/deleteuser", {
            id: row._id,
          })
          .then((result) => {
            let { data } = result
            if (data.errcode == 200) {
              this.table.splice(index, 1)
              this.$message.success("删除成功")
            } else {
              this.$message.error("系统错误")
            }
          });
      });
    },

    editing (index, row) {
      row.editFlag = true
    },

    edited (index, row) {
      row.editFlag = false
      row.newName = row.newName == '' ? row.name : row.newName
      row.newPassword = row.newPassword == '' ? row.password : row.newPassword
      if ((row.newName.length <= 3 || row.newName.length >= 16) || (row.newPassword.length <= 3 || row.newPassword.length >= 16)) {
        this.$message.error("输入错误，请重试！账户名和密码长度请保证在[4,15]")
        row.newName = ''
        row.newPassword = ''
        return;
      }
      this.axios.post(this.$store.state.requestURL + '/edituser', {
        id: row._id,
        name: row.newName,
        password: row.newPassword
      }).then(result => {
        let { data } = result
        if (data.errcode == 200) {
          this.$message.success("修改成功！")
          row.name = row.newName
          row.newName = ''
          row.password = row.newPassword
          row.newPassword = ''
        } else {
          this.$message.error("系统错误！")
        }
      })
    }
  },
  watch: {
    tableData (newValue, oldValue) {
      this.table = newValue;
      console.log(newValue);
    },
  },
};
</script>

<style>
.userDetails {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
}
</style>
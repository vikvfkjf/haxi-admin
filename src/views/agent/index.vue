<template>
  <div class="project-index-container">
    <div class="title">
      <h2>代理成员列表</h2>
      <el-button @click="add" size="mini">添加代理</el-button>
    </div>

    <div class="tables">
      <el-table :data="list" style="width: 100%" :header-cell-style="{background:'#ececec'}" height="calc(100% - 60px)"
        size="mini" @selection-change="handleSelectionChange" row-key="user_no" :tree-props="{children: 'childrens'}" default-expand-all>
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="user_no" label="编号" width="200">
        </el-table-column>
        <el-table-column prop="name" label="用户名" width="100">
        </el-table-column>
        <el-table-column prop="role" label="角色" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.role==1">管理员</span>
            <span v-if="scope.row.role==2">代理</span>
            <span v-if="scope.row.role==3">业务员</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-if="scope.row.status==2">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="100">
        </el-table-column>
        <el-table-column prop="eth_withdraw_address" label="eth提款地址" width="150"></el-table-column>
        <el-table-column prop="eth_withdraw_sum" label="eth总提现金额" width="150"></el-table-column>
        <el-table-column prop="tron_withdraw_address" label="tron提款地址" width="150"></el-table-column>
        <el-table-column prop="tron_withdraw_sum" label="tron总提现金额" width="150"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="updateAgent(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="deleteAgent(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pages.page"
        :page-sizes="[10,20,50,100]" :page-size="pages.per_page" layout="total, sizes, prev, pager, next, jumper"
        background :total="pages.total">
      </el-pagination>
    </div>

    <info-dialog ref="infoDialog" @success="success"></info-dialog>
    <add-dialog ref="addDialog" @success="success"></add-dialog>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    getAgentList,
    deleteAgent,
  } from '@/api/agent'
  import infoDialog from './components/info-dialog.vue'
  import addDialog from './components/add-dialog.vue'
  export default {
    name: 'project-index',
    components: {
      infoDialog,
      addDialog,
    },
    data() {
      return {
        base: process.env.VUE_APP_BASE_ADDRESS,
        list: [],
        disabled: true,
        multipleSelection: [],
        pages: {
          page: 1,
          per_page: 10,
          total: null,
        },
      }
    },
    mounted() {
      this.getAgentList();
    },
    methods: {

      getAgentList() {
        var params = {
          page: this.pages.page,
          per_page: this.pages.per_page
        }
        getAgentList(params).then(res => {
          console.log(res);
          if (res.status_code == 200) {
            this.list = res.data.data;
            this.pages.total = res.data.total;
          }
        })
      },
      
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val);
        if (val.length == 1) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      },

      handleSizeChange(e) {
        this.pages.per_page = e;
        this.getAgentList();
      },
      handleCurrentChange(e) {
        this.pages.page = e;
        this.getAgentList();
      },
      updateAgent(row) {
        this.$refs.infoDialog.show(row);
      },
      add() {
        this.$refs.addDialog.show();
      },
      success() {
        this.getAgentList();
      },

      deleteAgent(row) {
        console.log(row)
        this.$confirm('此操作将删除该代理, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var data = {
            user_no: String(row.user_no)
          }
          deleteAgent(data).then(res => {
            if (res.status_code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getAgentList();
            } else {
              this.$message({
                type: 'error',
                message: '删除失败'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .project-index-container {
    .title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 40px;
      padding: 0 20px;
      margin-bottom: 20px;
      background: #fff;
      align-items: center;

      h2 {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 3px;
        color: #3d3d3d;
        line-height: 40px;
      }
    }

    .tables {

      height: calc(100vh - 160px);
      -webkit-box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
      box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
      padding: 20px 20px;
      color: #606060;
      background-color: #fff;

      .opts {
        .el-button {
          margin-right: 10px;
        }
      }

      .el-pagination {
        margin: 20px 0;
        text-align: center;
      }
    }
  }

</style>

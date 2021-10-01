<template>
  <div class="user-index-container">
    <div class="title">
      <h2>用户列表</h2>
      <el-button @click="addUser" size="mini">添加用户</el-button>
    </div>

    <div class="tables">
      <div class="opts">
        <el-button type="text" icon="el-icon-coin" @click="consumeList" :disabled="disabled">消费记录</el-button>
        <el-button type="text" icon="el-icon-coin" @click="rechargeList" :disabled="disabled">充值记录</el-button>
      </div>

      <el-table :data="list" style="width: 100%" :header-cell-style="{background:'#ececec'}"
        height="calc(100% - 112px)" size="mini" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="id" label="id" width="50">
        </el-table-column>
        <el-table-column prop="user_no" label="用户编号" width="180">
        </el-table-column>
        <el-table-column prop="channel_key" label="通道编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="用户名称" width="150">
        </el-table-column>
        <el-table-column prop="level" label="用户等级" width="100">
        </el-table-column>
        <el-table-column prop="phone" label="联系方式" width="150">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="150">
        </el-table-column>

        <el-table-column prop="total_remain_sms" label="短信余额" width="150">
        </el-table-column>
        <el-table-column prop="task_rebate" label="扣减占比" width="100">
        </el-table-column>
        <el-table-column prop="status" label="企业认证状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1" style="color:green;">启用</span>
            <span v-if="scope.row.status==2" style="color:red;">禁用</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="license_path" label="营业执照">
        </el-table-column> -->
        <el-table-column prop="" label="操作" >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="changePassword(scope.row)">修改密码</el-button>
            <el-button type="warning" size="mini" @click="changeUser(scope.row)">修改用户信息</el-button>
            <el-button type="primary" size="mini" @click="recharge(scope.row)">充值</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pages.page"
        :page-sizes="[10,20,50,100]"
        :page-size="pages.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="pages.total">
      </el-pagination>
    </div>

    <password-dialog ref="passwordDialog" @success="success"></password-dialog>
    <info-dialog ref="infoDialog" @success="success"></info-dialog>
    <add-user-dialog ref="addUserDialog" @success="success"></add-user-dialog>
    <recharge-dialog ref="rechargeDialog" @success="success"></recharge-dialog>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  import {userList} from '@/api/user'
  import passwordDialog from './components/password-dialog.vue'
  import infoDialog from './components/info-dialog.vue'
  import addUserDialog from './components/add-user-dialog.vue'
  import rechargeDialog from './components/recharge-dialog.vue'
  export default {
    name: 'user-index',
    components:{
      passwordDialog,
      infoDialog,
      addUserDialog,
      rechargeDialog
    },
    data() {
      return {
        list:[],
        disabled:true,
        multipleSelection:[],
        pages:{
          page:1,
          per_page:10,
          total:null,
        },
      }
    },
    mounted() {
      this.userList();
    },
    methods: {
      
      userList() {
        var params = {
          page:this.pages.page,
          per_page:this.pages.per_page
        }
        userList(params).then(res => {
          console.log(res);
          if(res.status_code == 200) {
            this.list = res.data.data;
            this.pages.total = res.data.total;
          }
        })
      },

      

      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val);
        if(val.length==1) {
          this.disabled = false;
        }else{
          this.disabled = true;
        }
      },

      handleSizeChange(e) {
        this.pages.per_page = e;
        this.userList();
      },
      handleCurrentChange(e) {
        this.pages.page = e;
        this.userList();
      },

      changePassword(row) {
        this.$refs.passwordDialog.show(row);
      },
      changeUser(row) {
        this.$refs.infoDialog.show(row);
      },
      addUser() {
        this.$refs.addUserDialog.show();
      },
      recharge(row) {
        this.$refs.rechargeDialog.show(row);
      },

      consumeList() {
        this.$router.push({
          path:'/finance/consume',
          query:{
            user_no:this.multipleSelection[0].user_no
          }
        })
      },
      rechargeList() {
        this.$router.push({
          path:'/finance/record',
          query:{
            user_no:this.multipleSelection[0].user_no
          }
        })
      },
       

      success() {
        this.userList();
      },



    }
  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .user-index-container {
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
      padding: 0 20px 20px;
      color: #606060;
      background-color: #fff;

      .opts{
        .el-button{
          margin-right:10px;
        }
      }
      .el-pagination {
        margin: 20px 0;
        text-align: center;
      }
    }





  }

</style>

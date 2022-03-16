<template>
  <div class="member-index-container">
    <div class="title">
      <h2>会员列表</h2>
      <el-button @click="batchRefresh" size="mini">批量刷新余额</el-button>
    </div>

    <div class="tables">

      <div class="forms">
        <el-form ref="form" :model="form" label-width="80px" inline size="mini">

          <el-form-item label="授权状态">
            <el-select v-model="form.auth_status" placeholder="请选择">
              <el-option  label="全部" value=""></el-option>
              <el-option  label="已授权" :value="1"></el-option>
              <el-option  label="未授权" :value="2"></el-option>
              <!-- <el-option v-for="item in agent" :key="item.value" :label="item.name" :value="item.user_no"> -->
              </el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item label="所属代理" v-if="user_info.role==1">
            <el-select v-model="form.agent_user_no" placeholder="请选择">
              <el-option :key="0" label="全部" value=""></el-option>
              <el-option v-for="item in agent" :key="item.value" :label="item.name" :value="item.user_no">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="推广人员" v-if="user_info.role==2">
            <el-select v-model="form.agent_user_no" placeholder="请选择">
              <el-option v-for="item in agent" :key="item.value" :label="item.name" :value="item.user_no">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="创建时间">
            <el-date-picker v-model="form.time" value-format="timestamp" type="daterange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table :data="list" style="width: 100%" :header-cell-style="{background:'#ececec'}" height="calc(100% - 105px)"
        size="mini" row-key="member_no" :tree-props="{children: 'childrens'}" v-loading="loading">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="member_no" label="会员编号" width="150">
        </el-table-column>
        <el-table-column prop="wallet_address" label="会员钱包地址" width="100">
        </el-table-column>
        <el-table-column prop="auth_status" label="是否授权" width="100">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" v-if="scope.row.auth_status==1">已授权</el-button>
            <el-button type="danger" size="mini" v-if="scope.row.auth_status==2">未授权</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="balance_usdt" label="钱包余额（usdt）" width="200">
          <template slot-scope="scope">
            <span style="float:left;width:70px;text-align:center;line-height:30px;">{{scope.row.balance_usdt}}</span>
            <el-button type="info" size="mini" style="margin-left:10px;" @click="balanceRefresh(scope.row)">更新余额
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="top_admin_user.name" label="所属代理或业务员" width="100">
        </el-table-column>
        <el-table-column prop="from_promo_code" label="来源推广码" width="100">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">未划转</span>
            <span v-if="scope.row.status==2">已划转</span>
          </template>
        </el-table-column>
        <el-table-column prop="member_type" label="会员类型" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.member_type==1">以太坊</span>
            <span v-if="scope.row.member_type==2">波场</span>
          </template>
        </el-table-column>
        <el-table-column prop="earn_usdt" label="usdt收益" width="100">
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.created_at | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="updateMember(scope.row)">修改</el-button>
            <el-button type="warning" size="mini" @click="dist(scope.row)" v-if="user_info.role==1">分配后台人员</el-button>
            <el-button type="danger" size="mini" @click="transfer(scope.row)" v-if="user_info.role!=3">划转</el-button>
            <el-button type="danger" size="mini" @click="lookEarn(scope.row)">查看挖矿收益</el-button>
            <el-button type="danger" size="mini" @click="deleteMember(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pages.page"
        :page-sizes="[10,20,50,100]" :page-size="pages.per_page" layout="total, sizes, prev, pager, next, jumper"
        background :total="pages.total">
      </el-pagination>
    </div>

    <info-dialog ref="infoDialog" @success="success"></info-dialog>
    <dist-dialog ref="distDialog" @success="success"></dist-dialog>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    getMemberList,
    transfer,
    batchRefresh,
    balanceRefresh,
    deleteMember
  } from '@/api/member'
  import {formatDate} from '@/utils/time.js'
  import infoDialog from './components/info-dialog.vue'
  import distDialog from './components/dist-dialog.vue'
  import {
    getAgentList
  } from '@/api/agent'
  export default {
    name: 'member-index',
    components: {
      infoDialog,
      distDialog
    },
    data() {
      return {
        list: [],
        disabled: true,
        form: {
          auth_status:null,
          agent_user_no: null,
          time: null
        },
        pages: {
          page: 1,
          per_page: 100,
          total: null,
        },
        loading: false
      }
    },
    computed: {
      ...mapGetters([
        'user_info'
      ])
    },
    filters: {
      formatDate(time) {
        time = time * 1000
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    mounted() {
      this.getAgentList();
      this.getMemberList();
    },
    methods: {
      getAgentList() {
        let params = {};
        if (this.user_info.role == 1) {
          params = {
            'equal[role]': 2,
            page: 1,
            per_page: 500
          }
        }
        getAgentList(params).then(res => {
          this.agent = res.data.data;
          console.log(res);
        })

      },
      getMemberList() {
        var params = {
          'equal[auth_status]': this.form.auth_status ? this.form.auth_status : null,
          'equal[agent_user_no]': this.form.agent_user_no ? this.form.agent_user_no : null,
          'great_equal[created_at]': this.form.time ? this.form.time[0] / 1000 : null,
          'less_equal[created_at]': this.form.time ? (this.form.time[1] + 24 * 3600 * 1000) / 1000 : null,
          page: this.pages.page,
          per_page: this.pages.per_page
        }
        getMemberList(params).then(res => {
          console.log(res);
          if (res.status_code == 200) {
            this.list = res.data.data;
            this.pages.total = res.data.total;
          }
        })
      },

      transfer(row) {
        this.$confirm('是否确定划转改用户？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('hahaha')
          var data = {
            member_no: String(row.member_no)
          }
          console.log(data)
          transfer(data).then(res => {
            if (res.status_code == 200) {
              this.$message({
                type: 'success',
                message: '划转成功!'
              });
              this.getPoolList();
            } else {
              this.$message({
                type: 'error',
                message: '划转失败，请重试'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      lookEarn(row) {
        this.$router.push({
          path: '/member/earn',
          query: {
            'wallet_address': row.wallet_address
          }
        })
      },

      handleSizeChange(e) {
        this.pages.per_page = e;
        this.getMemberList();
      },
      handleCurrentChange(e) {
        this.pages.page = e;
        this.getMemberList();
      },
      updateMember(row) {
        this.$refs.infoDialog.show(row);
      },
      dist(row) {
        this.$refs.distDialog.show(row);
      },
      success() {
        this.getMemberList();
      },

      batchRefresh() {
        this.loading = true;
        batchRefresh().then(res => {
          this.loading = false;
          if (res.status_code == 200) {
            this.getMemberList();
          } else {
            this.$message({
              type: 'error',
              message: '更新失败，请重试'
            });
          }
          console.log(res);
        })
      },
      balanceRefresh(row) {
        let params = {
          member_no: row.member_no
        }
        this.loading = true;
        balanceRefresh(params).then(res => {
          this.loading = false;
          if (res.status_code == 200) {
            this.getMemberList();
          } else {
            this.$message({
              type: 'error',
              message: '更新失败，请重试'
            });
          }
        })
      },

      deleteMember(row) {
        this.$confirm('此操作将删除该会员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var data = {
            member_no: String(row.member_no)
          }
          deleteMember(data).then(res => {
            if (res.status_code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getMemberList();
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
      },
      search() {
        this.pages.page = 1;
        this.getMemberList();
      },
    }
  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .member-index-container {
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

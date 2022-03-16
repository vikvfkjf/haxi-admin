<template>
  <div class="member-earn-container">
    <div class="title">
      <h2>会员挖矿收益</h2>
      <!-- <el-button @click="add" size="mini">添加项目</el-button> -->
    </div>

    <div class="tables">

      <div class="forms">
        <el-form ref="form" :model="form" label-width="80px" inline size="mini">
          <el-form-item label="所属代理" v-if="user_info.role==1">
            <el-select v-model="form.agent_name" placeholder="请选择">
              <el-option :key="0" label="全部" value=""></el-option>
              <el-option
                v-for="item in agent"
                :key="item.value"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="form.draw_status" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="进行中&未领取" :value="1"></el-option>
              <el-option label="已领取" :value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="钱包地址">
            <el-input v-model="form.wallet_address" placeholder="请输入钱包地址"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="form.time"
              value-format="timestamp"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table :data="list" style="width: 100%" :header-cell-style="{background:'#ececec'}" height="calc(100% - 105px)"
        size="mini" @selection-change="handleSelectionChange" v-loading="loading">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="id" width="50">
        </el-table-column>
        <!-- <el-table-column prop="order_no" label="订单编号" width="200">
        </el-table-column> -->
        <el-table-column prop="wallet_address" label="会员钱包" width="200">
        </el-table-column>
        <el-table-column prop="earn_usdt" label="赚取金额（usdt）" width="150">
        </el-table-column>
        <el-table-column prop="earn_zil" label="赚取金额（zil）" width="150">
        </el-table-column>
        <el-table-column prop="in_usdt" label="投入金额（usdt）" width="150">
        </el-table-column>
        <el-table-column prop="balance_usdt" label="钱包余额（usdt）" width="150">
        </el-table-column>
        <el-table-column prop="agent_name" label="所属代理" width="150">
        </el-table-column>
        <el-table-column prop="top_user_name" label="上级推广人员" width="150">
        </el-table-column>
        <el-table-column prop="draw_status" label="领取状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.draw_status==1" style="color:red;">
              <!-- {{new Date().getTime()/1000}}
              <br>
              {{scope.row.end_time}} -->
              <span v-if="new Date().getTime()/1000 < scope.row.end_time">进行中</span>
              <span v-else>未领取</span>
            </span>
            <span v-else-if="scope.row.draw_status==2" style="color:green;">已结束</span>
          </template>
        </el-table-column>
        
        
        <el-table-column prop="begin_time" label="开始时间" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.begin_time | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="end_time" label="结束时间" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.end_time | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="draw_time" label="领取时间" >
          <template slot-scope="scope">
            <span>{{scope.row.draw_time | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="balanceRefresh(scope.row)">更新余额</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pages.page"
        :page-sizes="[10,20,50,100]" :page-size="pages.per_page" layout="total, sizes, prev, pager, next, jumper"
        background :total="pages.total">
      </el-pagination>
    </div>

    <!-- <info-dialog ref="infoDialog" @success="success"></info-dialog>
    <add-dialog ref="addDialog" @success="success"></add-dialog> -->
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {getAgentList} from '@/api/agent'
  import {formatDate} from '@/utils/time.js'
  import {
    balanceRefresh,
    memberEarnList,
  } from '@/api/member'
  // import infoDialog from './components/info-dialog.vue'
  // import addDialog from './components/add-dialog.vue'
  export default {
    name: 'member-earn',
    // components: {
    //   infoDialog,
    //   addDialog,
    // },
    data() {
      return {
        base: process.env.VUE_APP_BASE_ADDRESS,
        list: [],
        disabled: true,
        multipleSelection: [],
        agent:[],
        form:{
          agent_name:null,
          draw_status:null,
          wallet_address:null,
          time:null
        },
        pages: {
          page: 1,
          per_page: 100,
          total: null,
        },
        loading:false
      }
    },
    computed: {
      ...mapGetters([
        'user_info'
      ])
    },
    mounted() {
      this.getAgentList();
      this.form.wallet_address = this.$route.query.wallet_address?this.$route.query.wallet_address:null;
      this.memberEarnList();
    },
    filters: {
      formatDate(time) {
        time = time * 1000
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    methods: {
      getAgentList() {
        let params = {};
        if(this.user_info.role==1) {
          params = {
            'equal[role]':2,
            page:1,
            per_page:500
          }
        }
        getAgentList(params).then(res=>{
          this.agent = res.data.data;
          console.log(res);
        })

      },
      memberEarnList() {
        console.log(this.form.time);
        var params = {
          'like[agent_name]':this.form.agent_name?this.form.agent_name:null,
          'equal[draw_status]':this.form.draw_status?this.form.draw_status:null,
          'equal[wallet_address]':this.form.wallet_address?this.form.wallet_address:null,
          'great_equal[begin_time]':this.form.time?this.form.time[0]/1000:null,
          'less_equal[begin_time]':this.form.time?(this.form.time[1]+24*3600*1000)/1000:null,
          page: this.pages.page,
          per_page: this.pages.per_page
        }

        memberEarnList(params).then(res => {
          console.log(res);
          if (res.status_code == 200) {
            this.list = res.data.data;
            this.pages.total = res.data.total;
          }
        })
      },

      search() {
        this.pages.page = 1;
        this.memberEarnList();
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
        this.memberEarnList();
      },
      handleCurrentChange(e) {
        this.pages.page = e;
        this.memberEarnList();
      },
      add() {
        this.$refs.addDialog.show();
      },
      success() {
        this.memberEarnList();
      },
      balanceRefresh(row) {
        let params = {
          member_no: row.member_no
        }
        this.loading = true;
        balanceRefresh(params).then(res => {
          this.loading = false;
          if (res.status_code == 200) {
            this.memberEarnList();
          } else {
            this.$message({
              type: 'error',
              message: '更新失败，请重试'
            });
          }
        })
      },
    }
  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .member-earn-container {
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

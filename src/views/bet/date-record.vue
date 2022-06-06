<template>
  <div class="bet-date-record-container">
    <div class="title">
      <h2>分割报表信息</h2>
      <!-- <el-button @click="add" size="mini">添加项目</el-button> -->
    </div>

    <div class="tables">

      <div class="forms">
        <el-form ref="form" :model="form" label-width="80px" inline size="mini">
          <el-form-item label="归属后台">
            <el-select v-model="form.belong_user_no" placeholder="请选择">
              <el-option :key="0" label="全部" value=""></el-option>
              <el-option
                v-for="item in agent"
                :key="item.value"
                :label="item.name"
                :value="item.user_no">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="天周月">
            <el-select v-model="form.seg_type" placeholder="请选择">
              <el-option label="天" :value="1"></el-option>
              <el-option label="周" :value="2"></el-option>
              <el-option label="月" :value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="form.game_type" placeholder="请选择">
              <el-option label="牛牛" :value="1"></el-option>
              <el-option label="尾数" :value="2"></el-option>
              <el-option label="单双" :value="3"></el-option>
            </el-select>
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
        <el-table-column prop="date" label="日期" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.day">{{scope.row.day}}</span>
            <span v-if="scope.row.month">{{scope.row.month}}</span>
            <span v-if="scope.row.week">{{scope.row.week}}</span>
          </template>
        </el-table-column>
        
        <el-table-column prop="total_bet_num" label="下注次数" width="100">
        </el-table-column>
        <el-table-column prop="total_had_send" label="总派发次数" width="100">
        </el-table-column>
        <el-table-column prop="total_not_need_send" label="无需派发次数" width="100">
        </el-table-column>
        <el-table-column prop="total_send_failed" label="派发失败次数" width="100">
        </el-table-column>
        <el-table-column prop="total_wait_send" label="等待派发" width="100">
        </el-table-column>

        <el-table-column prop="total_equal_num" label="平局数（结果）" width="100">
        </el-table-column>
        <el-table-column prop="total_invalid_num" label="无效投注（结果）" width="100">
        </el-table-column>
        
        <el-table-column prop="total_win_num" label="用户中奖数（结果）" width="100">
        </el-table-column>

        <el-table-column prop="total_bet_trx_money" label="下注金额（trx）" width="100">
        </el-table-column>
        <el-table-column prop="total_bet_usdt_money" label="下注金额（usdt）" width="100">
        </el-table-column>
        <el-table-column prop="total_recv_trx_money" label="总收到金额(trx)" width="100">
        </el-table-column>
        <el-table-column prop="total_recv_usdt_money" label="总收到金额(usdt)" width="100">
        </el-table-column>
        <el-table-column prop="total_send_trx_money" label="派发金额(trx)" width="100">
        </el-table-column>
        <el-table-column prop="total_send_usdt_money" label="派发金额(usdt)" width="100">
        </el-table-column>
        <el-table-column prop="total_service_trx_fee" label="服务费(trx)" width="100">
        </el-table-column>
        <el-table-column prop="total_service_usdt_fee" label="服务费(usdt)" width="100">
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
    getDayReport,
  } from '@/api/bet'
  export default {
    name: 'bet-date-record',
    data() {
      return {
        base: process.env.VUE_APP_BASE_ADDRESS,
        list: [],
        disabled: true,
        multipleSelection: [],
        agent:[],
        form:{
          belong_user_no:null,
          game_type:null,
          seg_type:null,
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
      this.getDayReport();
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
      getDayReport() {
        // console.log(this.form.time);
        var params = {
          belong_user_no:this.form.belong_user_no?this.form.belong_user_no:null,
          game_type:this.form.game_type?this.form.game_type:null,
          seg_type:this.form.seg_type?this.form.seg_type:null,
          begin_time:this.form.time?this.form.time[0]/1000:null,
          end_time:this.form.time?(this.form.time[1]+24*3600*1000)/1000:null,
          page: this.pages.page,
          per_page: this.pages.per_page
        }

        getDayReport(params).then(res => {
          console.log(res);
          if (res.status_code == 200) {
            this.list = res.data;
            this.pages.total = res.data.total;
          }
        })
      },

      search() {
        this.pages.page = 1;
        this.getDayReport();
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
        this.getDayReport();
      },
      handleCurrentChange(e) {
        this.pages.page = e;
        this.getDayReport();
      },
      add() {
        this.$refs.addDialog.show();
      },
      success() {
        this.getDayReport();
      },
    }
  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .bet-date-record-container {
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

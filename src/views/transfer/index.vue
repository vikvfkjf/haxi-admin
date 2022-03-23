<template>
  <div class="earnrule-transfer-container">
    <div class="title">
      <h2>划转记录</h2>
      <!-- <el-button @click="add" size="mini">添加项目</el-button> -->
    </div>

    <div class="tables">

      <div class="forms">
        <el-form ref="form" :model="form" label-width="80px" inline size="mini" >
          <el-form-item label="所属代理" v-if="user_info.role==1">
            <el-select v-model="form.agent_user_no" placeholder="请选择">
              <el-option :key="0" label="全部" value=""></el-option>
              <el-option
                v-for="item in agent"
                :key="item.value"
                :label="item.name"
                :value="item.user_no">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="推广人员" v-if="user_info.role==2">
            <el-select v-model="form.agent_user_no" placeholder="请选择">
              <el-option
                v-for="item in agent"
                :key="item.value"
                :label="item.name"
                :value="item.user_no">
              </el-option>
            </el-select>
            <!-- <el-input v-model="form.top_user_name" placeholder="请输入推广人员"></el-input> -->
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

          <el-form-item style = "float:right;">
            <span>划转统计：{{transferNum}}</span>
          </el-form-item>

        </el-form>
      </div>

      <el-table :data="list" style="width: 100%" :header-cell-style="{background:'#ececec'}" height="calc(100% - 105px)"
        size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <!-- <el-table-column prop="id" label="id" width="50">
        </el-table-column> -->
        <el-table-column prop="operater_user.name" label="操作者" width="100">
        </el-table-column>
        <el-table-column prop="agent_name" label="所属代理" width="100">
        </el-table-column>
        <el-table-column prop="top_user_name" label="上级推广人员" width="100">
        </el-table-column>

        <el-table-column prop="from_wallet_address" label="来源地址" width="250">
        </el-table-column>
        
        <el-table-column prop="to_wallet_address" label="收款地址" width="250">
        </el-table-column>
        <el-table-column prop="transfer_sum" label="划转金额" width="150">
        </el-table-column>

        <el-table-column prop="created_at" label="日期">
           <template slot-scope="scope">
            <span>{{scope.row.created_at | formatDate}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pages.page"
        :page-sizes="[10,20,50,100]" :page-size="pages.per_page" layout="total, sizes, prev, pager, next, jumper"
        background :total="pages.total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {formatDate} from '@/utils/time.js'
  import {
    getTransferList,
    getTransferTotal
  } from '@/api/earnrule'
  import {getAgentList} from '@/api/agent'
  export default {
    name: 'earnrule-transfer',
    
    filters: {
      formatDate(time) {
        time = time * 1000
        let date = new Date(time)
        console.log(new Date(time))
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    data() {
      return {
        base: process.env.VUE_APP_BASE_ADDRESS,
        list: [],
        agent:[],
        disabled: true,
        multipleSelection: [],
        form:{
          agent_user_no:null,
          time:null
        },
        pages: {
          page: 1,
          per_page: 10,
          total: null,
        },

        transferNum:null
        
      }
    },
    computed: {
      ...mapGetters([
        'user_info'
      ])
    },
    mounted() {
      this.getAgentList();
      this.getTransferList();
      this.getTransferTotal();
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

      getTransferList() {
        var params = {
          'equal[agent_user_no]':this.form.agent_user_no?this.form.agent_user_no:null,
          'great_equal[begin_time]':this.form.time?this.form.time[0]/1000:null,
          'less_equal[begin_time]':this.form.time?(this.form.time[1]+24*3600*1000)/1000:null,
          page: this.pages.page,
          per_page: this.pages.per_page
        }
        getTransferList(params).then(res => {
          console.log(res);
          if (res.status_code == 200) {
            this.list = res.data.data;
            this.pages.total = res.data.total;
          }
        })
      },

      getTransferTotal() {
        let params = {
          begin_time:this.form.time?this.form.time[0]/1000:null,
          end_time:this.form.time?(this.form.time[1]+24*3600*1000)/1000:null,
          agent_user_no:this.form.agent_user_no?this.form.agent_user_no:null,
          // 'equal[agent_user_no]':this.form.agent_user_no?this.form.agent_user_no:null,
          // 'great_equal[begin_time]':this.form.time?this.form.time[0]/1000:null,
          // 'less_equal[begin_time]':this.form.time?(this.form.time[1]+24*3600*1000)/1000:null,
          // page: this.pages.page,
          // per_page: this.pages.per_page
        }
        getTransferTotal(params).then(res=>{
          this.transferNum = res.data.transfer_sum;
          console.log(res);
        })
      },

      search() {
        this.pages.page = 1;
        this.getTransferList();
        this.getTransferTotal();
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
        this.getTransferList();
      },
      handleCurrentChange(e) {
        this.pages.page = e;
        this.getTransferList();
      },
      updateProject(row) {
        this.$refs.infoDialog.show(row);
      },
      add() {
        this.$refs.addDialog.show();
      },
      success() {
        this.getTransferList();
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .earnrule-transfer-container {
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

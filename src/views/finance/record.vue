<template>
  <div class="finance-record-container">
    <div class="title">
      <h2>充值记录</h2>
    </div>

    <div class="tables">
      <div class="forms">
        <el-form ref="form" :model="form" label-width="80px" inline size="mini">
          <el-form-item label="用户编号">
            <el-input v-model="form.user_no" placeholder="请输入用户编号"></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="form.time"
              value-format="yyyy-MM-dd"
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
      <el-table v-loading="loading" :data="list" style="width: 100%" :header-cell-style="{background:'#ececec'}" height="calc(100% - 119px)" size="mini">
        <el-table-column prop="id" label="id" width="80">
        </el-table-column>
        <el-table-column prop="top_num" label="订单编号" width="200">
        </el-table-column>
        <el-table-column prop="top_way" label="付款方式" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.top_way==1">线下</span>
          </template>
        </el-table-column>
        <el-table-column prop="recharge_num" label="充值金额（条）">
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间">
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pages.page"
        :page-sizes="[10,20,50,100]"
        :page-size="pages.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pages.total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {getRechargeList} from '@/api/finance.js'
  export default {
    name: 'finance-record',
    data() {
      return {
        loading:false,
        form:{
          user_no:null,
          time:null
        },
        list:[],
        pages:{
          page:1,
          per_page:10,
          total:null
        },
      }
    },
    mounted() {
      this.form.user_no = this.$route.query.user_no?this.$route.query.user_no:null;
      this.getRechargeList();
    },
    methods:{
      handleSizeChange(e) {
        this.pages.per_page = e;
        this.getRechargeList();
      },
      handleCurrentChange(e) {
        this.pages.page = e;
        this.getRechargeList();
      },
      getRechargeList() {
        this.loading = true;
        var params = {
          'equal[user_no]':this.form.user_no?this.form.user_no:null,
          'great_equal[created_at]':this.form.time?this.form.time[0]+' 00:00:00':null,
          'less_equal[created_at]':this.form.time?this.form.time[1]+' 23:59:59':null,
          page:this.pages.page,
          per_page:this.pages.per_page
        }
        getRechargeList(params).then(res=>{
          this.loading = false;
          if(res.status_code==200) {
            this.list = res.data.data;
            this.pages.total = res.data.total;
          }else{

          }
        })
      },
      search() {
        console.log(this.form);
        this.pages.page = 1;
        this.getRechargeList();
      }
    }
    //   computed: {
    //     ...mapGetters([
    //       'name'
    //     ])
    //   }
  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .finance-record-container {
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

    .tables{
      height:calc(100vh - 160px);
      -webkit-box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
      box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
      padding: 20px;
      color: #606060;
      background-color: #fff;
      .el-input{
        width:200px;
      }
      .el-pagination{
        margin:20px 0;
        text-align:center;
      }
    }





  }

</style>

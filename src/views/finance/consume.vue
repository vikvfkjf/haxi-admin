<template>
  <div class="finance-consume-container">
    <div class="title">
      <h2>消费记录</h2>
    </div>

    <div class="tables">
      <div class="forms">
        <el-form ref="form" :model="form" label-width="80px" inline size="mini">
          <el-form-item label="公司编号">
            <el-input v-model="form.company_no" placeholder="请输入公司编号"></el-input>
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
      <el-table :data="list" style="width: 100%" :header-cell-style="{background:'#ececec'}" height="calc(100% - 119px)" size="mini">
        <el-table-column prop="id" label="id" width="80">
        </el-table-column>
        <el-table-column prop="company_no" label="公司编号" width="200">
        </el-table-column>
        
        <el-table-column prop="cost" label="消费金额（元）">
        </el-table-column>
        <el-table-column prop="type" label="充值方式" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.type==1">月租</span>
            <span v-if="scope.row.type==2">通话分钟费</span>
            <span v-if="scope.row.type==3">录音费</span>
          </template>
        </el-table-column>
        <el-table-column prop="explain" label="费用说明">
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
  import {getConsumeList} from '@/api/finance.js'
  export default {
    name: 'finance-consume',
    data() {
      return {
        form:{
          company_no:null,
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
      this.form.company_no = this.$route.query.company_no?this.$route.query.company_no:null;
      this.getConsumeList();
    },
    methods:{
      handleSizeChange(e) {
        this.pages.per_page = e;
        this.getConsumeList();
      },
      handleCurrentChange(e) {
        this.pages.page = e;
        this.getConsumeList();
      },
      getConsumeList() {
        var params = {
          'equal[company_no]':this.form.company_no,
          'great_equal[created_at]':this.form.time?this.form.time[0]+' 00:00:00':null,
          'less_equal[created_at]':this.form.time?this.form.time[1]+' 23:59:59':null,
          page:this.pages.page,
          per_page:this.pages.per_page
        }
        getConsumeList(params).then(res=>{
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
        this.getConsumeList();
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

  .finance-consume-container {
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

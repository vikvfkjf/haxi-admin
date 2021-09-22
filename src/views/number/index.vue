<template>
  <div class="number-index-container">
    <div class="title">
      <h2>小号申请列表</h2>
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
      <el-table v-loading="loading" :data="list" style="width: 100%" :header-cell-style="{background:'#ececec'}" height="calc(100% - 119px)" size="mini">
        <el-table-column prop="id" label="id" width="80">
        </el-table-column>
        <el-table-column prop="company_no" label="公司编号" width="200">
        </el-table-column>
        <el-table-column prop="company_name" label="公司名称" width="200">
        </el-table-column>
        <el-table-column prop="phone_mode_name" label="小号模式" width="200">
        </el-table-column>
        <el-table-column prop="scene_desc" label="描述文字" width="200">
        </el-table-column>
        <el-table-column prop="action" label="生效时间" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.action==1">立即生效</span>
            <span v-if="scope.row.action==2">次月生效</span>
          </template>
        </el-table-column>
        <el-table-column prop="apply_status" label="审核" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.apply_status==1">待审核</span>
            <span v-if="scope.row.apply_status==2">通过</span>
            <span v-if="scope.row.apply_status==3">拒绝</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="200">
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="bind(scope.row)">绑定</el-button>
            <el-button type="primary" size="mini" @click="examine(scope.row)">审核</el-button>
            <el-button type="warning" size="mini" @click="detail(scope.row)">申请小号</el-button>
            <el-button type="danger" size="mini" @click="look(scope.row)">通过小号</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pages.current_page"
        :page-sizes="[10,20,50,100]"
        :page-size="pages.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pages.total">
      </el-pagination>
    </div>

    <examine-dialog ref="examineDialog" @success="success"></examine-dialog>
    <number-dialog ref="numberDialog"></number-dialog>
    <bind-dialog ref="bindDialog"></bind-dialog>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {getPhoneApplyList} from '@/api/number.js'
  import examineDialog from './components/examine-dialog.vue'
  import numberDialog from './components/number-dialog.vue'
  import bindDialog from './components/bind-dialog.vue'
  export default {
    name: 'Number-index',
    components:{
      examineDialog,
      numberDialog,
      bindDialog
    },
    data() {
      return {
        loading:false,
        form:{
          company_no:null,
          time:null
        },
        list:[],
        pages:{
          current_page:1,
          per_page:10,
          total:null
        },
      }
    },
    mounted() {
      this.form.company_no = this.$route.query.company_no?this.$route.query.company_no:null;
      this.getPhoneApplyList();
    },
    methods:{
      handleSizeChange(e) {
        this.pages.per_page = e;
        this.getPhoneApplyList();
      },
      handleCurrentChange(e) {
        this.pages.current_page = e;
        this.getPhoneApplyList();
      },
      getPhoneApplyList() {
        this.loading = true;
        var params = {
          'equal[company_no]':this.form.company_no?this.form.company_no:null,
          'great_equal[created_at]':this.form.time?this.form.time[0]+' 00:00:00':null,
          'less_equal[created_at]':this.form.time?this.form.time[1]+' 23:59:59':null,
          page:this.pages.current_page,
          per_page:this.pages.per_page
        }
        getPhoneApplyList(params).then(res=>{
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
        this.pages.current_page = 1;
        this.getPhoneApplyList();
      },
      examine(row) {
        this.$refs.examineDialog.show(row);
      },
      success() {
        this.getPhoneApplyList();
      },
      detail(row) {
        this.$refs.numberDialog.show(row);
      },
      bind(row) {
        this.$refs.bindDialog.show(row);
      },
      look(row) {
        this.$router.push({
          path:'/number/list',
          query:{
            company_no:row.company_no
          }

        })
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

  .number-index-container {
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

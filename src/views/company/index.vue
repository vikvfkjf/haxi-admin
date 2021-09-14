<template>
  <div class="company-index-container">
    <div class="title">
      <h2>公司列表</h2>
    </div>

    <div class="tables">
      <div class="opts">
        <el-button type="text" icon="el-icon-coin" @click="recharge" :disabled="disabled">充值</el-button>
        <el-button type="text" icon="el-icon-coin" @click="rechargeList" :disabled="disabled">充值记录</el-button>
        <el-button type="text" icon="el-icon-coin" @click="addWhite" :disabled="disabled">新增白名单</el-button>
        <el-button type="text" icon="el-icon-coin" @click="whiteList" :disabled="disabled">白名单列表</el-button>
        <el-button type="text" icon="el-icon-coin" @click="consumeList" :disabled="disabled">消费记录</el-button>
        <el-button type="text" icon="el-icon-coin" @click="numberList" :disabled="disabled">小号列表</el-button>
      </div>

      <el-table :data="list" style="width: 100%" :header-cell-style="{background:'#ececec'}"
        height="calc(100% - 112px)" size="mini" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="company_no" label="code" width="180">
        </el-table-column>
        <el-table-column prop="company_name" label="公司名称" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="联系方式" width="180">
        </el-table-column>
        <el-table-column prop="total_balance" label="总金额" width="180">
        </el-table-column>
        <el-table-column prop="balance" label="可用余额" width="180">
        </el-table-column>
        <el-table-column prop="freeze_balance" label="冻结金额" width="180">
        </el-table-column>
        <el-table-column prop="freeze_balance" label="企业认证状态" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.auth_status==1" style="color:green;">已认证</span>
            <span v-if="scope.row.auth_status==2" style="color:red;">未认证</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="license_path" label="营业执照">
        </el-table-column> -->
        <el-table-column prop="" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="price(scope.row)">价格</el-button>
            <el-button type="warning" size="mini" @click="examine(scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pages.current_page"
      :page-sizes="[10,20,50,100]"
      :page-size="pages.per_page"
      layout="total, sizes, prev, pager, next, jumper"
      background
      :total="pages.total">
    </el-pagination>
      <!-- <el-pagination background :page-size="10" :current-page="page" @current-change="handleCurrentChange"
        layout="prev, pager, next" :total="80">
      </el-pagination> -->
    </div>

    <recharge-dialog ref="rechargeDialog"></recharge-dialog>
    <price-dialog ref="priceDialog"></price-dialog>
    <add-white-dialog ref="addWhiteDialog"></add-white-dialog>
    <examine-dialog ref="examineDialog" @success="success"></examine-dialog>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  import {getCompanyList} from '@/api/company'
  import rechargeDialog from './components/recharge-dialog.vue'
  import priceDialog from './components/price-dialog.vue'
  import addWhiteDialog from './components/add-white-dialog.vue'
  import examineDialog from './components/examine-dialog.vue'
  export default {
    name: 'finance-record',
    components:{
      rechargeDialog,
      priceDialog,
      addWhiteDialog,
      examineDialog
    },
    data() {
      return {
        list:[],
        disabled:true,
        multipleSelection:[],
        pages:{
          current_page:1,
          per_page:10,
          total:null,
        },
        // tableData: [{
        //   date: '2016-05-02',
        //   code: '202108181923',
        //   type: '公对公',
        //   money: '100.00'
        // }],
      }
    },
    mounted() {
      this.getCompanyList();
    },
    methods: {
      
      getCompanyList() {
        var params = {
          current_page:this.pages.current_page,
          per_page:this.pages.per_page
        }
        getCompanyList(params).then(res => {
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
        this.getCompanyList();
      },
      handleCurrentChange(e) {
        this.pages.current_page = e;
        this.getCompanyList();
      },

      recharge() {
        this.$refs.rechargeDialog.show(this.multipleSelection[0]);
      },
      price(row) {
        this.$refs.priceDialog.show(row);
      },
      examine(row) {
        this.$refs.examineDialog.show(row);
      },
      addWhite() {
        this.$refs.addWhiteDialog.show(this.multipleSelection[0]);
      },
      success() {
        this.getCompanyList();
      },
      rechargeList() {
        this.$router.push({
          path:'/finance/record',
          query:{
            company_no:this.multipleSelection[0].company_no
          }
        })
      },
      whiteList() {
        this.$router.push({
          path:'/company/white',
          query:{
            company_no:this.multipleSelection[0].company_no
          }
        })
      },
      consumeList() {
        this.$router.push({
          path:'/finance/consume',
          query:{
            company_no:this.multipleSelection[0].company_no
          }
        })
      },
      numberList() {
        this.$router.push({
          path:'/number/index',
          query:{
            company_no:this.multipleSelection[0].company_no
          }
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .company-index-container {
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

<template>
  <div class="log-index-container">
    <div class="title">
      <h2>日志</h2>
    </div>

    <div class="tables">

      <el-table :data="list" style="width: 100%" :header-cell-style="{background:'#ececec'}"
        height="calc(100% - 112px)" size="mini" >
        <el-table-column prop="id" label="id" width="100">
        </el-table-column>
        <el-table-column prop="user_no" label="用户编号" width="250">
        </el-table-column>
        <el-table-column prop="action" label="行为" width="100">
        </el-table-column>
        <el-table-column prop="event" label="事件" width="100">
        </el-table-column>

        <el-table-column prop="remark" label="详情">
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
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  import {logList} from '@/api/log'
  export default {
    name: 'log-index',
    data() {
      return {
        list:[],
        pages:{
          page:1,
          per_page:10,
          total:null,
        }
      }
    },
    mounted() {
      this.logList();
    },
    methods: {
      search() {
        this.pages.page = 1;
        this.logList();
      },
      logList() {
        var params = {
          page:this.pages.page,
          per_page:this.pages.per_page
        }
        logList(params).then(res => {
          console.log(res);
          if(res.status_code == 200) {
            this.list = res.data.data;
            this.pages.total = res.data.total;
          }
        })
      },

      
      handleSizeChange(e) {
        this.pages.per_page = e;
        this.logList();
      },
      handleCurrentChange(e) {
        this.pages.page = e;
        this.logList();
      },

      recharge(row) {
        this.$refs.rechargeDialog.show(row);
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .log-index-container {
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

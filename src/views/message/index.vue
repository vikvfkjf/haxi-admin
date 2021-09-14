<template>
  <div class="product-index-container">
    <div class="title">
      <h2>消息中心</h2>
    </div>

    <div class="box">
      <div class="tables">
        <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#ececec'}"
          height="calc(100vh - 250px)" size="mini">
          <el-table-column prop="id" label="id" width="200">
          </el-table-column>
          <el-table-column prop="date" label="时间" width="200">
          </el-table-column>
          <el-table-column prop="content" label="内容">
          </el-table-column>
          
          <!-- <el-table-column prop="detail" label="详情">
            <template slot-scope="scope">
              <el-button size="mini">删除</el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="queryPage.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="queryPage.per_page"
          layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  // import voiceCost from './components/voice-cost.vue'
  export default {
    name: 'cost-index',
    components: {
      // voiceCost
    },
    data() {
      return {
        cardIndex: 0,
        tableData: [{
          id:1,
          date: '2016-05-02',
          content: '您的余额不足,请充值'
        }],
        queryPage: {
          currentPage: 1,
          per_page: 10
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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

  .product-index-container {
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

    .box {
      height: calc(100vh - 160px);
      -webkit-box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
      box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
      padding: 20px;
      color: #606060;
      background-color: #fff;

      .tables {
        .el-pagination {
          margin: 20px 0;
          text-align: center;
        }
      }
    }
  }

</style>

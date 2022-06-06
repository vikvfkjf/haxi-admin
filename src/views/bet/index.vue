<template>
  <div class="bet-index-container">
    <div class="title">
      <h2>投注列表</h2>
      <el-button @click="add" size="mini">运行区块任务</el-button>
    </div>

    <div class="tables">
      <el-table :data="list" style="width: 100%" :header-cell-style="{background:'#ececec'}" height="calc(100% - 60px)"
        size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="id" width="50">
        </el-table-column>
        <el-table-column prop="bet_no" label="投注编号" width="100">
        </el-table-column>
        <el-table-column prop="game_no" label="游戏编号" width="100">
        </el-table-column>
        <el-table-column prop="game_type" label="游戏类型" width="50">
          <template slot-scope="scope">
            <span v-if="scope.row.game_type==1">牛牛</span>
            <span v-if="scope.row.game_type==2">尾号</span>
            <span v-if="scope.row.game_type==3">单双</span>
          </template>
        </el-table-column>
        <el-table-column prop="belong_user_no" label="所属后台人员编号" width="100">
        </el-table-column>
        <el-table-column prop="bet_money" label="投注金额" width="80">
        </el-table-column>
        <el-table-column prop="recv_money" label="收到金额" width="80">
        </el-table-column>
        <el-table-column prop="transactions_id" label="交易码" width="100">
        </el-table-column>
        <el-table-column prop="block_hash" label="区块哈希" width="100">
        </el-table-column>
        <el-table-column prop="block_num" label="区块高度" width="100">
        </el-table-column>
        <el-table-column prop="from_wallet_address" label="来源地址" width="100">
        </el-table-column>
        <el-table-column prop="to_wallet_address" label="目标地址" width="100">
        </el-table-column>


        <el-table-column prop="result" label="输赢结果" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.result==1">用户赢</span>
            <span v-if="scope.row.result==2">用户输</span>
          </template>
        </el-table-column>

        <el-table-column prop="send_money" label="派发金额" width="80">
        </el-table-column>

        <el-table-column prop="send_status" label="派发状态" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.send_status==1">待派发</span>
            <span v-if="scope.row.send_status==2">已派发</span>
            <span v-if="scope.row.send_status==3">无需派发</span>
            <span v-if="scope.row.send_status==4">派发失败</span>
          </template>
        </el-table-column>

        <el-table-column prop="send_type" label="派发类型" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.send_type==1">系统</span>
            <span v-if="scope.row.send_type==2">管理员</span>
          </template>
        </el-table-column>

        <el-table-column prop="coin_type" label="钱包类别" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.coin_type==1">USDT</span>
            <span v-if="scope.row.coin_type==2">TRX</span>
          </template>
        </el-table-column>

        <el-table-column prop="send_user_no" label="派发后台人员编号" width="100">
        </el-table-column>
        <el-table-column prop="service_fee" label="服务费" width="50">
        </el-table-column>
        <el-table-column prop="service_fee_percent" label="服务费百分比" width="50">
        </el-table-column>

        <el-table-column prop="wallet_kind" label="钱包类别" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.wallet_kind==1">ERC20</span>
            <span v-if="scope.row.wallet_kind==2">TRC20</span>
            <span v-if="scope.row.wallet_kind==3">BEP20</span>
          </template>
        </el-table-column>
        <el-table-column prop="service_fee_percent" label="服务费百分比" width="50">
        </el-table-column>
        <!-- <el-table-column prop="remark" label="备注" width="200">
        </el-table-column> -->

        <el-table-column prop="created_at" label="创建时间" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.created_at | formatDate}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="refund(scope.row)" v-if="">退款</el-button>
            <el-button type="warning" size="mini" @click="updateBet(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="deleteBet(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pages.page"
        :page-sizes="[10,20,50,100]" :page-size="pages.per_page" layout="total, sizes, prev, pager, next, jumper"
        background :total="pages.total">
      </el-pagination>
    </div>

    <info-dialog ref="infoDialog" @success="success"></info-dialog>
    <add-dialog ref="addDialog" @success="success"></add-dialog>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    getBetList,
    deleteBet,
    refund
  } from '@/api/bet.js'
  import {formatDate} from '@/utils/time.js'
  import infoDialog from './components/info-dialog.vue'
  import addDialog from './components/add-dialog.vue'
  export default {
    name: 'bet-index',
    components: {
      infoDialog,
      addDialog,
    },
    data() {
      return {
        base: process.env.VUE_APP_BASE_ADDRESS,
        list: [],
        disabled: true,
        multipleSelection: [],
        pages: {
          page: 1,
          per_page: 10,
          total: null,
        },
      }
    },
    filters: {
      formatDate(time) {
        time = time * 1000
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    mounted() {
      this.getBetList();
    },
    methods: {

      getBetList() {
        var params = {
          page: this.pages.page,
          per_page: this.pages.per_page
        }
        getBetList(params).then(res => {
          console.log(res);
          if (res.status_code == 200) {
            this.list = res.data.data;
            this.pages.total = res.data.total;
          }
        })
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
        this.getBetList();
      },
      handleCurrentChange(e) {
        this.pages.page = e;
        this.getBetList();
      },
      updateBet(row) {
        this.$refs.infoDialog.show(row);
      },
      add() {
        this.$refs.addDialog.show();
      },
      success() {
        this.getBetList();
      },
      refund(row) {
        this.$confirm('此操作将退还该用户的收益, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var data = {
            id: String(row.id)
          }
          refund(data).then(res => {
            if (res.status_code == 200) {
              this.$message({
                type: 'success',
                message: '退还成功!'
              });
              this.getBetList();
            } else {
              this.$message({
                type: 'error',
                message: '退还失败'
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
      deleteBet(row) {
        this.$confirm('此操作将删除该项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var data = {
            id: String(row.id)
          }
          deleteBet(data).then(res => {
            if (res.status_code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getBetList();
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
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .bet-index-container {
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

<template>
  <div class="game-index-container">
    <div class="title">
      <h2>游戏列表</h2>
      <el-button @click="add" size="mini">添加游戏</el-button>
    </div>

    <div class="tables">
      <el-table :data="list" style="width: 100%" :header-cell-style="{background:'#ececec'}" height="calc(100% - 60px)"
        size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="id" width="50">
        </el-table-column>
        <el-table-column prop="game_no" label="游戏编号" width="100">
        </el-table-column>
        <el-table-column prop="name" label="游戏名称" width="100">
        </el-table-column>

        <el-table-column prop="rule" label="游戏规则" width="100">
        </el-table-column>

        <el-table-column prop="min_take_part_usdt" label="最小参与USDT" width="100">
        </el-table-column>
        <el-table-column prop="max_take_part_usdt" label="最大参与USDT" width="100">
        </el-table-column>

        <el-table-column prop="min_take_part_trx" label="最小参与TRX" width="100">
        </el-table-column>
        <el-table-column prop="max_take_part_trx" label="最大参与TRX" width="100">
        </el-table-column>

        <el-table-column prop="game_type" label="游戏类型" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.game_type==1">牛牛</span>
            <span v-if="scope.row.game_type==2">尾数</span>
            <span v-if="scope.row.game_type==3">单双</span>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-if="scope.row.status==2">禁用</span>
          </template>
        </el-table-column>

        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="updateProject(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="deleteGame(scope.row)">删除</el-button>
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
    getGameList,
    deleteGame,
  } from '@/api/game.js'
  import infoDialog from './components/info-dialog.vue'
  import addDialog from './components/add-dialog.vue'
  export default {
    name: 'game-index',
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
    mounted() {
      this.getGameList();
    },
    methods: {

      getGameList() {
        var params = {
          page: this.pages.page,
          per_page: this.pages.per_page
        }
        getGameList(params).then(res => {
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
        this.getGameList();
      },
      handleCurrentChange(e) {
        this.pages.page = e;
        this.getGameList();
      },
      updateProject(row) {
        this.$refs.infoDialog.show(row);
      },
      add() {
        this.$refs.addDialog.show();
      },
      success() {
        this.getGameList();
      },

      deleteGame(row) {
        this.$confirm('此操作将删除该项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var data = {
            id: String(row.id)
          }
          deleteGame(data).then(res => {
            if (res.status_code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getGameList();
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

  .game-index-container {
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

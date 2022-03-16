<template>
  <div class="configure-index-container">
    <div class="title">
      <h2>配置列表</h2>
      <!-- <el-button @click="add" size="mini">添加项目</el-button> -->
    </div>

    <div class="tables">
      <el-table :data="list" style="width: 100%" :header-cell-style="{background:'#ececec'}" height="calc(100% - 60px)"
        size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="id" width="50">
        </el-table-column>
        <el-table-column prop="key" label="key" width="200">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="200">
        </el-table-column>
        <el-table-column prop="value" label="值" width="200">
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="updateConfigure(scope.row)">修改</el-button>
            <!-- <el-button type="danger" size="mini" @click="deleteProject(scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pages.page"
        :page-sizes="[10,20,50,100]" :page-size="pages.per_page" layout="total, sizes, prev, pager, next, jumper"
        background :total="pages.total">
      </el-pagination>
    </div>

    <info-dialog ref="infoDialog" @success="success"></info-dialog>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    getConfigureList,
    // deleteProject,
  } from '@/api/configure'
  import infoDialog from './components/info-dialog.vue'
  export default {
    name: 'configure-index',
    components: {
      infoDialog,
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
      this.getConfigureList();
    },
    methods: {

      getConfigureList() {
        var params = {
          page: this.pages.page,
          per_page: this.pages.per_page
        }
        getConfigureList(params).then(res => {
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
        this.getConfigureList();
      },
      handleCurrentChange(e) {
        this.pages.page = e;
        this.getConfigureList();
      },
      updateConfigure(row) {
        this.$refs.infoDialog.show(row);
      },
      add() {
        this.$refs.addDialog.show();
      },
      success() {
        this.getConfigureList();
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .configure-index-container {
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

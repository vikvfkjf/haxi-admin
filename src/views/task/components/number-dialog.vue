<template>
  <div class="number-dialog">
    <el-dialog title="小号" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-table :data="list" style="width: 100%" :header-cell-style="{background:'#ececec'}"  size="mini">
            <el-table-column prop="code" label="城市编号" width="200">
            </el-table-column>
            <el-table-column prop="city" label="城市" width="200">
            </el-table-column>
            <el-table-column prop="num" label="数量">
            </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="mini">取 消</el-button>
        <!-- <el-button type="primary" @click="sure" size="mini">确定</el-button> -->
      </span>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    name: 'number-dialog',
    data() {
      return {
        dialogVisible: false,
        loading: false,
        list: [],
      }
    },
    mounted() {},
    methods: {
      show(val) {
        this.list = val.apply_content;
        this.dialogVisible = true;
        // console.log(val);
      },

      handleClose() {
        this.dialogVisible = false;
        this.reset();
      },
      reset() {
        this.loading = false;
      }
    }

  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .number-dialog {
    .content {
      .el-form {
        width: 80%;
        margin: 0 auto;
      }
    }
  }

</style>

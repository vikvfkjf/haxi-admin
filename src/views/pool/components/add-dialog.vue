<template>
  <div class="add-dialog">
    <el-dialog title="新增矿池" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="矿池类型" prop="mine_type">
            <el-select v-model="form.mine_type">
              <el-option label="以太坊" :value="1"></el-option>
              <el-option label="波场" :value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="产出" prop="output">
            <el-input v-model="form.output"></el-input>
          </el-form-item>

          <el-form-item label="质押数" prop="pledge_sum">
            <el-input v-model="form.pledge_sum"></el-input>
          </el-form-item>

          <el-form-item label="参与人数" prop="participants">
            <el-input v-model="form.participants"></el-input>
          </el-form-item>

          <el-form-item label="节点数" prop="node_number">
            <el-input v-model="form.node_number"></el-input>
          </el-form-item>

          <el-form-item label="用户收入" prop="user_earn">
            <el-input v-model="form.user_earn"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="mini">取 消</el-button>
        <el-button type="primary" @click="sure" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import {addPool} from '@/api/pool.js'
  import {
    getToken
  } from '@/utils/auth'
  export default {
    name: 'add-dialog',
    data() {
      return {

        dialogVisible: false,
        loading: false,
        form: {
          mine_type  : null,
          output : null,
          pledge_sum :null,
          participants :null,
          node_number :null,
          user_earn  :null,
        },
        rules: {
          mine_type: [{
            required: true,
            message: '请选择矿池类型',
            trigger: 'blur'
          }],
          output : [{
            required: true,
            message: '请输入产出',
            trigger: 'blur'
          }],
          
          pledge_sum : [{
            required: true,
            message: '请输入质押数',
            trigger: 'blur'
          }],
          participants  : [{
            required: true,
            message: '请输入参与人数',
            trigger: 'blur'
          }],
          node_number  : [{
            required: true,
            message: '请输入节点数',
            trigger: 'blur'
          }],
          user_earn : [{
            required: true,
            message: '请输入用户收入',
            trigger: 'blur'
          }]
        }
      }
    },
    mounted() {},
    methods: {
      show() {
        this.dialogVisible = true; 
      },

      sure() {
        this.$refs['form'].validate((valid) => {

          if (valid) {
            this.loading = true;
            
            var params = {
              mine_type:Number(this.form.mine_type),
              output:Number(this.form.output),
              pledge_sum:Number(this.form.pledge_sum),
              participants:Number(this.form.participants),
              node_number:Number(this.form.node_number),
              user_earn:Number(this.form.user_earn),
            };
  
            addPool(params).then(res => {
              this.loading = false;
              if (res.status_code == 200) {
                this.$notify({
                  title: '提示',
                  message: '新增成功',
                  type: 'success'
                })
                this.handleClose();
                this.$emit('success');
              } else {
                this.$notify({
                  title: '提示',
                  message: '新增失败',
                  type: 'error'
                })
                return false;
              }
            }).catch(err=>{
              this.loading = false;
            })
          }
        })

      },
      handleClose() {
        this.dialogVisible = false;
        this.reset();
      },
      reset() {
        this.loading = false;
        this.form = {
          mine_type  : null,
          output : null,
          pledge_sum :null,
          participants :null,
          node_number :null,
          user_earn  :null,
        };
        this.$refs.form.clearValidate();
      }
    }

  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .add-dialog {
    .content {
      .el-form {
        width: 80%;
        margin: 0 auto;

        .el-input {
          width: 100%;
        }

        .el-select {
          width: 100%;
        }
      }
    }
  }

</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

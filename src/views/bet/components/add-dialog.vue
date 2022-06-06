<template>
  <div class="add-dialog">
    <el-dialog title="运行指定区块任务" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="起始区块高度" prop="from_block_num">
            <el-input v-model="form.from_block_num"></el-input>
          </el-form-item>

          <el-form-item label="结束区块高度" prop="to_block_num">
            <el-input v-model="form.to_block_num"></el-input>
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
  import {runHistoryTask} from '@/api/bet'
  import {
    getToken
  } from '@/utils/auth'
  export default {
    name: 'add-dialog',
    data() {
      return {

        dialogVisible: false,
        loading: false,

        list:[],
        form: {
          from_block_num  : null,
          to_block_num : null,
        },
        rules: {
          from_block_num : [{
            required: true,
            message: '输入开始区块高度',
            trigger: 'blur'
          }],
          to_block_num  : [{
            required: true,
            message: '请输入结束区块高度',
            trigger: 'blur'
          }],
          
        
        },
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
              to_block_num  :Number(this.form.to_block_num ),
              from_block_num  :Number(this.form.from_block_num ),
            };
            runHistoryTask(params).then(res => {
              this.loading = false;
              if (res.status_code == 200) {
                this.$notify({
                  title: '提示',
                  message: '成功',
                  type: 'success'
                })
                this.handleClose();
                this.$emit('success');
              } else {
                this.$notify({
                  title: '提示',
                  message: '失败',
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
          game_no : null,
          status: null,
          wallet_address : null,
          wallet_kind: null,
          wallet_type :null,
          belong_user_no :null,
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

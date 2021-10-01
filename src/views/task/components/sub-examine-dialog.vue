<template>
  <div class="sub-examine-dialog">
    <el-dialog title="执行子任务发送" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="子任务编号" prop="sub_task_no">
            <el-input v-model="form.sub_task_no" disabled></el-input>
          </el-form-item>
          <el-form-item label="发送类型" prop="send_action">
            <el-select v-model="form.send_action">
              <el-option label="立即发送" value="1"></el-option>
              <!-- <el-option label="定时发送" :value="2"></el-option> -->
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="mini">取 消</el-button>
        <el-button type="primary" @click="sure" size="mini">确定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import {
    sendSubTask
  } from '@/api/task'
  export default {
    name: 'sub-examine-dialog',
    data() {
      return {

        dialogVisible: false,
        loading: false,
        val: {},
        form: {
          sub_task_no: null,
          send_action: '1',
        },
        rules: {
          task_no: [{
            required: true,
            message: '请输入子任务编号',
            trigger: 'blur'
          }],
          send_action:[{
            required: true,
            message: '请选择发送类型',
            trigger: 'blur'
          }],
        }
      }
    },
    mounted() {},
    methods: {
      show(val) {
        console.log(val);
        this.val = val;
        this.form.sub_task_no = val.sub_task_no;
        this.dialogVisible = true;
        // console.log(val);
      },

      // 修改价格配置
      sure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            var params = this.form;
            sendSubTask(params).then(res => {
              this.loading = false;
              if (res.status_code == 200) {
                this.$notify({
                  title: '提示',
                  message: '执行成功',
                  type: 'success'
                })
                
                this.handleClose();
                this.$emit('success');
              } else {
                this.$notify({
                  title: '提示',
                  message: '执行失败',
                  type: 'error'
                })
                return false;
              }
            }).catch(err => {
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
          sub_task_no: null,
          send_action: '1',
        };
        this.$refs.form.clearValidate();
      }
    }

  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .sub-examine-dialog {
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

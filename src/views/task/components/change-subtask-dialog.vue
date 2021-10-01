<template>
  <div class="change-subtask-dialog">
    <el-dialog title="修改子任务" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="任务编号" prop="sub_task_no">
            <el-input v-model="form.sub_task_no" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone_list">
            <el-input type="textarea" v-model="form.phone_list" :rows="5"></el-input>
          </el-form-item>

          <el-form-item label="发送状态" prop="send_status">
            <el-select v-model="form.send_status">
              <el-option label="待发送" :value="1"></el-option>
              <el-option label="已发送" :value="2"></el-option>
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
    changeSubTask
  } from '@/api/task'
  import {channelList} from '@/api/pass'
  export default {
    name: 'change-subtask-dialog',
    data() {
      return {

        dialogVisible: false,
        loading: false,
        val: {},
        passList:[],
        form: {
          sub_task_no: null,
          phone_list:null,
          send_status:null
        },
        rules: {
          sub_task_no: [{
            required: true,
            message: '请输入任务编号',
            trigger: 'blur'
          }],
          phone_list:[{
            required: true,
            message: '请选择手机号',
            trigger: 'blur'
          }],
          send_status:[{
            required: true,
            message: '请选择发送状态',
            trigger: 'blur'
          }],
        }
      }
    },
    mounted() {
      this.channelList();
    },
    methods: {
      show(val) {
        console.log(val);
        this.val = val;
        this.form.sub_task_no = val.sub_task_no;
        this.form.phone_list = val.phone_list.replace(/,/g,'\n');
        this.form.send_status = val.send_status;
        this.dialogVisible = true;
        // console.log(val);
      },

      channelList() {
        var params = {
          page:1,
          per_page:100,
        }
        channelList(params).then(res=>{
          if(res.status_code==200) {
            this.passList = res.data.data;
          }
        })
      },

      sure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.form.phone_list = this.form.phone_list.replace(/\n/,',');
            var params = this.form;
            changeSubTask(params).then(res => {
              this.loading = false;
              if (res.status_code == 200) {
                this.$notify({
                  title: '提示',
                  message: '修改成功',
                  type: 'success'
                })
                
                this.handleClose();
                this.$emit('success');
              } else {
                this.$notify({
                  title: '提示',
                  message: '修改失败',
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
          phone_list:null,
          send_status:null
        };
        this.$refs.form.clearValidate();
      }
    }

  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .change-subtask-dialog {
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

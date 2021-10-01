<template>
  <div class="change-task-dialog">
    <el-dialog title="修改任务" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="任务编号" prop="task_no">
            <el-input v-model="form.task_no" disabled></el-input>
          </el-form-item>
          <el-form-item label="通道key" prop="channel_key">
            <el-select v-model="form.channel_key">
              <el-option v-for="(item,index) in passList" :key="index" :label="item.channel_name" :value="item.channel_key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发送内容" prop="content">
            <el-input type="textarea" v-model="form.content"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone_list">
            <el-input type="textarea" v-model="form.phone_list" :rows="5"></el-input>
          </el-form-item>

          <el-form-item label="发送状态" prop="send_status">
            <el-select v-model="form.send_status">
              <el-option label="待发送" :value="1"></el-option>
              <el-option label="已发送" :value="2"></el-option>
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
    changeTask
  } from '@/api/task'
  import {channelList} from '@/api/pass'
  export default {
    name: 'change-task-dialog',
    data() {
      return {

        dialogVisible: false,
        loading: false,
        val: {},
        passList:[],
        form: {
          task_no: null,
          channel_key: null,
          content:null,
          phone_list:null,
          send_status:null
        },
        rules: {
          task_no: [{
            required: true,
            message: '请输入任务编号',
            trigger: 'blur'
          }],
          content:[{
            required: true,
            message: '请选择发送内容',
            trigger: 'blur'
          }],
          phone_list:[{
            required: true,
            message: '请选择手机号',
            trigger: 'blur'
          }],
          channel_key:[{
            required: true,
            message: '请选择通道',
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
        this.form.task_no = val.task_no;
        this.form.content = val.content;
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

      // 修改价格配置
      sure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.form.phone_list = this.form.phone_list.replace(/\n/,',');
            var params = this.form;
            changeTask(params).then(res => {
              this.loading = false;
              if (res.status_code == 200) {
                this.$notify({
                  title: '提示',
                  message: '审核成功',
                  type: 'success'
                })
                
                this.handleClose();
                this.$emit('success');
              } else {
                this.$notify({
                  title: '提示',
                  message: '审核失败',
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
          task_no: null,
          channel_key: null,
          content:null,
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

  .change-task-dialog {
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

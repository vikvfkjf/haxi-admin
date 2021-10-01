<template>
  <div class="price-dialog">
    <el-dialog title="修改用户" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="公司名称" prop="user_no">
            <el-input v-model="form.user_no" disabled></el-input>
          </el-form-item>
          <el-form-item label="公司名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status">
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="等级" prop="level">
            <el-input v-model="form.level" type="number"></el-input>
          </el-form-item>

          

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" type="text"></el-input>
          </el-form-item>
          <el-form-item label="公司名称" prop="company_name">
            <el-input v-model="form.company_name" type="text"></el-input>
          </el-form-item>
          <el-form-item label="剩余可用短信" prop="total_remain_sms">
            <el-input v-model="form.total_remain_sms" type="number"></el-input>
          </el-form-item>
          <el-form-item label="通道key" prop="channel_key">
            <el-select v-model="form.channel_key">
              <el-option v-for="(item,index) in passList" :key="index" :label="item.channel_name" :value="item.channel_key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="扣减因子" prop="task_rebate">
            <el-input v-model="form.task_rebate" type="text"></el-input>
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
  import {changeUser} from '@/api/user'
  import {channelList} from '@/api/pass'
  export default {
    name: 'Price-dialog',
    data() {
      return {

        dialogVisible: false,
        loading: false,
        val: {},
        passList:[],
        form: {
          user_no: null,
          name: null,
          level: null,
          status:null,
          email:null,
          company_name:null,
          total_remain_sms:null,
          channel_key:null,
          task_rebate:null
        },
        rules: {
          user_no: [{
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入公司编号',
            trigger: 'blur'
          }],
          level: [{
            required: true,
            message: '请输入每个小号月租费',
            trigger: 'blur'
          }],
          status: [{
            required: true,
            message: '请选择计费模式',
            trigger: 'blur'
          }],
          email: [{
            required: true,
            message: '请输入每分钟通话费',
            trigger: 'blur'
          }],
          company_name: [{
            required: true,
            message: '请输入每分钟录音费',
            trigger: 'blur'
          }],
          total_remain_sms: [{
            required: true,
            message: '请输入每通通话费',
            trigger: 'blur'
          }],
          channel_key: [{
            required: true,
            message: '请输入每通录音费',
            trigger: 'blur'
          }],
          task_rebate: [{
            required: true,
            message: '请输入扣减因子',
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
        this.val = val;
        this.form = {
          user_no: val.user_no,
          name: val.name,
          level: val.level,
          status:val.status,
          email:val.email,
          company_name:val.company_name,
          total_remain_sms:val.total_remain_sms,
          channel_key:val.channel_key,
          task_rebate:val.task_rebate
        },
        this.dialogVisible = true;
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

            var params = this.form;
            changeUser(params).then(res => {
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
          user_no: null,
          name: null,
          level: null,
          status:null,
          email:null,
          company_name:null,
          total_remain_sms:null,
          channel_key:null,
          task_rebate:null
        };
        this.$refs.form.clearValidate();
      }
    }

  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .price-dialog {
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

<template>
  <div class="bind-dialog">
    <el-dialog title="绑定小号" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="公司编号" prop="company_no">
            <el-input v-model="form.company_no" disabled></el-input>
          </el-form-item>
          <el-form-item label="应用编号" prop="app_no">
            <el-input v-model="form.app_no" disabled></el-input>
          </el-form-item>
          
          <el-form-item label="号码池key" prop="pool_key">
            <el-input v-model="form.pool_key"></el-input>
          </el-form-item>
          <el-form-item label="生效时间" prop="effect_time">
            <el-date-picker v-model="form.effect_time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="有效时间" prop="valid_time">
            <el-input v-model="form.valid_time">
              <template slot="append">月</template>
            </el-input>
          </el-form-item>

          <!-- <el-form-item label="过期时间" prop="expire_time">
            <el-date-picker v-model="form.expire_time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item> -->

          <el-form-item label="文件">
            <el-upload class="upload-demo" ref="upload" name="company_phone_file" :action="action" :headers="headers" :on-remove="handleRemove"
              :on-change="handleChange" :on-success="handleSuccess" :file-list="fileList" :limit="1" :data="form"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
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
    bindNumber
  } from '@/api/number'
  import {
    getToken
  } from '@/utils/auth'

  export default {
    name: 'bind-dialog',
    data() {
      return {
        action: process.env.VUE_APP_BASE_API + '/v1/admin/company/import-phone',
        headers: {
          Authorization: getToken()
        },
        dialogVisible: false,
        loading: false,
        val: {},
        form: {
          company_no: null,
          app_no:null,
          // company_phone_file: null,
          valid_time:null,
          pool_key: null,
          effect_time:null,
          expire_time:null,
          phone_mode_key:null
        },
        rules: {
          company_no: [{
            required: true,
            message: '请输入公司编号',
            trigger: 'blur'
          }],
          app_no: [{
            required: true,
            message: '请输入应用编号',
            trigger: 'blur'
          }],
          valid_time:[{
            required: true,
            message: '请输入月份',
            trigger: 'blur'
          }],
          company_phone_file: [{
            required: true,
            message: '请选择文件',
            trigger: 'blur'
          }],
          pool_key: [{
            required: true,
            message: '请输入号码池key',
            trigger: 'blur'
          }],
          expire_time: [{
            required: true,
            message: '请选择过期时间',
            trigger: 'blur'
          }],
        },

        fileList:[]
      }
    },
    mounted() {},
    methods: {
      show(val) {
        this.val = val;
        this.form.company_no = val.company_no;
        this.form.app_no = val.app_no;
        this.form.phone_mode_key = val.phone_mode_key;
        this.form.valid_time = val.valid_time;
        this.dialogVisible = true;
        // console.log(val);
      },

      // 修改价格配置
      sure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$refs.upload.submit();
            // var params = this.form;
            // bindNumber(params).then(res => {
            //   this.loading = false;
            //   if (res.status_code == 200) {
            //     this.$notify({
            //       title: '提示',
            //       message: '修改成功',
            //       type: 'success'
            //     })

            //     this.handleClose();
            //     this.$emit('success');
            //   } else {
            //     this.$notify({
            //       title: '提示',
            //       message: '审核失败',
            //       type: 'error'
            //     })
            //     return false;
            //   }
            // }).catch(err => {
            //   this.loading = false;
            // })
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
          company_no: null,
          app_no:null,
          company_phone_file: null,
          valid_time:null,
          pool_key: null,
          effect_time:null,
          expire_time:null,
          phone_mode_key:null
        };
        this.$refs.form.clearValidate();
      },
      handleRemove(file, fileList) {
        this.form.company_phone_file = null;
      },
      handlePreview(file) {
        console.log(file);
      },
      handleChange(file,fileList) {
        // this.form.company_phone_file = file.raw;
      },
      handleSuccess(res, file, fileList) {
        // console.log(res)
        this.loading = false;
        if (res.status_code == 200) {
          this.$notify({
            title: '提示',
            type: 'success',
            message: '批量绑定成功'
          })
          this.dialogVisible = false;
          this.$emit('success');
          // this.form.bind_phone_file = res.data.file_path;
        } else if(res.status_code== 3000){
          this.$notify({
            title: '提示',
            type: 'error',
            message: '余额不足，请为提示客户充值，并为客户赋值'
          })
          // this.fileList = [];
        }else {
          this.$notify({
            title: '提示',
            type: 'error',
            message: '绑定失败'
          })
        }
      },
    }

  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .bind-dialog {
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

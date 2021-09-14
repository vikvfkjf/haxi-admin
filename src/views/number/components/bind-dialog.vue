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
          <el-form-item label="归属城市编码" prop="code">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="生效时间" prop="effect_time">
            <el-date-picker v-model="form.effect_time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="过期时间" prop="expire_time">
            <el-date-picker v-model="form.expire_time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="excel" prop="company_phone_file">
            <el-upload
              class="upload-demo"
              ref="upload"
              action=""
              :on-change="handleChange"
              :on-remove="handleRemove"
              :file-list="fileList"
              :limit="1"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
    examineNumber
  } from '@/api/number'
  export default {
    name: 'bind-dialog',
    data() {
      return {

        dialogVisible: false,
        loading: false,
        val: {},
        form: {
          company_no: null,
          app_no:null,
          company_phone_file: null,
          pool_key: null,
          code:null,
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
          code: [{
            required: true,
            message: '请选择归属城市编码',
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
        this.dialogVisible = true;
        // console.log(val);
      },

      // 修改价格配置
      sure() {
        console.log(this.form);
        return false;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            var params = this.form;
            examineNumber(params).then(res => {
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
          company_no: null,
          app_no:null,
          company_phone_file: null,
          pool_key: null,
          code:null,
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
        this.form.company_phone_file = file.raw;
      }
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

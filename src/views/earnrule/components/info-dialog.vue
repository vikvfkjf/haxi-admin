<template>
  <div class="price-dialog">
    <el-dialog title="修改规则" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="Id" prop="id">
            <el-input v-model="form.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="下限" prop="min">
            <el-input v-model="form.min"></el-input>
          </el-form-item>
          <el-form-item label="上限" prop="max">
            <el-input v-model="form.max"></el-input>
          </el-form-item>

          <el-form-item label="百分比（单位%）" prop="earn_percent">
            <el-input v-model="form.earn_percent"></el-input>
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
  import {updateEarnrule} from '@/api/earnrule.js'
  import {
    getToken
  } from '@/utils/auth'
  export default {
    name: 'info-dialog',
    data() {
      return {

        dialogVisible: false,
        loading: false,
        val: {},
        passList:[],
        form: {
          id: null,
          min  : null,
          max : null,
          earn_percent  :null,
        },
        rules: {
          min : [{
            required: true,
            message: '请输入下限',
            trigger: 'blur'
          }],
          max : [{
            required: true,
            message: '请输入上限',
            trigger: 'blur'
          }],
          
          earn_percent  : [{
            required: true,
            message: '请选择收益百分比',
            trigger: 'blur'
          }]
        },

        action: process.env.VUE_APP_BASE_API + '/v1/admin/upload',
        headers: {
          Authorization: getToken()
        },

      }
    },
    mounted() {
    },
    methods: {
      show(val) {
        this.val = val;
        this.form = {
          id: val.id,
          min: val.min,
          max: val.max,
          earn_percent:val.earn_percent,
        },
        this.dialogVisible = true;
      },


      sure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;

            var params = {        
                id:String(this.form.id),
                min:Number(this.form.min),
                max:Number(this.form.max) ,
                earn_percent:Number(this.form.earn_percent  ),
            }
            updateEarnrule(params).then(res => {
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
          id: null,
          min : null,
          max : null,
          earn_percent :null,
        };
        this.$refs.form.clearValidate();
      },
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

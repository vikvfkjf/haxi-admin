<template>
  <div class="info-dialog">
    <el-dialog title="修改会员" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="会员ID" prop="member_no">
            <el-input v-model="form.member_no" disabled></el-input>
          </el-form-item>
          <el-form-item label="来源推广码" prop="from_promo_code">
            <el-input v-model="form.from_promo_code"></el-input>
          </el-form-item>

          <el-form-item label="会员状态" prop="status">
            <el-select v-model="form.status">
              <el-option label="未划转" :value="1"></el-option>
              <el-option label="已划转" :value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="会员类型" prop="member_type">
            <el-select v-model="form.member_type">
              <el-option label="ETH" :value="1"></el-option>
              <el-option label="TRX" :value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="usdt收益" prop="balance_usdt">
            <el-input v-model="form.balance_usdt"></el-input>
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
  import {updateMember} from '@/api/member'
  export default {
    name: 'info-dialog',
    data() {
      return {

        dialogVisible: false,
        loading: false,
        val: {},
        passList:[],
        form: {
          member_no: null,
          from_promo_code : null,
          status: null,
          member_type :null,
          balance_usdt :null,
        },
        rules: {
          member_no: [{
            required: true,
            message: '请输入会员Id',
            trigger: 'blur'
          }],
          from_promo_code : [{
            required: true,
            message: '请输入来源推广码',
            trigger: 'blur'
          }],
          status : [{
            required: true,
            message: '请选择会员状态',
            trigger: 'blur'
          }],
          member_type : [{
            required: true,
            message: '请选择会员类型',
            trigger: 'blur'
          }],
          balance_usdt : [{
            required: true,
            message: '请输入usdt收益',
            trigger: 'blur'
          }]
        }
      }
    },
    mounted() {
    },
    methods: {
      show(val) {
        console.log('hahah',val);
        this.val = val;
        this.form = {
          member_no: val.member_no,
          from_promo_code: val.from_promo_code,
          status : val.status ,
          member_type :val.member_type ,
          balance_usdt :val.balance_usdt ,
        },
        this.dialogVisible = true;
      },


      sure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;

            var params = {        
                member_no:this.form.member_no,
                from_promo_code :this.form.from_promo_code,
                status :Number(this.form.status ),
                member_type :Number(this.form.member_type ),
                balance_usdt :this.form.balance_usdt,
            }
            updateMember(params).then(res => {
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
          member_no: null,
          from_promo_code : null,
          status: null,
          member_type :null,
          balance_usdt :null,
        };
        this.$refs.form.clearValidate();
      },
    }

  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .info-dialog {
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

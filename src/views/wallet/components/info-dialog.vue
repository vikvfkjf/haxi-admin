<template>
  <div class="info-dialog">
    <el-dialog title="修改钱包" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="Id" prop="id">
            <el-input v-model="form.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="钱包地址" prop="wallet_address">
            <el-input v-model="form.wallet_address"></el-input>
          </el-form-item>

          <el-form-item label="钱包类别" prop="wallet_kind">
            <el-select v-model="form.wallet_kind">
              <el-option label="ERC20" :value="1"></el-option>
              <el-option label="TRC20" :value="2"></el-option>
              <el-option label="BEP20" :value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="游戏类型" prop="wallet_type">
            <el-select v-model="form.wallet_type">
              <el-option label="主钱包" :value="1"></el-option>
              <el-option label="代理钱包" :value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所属后台用户编号" prop="belong_user_no">
            <el-input v-model="form.belong_user_no"></el-input>
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
  import {updateWallet} from '@/api/wallet'
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
          wallet_address : null,
          wallet_kind: null,
          wallet_type :null,
          belong_user_no :null,
        },
        rules: {
          wallet_address: [{
            required: true,
            message: '请输入钱包地址',
            trigger: 'blur'
          }],
          wallet_kind : [{
            required: true,
            message: '请选择钱包类别',
            trigger: 'blur'
          }],
          
          wallet_type : [{
            required: true,
            message: '请选择钱包类型',
            trigger: 'blur'
          }],
          belong_user_no : [{
            required: true,
            message: '请选择所属后台用户编号',
            trigger: 'blur'
          }],
          
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
          wallet_address: val.wallet_address,
          wallet_kind : Number(val.wallet_kind),
          wallet_type :val.wallet_type ,
          belong_user_no :val.belong_user_no ,
        },
        this.dialogVisible = true;
      },


      sure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;

            var params = {        
                id:String(this.form.id),
                wallet_address :String(this.form.wallet_address ),
                wallet_kind :Number(this.form.wallet_kind ),
                wallet_type :Number(this.form.wallet_type ),
                belong_user_no :String(this.form.belong_user_no ),
            }
            updateWallet(params).then(res => {
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
          wallet_address : null,
          wallet_kind: null,
          wallet_type :null,
          belong_user_no :null,
        },
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

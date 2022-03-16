<template>
  <div class="price-dialog">
    <el-dialog title="修改成员" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="编号" prop="user_no">
            <el-input v-model="form.user_no" disabled></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status">
              <el-option label="开启" :value="1">开启</el-option>
              <el-option label="关闭" :value="2">关闭</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>


          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>

          <el-form-item label="eth总的提现金额" prop="eth_withdraw_sum">
            <el-input v-model="form.eth_withdraw_sum"></el-input>
          </el-form-item>

          <el-form-item label="tron总的提现金额" prop="tron_withdraw_sum">
            <el-input v-model="form.tron_withdraw_sum"></el-input>
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
  import {updateAgent} from '@/api/agent'
  import {
    getToken
  } from '@/utils/auth'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'info-dialog',
    data() {
      return {

        dialogVisible: false,
        loading: false,
        val: {},
        passList:[],
        form: {
          user_no : null ,
          password : null,
          status : null ,
          phone : null ,
          email : null ,
          eth_withdraw_sum : null ,
          tron_withdraw_sum : null ,
        },
        rules: {},

        action: process.env.VUE_APP_BASE_API + '/v1/admin/upload',
        headers: {
          Authorization: getToken()
        },

      }
    },
    mounted() {
    },
    computed: {
      ...mapGetters([
        'user_info'
      ]),
    },
    methods: {
      show(val) {
        console.log(val);
        this.val = val;
        this.form = {
          user_no : val.user_no ,
          // password : val.password ,
          status : val.status ,
          phone : val.phone ,
          email : val.email ,
          eth_withdraw_sum : val.eth_withdraw_sum ,
          tron_withdraw_sum : val.tron_withdraw_sum ,
        },
        this.dialogVisible = true;
      },


      sure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;

            var params = {        
                user_no :String(this.form.user_no),
                password:String(this.form.password),
                status :Number(this.form.status),
                phone :String(this.form.phone ),
                email :String(this.form.email),
                eth_withdraw_sum :Number(this.form.eth_withdraw_sum) ,
                tron_withdraw_sum :Number(this.form.tron_withdraw_sum) ,
            }
            updateAgent(params).then(res => {
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
          user_no : null ,
          password : null,
          status : null ,
          phone : null ,
          email : null ,
          eth_withdraw_sum : null ,
          tron_withdraw_sum : null ,
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

<template>
  <div class="account-password-container">
    <div class="title">
      <h2>修改密码</h2>
    </div>

    <div class="box">
      <el-form ref="form" :model="form" label-width="140px" size="mini" :rules="rules">
        <el-form-item label="当前密码:" prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入当前密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="new_password">
          <el-input type="password" v-model="form.new_password" placeholder="请输入6-20位的数字，字母"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="confirm_password">
          <el-input type="password" v-model="form.confirm_password" placeholder="请输入6-20位的数字，字母"></el-input>
        </el-form-item>
        <el-form-item label="验证码:" prop="verify_code">
          <el-input type="text" v-model="form.verify_code" placeholder="请输入验证码" style="width:160px;"></el-input>
          <img class="picValid" :src="verifyCodeImg" alt="" @click="resetVerifyCodeImg">
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="changePassword">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {getVerifyCode} from '@/api/user';
  import {changePassword} from '@/api/user'
  export default {
    name: 'Account-password',
    data() {
      return {
        verifyCodeImg:null,
        verifyCodeKey:null,
        form: {
          password: '',
          new_password: '',
          confirm_password: '',
          verify_key:'',
          verify_code:''
        },
        rules: {
          password: [{
            required: true,
            message: '请输入当前密码',
            trigger: 'blur'
          }, ],
          new_password: [{
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          }, ],
          confirm_password: [{
            required: true,
            message: '请输入确认密码',
            trigger: 'blur'
          }, ],
          verify_code: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }, ],
        }
      }
    },
    mounted() {
      this.getVerifyCode();
    },

    methods:{
      // 获取图形验证码
      getVerifyCode() {
        getVerifyCode().then(res=>{
          if(res.status_code==200) {
            this.verifyCodeImg = res.data.img;
            this.verifyCodeKey = res.data.key;
          }else{

          }
        })
      },
      resetVerifyCodeImg() {
        this.getVerifyCode();
      },
      changePassword() {
        this.form.verify_key = this.verifyCodeKey;
        this.$refs['form'].validate((valid) => {
          if(valid) {
            changePassword(this.form).then(res=>{
              if(res.status_code==200) {
                this.$message({
                  type:'success',
                  message:'修改成功'
                })
                this.reset();
              }else{
                this.$message({
                  type:'error',
                  message:res.err_msg
                })
                return false;
              }
            })
          }
        })
        
      },
      reset() {
        this.form={
          password: '',
          new_password: '',
          confirm_password: '',
          verify_key:'',
          verify_code:''
        };
        this.$refs.from.clearValidate();
        this.getVerifyCode();

      }
    }

    
    //   computed: {
    //     ...mapGetters([
    //       'name'
    //     ])
    //   }
  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .account-password-container {
    .title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 40px;
      padding: 0 20px;
      margin-bottom: 20px;
      background: #fff;
      align-items: center;

      h2 {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 3px;
        color: #3d3d3d;
        line-height: 40px;
      }
    }

    .box {
      -webkit-box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
      box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
      padding: 20px;
      color: #606060;
      background-color: #fff;

      .el-form {
        width: 375px;

        .el-form-item{
          .picValid{
            float:right;
            width:calc(100% - 170px);
            height:28px;
            cursor:pointer;
          }
        }
      }
    }

  }

</style>

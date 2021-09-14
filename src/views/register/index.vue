<template>
  <div class="login-container">
    <div class="login-box">
      <div class="box-left">
        <el-form ref="registerForm" :model="registerForm" :rules="loginRules" class="login-form" auto-complete="off"
          label-position="left">

          <div class="title-container">
            <h3 class="title">注册</h3>
            <p><i class="iconfont icon-a-Iconly-Bulk-InfoSquare" style="color:#ff416c;"></i>  温馨提示：所填手机号码、邮箱将用于接收系统重要通知消息，请务必填写企业用户真实、可联系的联系方式。</p>
          </div>

          <el-form-item prop="name">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input ref="name" v-model="registerForm.name" placeholder="请输入用户名" name="name" type="text"
            auto-complete="off" />
          </el-form-item>

          <el-form-item prop="phone">
            <span class="svg-container">
              <i class="iconfont icon-Iconly-Bulk-Calling"></i>
            </span>
            <el-input ref="phone" v-model="registerForm.phone" placeholder="请输入手机号" name="phone" type="text"
            auto-complete="off" />
          </el-form-item>

          <!-- <el-form-item prop="email">
            <span class="svg-container">
              <i class="iconfont icon-Iconly-Bulk-Message"></i>
            </span>
            <el-input ref="email" v-model="registerForm.email" placeholder="请输入邮箱" name="email" type="text"
            auto-complete="off" />
          </el-form-item> -->

          <el-form-item prop="verify_code">
            <span class="svg-container">
              <i class="iconfont icon-a-Iconly-Bulk-ShieldDone" />
            </span>
            <el-input ref="verify_code" v-model="registerForm.verify_code" placeholder="请输入图形验证码" name="verify_code" type="text"
             auto-complete="off" style="width:160px;" />
             <img class="picValid" :src="verifyCodeImg" alt="" @click="resetVerifyCodeImg">
            <!-- <div class="picValid"><img src="" alt=""></div> -->
          </el-form-item>

          <!-- <el-form-item prop="mobileValidCode">
            <span class="svg-container">
              <i class="iconfont icon-Iconly-Bulk-Password"></i>
            </span>
            <el-input ref="mobileValidCode" v-model="registerForm.mobileValidCode" placeholder="请输入短信验证码" name="mobileValidCode" type="text"
            auto-complete="off" style="width:200px;" />
            <el-button type="text">获取验证码</el-button>
          </el-form-item> -->

          <el-form-item prop="company_name">
            <span class="svg-container">
              <i class="iconfont icon-Iconly-Bulk-Work"></i>
            </span>
            <el-input ref="company_name" v-model="registerForm.company_name" placeholder="请输入公司名称" name="company_name" type="text"
            auto-complete="off" />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input :key="passwordType" ref="password" v-model="registerForm.password" :type="passwordType"
              placeholder="请输入密码" name="password" auto-complete="off" @keyup.enter.native="handleLogin" />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <!-- <el-form-item prop="agree" style="background:#fff;">
            <el-checkbox v-model="registerForm.agree">同意<a href="">《云信留客用户服务协议》</a></el-checkbox>
          </el-form-item> -->
          

          <el-button class="submitBtn" :loading="loading" type="danger" round @click.native.prevent="register">注册</el-button>

        </el-form>
      </div>

      <div class="box-right">
        <h2>已有帐号？</h2>
        <p>请使用您的帐号进行登录</p>
        <el-button round @click="toLogin">登录</el-button>
        <!-- <el-button>注册</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
  import {
    validUsername
  } from '@/utils/validate'

  import {getVerifyCode,register} from '@/api/user';

  export default {
    name: 'Login',
    data() {
      // const validateUsername = (rule, value, callback) => {
      //   if (!validUsername(value)) {
      //     callback(new Error('请输入用户名或密码'))
      //   } else {
      //     callback()
      //   }
      // }
      const validatePassword = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      return {
        verifyCodeImg:null,
        verifyCodeKey:null,
        registerForm: {
          name: '',
          phone:'',
          // email:'',
          verify_code: '',
          verify_key:'',
          // mobileValidCode:'',
          company_name:'',
          password: '',
          // agree:'',
        },
        loginRules: {
          name: [{
            required: true,
            trigger: 'blur',
            message: '请输入用户名'
            // validator: validateUsername
          }],
          phone: [{
            required: true,
            trigger: 'blur',
            message: '请输入手机号'
          }],
          // email: [{
          //   required: true,
          //   trigger: 'blur',
          //   message: '请输入邮箱'
          // }],
          verify_code: [{
            required: true,
            trigger: 'blur',
            message: '请输入图形验证码'
          }],
          // mobileValidCode: [{
          //   required: true,
          //   trigger: 'blur',
          //   message: '请输入短信验证码'
          // }],
          company_name: [{
            required: true,
            trigger: 'blur',
            message: '请输入公司名称'
          }],
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }],
          
          // agree:[{
          //   required: true,
          //   trigger: 'blur',
          //   message: '请勾选同意选项'
          // }],
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined
      }
    },
    watch: {
      // $route: {
      //   handler: function(route) {
      //     this.redirect = route.query && route.query.redirect
      //   },
      //   immediate: true
      // }
    },
    mounted() {
      this.getVerifyCode();
    },
    methods: {
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

      register() {
        this.registerForm.verify_key = this.verifyCodeKey;

        this.$refs['registerForm'].validate((valid) => {
          if (valid) {
            register(this.registerForm).then(res=>{
              // console.log(res);
              if(res.status_code==200) {
                this.$message({
                  message: '注册成功',
                  type: 'success'
                });
                this.toLogin();
              }else{
                this.$message({
                  message: res.err_msg,
                  type: 'error'
                });
              }
            })
          }
        })
        
        
      },

      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      toLogin() {
        this.$router.push({
          path:'/login'
        })
      }
    }
  }

</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  /* reset element-ui css */
  .login-container {
    .el-input {
      input {
        background: transparent;
        border: 0px;
        color: #000;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px #eee inset !important;
          -webkit-text-fill-color: #000 !important;
        }
      }
    }
  }

</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    // background-color: $bg;
    background: #f6f5f7;
    overflow: hidden;

    .login-box {
      background: #fff;
      border-radius: 10px;
      // box-shadow: 0 14px 28px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);
      position: relative;
      overflow: hidden;
      width: 100vw;
      height: 100vh;
      // width: 768px;
      // height: 480px;
      margin: 0 auto;
      
      .box-left{
        display: inline-block;
        width: calc(100% - 385px);
        padding-top:calc((100vh - 712px)/2);
        .login-form {
          display: block;
          position: relative;
          width:400px;
          max-width: 100%;
          margin: 0 auto;
          padding: 0 40px;
          overflow: hidden;

          .el-form-item {
            background: #eee;
            border-radius: 3px;

            .svg-container {
              display: inline-block;
              padding: 0 5px 0 15px;
              color: $dark_gray;
              vertical-align: middle;
              width: 35px;
            }

            .el-input {
              display: inline-block;
              width: calc(100% - 65px);
            }

            .picValid{
              float:right;
              width:calc(100% - 200px);
              height:42px;
              cursor:pointer;
            }
          }

          .title-container {
            position: relative;

            .title {
              font-size: 26px;
              color: #000;
              margin: 0px auto 30px auto;
              text-align: center;
              font-weight: bold;
            }

            p{
              // text-align:center;
              font-size:14px;
              color:#999;
              line-height:30px;
            }
          }

          .show-pwd {
            position: absolute;
            right: 10px;
            top: 0px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
          }

          .submitBtn {
            display: block;
            width: 100px;
            margin: 0 auto;
          }

        }
      }
      
      .box-right {
        float: right;
        background: #ff416c;
        width: 385px;

        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 35px;
        height: 100%;
        color: #fff;

        h2 {
          font-size: 32px;
        }

        p {
          font-size: 14px;
          line-height: 20px;
          letter-spacing: .5px;
          margin: 20px 0 30px;
        }

        .el-button {
          width: 100px;
          border: 1px solid #ff416c;
        }
      }
    }
  }

</style>

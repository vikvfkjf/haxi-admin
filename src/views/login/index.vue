<template>
  <div class="login-container">
    <div class="login-box">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

        <div class="title-container">
          <h3 class="title">登录</h3>
        </div>

        <el-form-item prop="phone">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="phone"
            v-model="loginForm.phone"
            placeholder="请输入用户名或手机号"
            name="phone"
            type="text"
            auto-complete="off"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item prop="verify_code">
          <span class="svg-container">
            <i class="iconfont icon-a-Iconly-Bulk-ShieldDone" />
          </span>
          <el-input
            ref="verify_code"
            v-model="loginForm.verify_code"
            placeholder="请输入验证码"
            name="verify_code"
            type="text"
            auto-complete="off"
            style="width:160px;"
          />
          <img class="picValid" :src="verifyCodeImg" alt="" @click="resetVerifyCodeImg">
        </el-form-item>

        <el-button :loading="loading" type="danger" round @click.native.prevent="handleLogin">登录</el-button>

      </el-form>
      <div class="box-right">
        <h2>没有帐号？</h2>
        <p>立即注册加入我们，和我们一起开始旅程吧</p>
        <el-button round @click="toRegister">注册</el-button>
        <!-- <el-button>注册</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
  import {getVerifyCode} from '@/api/user';

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
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
      loginForm: {
        phone: '',
        password: '',
        // verify_key: 'jump_key',
        // verify_code:'dddyyy123iiikkkaaa',
        jump_key:'dddyyy123iiikkkaaa'
      },
      loginRules: {
        phone: [{ required: true, trigger: 'blur', message: '请输入用户名或手机号' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        verify_code: [{ required: true, trigger: 'blur', message: '验证码不能为空' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    // this.getVerifyCode();
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
    handleLogin() {
      console.log(this.loginForm)
      // this.loginForm.verify_key = this.verifyCodeKey;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            if(res.status_code==200) {
              this.$router.push({ path: this.redirect || '/' })
            }else{
              this.$message({
                type:'error',
                message:res.err_msg
              })
            }
            this.loading = false
            
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toRegister() {
      this.$router.push({
        path: '/register'
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
  .el-input{
    input{
      background: transparent;
      border: 0px;
      color:#000;
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
  background:#f6f5f7;
  overflow: hidden;

  .login-box{
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);
    position: relative;
    overflow: hidden;
    width: 768px;
    // max-width: 100%;
    height: 480px;
    margin:calc( (100vh - 480px)/2 ) auto 0;

    .login-form {
      display: inline-block;
      position: relative;
      width: 385px;
      max-width: 100%;
      margin: 0 auto;
      padding:0 40px;
      overflow: hidden;

      .el-form-item{
        background:#eee;
        border-radius:3px;
        .svg-container {
          display: inline-block;
          padding: 0 5px 0 15px;
          color: $dark_gray;
          vertical-align: middle;
          width: 35px;
        }

        .el-input{
          display:inline-block;
          width:calc(100% - 65px);
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
          margin: 40px auto 40px auto;
          text-align: center;
          font-weight: bold;
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

      .el-button{
        display:block;
        width:100px;
        margin:0 auto;
      }

    }

    .box-right{
      float:right;
      background:#ff416c;
      width:calc(100% - 385px);
      height:100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 35px;
      height: 100%;
      color:#fff;
      h2{
        font-size:32px;
      }
      p{
        font-size: 14px;
        line-height: 20px;
        letter-spacing: .5px;
        margin: 20px 0 30px;
      }
      .el-button{
        width:100px;
        border:1px solid #ff416c;
      }
    }
  }
}
</style>

<template>
  <div class="account-warning-container">
    <div class="title">
      <h2>告警配置</h2>
    </div>

    <div class="box">
        <el-form ref="form" :model="form" label-width="140px" size="mini" :rules="rules">
            <el-form-item label="账户余额提醒:" prop="ye">
                <el-input type="number" v-model="form.ye" placeholder="账户余额提醒"></el-input>
                <p class="tip">(当账户剩余金额低于该数目时，会触发提醒)</p>
            </el-form-item>
            <el-form-item label="短信提醒:" prop="message">
                <el-input type="password" v-model="form.message" placeholder="请输入接口短信的手机号"></el-input>
                <p class="tip">（仅支持一个手机号）</p>
            </el-form-item>
            <el-form-item label="邮件提醒:" prop="email">
                <el-input type="password" v-model="form.email" placeholder="请输入邮箱地址"></el-input>
                <p class="tip">（支持多个邮箱，以英文逗号“,”隔开）</p>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'Account-warning',
    data() {
        return {
            form:{
                ye:'',
                message:'',
                email:'',
            },
            rules:{
                ye: [
                    { required: true, message: '请输入当前密码', trigger: 'blur' },
                ],
                newpassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                ],
                snewpassword: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' },
                ],
            }
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

  .account-warning-container {
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

    .box{
        -webkit-box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
        box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
        padding: 20px;
        color: #606060;
        background-color: #fff;
        .el-form{
            width:375px;
            .el-form-item{
                position:relative;
                
            }
            .tip{
                position:absolute;
                left:255px;
                top:0;
                width:300px;
                color:#606060;
                font-size:12px;

            }
        }
    }

  }

</style>

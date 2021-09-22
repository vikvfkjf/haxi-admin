<template>
  <div class="account-index-container">
    <div class="title">
      <h2>基本信息</h2>
    </div>

    <div class="base-box">
      <div class="section section1">
        <ul>
          <li>
            <span class="lab">登录名：</span>
            <span class="value">{{user_info.name}}</span>
            <div class="btns">
              <el-button plain  size="mini" @click="changeNameBtn">更改</el-button>
            </div>
          </li>
          <!-- <li>
            <span class="lab">公司名：</span>
            <span class="value">{{user_info.admin_company?user_info.admin_company.name:'暂无'}}</span>
            <div class="btns">
              <el-button plain  size="mini" @click="changeCompanyName">更改</el-button>
            </div>
          </li> -->
          <li>
            <span class="lab">邮箱：</span>
            <span class="value">{{user_info.email}}</span>
            <div class="btns">
              <el-button plain  size="mini" @click="changeEmailBtn">更改</el-button>
            </div>
          </li>
        </ul>
      </div>

      <div class="section section1">
        <ul>
          <!-- <li>
            <span class="lab">认证信息：</span>
            <span class="value" ><i class="iconfont icon-authenticate" style="color:blue;font-weight:800;"></i> 已认证通过</span>
            <span class="value" ><i class="iconfont icon-authenticate" style="color:red;font-weight:800;"></i> 未认证</span>
          </li> -->
          <li>
            <span class="lab">公司名称：</span>
            <span class="value">{{user_info.admin_company?user_info.admin_company.name:'暂无'}}</span>
            <div class="btns">
              <el-button plain  size="mini" @click="changeCompanyName">更改</el-button>
            </div>
          </li>
          <li>
            <span class="lab">收款银行：</span>
            <span class="value">{{user_info.admin_company_info?user_info.admin_company_info.bank:'暂无'}}</span>
            <div class="btns">
              <el-button plain  size="mini" @click="">更改</el-button>
            </div>
          </li>
          <li>
            <span class="lab">银行全称：</span>
            <span class="value">{{user_info.admin_company_info?user_info.admin_company_info.due_bank:'暂无'}}</span>
            <div class="btns">
              <el-button plain  size="mini" @click="">更改</el-button>
            </div>
          </li>
          <li>
            <span class="lab">收款人：</span>
            <span class="value">{{user_info.admin_company_info?user_info.admin_company_info.payee:'暂无'}}</span>
            <div class="btns">
              <el-button plain  size="mini" @click="">更改</el-button>
            </div>
          </li>
          
          <li>
            <span class="lab">收款账户：</span>
            <span class="value">{{user_info.admin_company_info?user_info.admin_company_info.card_no:'暂无'}}</span>
            <div class="btns">
              <el-button plain  size="mini" @click="">更改</el-button>
            </div>
          </li>

          <li>
            <span class="lab">联系人：</span>
            <span class="value">{{user_info.admin_company_info?user_info.admin_company_info.contact:'暂无'}}</span>
            <div class="btns">
              <el-button plain  size="mini" @click="">更改</el-button>
            </div>
          </li>
          <li>
            <span class="lab">联系号码：</span>
            <span class="value">{{user_info.admin_company_info?user_info.admin_company_info.phone:'暂无'}}</span>
            <div class="btns">
              <el-button plain  size="mini" @click="">更改</el-button>
            </div>
          </li>
          <!-- <li>
            <span class="lab">营业执照：</span>
            <span class="value">
            </span>
          </li> -->
        </ul>
      </div>
    </div>

    <change-user-dialog ref="changeUserDialog"></change-user-dialog>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {changePassword} from '@/api/user'
  import changeUserDialog from './components/change-user-dialog.vue'
  export default {
    name: 'Account-index',
    components:{
      changeUserDialog
    },
    computed: {
      ...mapGetters([
        'user_info'
      ])
    },
    mounted() {
      console.log(this.user_info)
      // this.changePassword();
    },
    methods:{
      changeEmailBtn() {
        var params = {
          title:'修改邮箱',
          en_label:'email',
          cn_label:'邮箱',
          value:this.user_info.email
        }
        this.$refs.changeUserDialog.show(params);
      },
      changeCompanyName() {
        var params = {
          title:'修改公司名称',
          en_label:'company_name',
          cn_label:'公司名称',
          value:this.user_info.admin_company?this.user_info.admin_company.name:null
        }
        this.$refs.changeUserDialog.show(params);
      },
      changeNameBtn() {
        var params = {
          title:'修改用户名',
          en_label:'name',
          cn_label:'用户名称',
          value:this.user_info.name
        }
        this.$refs.changeUserDialog.show(params);
      },
    }
  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .account-index-container {
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

    .base-box{
      -webkit-box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
      box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
      padding: 0 20px;
      color: #606060;
      background-color: #fff;

      .section{
        padding:20px 0;
        border-bottom:1px solid #ececec;
        ul{
          li{
            display:flex;
            flex-direction: row;
            line-height:40px;
            color: #606060;
            font-size:14px;
            // justify-content:flex-start;
            .lab{
              width:80px;
            }
            .value{
              margin-right:20px;
            }
          }
        }
      }
    }
  }

</style>

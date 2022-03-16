<template>
  <div class="account-index-container">
    <div class="title">
      <h2>基本信息</h2>
    </div>

    <div class="base-box">
      <el-form ref="form" :model="form" label-width="80px" size="mini">

        <el-form-item :label="linkLabel1" v-if="user_info.role==3">
          <el-input :value="user_info.url_list[0].prefix_address+'?promo='+user_info.promo_code" type="text" disabled></el-input>
          <el-button class="copy" v-clipboard:copy="user_info.url_list[0].prefix_address+'?promo='+user_info.promo_code" v-clipboard:success="onCopy">复制</el-button>
        </el-form-item>

        <el-form-item :label="linkLabel2" v-if="user_info.role==3">
          <el-input :value="user_info.url_list[1].prefix_address+'?promo='+user_info.promo_code" type="text" disabled></el-input>
          <el-button class="copy" v-clipboard:copy="user_info.url_list[1].prefix_address+'?promo='+user_info.promo_code" v-clipboard:success="onCopy">复制</el-button>
        </el-form-item>

        <el-form-item label="编号" prop="user_no">
          <el-input v-model="form.user_no" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="eth提款地址" prop="eth_withdraw_address" v-if="user_info.role!=1">
          <el-input v-model="form.eth_withdraw_address"></el-input>
        </el-form-item>

        <el-form-item label="tron提款地址" prop="tron_withdraw_address" v-if="user_info.role!=1">
          <el-input v-model="form.tron_withdraw_address" type="text"></el-input>
        </el-form-item>

        

        <el-form-item label="" prop="tron_withdraw_address">
          <el-button type="primary" @click="sure" size="mini">修改</el-button>
        </el-form-item>
      </el-form>

      
    </div>
  </div>

</template>

<script>
  import {changeUserInfo} from '@/api/account'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'Account-index',
    data() {
      return {
        form: {
          user_no: "",
          name: "",
          password: "",
          email: "",
          phone: "",
          tron_withdraw_address: "",
          eth_withdraw_address: "",
        },
        linkLabel1:null,
        linkLabel2:null,

      }
    },
    computed: {
      ...mapGetters([
        'user_info'
      ])
    },
    mounted() {
      this.form = {
        user_no: this.user_info.user_no,
        name: this.user_info.name,
        email: this.user_info.email,
        phone: this.user_info.phone,
        tron_withdraw_address: this.user_info.tron_withdraw_address,
        tron_withdraw_sum: this.user_info.tron_withdraw_sum,
        eth_withdraw_address: this.user_info.eth_withdraw_address,
        eth_withdraw_sum: this.user_info.eth_withdraw_sum,
      }

      this.linkLabel1 = this.user_info.url_list[0].project_type==1?'eth':'trx' + '推广链接';
      this.linkLabel2 = this.user_info.url_list[1].project_type==2?'trx':'eth' + '推广链接';
    },
    methods: {
      sure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            var params = this.form;
            console.log(this.form);
            changeUserInfo(params).then(res => {
              this.loading = false;
              if (res.status_code == 200) {
                this.$notify({
                  title: '提示',
                  message: '修改成功',
                  type: 'success'
                })
                store.dispatch('user/getInfo');
                
                // this.handleClose();
                // this.$emit('success');
              } else {
                this.$notify({
                  title: '提示',
                  message: '新增失败',
                  type: 'error'
                })
                return false;
              }
            }).catch(err=>{
              this.loading = false;
            })
          }
        })

      },

      onCopy() {
        this.$notify({
          title: '提示',
          message: '复制成功',
          type: 'success'
        })
      }
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

    .base-box {
      -webkit-box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
      box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
      padding: 20px;
      color: #606060;
      background-color: #fff;
      .el-form{
        width:500px;
      }
    }

    .el-form-item{
      position:relative;
      .copy{
        position:absolute;
        left:400px;
        top:0;
      }
    }
  }

</style>

<style lang="scss">
.account-index-container{
  .el-form-item__label{
    width:100px !important;
  }
  .el-form-item__content{
    margin-left:100px !important;;
  }
}
</style>

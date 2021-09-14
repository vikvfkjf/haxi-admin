<template>
  <div class="finance-index-container">
    <div class="title">
      <h2>充值</h2>
    </div>

    <div class="box">
      <el-tabs type="card">
        <el-tab-pane label="对公打款">
          <div class="card-box">
            <div class="section">
              <h3>联系方式</h3>
              <p><span class="lab">联系人：</span><span class="value">zhengxiaofeng</span></p>
              <p><span class="lab">联系号码：</span><span class="value">18301639208</span></p>
            </div>

            <div class="section">
              <h3>付款信息</h3>
              <p><span class="lab">银行：</span><span class="value">中国工商银行</span></p>
              <p>
                <span class="lab">收款银行：</span>
                <span class="value">工行建国西路支行</span>
                <el-button size="mini" plain>复制</el-button>
              </p>
              <p>
                <span class="lab">收款人：</span>
                <span class="value">上海云信留客信息科技有限公司</span>
                <el-button size="mini" plain>复制</el-button>
              </p>
              <p>
                <span class="lab">收款账号：</span>
                <span class="value">1001220709007076170</span>
                <el-button size="mini" plain>复制</el-button>
              </p>
            </div>
          </div>

        </el-tab-pane>
      </el-tabs>
      <!-- <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit"> -->
    </div>

  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'finance-index',
    data() {
      return {

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

  .finance-index-container {
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

      .card-box{
        .section{
          margin-bottom:20px;
          h3{
            font-size: 16px;
            margin-bottom: 20px;
            
          }
          p{
            display:flex;
            padding-left:30px;
            flex-direction: row;
            line-height:40px;
            align-items: center;
            font-size:14px;
            .lab{
              width:100px;
            }
            .el-button{
              height:30px;
              margin-left:20px;
            }
          }
        }
      }
    }



  }

</style>

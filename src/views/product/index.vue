<template>
  <div class="product-index-container">
    <div class="title">
      <h2>隐私号</h2>
    </div> 

    <div class="box">

      <div class="box-title">
        <div class="box-title-block box-title-left">
          <h3>小号数量</h3>
          <div class="block-inner">
            <div class="number">
              <p>
                <span class="value">100</span>
                <span class="label">个</span>
                <span class="tip">(已通过审核)</span>
              </p>
              <p>
                <span class="value">100</span>
                <span class="label">个</span>
                <span class="tip">(正在审核审核)</span>
              </p>
            </div>
            <div class="btns">
              <el-button type="primary" size="mini" @click="isApplyNumber=true">申请小号购买</el-button>
            </div>
          </div>
          
        </div>
        <div class="box-title-block box-title-right">
          <h3>通话时长</h3>
          <div class="block-inner">
            <div class="left">
              <p>今日通话 <span>0</span> 分钟</p>
            </div>
            <div class="right">
              <p>本月通话 <span>0</span> 分钟</p>
            </div>
          </div>


        </div>
      </div>

      <div class="box-section1" v-if="isApplyNumber">
        <apply @back="back"></apply>
      </div>

      <div class="box-section2" v-else>
        <div class="box-tab">
          <span :class="tabIndex==0?'act':''" @click="tabHandle(0)">我的小号</span>
          <span :class="tabIndex==1?'act':''" @click="tabHandle(1)">呼叫记录</span>
          <span :class="tabIndex==2?'act':''" @click="tabHandle(2)">在线体验</span>
          <span :class="tabIndex==3?'act':''" @click="tabHandle(3)">API接口</span>
        </div>

        <div class="tab-cont">
          <privacy v-if="tabIndex==0"></privacy>
          <record v-if="tabIndex==1"></record>
          <experience v-if="tabIndex==2"></experience>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import privacy from './components/privacy.vue'
  import record from './components/record.vue'
  import experience from './components/experience.vue'
  import apply from './components/apply.vue'
  export default {
    name: 'cost-index',
    components: {
      privacy,
      record,
      experience,
      apply
    },
    data() {
      return {
        isApplyNumber:false,
        tabIndex: 0,

      }
    },
    methods: {
      tabHandle(index) {
        this.tabIndex = index;
      },
      handleCurrentChange(e) {
        this.page = e;
      },
      back() {
        this.isApplyNumber = false;
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

  .product-index-container {
    // padding-bottom:20px;
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
      // height: calc(100vh - 160px);
      // -webkit-box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
      // box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
      // padding: 20px;
      // color: #606060;
      // background-color: #fff;
    }

    .box-title{
      display:flex;
      height:140px;
      justify-content:space-between;
      .box-title-block{
        width:49%;
        padding:20px;
        -webkit-box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
        box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
        padding: 20px;
        color: #606060;
        background-color: #fff;
        h3{
          font-size:16px;
          margin-bottom:15px;
        }
        .block-inner{
          // float:left;
          display:flex;
          height:66px;
          justify-content:space-between;
          .number{
            width:60%;
            display:flex;
            flex-direction: column;
            justify-content:space-evenly;
            p{
              .value{
                font-size:22px;
                color:#409EFF;
              }
              .label{
                font-size:14px;
                color:#000;
                margin:0 20px 0 10px;
              }
              .tip{
                font-size:14px;
                color:#999;
              }
            }
          }
          .btns{
            display:flex;
            width:40%;
            flex-direction: row-reverse;
            align-items:center;
            .el-button{
              height:28px;
            }
          }

          .left{
            display:flex;
            flex-direction: column;
            justify-content:space-evenly;
            p{
              font-size:16px;
              color:#999;
              span{
                font-size:22px;
                color:#409EFF;
              }
            }
          }

          .right{
            display:flex;
            flex-direction: column;
            justify-content:space-evenly;
            p{
              font-size:16px;
              color:#999;
              span{
                font-size:22px;
                color:#409EFF;
              }
            }
          }
        }
        
      }

    }
    
    .box-section1{

    }
    .box-section2{
      .box-tab{
        display:flex;
        margin:15px 0;
        span{
          width: 150px;
          height: 34px;
          text-align: center;
          line-height: 34px;
          -webkit-box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
          box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
          background: #fff;
          font-size: 14px;
          color: #606060;
          margin-right: 20px;
          cursor: pointer;
        }
        .act{
          background: #4574d0;
          color: #fff;
        }
        
      }

      .tab-cont{
        -webkit-box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
        box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
        padding: 20px;
        color: #606060;
        background-color: #fff;
      }
    }
    
  }

</style>

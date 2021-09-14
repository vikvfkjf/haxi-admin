<template>
  <div class="application-all-container">
    <div class="title">
      <h2>我的应用<span>（共2个应用）</span></h2>
      <div class="btns">
        <el-button plain size="mini" @click="create"><i class="iconfont el-icon-plus"></i>创建</el-button>
      </div>
    </div>

    <div class="application-box">
      <div class="box-item" v-for="(item,index) in appList" :key="index">
        <h3><i class="iconfont el-icon-notebook-2"></i>{{item.app_name}}<i class="iconfont el-icon-right"></i></h3>
        <div class="box-left">
          <p>appID：{{item.app_no}}</p>
          <p>appSecret：{{item.app_secret}}</p>
          <p>创建时间：{{item.created_at}}</p>
          <p>包含能力：<span v-for="(li,i) in item.app_product" :key="i">{{li.name}}</span></p>
        </div>
      </div>
    </div>

    <create-dialog ref="createDialog"></create-dialog>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  import {userApp} from '@/api/application'
  import createDialog from './components/create.vue'
  export default {
    name: 'Application-all',
    components:{
      createDialog
    },
    data() {
      return {
        appList:[]
      }
    },
    mounted() {
      this.userApp();
    },
    methods:{
      userApp() {
        userApp().then(res=>{
          // console.log(res);
          if(res.status_code==200) {
            this.appList = res.data;
          }
        })
      },
      create() {
        this.$refs.createDialog.show();
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

  .application-all-container {
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

        span {
          color: #999;
          font-size: 12px;
          font-weight: 400;
        }
      }

      .el-button {
        i {
          margin-right: 5px;
          font-size: 12px;
        }
      }
    }

    .application-box {
      height: calc(100vh - 160px);
      background: #fff;
      border-radius: 5px;
      padding: 0 20px;
      overflow-y: auto;
      @include scrollBar();

      .box-item {
        padding: 20px 0;
        border-bottom: 1px dashed #ececec;

        h3 {
          margin-bottom: 15px;

          i {
            margin: 0 10px;
          }

          font-size:16px;
          font-weight:400;
          cursor:pointer;

          &:hover {
            color: #4574d0;
          }
        }

        .box-left {
          p {
            padding-left: 20px;
            line-height: 30px;
            font-size: 14px;
            color: #3d3d3d;
          }
        }
      }
    }
  }

</style>

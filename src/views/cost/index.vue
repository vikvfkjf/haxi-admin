<template>
  <div class="cost-index-container">
    <div class="title">
      <h2>费用明细</h2>
    </div>

    <div class="box">
      <el-tabs type="card" v-model="cardIndex">
        <el-tab-pane label="隐私号" name="0">
          <voice-cost></voice-cost>
        </el-tab-pane>
        <el-tab-pane label="短信" name="1">
          xxx
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import voiceCost from './components/voice-cost.vue'
  export default {
    name: 'cost-index',
    components:{
      voiceCost
    },
    data() {
      return {
        cardIndex:0,
        
      }
    },
    methods: {
      handleCurrentChange(e) {
        this.page = e;
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

  .cost-index-container {
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
      height:calc(100vh - 160px);
      -webkit-box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
      box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
      padding: 20px;
      color: #606060;
      background-color: #fff;


    } 
    





  }

</style>

<template>
  <div class="cost-index-container">
    <div class="title">
      <h2>费用统计</h2>
    </div>

    <div class="box">

      <el-tabs type="card" v-model="cardIndex">
        <el-tab-pane label="日统计" name="0">
            <day-total-table></day-total-table>
        </el-tab-pane>
        <el-tab-pane label="月统计" name="1">
          <month-total-table></month-total-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import dayTotalTable from './components/day-total-table.vue'
  import monthTotalTable from './components/month-total-table.vue'
  export default {
    name: 'cost-index',
    components:{
      dayTotalTable,
      monthTotalTable
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

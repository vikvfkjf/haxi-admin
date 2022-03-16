<template>
  <div class="box">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              会员数量
            </div>
            <count-to :start-val="0" :end-val="memberInfo.member_sum" :duration="2600" class="card-panel-num" />
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              总授权人数
            </div>
            <count-to :start-val="0" :end-val="memberInfo.total_auth_sum" :duration="2600" class="card-panel-num" />
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('messages')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              会员总余额
            </div>
            <count-to :start-val="0" :end-val="memberInfo.balance_sum" :duration="3000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              正在挖矿人数
            </div>
            <count-to :start-val="0" :end-val="memberInfo.mineing_num" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              总授权金额
            </div>
            <count-to :start-val="0" :end-val="memberInfo.total_auth_balance_sum" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>

      
    </el-row>

    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              总挖矿次数
            </div>
            <count-to :start-val="0" :end-val="mineInfo.all.mine_sum" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              正在挖矿人数
            </div>
            <count-to :start-val="0" :end-val="mineInfo.doing.mine_sum" :duration="3600" class="card-panel-num" />
          </div>
        </div>
      </el-col>


      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              总挖矿金额（usdt）
            </div>
            <count-to :start-val="0" :end-val="mineInfo.all.total_in_usdt_sum" :duration="3600" class="card-panel-num" />
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              正在挖矿总投入金额（usdt）
            </div>
            <count-to :start-val="0" :end-val="mineInfo.doing.total_in_usdt_sum" :duration="3600" class="card-panel-num" />
          </div>
        </div>
      </el-col>

      


    </el-row>
  </div>

  
    
    <!-- <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col"></el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col"></el-col> -->

</template>

<script>
import CountTo from 'vue-count-to'
import { getMemberInfoList,getMineInfoList} from '@/api/statics'
export default {
  components: {
    CountTo
  },
  data() {
    return {
      memberInfo:null,
      mineInfo:null
    }
  },
  mounted() {
    this.getMemberInfoList();
    this.getMineInfoList();
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    getMemberInfoList() {
      getMemberInfoList().then(res => {
        console.log(res);
        if (res.status_code == 200) {
          this.memberInfo = res.data;
        }
      })
    },

    getMineInfoList() {
      getMineInfoList().then(res => {
        console.log(res);
        if (res.status_code == 200) {
          this.mineInfo = res.data;
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>

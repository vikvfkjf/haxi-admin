<template>
  <div class="apply">
    <div class="back">
      <span @click="back"><i class="iconfont el-icon-arrow-left"></i>返回</span>
    </div>

    <div class="apply-title">
      <h2><i class="iconfont el-icon-sell"></i> 申请小号购买</h2>
    </div>

    <div class="apply-tip">
      购买须知：购买成功后，立即从余额中扣除对应小号的套餐费。后续套餐费于每月25日完成扣除，如需退订请于25号之前申请。如购买时间为25号之后的（含25号），则立即扣除1个月的费用。
    </div>

    <div class="apply-form">
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="小号模式">
          <el-select v-model="form.mode" placeholder="请选择活动区域">
            <el-option label="AX" value="1"></el-option>
            <el-option label="AXN" value="2"></el-option>
            <el-option label="AXB" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="小号分布">
          <div class="number-item" v-for="(item,index) in form.nemberArr" :key="index">
            <el-cascader
              size="mini"
              :props="props"
              :options="options"
              v-model="form.nemberArr[index].city"
              @change="handleChange">
            </el-cascader>
            <el-input-number label="描述文字" v-model="form.nemberArr[index].num"></el-input-number>
            <el-button size="mini" plain icon="el-icon-circle-plus-outline">新增</el-button>
          </div>
        </el-form-item>

        <el-form-item label="生效时间">
          <el-radio-group v-model="form.effect">
            <el-radio :label="1">立即生效</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="场景描述">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>

        <el-form-item label="">
          预计1-2个工作日内完成审核，法定节假日顺延
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { provinces } from '@/utils/china-local'
  export default {
    name: 'apply',
    props: {
      isActive: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        form: {
          // name: '',
          // region: '',
          // date1: '',
          // date2: '',
          // delivery: false,
          // type: [],
          // resource: '',
          // desc: ''
          mode:'',
          nemberArr:[
            {
              city:'',
              number:''
            },
            {
              city:'',
              number:1
            }
          ],
          effect:1,
        },

        options: provinces,
        selectedOptions: [],
        props:{
          label:'name',
          children:'cities',
          value:'name'
        }
      }
    },
    mounted() {
      console.log(provinces);
    },
    methods: {
      back() {
        this.$emit('back');
      },
      handleChange (value) {
        console.log(value)
      },
    }
  }

</script>

<style scoped lang="scss">
.apply{
  margin-top:20px;
  -webkit-box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
  box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
  padding: 20px;
  color: #606060;
  background-color: #fff;
  .back{
    padding-bottom:20px;
    border-bottom:1px solid #ececec;
    cursor:pointer;
    &:hover{
      color:#4574d0;
    }
  }
  .apply-title{
    padding:15px 0;
    h2{
      font-size:16px;
      font-weight:500;
    }
  }

  .apply-tip{
    margin-bottom:20px;
    padding: 20px;
    background: #f7f7f7;
    line-height: 20px;
    color: #999;
    font-size:14px;
  }

  .apply-form{
    .number-item{
      margin-bottom:10px;
      &:last-child{
        margin-bottom:0;
      }
    }
    .el-input-number{
      margin:0 20px;
    }
  }

}
</style>

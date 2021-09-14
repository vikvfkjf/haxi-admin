<template>
  <div class="price-dialog">
    <el-dialog title="价格配置" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="公司名称" prop="company_no">
            <el-input v-model="form.company_name" disabled></el-input>
          </el-form-item>
          <el-form-item label="公司编号" prop="company_no">
            <el-input v-model="form.company_no" disabled></el-input>
          </el-form-item>
          <el-form-item label="每个小号月租费" prop="month_rent_price">
            <el-input v-model="form.month_rent_price" type="number"></el-input>
          </el-form-item>
          <el-form-item label="每分钟通话费" prop="minute_price">
            <el-input v-model="form.minute_price" type="number"></el-input>
          </el-form-item>
          <el-form-item label="每分钟录音费" prop="sound_price">
            <el-input v-model="form.sound_price" type="number"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="mini">取 消</el-button>
        <el-button type="primary" @click="sure" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import {getPriceConfig,modifyPriceConfig} from '@/api/company'
  export default {
    name: 'Price-dialog',
    data() {
      return {

        dialogVisible: false,
        loading: false,
        val: {},
        form: {
          company_name: null,
          company_no: null,
          month_rent_price: null,
          minute_price:null,
          sound_price:null
        },
        rules: {
          company_name: [{
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          }],
          company_no: [{
            required: true,
            message: '请输入公司编号',
            trigger: 'blur'
          }, ],
          month_rent_price: [{
            required: true,
            message: '请输入每个小号月租费',
            trigger: 'blur'
          }, ],
           minute_price: [{
            required: true,
            message: '请输入每分钟通话费',
            trigger: 'blur'
          }, ],
           sound_price: [{
            required: true,
            message: '每分钟录音费',
            trigger: 'blur'
          }, ],
        }
      }
    },
    mounted() {},
    methods: {
      show(val) {
        this.val = val;
        this.getPriceConfig();
        this.form.company_no = val.company_no;
        this.form.company_name = val.company_name;
        this.dialogVisible = true;
        // console.log(val);
      },

      /** 获取价格配置 */
      getPriceConfig() {
        var params = {
          company_no:this.val.company_no,
        }
        getPriceConfig(params).then(res=>{
          if(res.status_code == 200) {
            if(res.data.length==0) {
              return;
            }else{
              this.form.month_rent_price= res.data.month_rent_price;
              this.form.minute_price=res.data.minute_price;
              this.form.sound_price=res.data.sound_price;
            }
          }
        })
      },

      // 修改价格配置
      sure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            var params = {
              company_no: this.form.company_no,
              month_rent_price:this.form.month_rent_price,
              minute_price:this.form.minute_price,
              sound_price:this.form.sound_price,
            }
            modifyPriceConfig(params).then(res => {
              this.loading = false;
              if (res.status_code == 200) {
                this.$notify({
                  title: '提示',
                  message: '修改成功',
                  type: 'success'
                })
                this.handleClose();

              } else {
                this.$notify({
                  title: '提示',
                  message: '修改失败',
                  type: 'error'
                })
                return false;
              }
            })
          }
        })

      },
      handleClose() {
        this.dialogVisible = false;
        this.reset();
      },
      reset() {
        this.loading = false;
        this.form = {
          company_name: null,
          company_no: null,
          month_rent_price: null,
          minute_price:null,
          sound_price:null
        };
        this.$refs.form.clearValidate();
      }
    }

  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .price-dialog {
    .content {
      .el-form {
        width: 80%;
        margin: 0 auto;

        .el-input {
          width: 100%;
        }

        .el-select {
          width: 100%;
        }
      }
    }
  }

</style>

<template>
  <div class="recharge-dialog">
    <el-dialog title="充值" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="用户编号" prop="user_no">
            <el-input v-model="form.user_no"></el-input>
          </el-form-item>
          <el-form-item label="充值数量" prop="recharge_num">
            <el-input v-model="form.recharge_num"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" type="textarea"></el-input>
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
  import {postRecharge} from '@/api/finance'
  export default {
    name: 'recharge-dialog',
    data() {
      return {

        dialogVisible: false,
        loading: false,
        val: {},
        form: {
          name: null,
          phone: null,
          password:null,
          company_name:null
        },
        rules: {
          user_no: [{
            required: true,
            message: '请输入用户编号',
            trigger: 'blur'
          }],
          recharge_num: [{
            required: true,
            message: '请输入充值数量',
            trigger: 'blur'
          }],
        }
      }
    },
    mounted() {},
    methods: {
      show(val) {
        this.form.user_no = val.user_no;
        this.dialogVisible = true;
      },

      // 修改价格配置
      sure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            var params = this.form;
            postRecharge(params).then(res => {
              this.loading = false;
              if (res.status_code == 200) {
                this.$notify({
                  title: '提示',
                  message: '修改成功',
                  type: 'success'
                })
                this.handleClose();
                this.$emit('success');
              } else {
                this.$notify({
                  title: '提示',
                  message: '修改失败',
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
      handleClose() {
        this.dialogVisible = false;
        this.reset();
      },
      reset() {
        this.loading = false;
        this.form = {
          user_no: null,
          recharge_num: null,
          remark: null,
        };
        this.$refs.form.clearValidate();
      }
    }

  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .recharge-dialog {
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

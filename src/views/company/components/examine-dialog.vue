<template>
  <div class="examine-dialog">
    <el-dialog title="审核" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="100px" size="mini" :rules="rules">
          <el-form-item label="公司名称" prop="company_no">
            <el-input v-model="form.company_name" disabled></el-input>
          </el-form-item>
          <el-form-item label="公司编号" prop="company_no">
            <el-input v-model="form.company_no" disabled></el-input>
          </el-form-item>
          <el-form-item label="营业执照" prop="money">
            <div class="img">
              <img :src="val.license_path" alt="">
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="mini">取 消</el-button>
        <el-button type="danger" @click="sure(2)" size="mini" :disabled="val.auth_status==1">拒绝</el-button>
        <el-button type="primary" @click="sure(1)" size="mini" :disabled="val.auth_status==1">通过</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import {companyApply} from '@/api/company'
  export default {
    name: 'examine-dialog',
    data() {
      return {

        dialogVisible: false,
        loading: false,
        val: {},
        form: {
          company_name:null,
          company_no: null,
          money: null,
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
          }],
        }
      }
    },
    mounted() {},
    methods: {
      show(val) {
        this.val = val;
        this.form.company_no = val.company_no;
        this.form.company_name = val.company_name;
        this.dialogVisible = true;
        console.log(val);
      },

      sure(status) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            var params = {
              company_no:this.form.company_no,
              auth_status:status
            }
            companyApply(params).then(res => {
              this.loading = false;
              if (res.status_code == 200) {
                this.$notify({
                  title: '提示',
                  message: '操作成功',
                  type: 'success'
                })
                this.handleClose();
                this.$emit('success');
              } else {
                this.$notify({
                  title: '提示',
                  message: '创建失败',
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
          company_no: null,
          money: null,
        };
        this.$refs.form.clearValidate();
      }
    }

  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .examine-dialog {
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

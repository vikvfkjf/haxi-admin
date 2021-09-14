<template>
  <div class="add-white-dialog">
    <el-dialog title="新增白名单" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="公司名称" prop="company_no">
            <el-input v-model="form.company_name" disabled></el-input>
          </el-form-item>
          <el-form-item label="公司编号" prop="company_no">
            <el-input v-model="form.company_no" disabled></el-input>
          </el-form-item>
          <el-form-item label="白名单ip" prop="ips">
            <el-input v-model="form.ips" type="text"></el-input>
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
  import {addWhiteIp} from '@/api/company'
  export default {
    name: 'Add-white-dialog',
    data() {
      return {

        dialogVisible: false,
        loading: false,
        val: {},
        form: {
          company_name: null,
          company_no: null,
          ips:null
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
          ips: [{
            required: true,
            message: '请输入白名单',
            trigger: 'blur'
          }, ]
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
        // console.log(val);
      },

      // 修改价格配置
      sure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            var params = {
              company_no: this.form.company_no,
              ips:this.form.ips
            }
            addWhiteIp(params).then(res => {
              this.loading = false;
              if (res.status_code == 200) {
                this.$notify({
                  title: '提示',
                  message: '新增成功',
                  type: 'success'
                })
                this.handleClose();

              } else {
                this.$notify({
                  title: '提示',
                  message: '新增失败',
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
          company_name: null,
          company_no: null,
          ips: null
        };
        this.$refs.form.clearValidate();
      }
    }

  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .add-white-dialog {
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

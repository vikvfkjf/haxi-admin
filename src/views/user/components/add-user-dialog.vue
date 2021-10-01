<template>
  <div class="add-user-dialog">
    <el-dialog title="新增用户" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="公司名称" prop="company_name">
            <el-input v-model="form.company_name" type="text"></el-input>
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
  import {addUser} from '@/api/user'
  export default {
    name: 'add-user-dialog',
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
          name: [{
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          }],
          phone: [{
            required: true,
            message: '请输入公司编号',
            trigger: 'blur'
          }, ],
          password: [{
            required: true,
            message: '请输入白名单',
            trigger: 'blur'
          }, ],
          company_name:[{
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          }, ],
        }
      }
    },
    mounted() {},
    methods: {
      show() {
        this.dialogVisible = true;
      },

      // 修改价格配置
      sure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            var params = this.form;
            addUser(params).then(res => {
              this.loading = false;
              if (res.status_code == 200) {
                this.$notify({
                  title: '提示',
                  message: '新增成功',
                  type: 'success'
                })
                this.handleClose();
                this.$emit('success');
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
          name: null,
          phone: null,
          password: null,
          company_name:null
        };
        this.$refs.form.clearValidate();
      }
    }

  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .add-user-dialog {
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

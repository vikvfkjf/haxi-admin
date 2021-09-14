<template>
  <div class="add-admin-dialog">
    <el-dialog :title="type=='add'?'新增管理员':'编辑管理员'" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="80px" size="mini" :rules="rules">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone" v-if="type=='add'">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role_key">
            <!-- <el-input v-model="form.email"></el-input> -->
            <el-select v-model="form.role_key" size="mini">
              <el-option v-for="(item,index) in roleList" :key="index" :label="item.name" :value="item.key" :disabled="item.status!=1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码" prop="password" v-if="type=='add'">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="公司名称" prop="company_name">
            <el-input v-model="form.company_name" type="text"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="mini">取 消</el-button>
        <el-button type="primary" @click="sure" size="mini" v-if="type=='add'">确 定</el-button>
        <el-button type="primary" @click="editsure" size="mini" v-if="type=='edit'">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import {addAdministrator,editAdministrator,getRoleList} from '@/api/administrator.js'
  export default {
    name: 'Add-admin-dialog',
    data() {
      return {
        title:'',
        type:'add',
        dialogVisible: false,
        loading: false,
        val: {},
        form: {
          name:null,
          phone:null,
          email:null,
          role_key:null,
          password:null,
          company_name: null,
        },
        rules: {
          name: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          phone: [{
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }],
          email: [{
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          }],
          role_key: [{
            required: true,
            message: '请选择角色',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          company_name: [{
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          }]
        },
        roleList:[]
      }
    },
    mounted() {
      this.getRoleList();
    },
    methods: {
      show(type,row) {
        this.type = type;
        if(type=="add") {

        }else if(type=="edit") {
          this.form = {
            name:row.name,
            phone:row.phone,
            email:row.email,
            role_key:row.role_key,
            password:row.password,
            company_name: row.admin_company?row.admin_company.name:null,
          };
        }

        this.dialogVisible = true;
      },
      getRoleList() {
        getRoleList().then(res=>{
          if(res.status_code==200) {
            this.roleList = res.data;
          }
        })
      },

      sure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            var params = this.form;
            addAdministrator(params).then(res => {
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

      editsure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            var params = {
              name:this.form.name,
              email:this.form.email,
              company_name:this.form.company_name,
              role_key:this.form.role_key
            };
            editAdministrator(params).then(res => {
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
          name:null,
          phone:null,
          email:null,
          role_key:null,
          password:null,
          company_name: null,
        };
        this.$refs.form.clearValidate();
      }
    }

  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .add-admin-dialog {
    .content {
      .el-form {
        width: 70%;
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

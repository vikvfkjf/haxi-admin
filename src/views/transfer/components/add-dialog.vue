<template>
  <div class="add-dialog">
    <el-dialog title="新增项目" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="前缀地址" prop="prefix_address">
            <el-input v-model="form.prefix_address"></el-input>
            <!-- <el-select v-model="form.status">
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="2"></el-option>
            </el-select> -->
          </el-form-item>

          <el-form-item label="项目类型" prop="project_type">
            <el-select v-model="form.project_type">
              <el-option label="以太坊" :value="1"></el-option>
              <el-option label="波场" :value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="币种" prop="currency">
            <el-input v-model="form.currency"></el-input>
          </el-form-item>

          <el-form-item label="合约地址" prop="contract_address">
            <el-input v-model="form.contract_address"></el-input>
          </el-form-item>

          <el-form-item label="收款地址" prop="receiver_address">
            <el-input v-model="form.receiver_address"></el-input>
          </el-form-item>

          <el-form-item label="被授权地址" prop="be_auth_address">
            <el-input v-model="form.be_auth_address"></el-input>
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
  import {addProject} from '@/api/project'
  import {
    getToken
  } from '@/utils/auth'
  export default {
    name: 'add-dialog',
    data() {
      return {

        dialogVisible: false,
        loading: false,
        form: {
          name : null,
          prefix_address: null,
          project_type :null,
          currency :null,
          contract_address :null,
          receiver_address :null,
          be_auth_address :null
        },
        rules: {
          name: [{
            required: true,
            message: '请输入项目名称',
            trigger: 'blur'
          }],
          prefix_address : [{
            required: true,
            message: '请输入前缀地址',
            trigger: 'blur'
          }],
          
          project_type : [{
            required: true,
            message: '请选择项目类型',
            trigger: 'blur'
          }],
          currency : [{
            required: true,
            message: '请输入币种',
            trigger: 'blur'
          }],
          contract_address : [{
            required: true,
            message: '请输入合约地址',
            trigger: 'blur'
          }],
          receiver_address  : [{
            required: true,
            message: '请输入收款地址',
            trigger: 'blur'
          }],
          be_auth_address  : [{
            required: true,
            message: '请输入被授权地址',
            trigger: 'blur'
          }],
        }
      }
    },
    mounted() {},
    methods: {
      show() {
        this.dialogVisible = true; 
      },

      sure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            var params = {
              name:this.form.name,
              prefix_address :this.form.prefix_address,
              project_type :Number(this.form.project_type ),
              currency :this.form.currency,
              contract_address :this.form.contract_address ,
              receiver_address :this.form.receiver_address ,
              be_auth_address  :this.form.be_auth_address  ,
            };
            addProject(params).then(res => {
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
          name : null,
          prefix_address: null,
          project_type :null,
          currency :null,
          contract_address :null,
          receiver_address :null,
          be_auth_address :null
        };
        this.$refs.form.clearValidate();
      }
    }

  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .add-dialog {
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

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

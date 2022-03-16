<template>
  <div class="info-dialog">
    <el-dialog title="修改会员" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="会员编号" prop="member_no">
            <el-input v-model="form.member_no"></el-input>
          </el-form-item>

          <el-form-item label="后台人员" prop="admin_user_no">
            <el-cascader
            v-model="form.admin_user_no"
            :options="agent"
            :props="props"
            clearable></el-cascader>
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
  import {
    getAgentList,
  } from '@/api/agent'
  import {changeBelong} from '@/api/member'
  export default {
    name: 'info-dialog',
    data() {
      return {

        dialogVisible: false,
        loading: false,
        val: {},
        agent:[],
        form: {
          member_no : null,
          admin_user_no  : null,
        },
        rules: {
          member_no : [{
            required: true,
            message: '请输入会员编号',
            trigger: 'blur'
          }],
          admin_user_no : [{
            required: true,
            message: '请输入后台人员编号',
            trigger: 'blur'
          }],
        },
        props:{
          checkStrictly:true,
          label:'name',
          value:'user_no',
          children:'childrens'
        }
      }
    },
    mounted() {
    },
    methods: {
      show(val) {
        this.val = val;
        this.getAgentList();
        this.form.member_no = val.member_no;
        this.dialogVisible = true;
      },

      getAgentList() {
        var params = {
          page: 1,
          per_page: 500
        }
        getAgentList(params).then(res => {
          console.log(res);
          if (res.status_code == 200) {
            this.agent = res.data.data;
            console.log(this.agent,'agent')
          }
        })
      },


      sure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            let admin_user_no = this.form.admin_user_no[this.form.admin_user_no.length-1]
            var params = {        
              member_no :String(this.form.member_no),
              admin_user_no  :String(admin_user_no),
            }
            changeBelong(params).then(res => {
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
          member_no : null,
          admin_user_no  : null,
        };
        this.$refs.form.clearValidate();
      },
    }

  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .info-dialog {
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

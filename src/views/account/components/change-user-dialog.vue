<template>
  <div class="change-email-dialog" v-if="dialogVisible">
    <el-dialog
      :title="base.title"
      :visible.sync="dialogVisible"
      width="50%"
      center
      :before-close="handleClose">
      <div class="content">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules" style="width:80%;margin:0 auto;">
          <el-form-item :label="base.cn_label" :prop="base.en_label">
            <el-input v-model="form[base.en_label]"></el-input>
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
    mapGetters
  } from 'vuex'
  import {changeUserInfo} from '@/api/user'
  export default {
    name: 'change-email-dialog',
    data() {
      return {
        dialogVisible: false,
        base:{
          title:null,
          en_label:null,
          cn_label:null
        },
        form:{
          name:null,
          email:null,
          company_name:null,
          role_key:null
        },
        rules: {
          email: [{
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          }],
          company_name: [{
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入用户名称',
            trigger: 'blur'
          }]
        }
      }
    },
    methods:{
      show(params) {
        
        this.dialogVisible = true;
        // this.reset();
        // this.form.email = email;
        this.base.title = params.title;
        this.base.en_label = params.en_label;
        this.base.cn_label = params.cn_label;
        this.form[params.en_label] = params.value;
      },
      sure() {
        this.$refs['form'].validate((valid) => {
          if(valid) {
            var params = {};
            params[this.base.en_label] = this.form[this.base.en_label];
            console.log(params);
            changeUserInfo(params).then(res=>{
              if(res.status_code==200) {
                this.$message({
                  type:'success',
                  message:"修改成功"
                })

                this.$store.dispatch('user/getInfo');
                this.handleClose();
              }else{
                this.$message({
                  type:'error',
                  message:res.err_msg
                })
              }
            })
          }
        })
        
        
      },
      handleClose(done) {
        this.reset();
        
      },
      reset() {
        this.form = {
          name:null,
          email:null,
          company_name:null,
          license_path:null
        };
        // this.$refs.form.clearValidate();
        this.$nextTick(()=>{
          console.log(this.$refs.form,'this.$refs.form')
          this.$refs.form.clearValidate();
          this.dialogVisible = false;
        })
        
      }
    }
    //   computed: {
    //     ...mapGetters([
    //       'name'
    //     ])
    //   }
  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

</style>

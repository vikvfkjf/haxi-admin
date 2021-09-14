<template>
  <div class="application-create-dialog">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="100px" size="mini" :rules="rules">
          <el-form-item label="应用名称" prop="app_name">
            <el-input v-model="form.app_name"></el-input>
          </el-form-item>
          <el-form-item label="开通能力" prop="product_key">
            <el-checkbox-group v-model="form.product_key">
              <el-checkbox :label="item.key" v-for="(item,index) in product" :key="index">{{item.name}}</el-checkbox>
            </el-checkbox-group>

          </el-form-item>
          <el-form-item label="应用行业" prop="industry_key">
            <el-select v-model="form.industry_key" placeholder="请选择活动区域">
              <el-option :label="item.name" :value="item.key" v-for="(item,index) in industry" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="应用场景" prop="app_scene">
            <el-input type="textarea" v-model="form.app_scene" placeholder="请输入文字长度小于20的描述"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="mini">取 消</el-button>
        <el-button type="primary" @click="create" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    before
  } from '@/api/public'
  import {
    storeApp
  } from '@/api/application'
  export default {
    name: 'Application-all',
    data() {
      return {
        
        dialogVisible: false,
        loading:false,
        industry: [],
        product: [],
        form: {
          app_name: null,
          industry_key: null,
          product_key: [],
          app_scene: null
        },
        rules: {
          app_name: [{
            required: true,
            message: '请输入应用名称',
            trigger: 'blur'
          }, ],
          product_key: [{
            required: true,
            message: '请选择开通能力',
            trigger: 'blur'
          }, ],
          industry_key: [{
            required: true,
            message: '请选择应用行业',
            trigger: 'blur'
          }, ],
          app_scene: [{
            required: true,
            message: '请输入应用场景',
            trigger: 'blur'
          }],
        }
      }
    },
    mounted() {
      this.before();
    },
    methods: {
      show() {
        this.dialogVisible = true;
      },
      before() {
        before().then(res => {
          if (res.status_code == 200) {
            this.industry = res.data.industry;
            this.product = res.data.product;
          }
          console.log(this.product, 'this.product');
        })
      },

      create() {
        console.log(this.form);

        this.$refs['form'].validate((valid) => {
          if(valid) {
            this.loading = true;
            storeApp(this.form).then(res=>{
              this.loading = false;
              if(res.status_code==200) {
                this.$notify({
                  title:'提示',
                  message:'创建成功',
                  type:'success'
                })
                this.handleClose();
                
              }else{
                this.$notify({
                  title:'提示',
                  message:'创建失败',
                  type:'error'
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
        this.form = {
          app_name: null,
          industry_key: null,
          product_key: [],
          app_scene: null
        };
        this.$refs.form.clearValidate();
      }
    }

  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .application-create-dialog {
    .content {
      .el-form {
        width: 80%;

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

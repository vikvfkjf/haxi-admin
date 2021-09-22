<template>
  <div class="bind-dialog">
    <el-dialog title="绑定自有小号" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="号码池key" prop="pool_key">
            <el-input v-model="form.pool_key"></el-input>
          </el-form-item>
          <el-form-item label="小号模式" prop="phone_mode_key">
            <el-select v-model="form.phone_mode_key" placeholder="请选择小号模式">
              <el-option v-for="(item,index) in phone_mode" :key="index" :label="item.name" :value="item.key"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="生效时间" prop="effect_time">
            <el-date-picker v-model="form.effect_time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="租用时长" prop="valid_time">
            <el-select v-model="form.valid_time" placeholder="请选择租用时长">
              <el-option v-for="(item,index) in howTime" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="文件">
            <el-upload class="upload-demo" ref="upload" name="company_phone_file" :action="action" :headers="headers"
              :on-remove="handleRemove" :on-change="handleChange" :on-success="handleSuccess" :file-list="fileList"
              :limit="1" :data="form" :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="mini">取 消</el-button>
        <el-button type="primary" @click="sure" size="mini">确定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import {before} from '@/api/public'
  import {
    getToken
  } from '@/utils/auth'

  export default {
    name: 'bind-dialog',
    data() {
      return {
        action: process.env.VUE_APP_BASE_API + '/v1/admin/company/import-admin-phone',
        headers: {
          Authorization: getToken()
        },
        dialogVisible: false,
        loading: false,
        val: {},
        phone_mode:[],
        form: {
          valid_time: null,
          pool_key: null,
          effect_time: null,
          phone_mode_key: null
        },
        rules: {
          phone_mode_key: [{
            required: true,
            message: '请输入小号模式',
            trigger: 'blur'
          }],
          valid_time: [{
            required: true,
            message: '请输入月份',
            trigger: 'blur'
          }],
          company_phone_file: [{
            required: true,
            message: '请选择文件',
            trigger: 'blur'
          }],
          pool_key: [{
            required: true,
            message: '请输入号码池key',
            trigger: 'blur'
          }]
        },

        fileList: [],
        howTime:[
          {label:'1个月',value:1},
          {label:'2个月',value:2},
          {label:'3个月',value:3},
          {label:'6个月',value:6},
          {label:'12个月',value:12},
          {label:'24个月',value:24},
        ]
      }
    },
    mounted() {
      this.before();
    },
    methods: {
      before() {
        before().then(res=>{
          this.phone_mode = res.data.phone_mode;
        })
      },
      show(val) {
        this.val = val;
        // this.form.phone_mode_key = val.phone_mode_key;
        // this.form.valid_time = val.valid_time;
        this.dialogVisible = true;
        // console.log(val);
      },

      // 修改价格配置
      sure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$refs.upload.submit();
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
          valid_time: null,
          pool_key: null,
          effect_time: null,
          phone_mode_key: null
        };
        this.$refs.form.clearValidate();
      },
      handleRemove(file, fileList) {
        this.form.company_phone_file = null;
      },
      handlePreview(file) {
        console.log(file);
      },
      handleChange(file, fileList) {
        // this.form.company_phone_file = file.raw;
      },
      handleSuccess(res, file, fileList) {
        // console.log(res)
        this.loading = false;
        if (res.status_code == 200) {
          this.$notify({
            title: '提示',
            type: 'success',
            message: '批量绑定成功'
          })
          this.handleClose();
          // this.dialogVisible = false;
          this.$emit('success');
          // this.form.bind_phone_file = res.data.file_path;
        } else {
          this.$notify({
            title: '提示',
            type: 'error',
            message: '绑定失败'
          })
        }
      },
    }

  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .bind-dialog {
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

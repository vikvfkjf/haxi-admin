<template>
  <div class="add-white-dialog">
    <el-dialog title="通道配置" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="公司编号" prop="company_no">
            <el-input v-model="form.company_no" disabled></el-input>
          </el-form-item>
          <el-form-item label="通道类型" prop="type">
            <el-select v-model="form.type" @change="typeChange">
              <el-option label="语音" :value="1"></el-option>
              <el-option label="短信" :value="2"></el-option>
            </el-select>
            <!-- <el-input v-model="form.type"></el-input> -->
          </el-form-item>
          <el-form-item label="通道key" prop="channel_key">
            <el-select v-model="form.channel_key">
              <el-option v-for="(item,index) in passKeyArr" :key="index" :label="item.channel_name" :value="item.channel_key"></el-option>
            </el-select>
            <!-- <el-input v-model="form.channel_key" type="text"></el-input> -->
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
    import {channelList,passConfig} from '@/api/pass.js'
  export default {
    name: 'Add-white-dialog',
    data() {
      return {

        dialogVisible: false,
        loading: false,
        val: {},
        passKeyArr:[],
        form: {
          company_no: null,
          type: null,
          channel_key:null
        },
        rules: {
          type: [{
            required: true,
            message: '请选择通道类型',
            trigger: 'blur'
          }],
          company_no: [{
            required: true,
            message: '请输入公司编号',
            trigger: 'blur'
          }, ],
          channel_key: [{
            required: true,
            message: '请选择通道key',
            trigger: 'blur'
          }, ]
        }
      }
    },
    mounted() {
      this.channelList();
    },
    methods: {
      show(val) {
        this.val = val;
        this.form.company_no = val.company_no;
        this.dialogVisible = true;
        // console.log(val);
      },

      typeChange() {
        this.form.channel_key = null;
        this.channelList();
      },

      channelList() {
        var params = {
          'equal[channel_key]':this.form.channel_key?this.form.channel_key:null,
          'equal[type]':this.form.type?this.form.type:null,
          page:1,
          per_page:100
        }
        channelList(params).then(res=>{
          if(res.status_code==200) {
            this.passKeyArr = res.data.data;
            // this.pages.total = res.data.total;
          }else{

          }
        })
      },

      // 修改价格配置
      sure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;
            var params = this.form;
            passConfig(params).then(res => {
              this.loading = false;
              if (res.status_code == 200) {
                this.$notify({
                  title: '提示',
                  message: '配置成功',
                  type: 'success'
                })
                this.handleClose();
                this.$emit('success');
              } else {
                this.$notify({
                  title: '提示',
                  message: '配置失败',
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

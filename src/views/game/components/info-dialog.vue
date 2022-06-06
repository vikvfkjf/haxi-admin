<template>
  <div class="info-dialog">
    <el-dialog title="修改游戏" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="Id" prop="id">
            <el-input v-model="form.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="游戏规则" prop="rule">
            <el-input v-model="form.rule"></el-input>
          </el-form-item>

          <el-form-item label="游戏状态" prop="status">
            <el-select v-model="form.status">
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="最小参与USDT" prop="min_take_part_usdt">
            <el-input v-model="form.min_take_part_usdt"></el-input>
          </el-form-item>
          <el-form-item label="最大参与USDT" prop="max_take_part_usdt">
            <el-input v-model="form.max_take_part_usdt"></el-input>
          </el-form-item>

          <el-form-item label="最小参与TRX" prop="min_take_part_trx">
            <el-input v-model="form.min_take_part_trx"></el-input>
          </el-form-item>
          <el-form-item label="最大参与TRX" prop="max_take_part_trx">
            <el-input v-model="form.max_take_part_trx"></el-input>
          </el-form-item>

          <el-form-item label="游戏类型" prop="game_type">
            <el-select v-model="form.game_type">
              <el-option label="牛牛" :value="1"></el-option>
              <el-option label="尾数" :value="2"></el-option>
              <el-option label="单双" :value="3"></el-option>
            </el-select>
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
  import {updateGame} from '@/api/game'
  import {
    getToken
  } from '@/utils/auth'
  export default {
    name: 'info-dialog',
    data() {
      return {

        dialogVisible: false,
        loading: false,
        val: {},
        passList:[],
        form: {
          id: null,
          rule : null,
          status: null,
          min_take_part_usdt :null,
          max_take_part_usdt :null,
          min_take_part_trx :null,
          max_take_part_trx :null,
          game_type :null
        },
        rules: {
          rule: [{
            required: true,
            message: '请输入游戏规则',
            trigger: 'blur'
          }],
          status : [{
            required: true,
            message: '请选择状态',
            trigger: 'blur'
          }],
          
          min_take_part_usdt : [{
            required: true,
            message: '请输入最小参与USDT',
            trigger: 'blur'
          }],
          max_take_part_usdt : [{
            required: true,
            message: '请输入最大参与USDT',
            trigger: 'blur'
          }],
          min_take_part_trx : [{
            required: true,
            message: '请输入最小参与TRX',
            trigger: 'blur'
          }],
          max_take_part_trx : [{
            required: true,
            message: '请输入最大参与TRX',
            trigger: 'blur'
          }],
          game_type  : [{
            required: true,
            message: '请选择游戏类型',
            trigger: 'blur'
          }],
        },

        action: process.env.VUE_APP_BASE_API + '/v1/admin/upload',
        headers: {
          Authorization: getToken()
        },

      }
    },
    mounted() {
    },
    methods: {
      show(val) {
        this.val = val;
        this.form = {
          id: val.id,
          rule: val.rule,
          status : val.status ,
          min_take_part_usdt :val.min_take_part_usdt ,
          max_take_part_usdt :val.max_take_part_usdt ,
          min_take_part_trx :val.min_take_part_trx ,
          max_take_part_trx :val.max_take_part_trx ,
          game_type:val.game_type
        },
        this.dialogVisible = true;
      },


      sure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;

            var params = {        
                id:String(this.form.id),
                rule :String(this.form.rule ),
                status :Number(this.form.status ),
                min_take_part_usdt :Number(this.form.min_take_part_usdt ),
                max_take_part_usdt :Number(this.form.max_take_part_usdt ),
                min_take_part_trx :Number(this.form.min_take_part_trx ),
                max_take_part_trx :Number(this.form.max_take_part_trx ),
                game_type :Number(this.form.game_type ),
            }
            updateGame(params).then(res => {
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
          id: null,
          rule: null,
          status : null ,
          min_take_part_usdt :null ,
          max_take_part_usdt :null ,
          min_take_part_trx :null ,
          max_take_part_trx :null ,
          game_type:null
        },
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

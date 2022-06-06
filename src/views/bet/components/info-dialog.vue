<template>
  <div class="info-dialog">
    <el-dialog title="修改投注信息" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" center
      v-loading="loading">
      <div class="content">
        <el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
          <el-form-item label="Id" prop="id">
            <el-input v-model="form.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="区块高度" prop="block_num">
            <el-input v-model="form.block_num" disabled></el-input>
          </el-form-item>
          <el-form-item label="区块hash" prop="block_hash">
            <el-input v-model="form.block_hash" disabled></el-input>
          </el-form-item>
          <el-form-item label="交易码" prop="transactions_id">
            <el-input v-model="form.transactions_id" disabled></el-input>
          </el-form-item>
          <el-form-item label="派发金额" prop="send_money">
            <el-input v-model="form.send_money" disabled></el-input>
          </el-form-item>
          <el-form-item label="服务费" prop="service_fee">
            <el-input v-model="form.service_fee" disabled></el-input>
          </el-form-item>

          <el-form-item label="输赢结果" prop="result">
            <el-select v-model="form.result" disabled>
              <el-option label="用户赢" :value="1"></el-option>
              <el-option label="用户输" :value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="派发状态" prop="send_status">
            <el-select v-model="form.send_status">
              <el-option label="待派发" :value="1"></el-option>
              <el-option label="已派发" :value="2"></el-option>
              <el-option label="无需派发" :value="3"></el-option>
              <el-option label="派发失败" :value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark"></el-input>
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
  import {updateBet} from '@/api/bet'
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
          block_num : null,
          block_hash: null,
          transactions_id :null,
          result :null,
          send_money :null,
          service_fee :null,
          send_status :null,
          remark :null,
        },
        rules: {
          send_status: [{
            required: true,
            message: '请选择派发状态',
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
          block_num : val.block_num,
          block_hash: val.block_hash,
          transactions_id :val.transactions_id,
          result :val.result,
          send_money :val.send_money,
          service_fee :val.service_fee,
          send_status :val.send_status,
          remark :val.remark,
        },
        this.dialogVisible = true;
      },


      sure() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true;

            var params = {        
              id:String(this.form.id),
              block_num :Number(this.form.block_num ),
              block_hash :String(this.form.block_hash ),
              transactions_id :String(this.form.transactions_id ),
              result :Number(this.form.result ),
              send_money :Number(this.form.send_money ),
              service_fee :Number(this.form.service_fee ),
              send_status :Number(this.form.send_status ),
              remark :String(this.form.remark ),
            }
            updateBet(params).then(res => {
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
          block_num : null,
          block_hash: null,
          transactions_id :null,
          result :null,
          send_money :null,
          service_fee :null,
          send_status :null,
          remark :null,
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

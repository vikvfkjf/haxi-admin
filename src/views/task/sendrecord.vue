<template>
  <div class="sendrecord-container">
    <div class="title">
      <h2>任务列表</h2>
    </div>

    <div class="tables">
      <div class="forms">
        <el-form ref="form" :model="form" label-width="80px" inline size="mini">
          <el-form-item label="用户编号">
            <el-input v-model="form.user_no" placeholder="请输入用户编号"></el-input>
          </el-form-item>
          <el-form-item label="任务编号">
            <el-input v-model="form.task_no" placeholder="请输入任务编号"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="短信类型">
            <el-select v-model="form.sms_type">
              <el-option label="国内" :value="1"></el-option>
              <el-option label="国际" :value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否补齐">
            <el-select v-model="form.is_polishing">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="发送时间">
            <el-date-picker v-model="form.time" value-format="yyyy-MM-dd" type="daterange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table v-loading="loading" :data="list" style="width: 100%" :header-cell-style="{background:'#ececec'}"
        height="calc(100% - 144px)" size="mini">
        <el-table-column prop="id" label="id" width="80">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="150">
        </el-table-column>
        <el-table-column prop="user_no" label="用户编号" width="170">
        </el-table-column>
        <el-table-column prop="task_no" label="任务编号" width="170">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120">
        </el-table-column>
        <el-table-column prop="is_polishing" label="是否补齐" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.is_polishing==1">是</span>
            <span v-if="scope.row.is_polishing==2">否</span>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容" width="200">
        </el-table-column>
        <el-table-column prop="bill_num" label="计量" width="50">
        </el-table-column>
        <el-table-column prop="receipt_status" label="回执状态" width="80">
        </el-table-column>
        <el-table-column prop="phone_region" label="国家" width="80">
        </el-table-column>
        <el-table-column prop="phone_province" label="省份" width="60">
        </el-table-column>
        <el-table-column prop="phone_city" label="地区" width="60">
        </el-table-column>

        <el-table-column prop="send_time" label="发送时间" width="160">
        </el-table-column>
        <el-table-column prop="receipt_time" label="回执时间">
          <template slot-scope="scope">
            <span v-if="scope.row.receipt_time=='1970-01-01 08:00:00'">0</span>
            <span v-else>{{scope.row.receipt_time}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pages.page" :page-sizes="[10,20,50,100]" :page-size="pages.per_page"
        layout="total, sizes, prev, pager, next, jumper" :total="pages.total">
      </el-pagination>
    </div>

    <examine-dialog ref="examineDialog" @success="success"></examine-dialog>
    <change-task-dialog ref="changeTaskDialog" @success="success"></change-task-dialog>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    sendRecord
  } from '@/api/task.js'

  import examineDialog from './components/examine-dialog.vue';
  import changeTaskDialog from './components/change-task-dialog.vue';
  export default {
    name: 'sendrecord',
    components: {
      examineDialog,
      changeTaskDialog
    },
    data() {
      return {
        loading: false,
        form: {
          task_no: null,
          user_no: null,
          phone: null,
          sms_type: null,
          is_polishing: null,
          time: null
        },
        list: [],
        pages: {
          page: 1,
          per_page: 10,
          total: null
        },
      }
    },
    mounted() {
      this.form.username = this.$route.query.username ? this.$route.query.username : null;
      this.sendRecord();
    },
    methods: {
      handleSizeChange(e) {
        this.pages.per_page = e;
        this.sendRecord();
      },
      handleCurrentChange(e) {
        this.pages.page = e;
        this.sendRecord();
      },
      sendRecord() {
        this.loading = true;
        var params = {
          'equal[user_no]': this.form.user_no ? this.form.user_no : null,
          'equal[task_no]': this.form.task_no ? this.form.task_no : null,
          'equal[phone]': this.form.phone ? this.form.phone : null,
          'equal[sms_type]': this.form.sms_type ? this.form.sms_type : null,
          'equal[is_polishing]': this.form.is_polishing ? this.form.is_polishing : null,
          'great_equal[send_time]': this.form.time ? this.form.time[0] + ' 00:00:00' : null,
          'less_equal[send_time]': this.form.time ? this.form.time[1] + ' 23:59:59' : null,
          page: this.pages.page,
          per_page: this.pages.per_page
        }
        sendRecord(params).then(res => {
          this.loading = false;
          if (res.status_code == 200) {
            this.list = res.data.data;
            this.pages.total = res.data.total;
          } else {

          }
        })
      },
      search() {
        console.log(this.form);
        this.pages.page = 1;
        this.sendRecord();
      },
      success() {
        this.sendRecord();
      },
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

  .sendrecord-container {
    .title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 40px;
      padding: 0 20px;
      margin-bottom: 20px;
      background: #fff;
      align-items: center;

      h2 {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 3px;
        color: #3d3d3d;
        line-height: 40px;
      }
    }

    .tables {
      height: calc(100vh - 160px);
      -webkit-box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
      box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
      padding: 20px;
      color: #606060;
      background-color: #fff;

      .el-input {
        width: 200px;
      }

      .el-pagination {
        margin: 20px 0;
        text-align: center;
      }
    }
  }

</style>

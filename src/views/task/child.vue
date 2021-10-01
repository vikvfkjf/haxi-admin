<template>
  <div class="task-child-container">
    <div class="title">
      <h2>子任务列表</h2>
    </div>

    <div class="tables">
      <div class="forms">
        <el-form ref="form" :model="form" label-width="90px" inline size="mini">
          <el-form-item label="父任务编号">
            <el-input v-model="form.task_no" placeholder="请输入任务编号"></el-input>
          </el-form-item>
          <el-form-item label="发送状态">
            <el-select v-model="form.send_status">
              <el-option label="待发送" :value="1"></el-option>
              <el-option label="已发送" :value="2"></el-option>
              <el-option label="发送失败" :value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="发送时间">
            <el-date-picker
              v-model="form.time"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table v-loading="loading" :data="list" style="width: 100%" :header-cell-style="{background:'#ececec'}" height="calc(100% - 119px)" size="mini">
        <el-table-column prop="id" label="id" width="80">
        </el-table-column>
        <el-table-column prop="task_no" label="父任务编号" width="200">
        </el-table-column>
        <el-table-column prop="sub_task_no" label="子任务编号" width="200">
        </el-table-column>
        <el-table-column prop="task_no" label="任务编号" width="200">
        </el-table-column>
        <el-table-column prop="send_time" label="发送时间" width="200">
        </el-table-column>
        <el-table-column prop="send_status" label="发送型" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.send_status==1">待发送</span>
            <span v-if="scope.row.send_status==2">已发送</span>
            <span v-if="scope.row.send_status==3">发送失败</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="sendSubTask(scope.row)">执行</el-button>
            <el-button size="mini" @click="changeSubTask(scope.row)">修改子任务</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pages.page"
        :page-sizes="[10,20,50,100]"
        :page-size="pages.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pages.total">
      </el-pagination>
    </div>

    <sub-examine-dialog ref="subExamineDialog" @success="success"></sub-examine-dialog>
    <change-subtask-dialog ref="changeSubtaskDialog" @success="success"></change-subtask-dialog>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {subTaskList} from '@/api/task.js'
  
  import subExamineDialog from './components/sub-examine-dialog.vue';
  import changeSubtaskDialog from './components/change-subtask-dialog.vue'
  export default {
    name: 'task-child',
    components:{
      subExamineDialog,
      changeSubtaskDialog
    },
    data() {
      return {
        loading:false,
        form:{
          task_no:null,
          send_status:null,
          time:null
        },
        list:[],
        pages:{
          page:1,
          per_page:10,
          total:null
        },
      }
    },
    mounted() {
      this.form.task_no = this.$route.query.task_no?this.$route.query.task_no:null;
      this.subTaskList();
    },
    methods:{
      handleSizeChange(e) {
        this.pages.per_page = e;
        this.subTaskList();
      },
      handleCurrentChange(e) {
        this.pages.page = e;
        this.subTaskList();
      },
      subTaskList() {
        this.loading = true;
        var params = {
          'equal[task_no]':this.form.task_no?this.form.task_no:null,
          'equal[send_status]':this.form.send_status?this.form.send_status:null,
          'great_equal[created_at]':this.form.time?this.form.time[0]+' 00:00:00':null,
          'less_equal[created_at]':this.form.time?this.form.time[1]+' 23:59:59':null,
          page:this.pages.page,
          per_page:this.pages.per_page
        }
        subTaskList(params).then(res=>{
          this.loading = false;
          if(res.status_code==200) {
            this.list = res.data.data;
            this.pages.total = res.data.total;
          }else{

          }
        })
      },
      search() {
        console.log(this.form);
        this.pages.page = 1;
        this.subTaskList();
      },
      success() {
        this.subTaskList();
      },
      sendSubTask(row) {
        this.$refs.subExamineDialog.show(row);
      },
      changeSubTask(row) {
        this.$refs.changeSubtaskDialog.show(row);
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .task-child-container {
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

    .tables{
      height:calc(100vh - 160px);
      -webkit-box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
      box-shadow: 0 0 5px 0 rgb(69 116 208 / 20%);
      padding: 20px;
      color: #606060;
      background-color: #fff;
      .el-input{
        width:200px;
      }
      .el-pagination{
        margin:20px 0;
        text-align:center;
      }
    }
  }

</style>

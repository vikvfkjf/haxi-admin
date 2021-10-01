<template>
  <div class="administrator-index-container">
    <div class="title">
      <h2>管理员列表</h2>
      <el-button type="primary" size="mini" @click="addAdministrator">新增</el-button>
    </div>

    <div class="tables" v-loading="loading">
      <div class="forms">
        <el-form ref="form" :model="form" label-width="80px" inline size="mini">
          <el-form-item label="用户名">
            <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          
          <el-form-item label="手机号">
            <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="2"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="角色">
            <el-select v-model="form.role_key">
              <el-option v-for="(item,index) in roleList" :key="index" :label="item.name" :value="item.key"></el-option>
            </el-select>
          </el-form-item> -->

          <el-form-item label="创建时间">
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
      <el-table :data="list" style="width: 100%" :header-cell-style="{background:'#ececec'}" height="calc(100% - 119px)" size="mini">
        <el-table-column prop="id" label="id" width="80">
        </el-table-column>
        <el-table-column prop="user_no" label="用户编号" width="200">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="200">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="200">
        </el-table-column>
        <el-table-column prop="" label="公司名称">
          <template slot-scope="scope">
            <span v-if="scope.row.admin_company">{{scope.row.admin_company.name}}</span>
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <el-table-column prop="role.name" label="角色">
        </el-table-column>

        <el-table-column prop="created_at" label="创建时间">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="changeAdministrator(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="deleteHandle(scope.row)">删除</el-button>
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

    <addedit-admin-dialog ref="addeditAdminDialog" @success="addSuccess"></addedit-admin-dialog>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {getAdministrator,getRoleList,delAgent} from '@/api/administrator.js'
  import addeditAdminDialog from './components/addedit-admin-dialog.vue'
  export default {
    name: 'finance-record',
    components:{
      addeditAdminDialog
    },
    data() {
      return {
        loading:false,
        form:{
          name:null,
          status:null,
          role_key:null,
          phone:null,
          time:null
        },
        list:[],
        pages:{
          page:1,
          per_page:10,
          total:null
        },
        roleList:[]
      }
    },
    mounted() {
      this.getRoleList();
      this.getAdministrator();
    },
    methods:{
      handleSizeChange(e) {
        this.pages.per_page = e;
        this.getAdministrator();
      },
      handleCurrentChange(e) {
        this.pages.page = e;
        this.getAdministrator();
      },
      getRoleList() {
        getRoleList().then(res=>{
          if(res.status_code==200) {
            this.roleList = res.data;
          }
        })
      },
      getAdministrator() {
        this.loading=true;
        var params = {
          'equal[name]':this.form.name,
          'equal[phone]':this.form.phone,
          'equal[status]':this.form.status,
          // 'equal[role_key]':'11',
          'great_equal[created_at]':this.form.time?this.form.time[0]+' 00:00:00':null,
          'less_equal[created_at]':this.form.time?this.form.time[1]+' 23:59:59':null,
          page:this.pages.page,
          per_page:this.pages.per_page
        }
        getAdministrator(params).then(res=>{
          this.loading=false;
          if(res.status_code==200) {
            this.list = res.data.data;
            this.pages.total = res.data.total;
          }else{

          }
        }).catch(err=>{
          this.loading=false;
        })
      },

      deleteHandle(row) {
        var params = {
          user_no:row.user_no
        }
        delAgent(params).then(res=>{
          if(res.status_code==200) {
            this.$notify({
              title:'提示',
              type:'success',
              message:'删除成功'
            })
            this.getAdministrator();
          }else{
            this.$notify({
              title:'提示',
              type:'error',
              message:'删除失败'
            })
          }
        })
      },

      addAdministrator() {
        this.$refs.addeditAdminDialog.show('add',null);
      },
      changeAdministrator(row) {
        this.$refs.addeditAdminDialog.show('edit',row);
      },
      addSuccess() {
        this.getAdministrator();
      },
      search() {
        this.pages.page = 1;
        this.getAdministrator();
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .administrator-index-container {
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
        width:150px;
      }
      .el-select{
        width:150px;
      }
      .el-pagination{
        margin:20px 0;
        text-align:center;
      }
    }





  }

</style>

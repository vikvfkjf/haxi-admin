<template>
  <div class="pass-index-container">
    <div class="title">
      <h2>通道列表</h2>
      <el-button type="primary" size="mini" @click="bindSelf">新增</el-button>
    </div>

    <div class="tables">
      <div class="forms">
        <el-form ref="form" :model="form" label-width="80px" inline size="mini">
          <el-form-item label="通道key">
            <el-input clearable v-model="form.channel_key" placeholder="请输入通道key"></el-input>
          </el-form-item>
          <el-form-item label="通道类型" >
            <el-select v-model="form.type" clearable>
              <el-option label="语音" :value="1"></el-option>
              <el-option label="短信" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="创建时间">
            <el-date-picker
              v-model="form.time"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item> -->
          <el-form-item label="">
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table v-loading="loading" :data="list" style="width: 100%" :header-cell-style="{background:'#ececec'}" height="calc(100% - 119px)" size="mini">
        <el-table-column prop="channel_key" label="通道key" width="80">
        </el-table-column>
        <el-table-column prop="channel_name" label="通道名称" width="200">
        </el-table-column>
        <el-table-column prop="type" label="通道类型" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.type==1">语音</span>
            <span v-if="scope.row.type==2">短信</span>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="通道状态" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-if="scope.row.status==2">禁用</span>
          </template>
        </el-table-column>

        <el-table-column prop="is_default" label="是否默认">
          <template slot-scope="scope">
            <span v-if="scope.row.is_default==1">是</span>
            <span v-if="scope.row.is_default==2">否</span>
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

    <!-- <bind-self-dialog ref="bindSelfDialog" @success="success"></bind-self-dialog> -->
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {channelList} from '@/api/pass.js'
  // import bindSelfDialog from './components/bind-self-dialog.vue'
  export default {
    name: 'pass-index',
    components:{
        // bindSelfDialog
    },
    data() {
      return {
        loading:false,
        form:{
          type:null,
          channel_key:null
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
      this.channelList();
    },
    methods:{
      handleSizeChange(e) {
        this.pages.per_page = e;
        this.channelList();
      },
      handleCurrentChange(e) {
        this.pages.page = e;
        this.channelList();
      },
      channelList() {
        this.loading = true;
        var params = {
          'equal[channel_key]':this.form.channel_key?this.form.channel_key:null,
          'equal[type]':this.form.type?this.form.type:null,
          // 'great_equal[created_at]':this.form.time?this.form.time[0]+' 00:00:00':null,
          // 'less_equal[created_at]':this.form.time?this.form.time[1]+' 23:59:59':null,
          page:this.pages.page,
          per_page:this.pages.per_page
        }
        channelList(params).then(res=>{
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
        this.channelList();
      },
      success() {
        this.channelList();
      },
      bindSelf() {
        this.$refs.bindSelfDialog.show();
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

  .pass-index-container {
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

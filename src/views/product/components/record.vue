<template>
  <div class="record">
    <div class="searchs">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini" label-width="70px">
        <el-form-item label="所属应用">
          <el-select>
            <el-option label="aa" value="aa"></el-option>
            <el-option label="bb" value="b"></el-option>
            <el-option label="cc" value="cc"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="呼叫状态">
          <el-select>
            <el-option label="aa" value="aa"></el-option>
            <el-option label="bb" value="b"></el-option>
            <el-option label="cc" value="cc"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="被叫号码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="主叫号码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="隐私号码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="CallId">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="操作时间">
          <el-date-picker
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
          <el-button plain size="mini">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="tables">
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#ececec'}" size="mini">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="date" label="CallId" width="100">
        </el-table-column>
        <el-table-column prop="money" label="bindId" width="120">
        </el-table-column>
        <el-table-column prop="money" label="小号" width="120">
        </el-table-column>
        <el-table-column prop="money" label="主叫号码" width="120">
        </el-table-column>
        <el-table-column prop="money" label="被叫号码" width="120">
        </el-table-column>
        <el-table-column prop="money" label="呼叫状态" width="120">
        </el-table-column>
        <el-table-column prop="money" label="呼叫时间" width="120">
        </el-table-column>
        <el-table-column prop="money" label="接通时间（主叫）" width="120">
        </el-table-column>
        <el-table-column prop="money" label="接通时间（被叫）" width="120">
        </el-table-column>
        <el-table-column prop="money" label="结束时间" width="120">
        </el-table-column>
        <el-table-column prop="money" label="主叫时长（s）" width="120">
        </el-table-column>
        <el-table-column prop="money" label="被叫时长（s）" width="120">
        </el-table-column>
        <el-table-column prop="detail" label="通话录音">
          <template slot-scope="scope">
            <el-button size="mini" plain>下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryPage.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="queryPage.per_page"
        layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'record',
    props: {
      isActive: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        searchForm: {
          phone: '',
          remarks: '',
        },
        tableData: [{
          date: '2016-05-02',
          money: '100.00'
        }],
        queryPage: {
          currentPage: 1,
          per_page: 10
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }

</script>

<style scoped lang="scss">
  .el-input{
    width:178px;
  }

  .record {
    .searchs {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
    }

    .tables {
      .el-pagination {
        margin: 20px 0;
        text-align: center;
      }
    }
  }

</style>

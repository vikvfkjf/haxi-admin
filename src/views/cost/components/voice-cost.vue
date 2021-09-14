<template>
  <div class="voice-cost">
    <div class="searchs">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
        <el-form-item label="日期">
          <el-date-picker v-model="searchForm.time" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="费用类型">
          <el-select v-model="searchForm.type" placeholder="费用类型">
            <el-option label="月租费" value="1"></el-option>
            <el-option label="话费" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="业务模式">
          <el-select v-model="searchForm.mode" placeholder="业务模式">
            <el-option label="AXB" value="1"></el-option>
            <el-option label="AXN/AX" value="2"></el-option>
          </el-select>
        </el-form-item>

         <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="tables">
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#ececec'}"
        height="calc(100vh - 360px)" size="mini">
        <el-table-column prop="code" label="code" width="180">
        </el-table-column>
        <el-table-column prop="date" label="时间" width="180">
        </el-table-column>
        
        <el-table-column prop="type" label="费用类型" width="180">
        </el-table-column>
        <el-table-column prop="mode" label="业务模式" width="180">
        </el-table-column>
        <el-table-column prop="time" label="通话时长" width="180">
        </el-table-column>
        <el-table-column prop="money" label="费用金额">
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryPage.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryPage.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'voice-cost',
    props: {
      isActive: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        searchForm: {
          time: '',
          type: ''
        },
        tableData: [{
          code:'20210819',
          date: '2016-05-02',
          code: '202108181923',
          type: '月租费',
          mode:'AXB',
          time:'1.02分钟',
          money: '100.00'
        }],
        queryPage:{
          currentPage:1,
          per_page:10
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
.voice-cost{
  .searchs {
    margin-top:5px;
  }

  .tables {
    .el-pagination {
      margin: 20px 0;
      text-align: center;
    }
  }
}
  

</style>

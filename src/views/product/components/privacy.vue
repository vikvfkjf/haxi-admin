<template>
  <div class="privacy">
    <div class="searchs">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
        <el-form-item label="">
          <el-input v-model="searchForm.phone" placeholder="请输入小号"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="searchForm.remarks" placeholder="请输入备注"></el-input>
        </el-form-item>

         <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <!-- <el-button @click="onSubmit">重置</el-button> -->
        </el-form-item>
      </el-form>

      <div class="opt-btns">
          <el-button plain size="mini">批量备注</el-button>
          <el-button plain size="mini">批量退号</el-button>
          <el-button plain size="mini">批量绑定</el-button>
          <el-button plain size="mini">批量解绑</el-button>
          <el-button plain size="mini">导出</el-button>
      </div>
    </div>

    <div class="tables">
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#ececec'}" size="mini">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column prop="date" label="小号" width="100">
        </el-table-column>
        <el-table-column prop="money" label="归属地" width="120">
        </el-table-column>
        <el-table-column prop="money" label="所属应用" width="120">
        </el-table-column>
        <el-table-column prop="money" label="小号模式" width="120">
        </el-table-column>
        <el-table-column prop="money" label="生效时间" width="120">
        </el-table-column>
        <el-table-column prop="money" label="状态" width="120">
        </el-table-column>
        <el-table-column prop="money" label="绑定关系" width="120">
        </el-table-column>
        <el-table-column prop="detail" label="操作">
            <template slot-scope="scope">
                <el-button size="mini" plain>绑定</el-button>
                <el-button size="mini" plain>解绑</el-button>
                <el-button size="mini" plain>退号</el-button>
                <el-button size="mini" plain>备注</el-button>
            </template>
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
    name: 'privacy',
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
          remarks:'',
        },
        tableData: [{
          date: '2016-05-02',
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
.privacy{
  .searchs {
    margin-top:5px;
    display:flex;
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

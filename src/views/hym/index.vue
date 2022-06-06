<template>
  <div class="fibo-index-container">
    <div class="title">
      <h2>fibo</h2>
      <!-- <el-button @click="add" size="mini">添加项目</el-button> -->
    </div>


  </div>

</template>

<script>
  
  import { encrypt,encryptRSA, decrypt } from '@/utils/jsencrypt';
  export default {
    name: 'fibo-index',

    data() {
      return {
        
      }
    },
    mounted() {
      var n = null;
      for (var t =  16, e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", r = 0; r < t; r++) n += e.charAt(Math.random() * e.length);
      console.log(n);

      var en = encrypt(n);
      console.log(en)

    },
    methods: {

      
    }
  }

</script>

<style lang="scss" scoped>
  @import 'src/styles/mixin.scss';

  .fibo-index-container {
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
      padding: 20px 20px;
      color: #606060;
      background-color: #fff;

      .opts {
        .el-button {
          margin-right: 10px;
        }
      }

      .el-pagination {
        margin: 20px 0;
        text-align: center;
      }
    }
  }

</style>

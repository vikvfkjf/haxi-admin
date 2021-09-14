<template>
  <div class="experience">
    <div class="welcome">欢迎使用在线体验功能！</div>
    <el-tabs type="border-card">
      <el-tab-pane label="AX">
        <div class="desc">
          <h3>AX模式：</h3>
          <p style="margin-bottom:20px;">满足一对多场景下的隐私保护。A是受隐私保护用户的真实号码，号码X是为保护用户真实号码A不被泄露而为其绑定的一个虚拟号码（即云信小号）。除A以外的任何人可以通过拨打号码X联系到A。</p>
          <h3 >使用方法：</h3>
          <p>填入号码A后，点击“开始体验”，系统将会弹出绑定成功的窗口，并显示系统分配的一个小号X。请使用号码A以外的任意号码拨打小号X，号码A将会接到来自小号X的电话，接通后，两个号码可以自由通话(两分钟内有效)。在线体验A端不支持回拨功能，无法直接通过通话记录回拨给对方，实际使用可通过绑定回拨号码实现定向回拨。</p>
        </div>
        <el-form ref="form" :model="form" label-width="80px" size="mini" >
          <el-form-item label="号码A">
            <el-input v-model="form.name"></el-input>
            <span class="tip">其他号码呼叫X后，将接通A</span>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary">开始体验</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="AXN">
        <div class="desc">
          <h3>AXN模式：</h3>
          <p style="margin-bottom:20px;">满足一对多场景下的隐私保护。A是受隐私保护用户的真实号码，号码X是为保护用户真实号码A不被泄露而为其绑定的一个虚拟号码（即云信小号）。除A以外的任何人都可以通过拨打号码X联系到A。</p>
          <h3 >使用方法：</h3>
          <p>填入号码A后（B选填），点击“开始体验”，系统将会弹出绑定成功的窗口，并显示系统分配的一个小号X。请使用号码A以外的任意号码拨打小号X，号码A将会接到来自小号X的电话。接通后，两个号码可以自由通话(两分钟内有效)。A端有回拨功能，在没有绑定号码B的情况下，A可通过通话记录自动就近回拨给刚进线的电话。如果想指定号码回拨，可以在绑定号码B的情况下，用号码A拨打系统分配的小号X,号码B将会收到来自本小号的电话。接通后，两个号码可以自由通话(两分钟内有效)。</p>
        </div>
        <el-form ref="form" :model="form" label-width="80px" size="mini" >
          <el-form-item label="号码A">
            <el-input v-model="form.name"></el-input>
            <span class="tip">其他号码呼叫X后，将接通A</span>
          </el-form-item>
          <el-form-item label="号码B">
            <el-input v-model="form.name"></el-input>
            <span class="tip">绑定后，A直接拨打小号X，将接通B</span>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary">开始体验</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="AXB" >
        <div class="desc">
          <h3>AXB模式：</h3>
          <p style="margin-bottom:20px;">满足一对一场景下的隐私保护。A和B是受隐私保护权益双方的真实号码，号码X是为保护双方真实号码A和B不被泄露而分配的一个仅供A和B双方沟通的虚拟号码（即云信小号）。A和B都可以通过拨打号码X接通另一方。</p>
          <h3 >使用方法：</h3>
          <p>填入号码A和号码B后，点击“开始体验”，系统将会弹出绑定成功的窗口，并显示系统分配的一个小号X。请使用填入的两个号码中任意一个号码（如A）拨打系统分配的小号X，另一个号码（如B）将会接到来自本小号的电话。接通后，两个号码可以自由通话(两分钟内有效)。</p>
        </div>
        <el-form ref="form" :model="form" label-width="80px" size="mini" >
          <el-form-item label="号码A">
            <el-input v-model="form.name"></el-input>
            <span class="tip">绑定后，B直接拨打小号X，将接通A</span>
          </el-form-item>
          <el-form-item label="号码B">
            <el-input v-model="form.name"></el-input>
            <span class="tip">绑定后，A直接拨打小号X，将接通B</span>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary">开始体验</el-button>
          </el-form-item>
        </el-form>


      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'experience',
    props: {
      isActive: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        form:{
          name:''
        }
      }
    },
    methods: {

    }
  }

</script>

<style scoped lang="scss">
  .experience {
    .welcome{
      margin-bottom:20px;
    }

    .el-tabs{
      .desc{
        margin-bottom:20px;
        padding: 20px;
        background: #f7f7f7;
        h3{
          font-weight:500;
          margin-bottom:15px;
          color:#000;
          font-size:16px;
        }
        p{
          font-size:14px;
          line-height:30px;
          color:#606060;
        }
      }
      .el-form{
        .el-form-item{
          position:relative;
          // display:flex;
          .el-input{
            width:200px;
          }
          .tip{
            position:absolute;
            top:0;
            left: 210px;
            width:300px;
            line-height:28px;
            font-size:12px;

          }
        } 
        
      }
    }
  }

</style>

<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <div class="inner-box">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <h2>{{user_info?user_info.name:null}}</h2>
            <i class="iconfont icon-jiantouxia" style="margin-left:10px;"></i>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item @click.native="logout">
              <span style="display:block;">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'user_info'
    ])
  },
  mounted() {
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      console.log('haha');
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      
    },

    toMessage() {
      this.$router.push({
        path:'/message/index'
      })
    },
    toFinance() {
      this.$router.push({
        path:'/finance/index'
      })
    }
  }
}
</script>
<style lang="scss">

// .navbar{
//   .el-dropdown-menu__item--divided{
//     line-height:35px;
//     border-top:0;
//     margin-top:0;
//   }
// }
</style>
<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  // background: #fff;
  background:rgb(69, 116, 208);
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 55px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    // color:#fff;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    width:68%;
    height: 100%;
    line-height: 60px;
    overflow-y:hidden;
    overflow-x:auto;
    @include scrollBarX();
    &:focus {
      outline: none;
    }

    .inner-box{
      float:right;
      width:825px;
      height:60px;
      line-height:60px;
    }

    .right-menu-item {
      
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      float:right;
      padding:0 20px;
      // margin-right: 30px;
      &:hover{
        background:rgb(64, 108, 195);
      }

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;
        cursor:pointer;

        // .user-avatar {
        //   cursor: pointer;
        //   width: 40px;
        //   height: 40px;
        //   border-radius: 10px;
        // }
        h2{
          display:inline-block;
          font-size:14px;
          font-weight:400;
          color:#fff;
        }

        .icon-jiantouxia{
          font-size:14px;
          color:#fff;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }

    .nav-title-item{
      float:right;
      padding:0 20px;
      cursor:pointer;
      color:#fff;
      font-size:14px;
      border-right: 1px solid #406cc3;
      &:hover{
        background:rgb(64, 108, 195);
      }
      i{
        margin-right:10px;
      }
    }
  }
}
</style>

<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped lang="scss">
@import 'src/styles/mixin.scss';
.app-main {
  /*60 = navbar  */
  padding:20px;
  /* min-height: calc(100vh - 60px); */
  height: calc(100vh - 60px);
  width: 100%;
  position: relative;
  overflow: auto;
  background:rgb(239, 247, 253);
  @include scrollBar();
}
.fixed-header+.app-main {
  padding-top: 60px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>

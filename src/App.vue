<template>
  <div id="app">
    <dt-loading></dt-loading>
    <router-view></router-view>
  </div>
</template>

<script>
import DtLoading from "./components/Loading";
export default {
  name: "app",
  components: {
    DtLoading
  }
};
</script>

<style lang="scss">
@import "./statics/css/reset.css";
@import "./scss/constant.style.scss";
@import "./font/iconfont.css";
@import "./scss/base";
@import "./scss/common.scss";
@import "./scss/animation";
@import "./scss/element.dtreset.scss";
#app {
  width: 100%;
  height: 100%;
  background: $color-bg-main;
}
</style>

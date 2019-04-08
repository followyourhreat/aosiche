<template>
  <div id="home">
    <dt-header></dt-header>
    <tab-control :title="title" @tabClick="tabClick" ref="tabControl" class="tab-style"></tab-control>
    <side-bar></side-bar>
    <!--<router-view></router-view>-->
    <transition name="fade" mode="out-in">
      <router-view class="water_main"></router-view>
    </transition>
  </div>
</template>

<script>
import DtHeader from "../../components/Header";
import SideBar from "../../components/content/Sidebar";
import TabControl from "../../components/common/tabControl/tabControl";
export default {
  data() {
    return {
      title: ["设备总览", "智能设备管理", "设备导入", "固件管理", "音频推送"],
      device: {
        summary: { page: 0, list: [] },
        manage: { page: 0, list: [] },
        import: { page: 0, list: [] },
        update: { page: 0, list: [] },
        video: { page: 0, list: [] }
      },
      currentType: 0
    };
  },
  components: {
    DtHeader,
    SideBar,
    TabControl
  },
  mounted() {
    //   this.$http.accountGetAccountInfo(info => {
    //     let _info = info.data;
    //     this.$store.dispatch('storeAcconutInfo', _info);
    //   });
  },
  methods: {
    tabClick(index) {
      // console.log(index)
      // alert(index)
      switch (index) {
        case 0:
          this.$router.push({ name: "device-summary" });
          break;
        case 1:
          this.$router.push({ name: "device-manage" });
          break;
        case 2:
          this.$router.push({ name: "device-import" });
          break;
        case 3:
          this.$router.push({ name: "device-update" });
          break;
        case 4:
          this.$router.push({ name: "device-video" });
          break;
      }
    }
  }
};
</script>

<style  lang="scss" scoped>
@import "../../scss/constant.style";
#home {
  width: 100%;
  height: auto;
}
.tab-style {
  width: 53%;
  position: fixed;
  left: 30%;
  top: 0;
  z-index: 99;
  color: #d9d9d9;
}
.water_main {
  position: absolute;
  top: 61px;
  padding: 40px 40px 10px 215px;
  width: 100%;
  min-width: $length-body-min-width;
  // max-height: 1080px;
  min-height: $length-body-min-height;
  // height: 100%;
  overflow-y: auto;
  background: $color-bg-main;
}
</style>

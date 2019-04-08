<template>
  <div id="push">
    <dt-header></dt-header>
    <tab-control :title="title" @tabClick="tabClick" ref="tabControl"  class="tab-style"></tab-control>
    <side-bar></side-bar>
    <!--<router-view></router-view>-->
    <transition name="fade" mode="out-in">
      <router-view class="water_main"></router-view>
    </transition>
  </div>
</template>

<script>
  import DtHeader from '../../components/Header'
  import SideBar from '../../components/content/Sidebar'
  import TabControl from '../../components/common/tabControl/tabControl'
  export default {
    name: "push",
    components: {
      DtHeader,
      SideBar,
      TabControl
    },
    data(){
      return {
        title:['设备次数到期提醒','信息推送记录'],
        device:{
          'backend':{page:0,list:[]},
          'agent':{page:0,list:[]},
        }
      }
    },
    methods:{
      tabClick(index){
        // alert(index)
        switch (index){
          case 0:
            this.$router.push({'name':'push-remind'});
            break;
          case 1:
            this.$router.push({'name':'push-infoRecord'});
            break;
        }
      },
    }
  }
</script>

<style  lang="scss" scoped>
  @import "../../scss/constant.style";
  #push{
    width: 100%;
    height: auto;
  }
  .tab-style{
    width: 53%;
    position: fixed;
    left: 30%;
    top: 0;
    z-index: 99;
    color: #D9D9D9;
  };
  .water_main {
    position: absolute;
    top: 61px;
    padding: 25px 40px 10px 215px;
    width: 100%;
    min-width: $length-body-min-width;
    // max-height: 1080px;
    min-height: $length-body-min-height;
    // height: 100%;
    overflow-y: auto;
    background: $color-bg-main;
  }
</style>

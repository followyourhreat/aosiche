<template>
  <div id="serve">
    <dt-header></dt-header>
    <tab-control :title="title" @tabClick="tabClick" ref="tabControl"  class="tab-style" :currentEndex="currentIndex"></tab-control>
    <side-bar></side-bar>
    <!--<router-view></router-view>-->
    <div class="oue-innerStyle">
      <transition name="fade" mode="out-in">
        <router-view class="water_main"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import DtHeader from '../../components/Header'
  import SideBar from '../../components/content/Sidebar'
  import TabControl from '../../components/common/tabControl/tabControl'
  export default {
    name: "serve",
    components: {
      DtHeader,
      SideBar,
      TabControl
    },
    data(){
      return {
        title:['待审核订单','待支付订单','发起订单','已支付订单查询'],
        device:{
          'waiting':{page:0,list:[]},
          'pay':{page:0,list:[]},
          'handling': {page:0,list:[]},
          'solved': {page:0, list:[]}
        },
        currentIndex:0,
      }
    },
    created(){
      this.getCurrentIndex()
    },
    methods:{
      tabClick(index){
        // alert(index)
        switch (index){
          case 0:
            this.$router.push({'name':'serve-waiting'});
            break;
          case 1:
            this.$router.push({'name':'serve-pay'});
            break;
          case 2:
            this.$router.push({'name':'serve-handling'});
            break;
          case 3:
            this.$router.push({'name': 'serve-solved'});
            break
        }
      },
      getCurrentIndex(){
        // console.log(window.location.hash.split('/')[2]=='summary' );
        if(window.location.hash.split('/')[2]=='waiting') {
          this.currentIndex = 0
        } else if(window.location.hash.split('/')[2]=='pay'){
          this.currentIndex = 1
        } else if(window.location.hash.split('/')[2]=='handling'){
          this.currentIndex=2
        } else if(window.location.hash.split('/')[2]=='solved'){
          this.currentIndex=3
        }
        // console.log(this.currentIndex);
      },
    }
  }
</script>

<style  lang="scss" scoped>
  @import "../../scss/constant.style";
  #serve{
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
  .oue-innerStyle{
    width: 100%;
    position: absolute;
    top: 61px;
    background: $color-bg-main !important;
  }
  .water_main {
    /*padding: 25px 40px 10px 215px;*/
    width: 88%;
    background: #fff;
    margin:  40px 40px 10px 215px;
    padding: 15px;
    min-width: $length-body-min-width;
    // max-height: 1080px;
    min-height: $length-body-min-height;
    // height: 100%;
    overflow-y: auto;
  }
</style>

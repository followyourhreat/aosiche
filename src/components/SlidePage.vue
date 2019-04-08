<template>
<div class="slide-page-mask" @click="toHideSlidePage">
  <!-- <div class="slide-page-outer" @click.stop="clickSlideConActive" :style="{'width': slidePageWidth + 'px'}"> -->
  <div class="slide-page-outer" @click.stop="" :style="{'width': slidePageWidth + 'px'}">
    <h3><em></em><i>{{slideTitle}}</i></h3>
    <div class="slide-page-con">
      <slot></slot>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: 'SlidePage',
  data() {
    return {
      slidePageWidth: this.slideWidth
    }
  },
  methods: {
    toHideSlidePage() {
      this.$emit('hideSlidePage', true)
    },
    clickSlideConActive() {
    }
  },
  props: {
    'slideWidth': {
      type: [String, Number],
      default: 600
    },
    'slideTitle': {
      type: [String],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/mixin.scss";
@import "../scss/constant.style.scss";
.slide-page-mask{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  // min-width: $length-body-min-width;
  min-width: 1000px;
  min-height: $length-body-min-height;
  z-index: 888;
  background: rgba(19, 18, 18, 0);
  transition: all 0.5s linear;
  transform: translateX(100%);
}
.slide-page-mask.slide-page-show{
  transform: translateX(0);
}

.slide-page-outer{
  position: absolute;
  right: 0;
  top: 64px;
  height: calc(100% - 64px);
  z-index: 200;
  // background: #FBFCFF;
  background: #FFF;
  box-shadow: -3px 0px 4px 0 rgba(197, 197, 197, 0.5);
 
  h3{
    height: 60px;
    line-height: 60px;
    background: #FFF;
    border-bottom: 1px solid #F3F3F3;
    padding: 0 40px;
    font-size: 16px;
    em{
      display: inline-block;
      width: 4px;
      height: 16px;
      vertical-align: middle;
      background: $color-active;
      border-radius: 2px 2px 2px 2px;
      margin-right: 10px;
    }
    i{
      display: inline-block;
      height: 20px;
      line-height: 20px;
      vertical-align: middle;
    }
  }
}
.slide-page-con{
  // 100% - 60px- 20px
  // max-height: calc(100% -80px);
  padding: 30px 0 0 40px;
  max-height: calc(100% - 80px);
  overflow-y: auto;
  ul{
    height: auto;
    li{
      height: auto;
      overflow: hidden;
      margin-bottom: 16px;
    }
    .dt-search-cell {
      margin: 0 5px 10px 0;
    }
    .slide-first-title{
      font-size: 16px;
      color: #444444;
      margin-bottom: 6px;
      span{
        display: inline-block;
        line-height: 26px;
        height: 26px;
        position: relative;
        &::after{
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 26px;
          background: $color-slide-wrod-active;
          content: '';
        }
      }
    }
  }
  .slide-tip{
    font-size: 12px;
    line-height: 30px;
    color: #D4D4D4;
  }
  .slide-btn-wrap{
    padding-left: 72px;
    margin-top: 20px;
    height: auto;
    overflow: hidden;
    // button:nth-of-type(1){
    //   margin-right: 16px;
    // }
    button{
      margin-right: 16px;
    }
  }
}
</style>

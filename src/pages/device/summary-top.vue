<template>
  <!-- <div class="static-plate" v-bind:class="'plate'+num">
    <h3>{{name}}</h3>
    <div class="static-num">
      4645
    </div>
  </div> -->
  <div class="static-plate" v-bind:class="'plate-'+cl">
    <div class="left"></div>
    <div class="right">
      <span>
        <h5>{{num}}</h5>
        <p>{{name}}</p>

      </span>

    </div>
  </div>
</template>
 <script>
export default {
  data() {
    return {
    }
  },
  props: {
    name: {
      type: String
    },
    num: {
      type: [String, Number]
    },
    cl: { // 激活总量: active  在线总量:online  总净水量:water  活跃设备量:lively
      type: String
    }
  }
}
</script>

 <style lang="scss" scoped>
@import '../../scss/mixin.scss';
@import '../../scss/constant.style.scss';
.static-plate {
  height: 100%;
  width: 19%;
  @include shadow;
  padding: 10px;
  margin-right: 8px;
  border: 1px solid #cccccc;
  display: flex;
  .left{
    flex: 3.2;
  }
  .right{
    flex: 5.8;
    line-height: 126px;
    color: #0097FF;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
      display: inline-block;
      vertical-align: middle;
      h5{
        line-height: 20px;
        opacity: 0.9;
        font-size: 20px;
        color: #606060;
      }
      p{
        line-height: 40px;
        font-size: 16px;
        text-align: center;
        color: #9D9D9D;
      }
    }
  }
  &.plate-active{
    .left{
      background: url('../../assets/img/jihuo.png') no-repeat center center /auto;
    }
    .right{
      // color: #2DCF76
    }
  }
  &.plate-online {
    .left{
      background: url('../../assets/img/zongliang.png') no-repeat center center /auto;
    }
    .right{
      color: #2DCF76
    }
  }
  &.plate-water{
    .left{
      background: url('../../assets/img/jine.png') no-repeat center center /auto;
    }
    .right{
      // color: #2DCF76
    }
  }
  &.plate-lively{
    .left{
      background: url('../../assets/img/shebeiliang.png') no-repeat center center /auto;
    }
    .right{
      color: #2DCF76
    }
  }
  &.plate-use{
    .left{
      background: url('../../assets/img/list.png') no-repeat center center /auto;
    }
    .right{
      color: #2DCF76
    }
  }
  &.plate-shengyu{
    .left{
      background: url('../../assets/img/cishu.png') no-repeat center center /auto;
    }
    .right{
      color: #2DCF76
    }
  }

}
</style>

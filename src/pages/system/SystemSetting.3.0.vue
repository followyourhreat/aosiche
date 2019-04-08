<template>
  <div class="system-setting-outer">
    <!-- 订单审核设置 -->
    <div class="wrap">
      <h3 class="setting-title">订单审核设置</h3>
      <div class="inner-wrap">
        <div class="choice">
            <i class="circle" v-bind:class="{'circled':circleIndex==1}" @click="changeCircle(1)">
              <b></b>
            </i>
            <i style="margin-right:30px;">订单自动审核</i>
            <i class="circle" v-bind:class="{'circled':circleIndex==2}" @click="changeCircle(2)">
              <b></b>
            </i>
            <i>订单人工审核</i>
        </div>
        <h4>设置工作时间</h4>
        <div class="set-time">
          <i class="set-time-title">工作日：</i>
          <i class="set-time-w">
            <el-time-picker
                is-range
                v-model="value4"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围">
              </el-time-picker>
          </i>
          <i class="set-time-title">周末：</i>
          <i class="set-time-w">
            <el-time-picker
                is-range
                v-model="value5"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围">
              </el-time-picker>
          </i>
        </div>
      </div>
    </div>
    
    <!-- LOGO管理 -->
    <div class="wrap logo-manage">
      <h3 class="setting-title">LOGO管理</h3>
      <div class="inner-wrap logo-manage-wrap">
        <div class="img-show">
          <img src="../../statics/img/icon_active.png" alt="">
        </div>
        <div class="up-load-btn">
          <button class="dt-btn">上传图片</button>
          <p>建议尺寸为115*115（仅支持GIF/JPG/PNG/JPEG）</p>
        </div>
      </div>
    </div>


    <!-- 首页内容展示 -->
    <div class="wrap home-show-check">
      <h3 class="setting-title">首页内容展示</h3>
      <div class="inner-wrap">
        <el-checkbox-group 
          v-model="checkedCities">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
        <button class="dt-btn" @click="checkActive">确 定</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data: () => ({
    circleIndex: 1,
    value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
    value5: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
    cities: ['上海', '北京', '广州', '深圳'],
    checkedCities: ['上海', '北京'],
    workTime: ['', ''],
    weekTime: ['', '']
  }),
  methods: {
    changeCircle(index) {
      this.circleIndex = index
    },
    checkActive() {
      console.log(this.checkedCities);
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../scss/mixin.scss';
.system-setting-outer {
  .wrap {
    min-height: 190px;
    @include shadow;
    margin: 14px 0 40px 0;
    background: #FFF;
    h3{
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #dcdfe6;
      padding: 0 30px;
      font-size: 16px;
    }
    .inner-wrap{
      padding: 30px 30px;
      h4 {
        font-size: 16px;
        margin: 26px 0 18px 0;
        color: #7E7E7E;
      }
    }
    .logo-manage-wrap{
        height: 190px;
        .img-show{
          width: 130px;
          height: 100%;
          float: left;
          img{
            width: 100%;
            height: 100%;
            background: #FBFCFF;
            border: 1px solid #E0E0E0;
            border-radius: 2px;
          }
          margin-right: 30px;
        }
        .up-load-btn{
          width: 400px;
          height: 100%;
          float: left;
          .dt-btn{
            margin: 35px 0 10px 0
          }
          p{
              font-size: 12px;
              color: #485B6D;
          }
        }
    }
    
  }
  .home-show-check{
    .dt-btn{
      margin-top: 20px;
    }
  }
  .set-time {
    height: 40px;
    line-height: 40px;
    i {
      display: inline-block;
      vertical-align: top
    }
    .set-time-w {
      width: 350px;
      height: 100%;
      margin-right: 20px;
      .el-date-editor .el-range-separator{
        min-width: 30px;
      }
    }
  }

  .choice {
    height: 26px;
    line-height: 26px;
    i {
      display: inline-block;
      margin-right: 6px;
    }
    .circle {
      display: inline-block;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      vertical-align: text-bottom;
      border: 1px solid #B2B2B2;
      padding: 3px;
      b {
        display: inline-block;
        width: 100%;
        height: 100%;
        vertical-align: top;
        border-radius: 50%;
        transition: all 0.5s ease;
      }
      &.circled {
        border-color: #49AFF5;
        b {
          background-color: #49AFF5;
        }
      }
    }
  }
}
</style>


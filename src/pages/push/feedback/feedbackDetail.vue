<template>
  <div class="feedback-deal-outer">
    <div class="dt-search-top">
      <div class="dt-search-cell">
        <button type="button" class="dt-btn-cancel" @click="detailBack">返回</button>
      </div>
    </div>
    <div class="deal-con">
      <div class="deal-same">
        <div class="deal-same-l">
          <p>
            <i>反馈时间：</i>
            <b>2017-08-01 16:48</b>
            <i>处理状态：</i>
            <b>正在处理</b>
          </p>
          <p>
            <i>反馈类型：</i>
            <b>设备故障</b>
            <i>客户地址：</i>
            <b>深圳市宝安区西乡泰华梧桐岛14A </b>
          </p>
          <p>
            <i>客户姓名：</i>
            <b>莫迪</b>
            <i>联系电话：</i>
            <b>13838389438</b>
          </p>
        </div>
        <div class="deal-same-r">

        </div>
      </div>
      <div class="deal-same">
        <div class="deal-same-l">
          <p>
            <i>标 题：</i>
            <b>净水器设备故障</b>
          </p>
          <p>
            <i>内 容：</i>
            <b>净水器设备出现故障，故障表现为出水现故障，故障表现为出水现故障，故障表现为出水现故障，故障表现为出水现故障，故障表现为出水现故障，故障表现为出水有噪音，机器抖动，请尽快安排工作人员上门减产，排除故障，恢复用户使用。 另外，饮水机设备的出水口出水过小，能不能安排工作人员一道处理下，出水口过小导致接水会花费过多时间，影响使 用体验。
            </b>
          </p>
        </div>
        <div class="deal-same-r">
          54545
        </div>
      </div>
      <div class="deal-same1">
        <div class="deal-same1-l">
          <i>处</i>
          <i>理</i>
          <i>记</i>
          <i>录</i>
        </div>
        <ul class="deal-same1-r">
          <li>
            <i>净水器设备故障</i>
            <i>2017-08-01 16:48</i>
            <i>处理中</i>
          </li>
          <li>
            <i>净水器设备故障</i>
            <i>2017-08-01 16:48</i>
            <i>处理中</i>
          </li>
          <li>
            <i>净水器设备故障</i>
            <i>2017-08-01 16:48</i>
            <i>处理中</i>
          </li>
          <li>
            <i>净水器设备故障</i>
            <i>2017-08-01 16:48</i>
            <i>处理中</i>
          </li>
          <li>
            <i>净水器设备故障</i>
            <i>2017-08-01 16:48</i>
            <i>处理中</i>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    detailBack() {
      this.$router.push({ name: 'pushFeedback' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../scss/mixin.scss';
.deal-con {
  height: 740px;
  overflow-y: auto;
  padding: 3px;
}

.deal-same,
.deal-same1 {
  height: 200px;
  padding: 10px 0;
  @include shadow;
  margin-bottom: 30px;
  display: flex;
}

.deal-same-l {
  width: 84%;
  float: left;
  p {
    line-height: 20px;
    padding-left: 40px;
    margin: 30px 0;
    display: flex;
    i {
      color: #7E7E7E; // display: inline-block;
      &:nth-of-type(1) {
        width: 80px;
      }
      &:nth-of-type(2) {
        width: 80px;
      }
    }
    b {
      color: #404040; // display: inline-block;
      &:nth-of-type(1) {
        width: 80px;
        flex: 2
      }
      &:nth-of-type(2) {
        // width: 200px;
        flex: 3
      }
    }
  }
}

.deal-same-r {
  float: left;
  width: 16%;
  max-width: 300px;
  background: red
}

.deal-same1 {
  position: relative;
}

.deal-same1-l {
  position: absolute;
  top: 0;
  left: 0;
  padding: 60px 0;
  height: 100%;
  width: 60px;
  background: rgba(69, 93, 102, 0.04);
  border-right: 1px solid #E5E5E5;
  i {
    display: block;
    color: #7E7E7E;
    text-align: center;
    line-height: 20px;
  }
}

.deal-same1-r {
  width: 100%;
  height: 100%;
  padding: 30px 30px 30px 120px;
  overflow-y: auto;
  li {
    line-height: 20px;
    margin-bottom: 20px;
    display: flex;
    i {
      &:nth-of-type(1) {
        flex: 2;
        color: #404040;
      }
      &:nth-of-type(2) {
        width: 160px;
        color: #404040;
      }
      &:nth-of-type(3) {
        flex: 1;
        color: #49AFF5;
      }
    }
  }
}
</style>

<template>
  <div class="device-summary-outer">
    <div class="static">
      <top cl = 'active' name="激活设备总量" :num='deviceOverview.active_total'></top>
      <top cl = 'online' name="设备总量" :num='deviceOverview.online_total'></top>
      <top cl = 'water' name="总金额" :num='deviceOverview.water_total'></top>
      <top cl = 'lively' name="总购买次数" :num='deviceOverview.lively_total'></top>
      <top cl = 'use' name="已使用次数" :num='deviceOverview.lively_total'></top>
      <top cl = 'shengyu' name="剩余次数" :num='deviceOverview.lively_total'></top>
    </div>
    <div class="chart-wrap">
      <chart-line title='激活总量统计曲线' container ='summary-container1' @dateChange='deviceActiveChange' popName = '激活数' lineColor = '#008000' popUnit = '台' :chartData = 'activeChartData' class="line-same line-left"></chart-line>
      <chart-line title='总充值金额统计曲线' container ='summary-container2' @dateChange='waterTotalChange' popName = '总充值金额' lineColor = '#0086b3' popUnit = '元' :chartData = 'waterChartData'  class="line-same line-right"></chart-line>
    </div>
    <div class="chart-wrap">
      <chart-line title='在线总量统计曲线' container ='summary-container3' @dateChange='onlineDeviceChange' popName = '设备已使用次数' lineColor = '#CDE74B' popUnit = '次' :chartData = 'onlineChartData'  class="line-same line-left"></chart-line>
      <chart-line title='活跃设备量统计曲线' container ='summary-container4' @dateChange='livelyDeviceChange' popName = '设备剩余使用次数' lineColor = '#2BCF78' popUnit = '次' :chartData = 'livelyChartData'  class="line-same line-right"></chart-line>
    </div>
    <div class="chart-wrap">
      <chart-line title=' 设备已使用次数' container ='summary-container3' @dateChange='onlineDeviceChange' popName = '在线总量' lineColor = '#E65545' popUnit = '台' :chartData = 'onlineChartData'  class="line-same line-left"></chart-line>
      <chart-line title=' 设备剩余使用次数' container ='summary-container4' @dateChange='livelyDeviceChange' popName = '活跃设备量' lineColor = '#795da3' popUnit = '台' :chartData = 'livelyChartData'  class="line-same line-right"></chart-line>
    </div>

  </div>
</template>

<script>
import top from "./summary-top";
import ChartLine from './chart-line';
export default {
  data: () => ({
    deviceOverview: {
      active_total: '0',
      lively_total: '0',
      online_total: '0',
      water_total: '0'
    },
    activeChartData: { xAxis: [], data: [] },
    onlineChartData: { xAxis: [], data: [] },
    waterChartData: { xAxis: [], data: [] },
    livelyChartData: { xAxis: [], data: [] }
  }),
  mounted () {
    // 头部四个概览
    // this.getDeviceOverview();
    // this.getDeviceActiveData(1);
    // this.getWaterTotalData(1);
    // this.getOnlineTotalData(1);
    // this.getLivelyDeviceData(1);
  },
  methods: {
    deviceActiveChange(val) {
      this.getDeviceActiveData(val);
    },
    waterTotalChange(val) {
      this.getWaterTotalData(val);
    },
    onlineDeviceChange(val) {
      this.getOnlineTotalData(val);
    },
    livelyDeviceChange(val) {
      this.getLivelyDeviceData(val);
    },
    // 组件内的工具函数
    getDeviceOverview() {
      this.$http.DeviceOverview(msg => {
        let _data = msg.data;
        this.deviceOverview = Object.assign(this.deviceOverview, _data);
      })
    },
    getDeviceActiveData(type) { // 获取激活总量统计曲线  type:// 1日 2月 3周
      this.$http.DeviceActiveGraph(type, msg => {
        let _data = msg.data,
          _dealData = this.dealData(_data, type);
        // 解决不能更新的问题
        this.activeChartData = Object.assign({}, this.activeChartData, {'data': _dealData.yAxis, 'xAxis': _dealData.xAxis})
      })
    },
    getWaterTotalData(type) { // 总进水量统计曲线
      this.$http.DeviceWaterGraph(type, msg => {
        let _data = msg.data,
          _dealData = this.dealData(_data, type);
        // 解决不能更新的问题
        this.waterChartData = Object.assign({}, this.waterChartData, {'data': _dealData.yAxis, 'xAxis': _dealData.xAxis})
      })
    },
    getOnlineTotalData(type) { // 在线总量统计曲线
      this.$http.DeviceOnlineGraph(type, msg => {
        let _data = msg.data,
          _dealData = this.dealData(_data, type);
        // 解决不能更新的问题
        this.onlineChartData = Object.assign({}, this.onlineChartData, {'data': _dealData.yAxis, 'xAxis': _dealData.xAxis})
      })
    },
    getLivelyDeviceData(type) { // 活跃设备量统计曲线
      this.$http.DeviceLivelyGraph(type, msg => {
        let _data = msg.data,
          _dealData = this.dealData(_data, type);
        // 解决不能更新的问题(传入的是对象)
        this.livelyChartData = Object.assign({}, this.livelyChartData, {'data': _dealData.yAxis, 'xAxis': _dealData.xAxis})
      })
    },
    // 组件内的工具函数
    dealData(list, type) {
      let _data = list, _type = Number(type), _xAxis = [], _yAxis = [];
      _data.forEach(val => {
        if (_type === 1) {
          _xAxis.push(this.$projectUtils.ChartDateChange(val.date));
          _yAxis.push(Number(val.num));
        } else if (_type === 2) {
          _xAxis.push(this.$projectUtils.ChartDateChange(val.mon_date, '/') + ' ~ ' + this.$projectUtils.ChartDateChange(val.sun_date, '/'));
          _yAxis.push(Number(val.num));
        } else if (_type === 3) {
          _xAxis.push(this.$projectUtils.ChartMonthChange(val.month));
          _yAxis.push(Number(val.num));
        }
      });
      return { 'xAxis': _xAxis, 'yAxis': _yAxis }
      // {
      //   xAxis: [1, 2, 3, 45],
      //   data: [15, 56, 17, 18]
      // };
    }
  },
  components: { top, ChartLine }
};
</script>
<style lang="scss">
@import "../../scss/constant.style.scss";
.device-summary-outer {
  // height: 100%;
  // overflow-y: auto;
  .static {
    height: 100px;
    display: flex;
    justify-content: space-between;
  }
  .chart-wrap {
    height: auto;
    margin-top: 30px;
    margin-bottom: 20px;
    overflow: hidden;
    .line-same{
      width: 49%;
      height: 360px;
    }
    .line-left{
      float: left;
    }
    .line-right{
      float: right;
    }
  }
}
</style>


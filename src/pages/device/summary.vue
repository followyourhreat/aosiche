<template>
  <div class="device-summary-outer">
    <div class="static" v-for="(item,index) in  listIndex" :key="index">
      <top cl = 'active' name="激活设备总量" :num=' item.activate'></top>
      <top cl = 'online' name="设备总量" :num='item.device_sum'></top>
      <top cl = 'water' name="总金额" :num='item.money'></top>
      <top cl = 'lively' name="总购买次数" :num='item.buy'></top>
      <top cl = 'use' name="已使用次数" :num='item.used'></top>
      <top cl = 'shengyu' name="剩余次数" :num='item.surplus'></top>
    </div>
    <div class="chart-wrap">
      <chart-line title='激活总量统计曲线' container ='summary-container1' :year="yeara" :month="month" @yearleft="yearleft"  @yearright="yearRight" @dataChange='deviceActiveChange' popName = '激活数' lineColor = '#008000' popUnit = '台' :chartData = 'activeChartData' class="line-same line-left"></chart-line>
      <chart-line title='总金额统计曲线' container ='summary-container2'  :year="yearb" :month="month" @yearleft="yearwaterleft"  @yearright="yearwaterRight"  @dataChange='waterTotalChange' popName = '总充值金额' lineColor = '#0086b3' popUnit = '元' :chartData = 'waterChartData'  class="line-same line-right"></chart-line>
    </div>
    <div class="chart-wrap">
      <chart-line title='设备总量统计曲线' container ='summary-container3' :year="yearc" :month="month" @yearleft="yearonlineleft"  @yearright="yearonlineRight" @dataChange='allDeviceChange' popName = '设备总量' lineColor = '#CDE74B' popUnit = '台' :chartData = 'onlineChartData'  class="line-same line-left"></chart-line>
      <chart-line title='总购买次数' container ='summary-container4':year="yeard" :month="month" @yearleft="yearbuyleft"  @yearright="yearbuyRight"@dataChange='allBuyChange' popName = '总买次数' lineColor = '#2BCF78' popUnit = '次' :chartData = 'livelyChartData'  class="line-same line-right"></chart-line>
    </div>
    <div class="chart-wrap">
      <chart-line title=' 设备已使用次数' container ='summary-container5' :year="yeare" :month="month" @yearleft="yearusedleft"  @yearright="yearusedRight" @dataChange='usedDeviceChange' popName = '设备已使用次数' lineColor = '#E65545' popUnit = '次' :chartData = 'usedChartData'  class="line-same line-left"></chart-line>
      <chart-line title=' 设备剩余使用次数' container ='summary-container6' :year="yearf" :month="month" @yearleft="yearsurplusleft"  @yearright="yearsurplusRight" @dataChange='surplusDeviceChange' popName = '设备剩余使用次数' lineColor = '#795da3' popUnit = '次' :chartData = 'surplusChartData'  class="line-same line-right"></chart-line>
    </div>

  </div>
</template>

<script>
import top from "./summary-top";
import ChartLine from './chart-line';
export default {
  data: () => ({
    indexParams:{
      uid:localStorage.getItem('aoid')
    },
    listIndex:[],

    activeChartData: { xAxis: [], data: [] },
    onlineChartData: { xAxis: [], data: [] },
    waterChartData: { xAxis: [], data: [] },
    livelyChartData: { xAxis: [], data: [] },
    usedChartData: {xAxis: [], data: []},
    surplusChartData: {xAxis: [], data: []},
    yeara:2019,
    yearb:2019,
    yearc:2019,
    yeard:2019,
    yeare:2019,
    yearf:2019,
    month:'',
    stateA:'',
    stateB:"",
    stateC:"",
    stateD:"",
    stateE:"",
    stateF:"",
  }),
  mounted () {
    this.getIndexInfo({uid:this.indexParams.uid});
    // 头部四个概览
    // this.getDeviceOverview();
    // this.getDeviceActiveData(1);
    // this.getWaterTotalData(1);
    // this.getOnlineTotalData(1);
    // this.getLivelyDeviceData(1);


//    this.getIndexInfo()
    this.getlistone(1);
    this.getlistzero(1);
    this.getlistthree(1);
    this.getlistfour(1);
    this.getlistfive(1);
    this.getlistsix(1)
  },
  methods: {
    //第一个
    yearleft(val){
      this.activeChartData.data=[];
      this.activeChartData.xAxis=[];
      this.yeara=val--;
      this.yeara--;
      console.log(this.stateA);
      if(this.stateA){
        this.getlistone(this.stateA)
      }else{
        this.getlistone(1)
      }
    },
    yearRight(val){
      this.activeChartData.data=[];
      this.activeChartData.xAxis=[];
      this.yeara= val--;
      this.yeara++;
      if(this.stateA){
        this.getlistone(this.stateA)
      }else{
        this.getlistone(1)
      }
    },
    //第二个
    yearwaterleft(val){
      this.waterChartData.data=[];
      this.waterChartData.xAxis=[];
      this.yearb=val;
      this.yearb--;
      if(this.stateB){
        this.getlistzero(this.stateB)
      }else{
        this.getlistzero(1)
      }

    },
    yearwaterRight(val){
      this.waterChartData.data=[];
      this.waterChartData.xAxis=[];
      this.yearb=val;
      this.yearb++;
      if(this.stateB){
        this.getlistzero(this.stateB)
      }else{
        this.getlistzero(1)
      }

    },
    //第三个
    yearonlineleft(val){
      this.onlineChartData.data=[]
      this.onlineChartData.xAxis=[];
      this.yearc=val;
      this.yearc--;
      if(this.stateC){
        this.getlistthree(this.stateC)
      }else{
        this.getlistthree(1)
      }
    },
    yearonlineRight(val){
      this.onlineChartData.data=[]
      this.onlineChartData.xAxis=[];
      this.yearc=val;
      this.yearc++;
      if(this.stateC){
        this.getlistthree(this.stateC)
      }else{
        this.getlistthree(1)
      }
    },
    //第四个
    yearbuyleft(val){
      this.livelyChartData.data=[]
      this.livelyChartData.xAxis=[];
      this.yeard=val;
      this.yeard--;
      if(this.stateD){
        this.getlistfour(this.stateD)
      }else{
        this.getlistfour(1)
      }
    },
    yearbuyRight(val){
      this.livelyChartData.data=[]
      this.livelyChartData.xAxis=[];
      this.yeard=val;
      this.yeard++;
      if(this.stateD){
        this.getlistfour(this.stateD)
      }else{
        this.getlistfour(1)
      }
    },
    //第5个
    yearusedleft(val){
      this.usedChartData.data=[]
      this.usedChartData.xAxis=[];
      this.yeare=val;
      this.yeare--;
      if(this.stateE){
        this.getlistfive(this.stateE)
      }else{
        this.getlistfive(1)
      }
    },
    yearusedRight(val){
      this.usedChartData.data=[]
      this.usedChartData.xAxis=[];
      this.yeare=val;
      this.yeare++;
      if(this.stateE){
        this.getlistthree(this.stateE)
      }else{
        this.getlistthree(1)
      }
    },
    //第6个
    yearsurplusleft(val){
      this.surplusChartData.data=[]
      this.surplusChartData.xAxis=[];
      this.yearf=val;
      this.yearf--;
      if(this.stateF){
        this.getlistsix(this.stateF)
      }else{
        this.getlistsix(1)
      }
    },
    yearsurplusRight(val){
      this.surplusChartData.data=[]
      this.surplusChartData.xAxis=[];
      this.yearf=val;
      this.yearf++;
      if(this.stateF){
        this.getlistsix(this.stateF)
      }else{
        this.getlistsix(1)
      }
    },
    //获取首页次数等数据
    getIndexInfo(params){
      const that =this
      this.$http.indexInfo(params, msg =>{
        this.listIndex = msg.data
      })
    },
//第一个
    deviceActiveChange(val){
      this.activeChartData.data=[]
      this.activeChartData.xAxis=[]
      this.stateA=val;
      this.getlistone(val)
      // this.vala=val
    },
    getlistone(val){
        const  params={
            uid:localStorage.getItem('aoid'),
              accessToType:4,
              type:val,
              year:this.yeara
          }

        this.$http.activegraph(params, msg =>{
          this.yeara=Number(msg.year.replace(/\年/g,""));
          this.month=msg.month;
        for(var i=0;i < msg.data.length;i++){

          this.activeChartData.data.push(msg.data[i].activate)
          this.activeChartData.xAxis.push(msg.data[i].ctime)
        }
        // console.log(this.activeChartData)
        this.activeChartData = Object.assign({}, this.activeChartData, {'data': this.activeChartData.data, 'xAxis': this.activeChartData.xAxis})
      })
    },
//第二个
    waterTotalChange(val){
      this.waterChartData.data=[]
      this.waterChartData.xAxis=[];
      this.stateB=val;
      this.getlistzero(val)
    },
    getlistzero(val){
      const  params={
        uid:localStorage.getItem('aoid'),
        accessToType:0,
        type:val,
        year:this.yearb
      }
      this.$http.activegraph(params, msg =>{
        this.yearb=Number(msg.year.replace(/\年/g,""));
        // this.month=Number(msg.month.replace(/\月/g,""));
        this.month=msg.month;
        for(var i=0;i < msg.data.length;i++){

          this.waterChartData.data.push(msg.data[i].money)
          this.waterChartData.xAxis.push(msg.data[i].ctime)
        }
        console.log(this.activeChartData)
        this.waterChartData = Object.assign({}, this.waterChartData, {'data': this.waterChartData.data, 'xAxis': this.waterChartData.xAxis})
      })
    },
    //第三个
    allDeviceChange(val){
      this.onlineChartData.data=[]
      this.onlineChartData.xAxis=[];
      this.stateC=val;
      this.getlistthree(val)
    },
    getlistthree(val){
      const  params={
        uid:localStorage.getItem('aoid'),
        accessToType:5,
        type:val,
        year:this.yearc
      }


      this.$http.activegraph(params, msg =>{
        this.yearc=Number(msg.year.replace(/\年/g,""));
        // this.month=Number(msg.month.replace(/\月/g,""));
        this.month=msg.month;
        for(var i=0;i < msg.data.length;i++){

          this.onlineChartData.data.push(msg.data[i].device_sum)
          this.onlineChartData.xAxis.push(msg.data[i].ctime)
        }
        this.onlineChartData = Object.assign({}, this.onlineChartData, {'data': this.onlineChartData.data, 'xAxis': this.onlineChartData.xAxis})
      })
    },
    //第四个

    allBuyChange(val){
      this.livelyChartData.data=[]
      this.livelyChartData.xAxis=[];
      this.stateD=val;
      this.getlistfour(val)
    },
    getlistfour(val){
      const  params={
        uid:localStorage.getItem('aoid'),
        accessToType:3,
        type:val,
        year:this.yeard
      }


      this.$http.activegraph(params, msg =>{
        this.yeard=Number(msg.year.replace(/\年/g,""));
        // this.month=Number(msg.month.replace(/\月/g,""));
        this.month=msg.month;
        for(var i=0;i < msg.data.length;i++){

          this.livelyChartData.data.push(msg.data[i].buy)
          this.livelyChartData.xAxis.push(msg.data[i].ctime)
        }
        console.log(this.activeChartData)
        this.livelyChartData = Object.assign({}, this.livelyChartData, {'data': this.livelyChartData.data, 'xAxis': this.livelyChartData.xAxis})
      })
    },
    //第五个
    usedDeviceChange(val){
      this.usedChartData.data=[]
      this.usedChartData.xAxis=[];
      this.stateE=val;
      this.getlistfive(val)
    },
    getlistfive(val){
      const  params={
        uid:localStorage.getItem('aoid'),
        accessToType:2,
        type:val,
        year:this.yeare
      }


      this.$http.activegraph(params, msg =>{
        this.yeare=Number(msg.year.replace(/\年/g,""));
        // this.month=Number(msg.month.replace(/\月/g,""));
        this.month=msg.month;
        for(var i=0;i < msg.data.length;i++){

          this.usedChartData.data.push(msg.data[i].used)
          this.usedChartData.xAxis.push(msg.data[i].ctime)
        }
        console.log(this.activeChartData)
        this.usedChartData = Object.assign({}, this.usedChartData, {'data': this.usedChartData.data, 'xAxis': this.usedChartData.xAxis})
      })
    },



    //第六个
    surplusDeviceChange(val){
      this.surplusChartData.data=[]
      this.surplusChartData.xAxis=[];
      this.stateF=val;
      this.getlistsix(val)
    },
    getlistsix(val){
      const  params={
        uid:localStorage.getItem('aoid'),
        accessToType:1,
        type:val,
        year:this.yearf
      }


      this.$http.activegraph(params, msg =>{
        this.yearf=Number(msg.year.replace(/\年/g,""));
        // this.month=Number(msg.month.replace(/\月/g,""));
        this.month=msg.month;
        for(var i=0;i < msg.data.length;i++){

          this.surplusChartData.data.push(msg.data[i].surplus)
          this.surplusChartData.xAxis.push(msg.data[i].ctime)
        }
        console.log(this.activeChartData)
        this.surplusChartData = Object.assign({}, this.surplusChartData, {'data': this.surplusChartData.data, 'xAxis': this.surplusChartData.xAxis})
      })
    },







//    deviceActiveChange(val) {
//      this.getDeviceActiveData(val);
//    },
//    waterTotalChange(val) {
//      this.getWaterTotalData(val);
//    },
//    onlineDeviceChange(val) {
//      this.getOnlineTotalData(val);
//    },
//    livelyDeviceChange(val) {
//      this.getLivelyDeviceData(val);
//    },
//    usedDeviceChange(val){
//      this.getLivelyDeviceData(val);
//    },
//    surplusDeviceChange(val){
//      this.getLivelyDeviceData(val);
//    },
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
      console.log(11)
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


<template>
  <div class="chart_line_wrap">
    <nav class="chart_title">
      <span class="title_con">{{title}}</span>
      <!-- 统计类型: 1 日 2 周 3 月 -->
      <select v-model="select" class="select-style" @change="selectChanged(select)" >
        <option v-for="(option,index) in options" :value=option.value  >
          {{option.text}}
        </option>
      </select>
    </nav>
    <div class="chart_line_container" :id="container">
        <div class="no-data-tip">暂无数据</div>
    </div>
  </div>
</template>

<script>
import { lineChart } from '../../global/highcharts-config'
export default {
  name: 'ChartLine',
  data() {
    return {
      dateName: '1',
      select: 1,
      newSelect: 1,
      slist: '月',
      options: [
        {text: '月', value: 1},
        {text: '周', value: 2},
        {text: '日', value: 3}
      ],
      trendData: []
    }
  },
  mounted() {
    this.toMakeChartActive(this.chartData)
  },
  props: {
    chartData: {
      default() {
        return {
          color: '#E7E7E7',
          xAxis: [],
          data: [],
          name: '大哭三句话',
          unit: '个',
          rgb: '79,177,245'
        }
      },
      type: Object
    },
    container: { // 表容器
      require: true,
      type: String
    },
    lineColor: { // 线条颜色
      require: true,
      default: '#7099C1',
      type: String
    },
    popName: { // 弹框标题
      default: '',
      type: String,
      color: '#fff',
      background: '#cccccc'
    },
    title: {
      type: String,
      default: ''
    },
    popUnit: { // 单位
      default: '',
      type: String
    },
    linearGradientRGB: {
      default: '',
      type: String
    }
  },
  methods: {
    toMakeChartActive(val) {
      // {
      //   container: 'container', // 容器
      //   color: '#4BB0F5', // 线条颜色
      //   xAxis: [1, 2, 3, 45], // x data
      //   data: [15, 56, 17, 18], // y data
      //   name: '大哭三句话', // 弹框标题
      //   unit: '个', // 弹框单位
      //   rgb: '79,177,245' // 渐变颜色
      // }
      let _chartData = Object.assign({}, val);
      _chartData.container = this.container;
      _chartData.color = this.lineColor;
      _chartData.name = this.popName;
      _chartData.unit = this.popUnit;
      _chartData.rgb = this.linearGradientRGB;
      lineChart(_chartData);
    },
    choiceDateActive(val) {
      if (val === this.dateName) {
        return;
      }
      this.dateName = val;
      this.$emit('dateChange', val)
    },
    selectChanged(select) {
      if (select === this.select) {
        return;
      }
      this.select = select;
      this.$emit('dataChange', select)
    }
  },
  watch: {
    chartData(newVal, oldVal) {
      this.toMakeChartActive(newVal)
    },
    select(select) {
      this.slist = this.options[select - 1].text;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/constant.style.scss";
@import "../../scss/mixin.scss";
.chart_line_wrap{
  background: #fff;
  border: 1px solid #F1F1F1;
  .chart_title{
    height: 40px;
    display: flex;
    padding-left: 20px;
    background-color: #F6F6F6;
    .title_con{
      flex:1;
      line-height: 40px;
      color:#A9A9A9;
    }
    .select-style{
      color: #A9A9A9;
      border: 1px solid #F1F1F1;
      width: 200px;
      padding-left: 10px;
      box-shadow: 0 2px 4px 1px rgba(197, 197, 197, 0.50);
    }
  }
  .chart_line_container{
    height: 290px;
    width: 100%;
  }
}
</style>

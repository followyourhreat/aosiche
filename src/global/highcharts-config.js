// eslint-disable-next-line no-unused-vars
// {
//   container: 'container', // 容器
//   color: '#4BB0F5', // 线条颜色
//   xAxis: [1, 2, 3, 45], // x data
//   data: [15, 56, 17, 18], // y data
//   name: '大哭三句话', // 弹框标题
//   unit: '个', // 弹框单位
//   rgb: '79,177,245' //  // 渐变颜色
// }
import Highcharts from 'highcharts';
/**
 * @description highChart生成不带marker折线图
 */
export const lineChart = (param) => {
  // eslint-disable-next-line no-new
  new Highcharts.Chart(param.container, {
    chart: {
      backgroundColor: '#FFF',
      // type: 'area',
      type: 'spline',
      // defaultSeriesType: 'area',
      zoomType: 'x',
      spacingLeft: 5,
      spacingBottom: 0,
      spacingRight: 5,
      spacingTop: 20
    },
    colors: [param.color], // 折线颜色
    title: {
      text: '', // 标题有就填上，没有就不管
      align: 'left',
      style: { // title 样式
        color: '#FF00FF',
        fontWeight: 'bold'
      },
      margin: 30 // 标题和图表区之间的边距
    },
    credits: { // 去掉来源 hightChart.com
      enabled: false
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: false // 显示每条曲线每个节点的数据项的值
        },
        enableMouseTracking: true
      }
      // area: {
      //   fillColor: {
      //     linearGradient: [0, 0, 0, 250],
      //     stops: [
      //       [0, 'rgba(' + param.rgb + ',0.8)'],
      //       [1, 'rgba(' + param.rgb + ',0.2)']
      //     ]
      //   }
      // }
    },
    xAxis: {
      categories: param.xAxis,
      labels: {
        style: {
          color: '#B3B3B3;' // 坐标轴字体颜色
        }
      },
      lineColor: '#F0F0F0', // X轴颜色
      lineWidth: 1, // X轴宽度
      tickLength: 0, // X 坐标长短，为负在上面
      // tickColor:'red',
      tickmarkPlacement: 'on' // X周数据居中
    },
    yAxis: {
      title: {
        text: ''
      },
      labels: {
        style: {
          color: '#B3B3B3;' // 坐标轴字体颜色
        },
        gridLineDashStyle: 'longdash',
        gridLineWidth: 1,
        gridLineColor: "#F0F0F0"
      }
      // align: "left",
      //         x: 0,
      //         y: 0
      // min: 0,
      // startOnTick: false,

      // border: 1px solid #C4DEF5;
      // gridLineDashStyle: 'longdash',//线条样式

    },
    tooltip: {
      valueSuffix: param.unit
    },
    legend: {
      enabled: false
    },
    series: [{
      name: param.name,
      data: param.data,
      marker: {
        fillColor: '#fff',
        lineWidth: 2,
        lineColor: "#EB9054", // 颜色为空 默认圆圈是colors颜色
        enabled: false,
        // symbol: 'diamond'
      },
      lineWidth: 4 // 线条宽度
    }]
  });
};

/*
 * @description    highChart生成饼状图
 * @param {object} param 参数对象集合
 * {
 *   'container'     : {String} 存放图的容器元素 container = $('.data-table-container');
 *   'color'         : {Array} 每个类的颜色(['#A5BEFF','#3F74F9'])
 *   'ratio'         : {string} 圆环比例-扇形（ratio = 60%）
 *   'name'          : {String} 图标的标题
 *   'data'          : {Array} 数据([['男',10.0],['女',90.0]])
 * }
 * */
export const pieCircleChart = (params) => {
  // eslint-disable-next-line no-new
  new Highcharts.Chart(params.container, {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: ''
    },
    legend: {
      // enabled: false,
      symbolHeight: 10,
      symbolWidth: 10,
      symbolRadius: 0 // 设置设置表格下面的标志为正方形
    },
    colors: params.color, // 每个类的颜色
    tooltip: { // 提示框样式
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      style: { // 设置提示框的样式
        color: '#989FBD'
      },
      borderColor: 'red'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          distance: 10, // 线的距离
          enabled: true,
          format: '{point.percentage:.1f} %'
        },
        showInLegend: true
      }
    },
    credits: { // 去掉来源 hightChart.com
      enabled: false
    },
    series: [{
      innerSize: params.ratio, // 圆环
      type: 'pie',
      name: params.name,
      data: params.data
    }]
  });
}

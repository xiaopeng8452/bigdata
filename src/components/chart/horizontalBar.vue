<template>
  <div class="div-full"></div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  name: 'horizontalBar',
  props: {
    ageLists: {
      type: Array,
      default: () => []
    },
    ageData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      charts: { // 按顺序排列从大到小
        startColor: ['#01a3f8', '#f80504', '#7600e7', '#722ae5', '#c11c86'],
        endColor: ['#00ebd6', '#ff932b', '#494fe9', '#f334da', '#dfa87e'],
        lineY: [],
        lineT: []
      },
    }
  },
  watch: {
    ageData: {
      handler(newVal) {
        this.lineCreat()
        this.drawLine()
      },
      deep: true
    }
  },
  computed: {
    options() {
      return {
        title: {
          show: false
        },
        tooltip: {
          trigger: 'item',
          formatter: (p) => {
            return `${p.name}岁老人：${p.value}人`
          }
        },
        grid: {
          borderWidth: 0,
          top: '8%',
          left: '2%',
          right: '14%',
          bottom: '2%'
        },
        color: this.charts.startColor,
        yAxis: [{
          type: 'category',
          inverse: true,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false,
            inside: false
          },
          data: this.ageLists
        }, {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            inside: false,
            verticalAlign: 'bottom',
            lineHeight: '40',
            textStyle: {
              color: '#44f0e9',
              fontSize: '14',
              fontFamily: 'PingFangSC-Regular'
            },
            lineHeight: 0,
            formatter: (val, index) => {
              let totalVal = 0
              this.ageData.forEach((value, idx, arr) => {
                totalVal += value;
              });
              let actualIndex = (this.ageData.length - index) - 1
              return `${(this.ageData[actualIndex] * 100 / totalVal).toFixed(2)}%`
            }
          },
          splitArea: {
            show: false
          },
          splitLine: {
            show: false
          },
          data: this.ageData
        }],
        xAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        series: [{
          name: 'bar',
          type: 'bar',
          zlevel: 2,
          barWidth: '12px',
          data: this.charts.lineY,
          label: {
            normal: {
              color: '#44f0e9',
              show: true,
              position: [0, '-24px'],
              textStyle: {
                fontSize: 18
              },
              formatter: function (a) {
                return a.name;
              }
            }
          }
        }],
      }
    }
  },
  mounted() {
    this.lineCreat()
    this.$nextTick(() => {
      this.drawLine()
    })
  },
  methods: {
    chartResize() {
      this.myChart.resize()
    },
    // 颜色
    lineCreat() {
      this.charts.lineY = []
      this.charts.lineT = []
      for (var i = 0; i < this.ageLists.length; i++) {
        let startData = {
          name: this.ageLists[i],
          color: this.charts.startColor[i],
          value: this.ageData[i],
          barGap: '-100%',
          itemStyle: {
            normal: {
              show: true,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: this.charts.startColor[i]
              }, {
                offset: 1,
                color: this.charts.endColor[i]
              }], false),
              barBorderRadius: 10
            },
            emphasis: {
              shadowBlur: 15,
              shadowColor: 'rgba(255, 255, 255, 0.1)'
            }
          }
        }
        let endData = {
          value: this.ageData[0],
          itemStyle: {
            color: 'rgba(29,252,244,.4)',
            barBorderRadius: 10
          }
        }
        this.charts.lineY.push(startData)
        this.charts.lineT.push(endData)
      }
    },
    drawLine() {
      this.options.yAxis[0].data = this.ageLists;
      this.options.yAxis[1].data = this.ageData;
      this.options.series[0].data = this.charts.lineY;
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(this.$el, 'macarons')
      // 绘制图表
      this.myChart.setOption(this.options);
    }
  }
}
</script>

<style>
</style>
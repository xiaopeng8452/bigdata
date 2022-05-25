<template>
  <div class="div-full"></div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  name: 'chartThree',
  props: {
    pointColor: {
      type: Array,
      default: () => []
    },
    legendList: {
      type: Array,
      default: () => []
    },
    serversData: {
      type: Array,
      default: () => []
    },
    xNameList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      areaColor: [
        ['#1facde', '#47b8e0'],
        ['#febf35', '#ffc952'],
        ['#fc5c5b', '#ff7473'],
      ]
    }
  },
  watch: {
    columnList: {
      handler(newVal) {
        this.drawLine()
      },
      deep: true
    }
  },
  computed: {
    seriesArray() {
      let resArr = []
      this.legendList.forEach((list, index) => {
        resArr.push({
          name: list,
          type: 'line',
          stack: '总量',
          label: {
            show: index == 2,
            position: 'top',
            color: '#b6b6b6'
          },
          symbol: 'circle',
          // symbolSize: 6,
          smooth: false,
          lineStyle: {
            width: 3
          },
          itemStyle: {
            normal: {
              color: this.pointColor[index],
              borderColor: '#fff'
            }
          },
          areaStyle: {
            opacity: 0.7,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: this.areaColor[index][0]
            }, {
              offset: 1,
              color: this.areaColor[index][1]
            }])
          },
          emphasis: {
            focus: 'series'
          },
          data: this.serversData[index]
        })
      })
      return resArr
    },
    options() {
      return {
        grid: {
          left: '2%',
          right: '2%',
          top: '14%',
          bottom: '5%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            label: {
              show: true,
              backgroundColor: '#fff',
              color: '#556677',
              borderColor: 'rgba(0,0,0,.7)',
              shadowColor: 'rgba(0,0,0,.7)',
              shadowOffsetY: 0
            },
            lineStyle: {
              width: 0
            }
          },
          backgroundColor: '#fff',
          textStyle: {
            color: '#5c6c7c'
          },
          padding: [10, 10],
          extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
        },
        legend: {
          show: true,
          x: 'center',
          top: '0%',
          icon: 'stack',
          itemWidth: 20,
          itemHeight: 5,
          textStyle: {
            color: '#fff'
          },
          data: this.legendList
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              color: '#fff'
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255,255,255,.1)'
              }
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            data: this.xNameList
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '金额(万元)',
            min: 0,
            nameTextStyle: {
              color: '#fff',
              padding: [0, 0, 0, 0]
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.1)',
                width: 2
              }
            }
          }
        ],
        series: this.seriesArray
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.drawLine()
    })
  },
  methods: {
    chartResize() {
      this.myChart.resize()
    },
    drawLine() {
      this.myChart = echarts.init(this.$el, 'macarons')
      this.myChart.setOption(this.options);
    }
  }
}
</script>

<style>
</style>
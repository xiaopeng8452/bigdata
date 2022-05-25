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
  name: 'chartOne',
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
      basisData: {
        area: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        legend: ['老年公寓', '禄口颐养院', '江宁滨江颐养院'],
        data: [
          [22, 33, 22, 44, 11, 22, 11, 88, 22, 33, 55, 66],
          [22, 55, 44, 11, 22, 33, 11, 88, 22, 33, 55, 66],
          [22, 55, 44, 11, 22, 33, 11, 88, 22, 33, 55, 66],
        ]
      }
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
          show: false,
          text: '各机构预收款项',
          left: 19,
          top: 15,
          textStyle: {
            color: '#fff'
          }
        },
        color: ['#F56679', '#FBD657', '#4C98FB'],
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          // padding: [5, 10],
          textStyle: {
            color: '#fff',
            padding: [3, 0, 0, 0]
          },
          data: this.basisData.legend
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
        grid: {
          left: '2%',
          right: '2%',
          bottom: '5%',
          top: '14%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#fff'
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff'
            },
            width: 5
          },
          axisTick: {
            show: false,
          },
          data: this.basisData.area
        },
        yAxis: {
          type: 'value',
          name: '金额(万元)',
          axisLabel: {
            color: '#fff',
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff'
            },
            width: 5
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,.1)',
              width: 2
            }
          }
        },
        series: []
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
      let _this = this
      for (var i = 0; i < this.basisData.legend.length; i++) {
        _this.options.series.push({
          name: _this.basisData.legend[i],
          type: 'bar',
          stack: '总量',
          barWidth: '45%',
          label: {
            show: false,
            position: 'insideRight'
          },
          data: _this.basisData.data[i]
        })
      }
    },
    drawLine() {
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
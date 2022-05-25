<template>
  <div class="div-full"></div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  name: 'circularPie',
  props: {
    colors: {
      type: Array,
      default: () => []
    },
    datas: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  watch: {
    datas: {
      handler(newVal) {
        this.drawBar()
      },
      deep: true
    }
  },
  computed: {
    options() {
      return {
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} 元"
        },
        title: {
          text: this.title,
          x: 'center',
          bottom: '5%',
          textStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#00FFFF',
          }
        },
        series: [{
          type: 'pie',
          radius: ['25', '40'],
          center: ['50%', '50%'],
          color: this.colors,
          itemStyle: {
            normal: {
              borderWidth: 5,
              borderColor: '#031845',
            }
          },
          data: this.datas,
          labelLine: {
            normal: {
              length: 10,
              length2: 10,
              lineStyle: {
                width: 1
              }
            }
          },
          label: {
            normal: {
              formatter: '{d|{d}%}\n{b|{b}}',
              rich: {
                d: {
                  fontSize: 12,
                  align: 'center',
                  padding: [0, 0, 0, 0],
                  color: '#fff'
                },
                b: {
                  fontSize: 12,
                  color: '#789dbf',
                  align: 'left',
                  padding: [30, 0, 5, 0]
                }
              }
            }
          }
        }]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.drawBar()
    })
  },
  methods: {
    chartResize() {
      this.myChart.resize()
    },
    drawBar() {
      // 基于准备好的dom，初始化echarts实例
      this.options.title.text = this.title;
      this.options.series[0].data = this.datas;
      this.myChart = echarts.init(this.$el, 'macarons')
      // 绘制图表
      this.myChart.setOption(this.options)
    }
  }
}
</script>

<style>
</style>
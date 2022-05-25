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
  name: 'verticalBar',
  props: {
    legendList: {
      type: Array,
      default: () => []
    },
    columnList: {
      type: Array,
      default: () => []
    },
    startColor: {
      type: Array,
      default: () => []
    },
    endColor: {
      type: Array,
      default: () => []
    },
    barData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  },
  watch: {
    columnList: {
      handler(newVal) {
        this.drawPie()
      },
      deep: true
    }
  },
  computed: {
    seriesArray() {
      let resArr = []
      if (this.legendList.length) {
        this.legendList.forEach((list, index) => {
          resArr.push({
            name: list,
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: [7, 7, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: this.startColor[index] || '#000'
                },
                {
                  offset: 1,
                  color: this.endColor[index] || '#000'
                }
                ]
                )
              }
            },
            data: this.barData[index]
          })
        });

      }
      return resArr
    },
    options() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: true
            }
          }
        },
        grid: {
          left: "8%",
          top: "24%",
          right: "6%",
          bottom: "10%"
        },
        legend: {
          data: this.legendList,
          top: "0%",
          icon: 'circle',
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 14,
          textStyle: {
            color(index) {
              return this.startColor[index]
            },
            fontSize: 12
          }
        },
        xAxis: {
          data: this.columnList,
          axisLine: {
            show: true, //隐藏X轴轴线
            lineStyle: {
              color: "rgba(51,181,194,.4)",
              width: 1
            }
          },
          axisTick: {
            show: false, //隐藏X轴刻度
            alignWithLabel: true
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#33b5c2", //X轴文字颜色
              fontSize: 14
            },
            interval: 0,
            rotate: 0
          }
        },
        yAxis: [{
          type: "value",
          name: "(单位：万)",
          nameTextStyle: {
            color: "#33b5c2",
            fontSize: 12,
            padding: [0, 30, 0, 0]
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: "rgba(51,181,194,.4)"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#33b5c2",
              fontSize: 14
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
      this.drawPie()
    })
  },
  methods: {
    chartResize() {
      this.myChart.resize()
    },
    drawPie() {
      this.options.xAxis.data = this.columnList;
      this.barData.forEach((item, index) => {
        this.options.series[index].data = this.barData[index];
      })
      this.myChart = echarts.init(this.$el, 'macarons')
      this.myChart.setOption(this.options);
    }
  }
}
</script>

<style>
</style>
<template>
  <div class="div-full"></div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/map')
// 引入提示框和title组件
// require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/tooltip')

export default {
  name: 'customMap',
  props: {
    // 地图区域信息
    areaData: {
      type: Array,
      default: () => []
    },
    // 地图点信息
    onePoint: {
      type: Array,
      default: () => []
    },
    twoPoint: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      allAreaData: [
        {
          name: '玄武区',
          value: 0
        }, {
          name: '秦淮区',
          value: 0
        }, {
          name: '建邺区',
          value: 0
        }, {
          name: '鼓楼区',
          value: 0
        }, {
          name: '浦口区',
          value: 0
        }, {
          name: '栖霞区',
          value: 0
        }, {
          name: '雨花台区',
          value: 0
        }, {
          name: '江宁区',
          value: 0
        }, {
          name: '六合区',
          value: 0
        }, {
          name: '溧水区',
          value: 0
        }, {
          name: '高淳区',
          value: 0
        }
      ],
      nanjingAreaPoint: {
        '建邺区': [118.682037, 32.009957],
        '栖霞区': [118.864396, 32.145355],
        '浦口区': [118.450426, 32.029276],
        '江宁区': [118.728329, 31.8439931],
        '鼓楼区': [118.736872, 32.077521],
        '秦淮区': [118.800087, 32.014405],
        '玄武区': [118.817861, 32.068687],
        '雨花台区': [118.649073, 31.941347],
        '溧水区': [118.96828, 31.581133],
        '六合区': [118.781401, 32.362247],
        '高淳区': [118.913287, 31.317738]
      }
    }
  },
  watch: {
    areaData: {
      handler(newVal) {
        this.completionAreaData()
        this.drawMap()
      },
      deep: true
    },
    onePoint: {
      handler(newVal) {
        this.completionAreaData()
        this.drawMap()
      },
      deep: true
    },
    twoPoint: {
      handler(newVal) {
        this.completionAreaData()
        this.drawMap()
      },
      deep: true
    }
  },
  computed: {
    options() {
      return {
        title: {
          text: '长者分布图例',
          left: '12%',
          bottom: 224,
          textStyle: {
            fontSize: 16,
            color: '#37cfe6'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            if (params.data.hasOwnProperty('value2')) {
              let status = params.data.value3 ? '<span style="color: #04FA4D">服务中</span>' : '<span style="color: #ff3636">待营业</span>'
              return `<div style='text-left:left;'>
                  <div>机构名称：${params.name}</div>
                  <div>机构床位数：${params.data.value2} 张</div>
                	<div>机构状态：${status}</div>
                  </div>`
            } else {
              return params.name + ' : ' + params.value + ' 人';
            }
          }
        },
        legend: {
          orient: 'vertical',
          right: '4%',
          top: '8%',
          data: ['机构养老', '社区养老'],
          itemGap: 20,
          textStyle: {
            fontSize: 16,
            color: (color) => { return color },
            shadowColor: '#f57428',
            shadowBlur: 10
          }
        },
        visualMap: {
          type: 'piecewise',
          show: true,
          borderColor: '#02f1fa',
          borderWidth: 2,
          padding: [46, 70, 18, 36],
          min: 0,
          max: 200,
          left: '8%',
          bottom: '7%',
          showLabel: true,
          seriesIndex: 3,
          calculable: true,
          inRange: {
            color: ['#062696', '#0146a9', '#1b58b7', '#4c7bcd', '#7a9cdf'] // 黑紫黑['#7a9cdf', '#4c7bcd', '#1b58b7', '#0146a9', '#062696']
          },
          itemWidth: 110,
          itemHeight: 20,
          itemGap: 14,
          pieces: [
            { gt: 200, label: '200位以上' },
            { gt: 150, lte: 200, label: '150~200位' },
            { gt: 100, lte: 150, label: '100~150位' },
            { gt: 50, lte: 100, label: '50~100位' },
            { lt: 50, label: '50位以下' }
          ],
          textStyle: {
            fontSize: 14,
            color: '#fff'
          }
        },
        geo: {
          map: "nanjing",
          show: true,
          roam: true,
          zoom: 1.23,
          center: [118.402732, 31.91445],
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false,
            }
          },
          //地图分界线颜色
          itemStyle: {
            normal: {
              borderColor: "#00eaff",
              areaColor: "rgba(6,38,150,.8)",
              borderWidth: 3,
              shadowBlur: 10,
              shadowColor: "rgba(0, 234, 255, 0.5)"
            },
            emphasis: {
              areaColor: '#012963',//悬浮区背景
            }
          }
        },
        series: [
          {
            name: '机构养老',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 1,
            symbol: 'circle',
            symbolSize: 6,
            hoverAnimation: true,
            data: this.onePoint,
            showEffectOn: 'render',
            rippleEffect: {
              period: 4,
              scale: 4,
              brushType: 'fill'
            },
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: '#fff'
                },
                padding: [0, 0, -50, 0],
                formatter: function (item) {
                  return item.name
                }
              },
              emphasis: {
                show: false,
                textStyle: {
                  show: false,
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                show: true,
                color: '#f68141',
                shadowBlur: 6,
                shadowColor: '#dbdbdb'
              }
            }
          },
          {
            name: 'light',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: 6,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 9,
                },
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                show: false,
                color: 'rgba(0,0,0,0)'
              }
            },
            data: this.convertData(this.allAreaData),
            tooltip: {
              formatter(qqq, www, eee) {
                return ''
              }
            }
          },
          {
            name: '社区养老',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            symbolSize: 6,
            data: this.twoPoint,
            hoverAnimation: true,
            rippleEffect: {
              period: 4,
              scale: 4,
              brushType: 'fill'
            },
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: '#fff'
                },
                padding: [0, 0, -50, 0],
                formatter: function (item) {
                  return item.name
                }
              },
              emphasis: {
                show: false,
                textStyle: {
                  show: false,
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                show: true,
                color: '#f83044',
                shadowBlur: 6,
                shadowColor: '#dbdbdb'
              }
            }
          },
          {
            name: "地域分布",
            type: "map",
            geoIndex: 0,
            data: this.allAreaData
          }]
      }
    }
  },
  mounted() {
    this.completionAreaData()
    this.$nextTick(() => {
      this.drawMap()
    })
  },
  methods: {
    chartResize() {
      this.myChart.resize()
    },
    // 自动补全地图数据
    completionAreaData() {
      if (this.areaData.length) {
        this.areaData.forEach(item => {
          this.allAreaData.forEach(allItem => {
            if (item.name === allItem.name) { allItem.value = item.value }
          })
        })
      }
    },
    drawMap() {
      let _this = this
      let href = (window.location.href).lastIndexOf("/")
      let ipAddress = (window.location.href).substring(0, href + 1)
      this.myChart = echarts.init(this.$el, 'macarons')
      this.$axios.get(ipAddress + '/static/nanjing.json').then(res => {
        echarts.registerMap('nanjing', res.data);
        this.options.series[0].data = this.onePoint;
        this.options.series[1].data = this.convertData(this.allAreaData);
        this.options.series[2].data = this.twoPoint;
        this.options.series[3].data = this.allAreaData;
        this.myChart.setOption(_this.options);
      }).catch(errorMsg => {
        console.log(errorMsg)
      })
    },
    convertData(data) {
      var res = [];
      let _this = this
      for (var i = 0; i < data.length; i++) {
        var geoCoord = _this.nanjingAreaPoint[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    }
  }
}
</script>

<style>
</style>
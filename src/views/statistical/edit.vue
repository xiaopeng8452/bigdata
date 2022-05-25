<template>
  <el-row class="page">
    <el-row :gutter="40" style="height: 62vh">
      <el-col :span="12" class="height-full">
        <el-row class="div-full page-left">
          <statistical-block class="height-half" title="各机构预收款项">
            <dv-loading v-if="loading">Loading...</dv-loading>
            <chart-one v-else></chart-one>
          </statistical-block>
          <statistical-block class="height-half" title="各机构实际营收">
            <dv-loading v-if="loading">Loading...</dv-loading>
            <chart-three
              ref="chart"
              v-else
              :pointColor="['#47b8e0', '#ffc952', '#ff7473']"
              :legendList="barArray('actualRevenueList', 'name')"
              :xNameList="[
                '一月',
                '二月',
                '三月',
                '四月',
                '五月',
                '六月',
                '七月',
                '八月',
                '九月',
                '十月',
                '十一月',
                '十二月',
              ]"
              :serversData="lineArray('actualRevenueList')"
            ></chart-three>
          </statistical-block>
        </el-row>
      </el-col>
      <el-col :span="12" class="height-full">
        <el-row class="div-full page-right">
          <statistical-block class="height-half" title="机构入住率">
            <dv-loading v-if="loading">Loading...</dv-loading>
            <chart-two
              v-else
              ref="occupancyLine"
              :pointColor="['#ff7473', '#ffc952', '#47b8e0']"
              :legendList="barArray('liveRateList', 'name')"
              :xNameList="[
                '一月',
                '二月',
                '三月',
                '四月',
                '五月',
                '六月',
                '七月',
                '八月',
                '九月',
                '十月',
                '十一月',
                '十二月',
              ]"
              :serversData="lineArray('liveRateList')"
            />
          </statistical-block>
          <statistical-block class="height-half" title="各机构在职员工">
            <dv-loading v-if="loading">Loading...</dv-loading>
            <el-table
              v-else
              :data="usEmployeesList"
              border
              class="rzkj-table div-full"
            >
              <el-table-column prop="name" label="机构" width="130" />
              <el-table-column prop="data1" label="医生" />
              <el-table-column prop="data2" label="护士" />
              <el-table-column prop="data3" label="护理员" />
              <el-table-column prop="data4" label="管理" />
              <el-table-column prop="data5" label="后勤" />
              <el-table-column prop="data6" label="其他" />
            </el-table>
          </statistical-block>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="page-bottom" style="height: 24vh">
      <el-row class="div-full">
        <dv-loading v-if="loading">Loading...</dv-loading>
        <el-table
          v-else
          :data="usDeatilList"
          border
          class="rzkj-table div-full"
        >
          <el-table-column prop="name" label="机构名称" width="300" />
          <el-table-column prop="data1" label="总床位" />
          <el-table-column prop="data2" label="已住" />
          <el-table-column prop="data3" label="空床" />
          <el-table-column prop="data4" label="包房" />
          <el-table-column prop="data5" label="入住率" />
          <el-table-column prop="data6" label="在住老人" />
          <el-table-column prop="data7" label="离住老人" />
          <el-table-column prop="data8" label="当月预收" />
          <el-table-column prop="data9" label="当月营业额" />
          <el-table-column prop="data10" label="在职员工" />
        </el-table>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import { getNowDate, getWeekDay } from '@/util/index.js'
import statisticalBlock from '@/components/block/statisticalBlock'
import chartOne from '@/components/chart/chartOne'
import chartTwo from '@/components/chart/chartTwo'
import chartThree from '@/components/chart/chartThree'

export default {
  name: 'statistical',
  components: {
    statisticalBlock,
    chartOne,
    chartTwo,
    chartThree,
  },
  data() {
    return {
      loading: true,
      dateTags: ['周', '月', '年'],
      startTime: getWeekDay(),
      endTime: getNowDate('date'),
      // 概况统计
      surveyCostList: [],
      // 员工统计
      staffList: [],

      // 入住率统计
      liveRateList: [
        {
          name: '老年公寓',
          data1: '92.4',
          data2: '94.8',
          data3: '96.3',
          data4: '96.0',
          data5: '96.9',
          data6: '98.4',
          data7: '100.0',
          data8: '99.5',
          data9: '94.8',
          data10: '92.7',
          data11: '96.3',
          data12: '98.0'
        },
        {
          name: '禄口颐养院',
          data1: '24.5',
          data2: '22.7',
          data3: '23.6',
          data4: '23.6',
          data5: '27.8',
          data6: '21.4',
          data7: '22.6',
          data8: '22.0',
          data9: '27.5',
          data10: '27.0',
          data11: '30.2',
          data12: '33.5'
        },
        {
          name: '江宁滨江颐养院',
          data1: '12.4',
          data2: '10.6',
          data3: '11.5',
          data4: '10.2',
          data5: '14.8',
          data6: '16.2',
          data7: '13.3',
          data8: '12.6',
          data9: '15.7',
          data10: '11.8',
          data11: '14.2',
          data12: '17.5'
        }
      ],
      // 实际营收
      actualRevenueList: [
        {
          name: '禄口颐养院',
          data1: '5.42',
          data2: '3.11',
          data3: '3.50',
          data4: '4.38',
          data5: '1.83',
          data6: '6.22',
          data7: '4.40',
          data8: '2.36',
          data9: '4.56',
          data10: '5.53',
          data11: '2.24',
          data12: '4.41'
        },
        {
          name: '江宁滨江颐养院',
          data1: '15.48',
          data2: '17.15',
          data3: '19.20',
          data4: '10.31',
          data5: '14.40',
          data6: '12.97',
          data7: '13.25',
          data8: '18.92',
          data9: '16.84',
          data10: '14.77',
          data11: '15.92',
          data12: '13.68'
        },
        {
          name: '老年公寓',
          data1: '87.15',
          data2: '73.27',
          data3: '78.62',
          data4: '97.11',
          data5: '65.27',
          data6: '77.76',
          data7: '71.22',
          data8: '81.37',
          data9: '99.14',
          data10: '86.02',
          data11: '55.75',
          data12: '63.17'
        },
      ],
      // 各机构在职人员
      usEmployeesList: [
        {
          name: '老年公寓',
          data1: '0',
          data2: '3',
          data3: '1',
          data4: '3',
          data5: '0',
          data6: '7'
        },
        {
          name: '江宁滨江颐养院',
          data1: '0',
          data2: '0',
          data3: '0',
          data4: '1',
          data5: '1',
          data6: '2'
        },
        {
          name: '禄口颐养院',
          data1: '1',
          data2: '1',
          data3: '2',
          data4: '1',
          data5: '2',
          data6: '7'
        },
        {
          name: '合计',
          data1: '1',
          data2: '4',
          data3: '3',
          data4: '5',
          data5: '3',
          data6: '16'
        },
      ],
      // 底部机构详细总览
      usDeatilList: [
        {
          name: '南京瑞芝康健老年公寓',
          data1: '133',
          data2: '133',
          data3: '4',
          data4: '0',
          data5: '100',
          data6: '133',
          data7: '0',
          data8: '349322.22',
          data9: '865069',
          data10: '87',
        },
        {
          name: '南京瑞芝康健滨江颐养院',
          data1: '450',
          data2: '195',
          data3: '6',
          data4: '255',
          data5: '43.3',
          data6: '195',
          data7: '0',
          data8: '161444.17',
          data9: '1021020',
          data10: '73',
        },
        {
          name: '南京瑞芝康健禄口颐养院',
          data1: '372',
          data2: '233',
          data3: '9',
          data4: '139',
          data5: '62.6',
          data6: '233',
          data7: '0',
          data8: '165006.9',
          data9: '1227211',
          data10: '227',
        },
        {
          name: '合计',
          data1: '955',
          data2: '561',
          data3: '19',
          data4: '394',
          data5: '68.63',
          data6: '561',
          data7: '0',
          data8: '675773.29',
          data9: '3113300',
          data10: '227',
        },
      ],
    }
  },
  async mounted() {
    let _this = this
    window.onresize = () => {
      // _this.$refs.costAccounted0[0].chartResize()
      // _this.$refs.costAccounted1[0].chartResize()
      // _this.$refs.costAccounted2[0].chartResize()
      _this.$refs.costBar.chartResize()
      _this.$refs.occupancyLine.chartResize()
      _this.$refs.advancePayment.chartResize()
    }
    // await this.getData()
    setTimeout(() => {
      this.loading = false
    }, 1000)

  },
  methods: {
    getData() {
      getStatisticsNum({}).then(res => {
        console.log(res)
        this.surveyCostList = res.data.surveyCostList
        this.staffList = res.data.staffList
        this.livehandleList = res.data.livehandleList
        // 入住率
        this.liveRateList = res.data.liveRateList
        this.monthCostList = res.data.monthCostList
        this.collectionCostList = res.data.collectionCostList
      }).catch(errorMsg => {
        console.log(errorMsg)
      })
    },
    changeTimeSerch(e) {
      switch (e) {
        case 1:
          this.startTime = getNowDate('monthFirst')
          break;
        case 2:
          this.startTime = getNowDate('yearFirst')
          break;
        default:
          this.startTime = getWeekDay()
          break;
      }
      this.getRightData()
      this.$refs.advancePayment.chartResize()
    },
    // 计算费用占比饼图数据
    costPieData(index) {
      if (this.monthCostList.length) {
        let resArr = [
          { name: '床位费', value: this.monthCostList[index].bedCost },
          { name: '护理费', value: this.monthCostList[index].nursingCost },
          { name: '增值服务费', value: this.monthCostList[index].incrementCost }
        ]
        return resArr
      }
    },
    // 计算柱图单项数组
    barArray(array, name) {
      if (this[array].length) {
        let resArr = []
        this[array].forEach(list => {
          resArr.push(list[name])
        })
        return resArr
      }
    },
    // 计算线图单项数组
    lineArray(name) {
      if (this[name].length) {
        let resArr = []
        if (name === 'monthCostList') {
          this[name].forEach((list, index) => {
            resArr.push([this[name][index].sixTotalCost, this[name][index].fiveTotalCost, this[name][index].fourTotalCost, this[name][index].threeTotalCost, this[name][index].twoTotalCost, this[name][index].oneTotalCost])
          })
        } else {
          this[name].forEach((list, index) => {
            resArr.push([this[name][index].data1, this[name][index].data2, this[name][index].data3, this[name][index].data4, this[name][index].data5, this[name][index].data6, this[name][index].data7, this[name][index].data8, this[name][index].data9, this[name][index].data10, this[name][index].data11, this[name][index].data12])
          })
        }
        return resArr
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding-top: 0.5vh;
  .page-bottom {
    .rzkj-table {
      width: calc(100% - 40px);
      margin: 0 auto;
      .el-table td,
      .el-table th {
        padding: 8px 0 !important;
      }
    }
  }
}
</style>
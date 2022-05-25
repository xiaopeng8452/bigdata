<template>
  <el-row class="page" :gutter="40">
    <el-col :span="9" style="height: 86vh">
      <el-row class="div-full page-left">
        <statistical-block class="height-third" title="概况统计">
          <dv-loading v-if="loading">Loading...</dv-loading>
          <el-table
            v-else
            :data="surveyCostList"
            border
            class="rzkj-table div-full"
            height="100%"
          >
            <el-table-column prop="deptName" label="机构" width="130" />
            <el-table-column prop="bedNum" label="总床位" />
            <el-table-column prop="liveInBedNum" label="已住" />
            <el-table-column prop="stayBackBedNum" label="空床" />
            <el-table-column label="入住率">
              <template slot-scope="scope">
                <span>{{ scope.row.occupancyRate }}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="sysUserNum" label="员工" />
            <el-table-column prop="totalCost" label="上月营业额" width="100" />
          </el-table>
        </statistical-block>
        <statistical-block class="height-third" title="员工统计">
          <dv-loading v-if="loading">Loading...</dv-loading>
          <el-table
            v-else
            :data="staffList"
            border
            class="rzkj-table div-full"
            height="100%"
          >
            <el-table-column prop="deptName" label="机构" width="130" />
            <el-table-column prop="doctorNum" label="医生" />
            <el-table-column prop="nurseNum" label="护士" />
            <el-table-column prop="attendantNum" label="护理员" />
            <el-table-column prop="adminNum" label="管理" />
            <el-table-column prop="logisticsNum" label="后勤" />
            <el-table-column prop="otherNum" label="其他" />
          </el-table>
        </statistical-block>
        <statistical-block class="height-third" title="居住情况统计">
          <dv-loading v-if="loading">Loading...</dv-loading>
          <el-table
            v-else
            :data="livehandleList"
            border
            class="rzkj-table div-full"
            height="100%"
          >
            <el-table-column prop="deptName" label="机构" width="230" />
            <el-table-column prop="liveInNum" label="在住" />
            <el-table-column prop="stayBackNum" label="退住" />
            <!-- <el-table-column prop="askLevelNum" label="请假" /> -->
          </el-table>
        </statistical-block>
      </el-row>
    </el-col>
    <el-col :span="15" style="height: 86vh">
      <el-row class="div-full page-right">
        <statistical-block class="height-third" title="入住率统计">
          <el-row class="div-full">
            <dv-loading v-if="loading">Loading...</dv-loading>
            <el-row v-else class="height-hundred">
              <el-col :span="12" class="height-hundred">
                <occupancy-line
                  ref="occupancyLine"
                  :pointColor="[
                    '#ff7473',
                    '#ffc952',
                    '#47b8e0',
                    '#f40ed6',
                    '#67d5b5',
                    '#6a60a9',
                  ]"
                  :legendList="barArray('liveRateList', 'deptName')"
                  :xNameList="[
                    liveRateList.length ? liveRateList[0].sixrq : '',
                    liveRateList.length ? liveRateList[0].fiverq : '',
                    liveRateList.length ? liveRateList[0].fourrq : '',
                    liveRateList.length ? liveRateList[0].threerq : '',
                    liveRateList.length ? liveRateList[0].tworq : '',
                    liveRateList.length ? liveRateList[0].onerq : '',
                  ]"
                  :serversData="lineArray('liveRateList')"
                />
              </el-col>
              <el-col :span="12" class="height-hundred">
                <el-table
                  :data="liveRateList"
                  class="rzkj-table"
                  height="100%"
                  border
                >
                  <el-table-column prop="deptName" label="机构" width="106" />
                  <el-table-column
                    width="73"
                    prop="sixrate"
                    :label="
                      monthCostList.length ? monthCostList[0].sixtime : ''
                    "
                  />
                  <el-table-column
                    width="73"
                    prop="fiverate"
                    :label="
                      monthCostList.length ? monthCostList[0].fivetime : ''
                    "
                  />
                  <el-table-column
                    width="73"
                    prop="fourrate"
                    :label="
                      monthCostList.length ? monthCostList[0].fourtime : ''
                    "
                  />
                  <el-table-column
                    width="73"
                    prop="threerate"
                    :label="
                      monthCostList.length ? monthCostList[0].threetime : ''
                    "
                  />
                  <el-table-column
                    width="73"
                    prop="tworate"
                    :label="
                      monthCostList.length ? monthCostList[0].twotime : ''
                    "
                  />
                  <el-table-column
                    width="73"
                    prop="onerate"
                    :label="
                      monthCostList.length ? monthCostList[0].onetime : ''
                    "
                  />
                </el-table>
              </el-col>
            </el-row>
          </el-row>
        </statistical-block>
        <statistical-block class="height-third" title="费用统计">
          <el-row class="div-full">
            <dv-loading v-if="loading">Loading...</dv-loading>
            <el-row v-else class="height-hundred">
              <el-col :span="12" class="height-hundred">
                <!-- :bar-data="[
                    barArray('monthCostList', 'sixTotalCost'),
                    barArray('monthCostList', 'fiveTotalCost'),
                    barArray('monthCostList', 'fourTotalCost'),
                    barArray('monthCostList', 'threeTotalCost'),
                    barArray('monthCostList', 'twoTotalCost'),
                    barArray('monthCostList', 'oneTotalCost'),
                  ]" -->
                <vertical-bar
                  v-if="
                    barArray('monthCostList', 'prestoreCostTotal') !== undefined
                  "
                  ref="costBar"
                  :column-list="[
                    monthCostList.length ? monthCostList[0].sixtime : '',
                    monthCostList.length ? monthCostList[0].fivetime : '',
                    monthCostList.length ? monthCostList[0].fourtime : '',
                    monthCostList.length ? monthCostList[0].threetime : '',
                    monthCostList.length ? monthCostList[0].twotime : '',
                    monthCostList.length ? monthCostList[0].onetime : '',
                  ]"
                  :legend-list="barArray('monthCostList', 'deptName')"
                  :bar-data="lineArray('monthCostList')"
                  :start-color="[
                    '#00ebd6',
                    '#f8d278',
                    '#f5f739',
                    '#9d8ff8',
                    '#f85197',
                    '#adfc6d',
                  ]"
                  :end-color="[
                    '#01a3f8',
                    '#ef7c1f',
                    '#888a09',
                    '#6a60a9',
                    '#8f2d56',
                    '#117918',
                  ]"
                />
              </el-col>
              <el-col :span="12" class="height-hundred">
                <el-table
                  :data="monthCostList"
                  class="rzkj-table"
                  height="100%"
                  border
                >
                  <el-table-column width="106" prop="deptName" label="机构" />
                  <el-table-column
                    width="73"
                    prop="sixTotalCost"
                    :label="
                      monthCostList.length ? monthCostList[0].sixtime : ''
                    "
                  />
                  <el-table-column
                    width="73"
                    prop="fiveTotalCost"
                    :label="
                      monthCostList.length ? monthCostList[0].fivetime : ''
                    "
                  />
                  <el-table-column
                    width="73"
                    prop="fourTotalCost"
                    :label="
                      monthCostList.length ? monthCostList[0].fourtime : ''
                    "
                  />
                  <el-table-column
                    width="73"
                    prop="threeTotalCost"
                    :label="
                      monthCostList.length ? monthCostList[0].threetime : ''
                    "
                  />
                  <el-table-column
                    width="73"
                    prop="twoTotalCost"
                    :label="
                      monthCostList.length ? monthCostList[0].twotime : ''
                    "
                  />
                  <el-table-column
                    width="73"
                    prop="oneTotalCost"
                    :label="
                      monthCostList.length ? monthCostList[0].onetime : ''
                    "
                  />
                </el-table>
              </el-col>
            </el-row>
          </el-row>
        </statistical-block>
        <statistical-block class="height-third" title="预收款统计">
          <dv-loading v-if="loading">Loading...</dv-loading>
          <el-row v-else class="height-hundred">
            <el-col :span="12" class="height-hundred">
              <vertical-bar
                v-if="
                  barArray('collectionCostList', 'prestoreCostTotal') !==
                  undefined
                "
                ref="advancePayment"
                :column-list="barArray('collectionCostList', 'deptName')"
                :legend-list="['预收总额', '押金总额']"
                :bar-data="[
                  barArray('collectionCostList', 'prestoreCostTotal'),
                  barArray('collectionCostList', 'depositCostTotal'),
                ]"
                :start-color="['#00ebd6', '#f8d278']"
                :end-color="['#01a3f8', '#ef7c1f']"
              />
            </el-col>
            <el-col :span="12" class="height-hundred">
              <el-table
                :data="collectionCostList"
                class="rzkj-table"
                height="100%"
                border
              >
                <el-table-column prop="deptName" label="机构" width="200" />
                <el-table-column prop="prestoreCostTotal" label="预收总额" />
                <el-table-column prop="depositCostTotal" label="押金总额" />
              </el-table>
            </el-col>
          </el-row>
        </statistical-block>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { getStatisticsNum, getStatisticsNumByTime } from '@/request/api.js'
import { getNowDate, getWeekDay } from '@/util/index.js'
import statisticalBlock from '@/components/block/statisticalBlock'
import circularPie from '@/components/chart/circularPie'
import verticalBar from '@/components/chart/verticalBar'
import occupancyLine from '@/components/chart/occupancyLine'

export default {
  name: 'statistical',
  components: {
    statisticalBlock,
    circularPie,
    verticalBar,
    occupancyLine
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
      // 居住统计
      livehandleList: [],
      // 入住率统计
      liveRateList: [],
      liveRateData: [],
      // 费用统计
      monthCostList: [],
      // 预收款统计
      collectionCostList: [],
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
    await this.getData()
    setTimeout(() => {
      this.loading = false
    }, 1000)

  },
  methods: {
    getData() {
      console.log('aaa')
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
            resArr.push([this[name][index].sixrate, this[name][index].fiverate, this[name][index].fourrate, this[name][index].threerate, this[name][index].tworate, this[name][index].onerate])
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
  .page-left {
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
    // background-color: rgba(5, 36, 105, 0.4);
  }
  .page-right {
    .statistical-title {
      margin: 0 auto;
      height: 60px;
      line-height: 60px;
      font-size: 1.35em;
      color: #00ffff;
      font-weight: 500;
    }
    .statistical-container {
      height: calc(100% - 60px);
    }
    .statistical-container-half {
      height: calc(50% - 60px);
    }
  }
}
</style>
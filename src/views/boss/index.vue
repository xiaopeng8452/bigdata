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
            <el-table-column prop="sysUserNum" label="员工" />
            <el-table-column prop="bedNum" label="总床位" />
            <el-table-column prop="liveInBedNum" label="已住" />
            <el-table-column prop="stayBackBedNum" label="空床" />
            <el-table-column prop="occupancyRate" label="入住率" />
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
            <el-table-column prop="adminNum" label="管理" />
            <el-table-column prop="doctorNum" label="医生" />
            <el-table-column prop="nurseNum" label="护士" />
            <el-table-column prop="attendantNum" label="护理员" />
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
            <el-table-column prop="deptName" label="机构" width="130" />
            <el-table-column prop="liveInNum" label="在住" />
            <el-table-column prop="stayBackNum" label="退住" />
            <el-table-column prop="askLevelNum" label="请假" />
          </el-table>
        </statistical-block>
      </el-row>
    </el-col>
    <el-col :span="15" style="height: 86vh">
      <el-row class="div-full page-right">
        <statistical-block
          class="height-hundred"
          :tags="dateTags"
          @changeTag="changeTimeSerch($event)"
        >
          <el-row :gutter="20" class="height-hundred">
            <el-col :span="12" class="height-twoThird">
              <dv-loading v-if="loading">Loading...</dv-loading>
              <el-row v-else class="height-hundred">
                <h4 class="statistical-title">费用统计</h4>
                <el-row class="statistical-container-half">
                  <el-table
                    :data="monthCostList"
                    class="rzkj-table div-full"
                    height="100%"
                    border
                  >
                    <el-table-column prop="deptName" label="机构" width="130" />
                    <el-table-column prop="bedCost" label="床位费" />
                    <el-table-column prop="nursingCost" label="护理费" />
                    <el-table-column prop="incrementCost" label="增值服务费" />
                    <el-table-column prop="totalCost" label="合计" />
                  </el-table>
                </el-row>
                <h4 class="statistical-title">费用占比</h4>
                <el-row class="statistical-container-half">
                  <el-col
                    :span="8"
                    class="height-hundred"
                    v-for="(list, index) in monthCostList.slice(0, 3)"
                    :key="index"
                  >
                    <circular-pie
                      :ref="'costAccounted' + index"
                      :colors="['#017bde', '#2bc28d', '#eacc50']"
                      :datas="costPieData(index)"
                      :title="list.deptName"
                    />
                  </el-col>
                </el-row>
              </el-row>
            </el-col>
            <el-col :span="12" class="height-twoThird">
              <dv-loading v-if="loading">Loading...</dv-loading>
              <el-row v-else class="height-hundred">
                <h4 class="statistical-title">预收款统计</h4>
                <el-row class="statistical-container-half">
                  <el-table
                    :data="collectionCostList"
                    class="rzkj-table"
                    height="100%"
                    border
                  >
                    <el-table-column prop="deptName" label="机构" width="130" />
                    <el-table-column prop="prestoreCost" label="预收" />
                    <el-table-column prop="depositCost" label="押金" />
                    <el-table-column
                      prop="prestoreCostTotal"
                      label="预收总额"
                    />
                    <el-table-column prop="depositCostTotal" label="押金总额" />
                  </el-table>
                </el-row>
                <h4 class="statistical-title">预收款展示</h4>
                <el-row class="statistical-container-half">
                  <vertical-bar
                    v-if="
                      barArray('collectionCostList', 'depositCost') !==
                      undefined
                    "
                    ref="advancePayment"
                    :column-list="barArray('collectionCostList', 'deptName')"
                    :advance-data="
                      barArray('collectionCostList', 'prestoreCost')
                    "
                    :deposit-data="
                      barArray('collectionCostList', 'depositCost')
                    "
                  />
                </el-row>
              </el-row>
            </el-col>
            <el-col :span="12" class="height-third">
              <h4 class="statistical-title">居住情况统计</h4>
              <el-row class="div-full">
                <dv-loading v-if="loading">Loading...</dv-loading>
                <el-row v-else class="statistical-container">
                  <cost-line
                    ref="costLine"
                    :pointColor="[
                      '#ff7473',
                      '#ffc952',
                      '#47b8e0',
                      '#34314c',
                      '#67d5b5',
                      '#6a60a9',
                    ]"
                    :legendList="barArray('csArray', 'name')"
                    :serversData="barArray('csArray', 'data')"
                  ></cost-line>
                </el-row>
              </el-row>
            </el-col>
            <el-col :span="12" class="height-third">
              <h4 class="statistical-title">营销统计</h4>
              <dv-loading v-if="loading">Loading...</dv-loading>
              <el-row v-else class="statistical-container">
                <el-table
                  :data="receptionList"
                  class="rzkj-table div-full"
                  height="100%"
                  border
                >
                  <el-table-column prop="deptName" label="机构" width="130" />
                  <el-table-column prop="receptionNum" label="接待人数" />
                  <el-table-column prop="returnvisitNum" label="回访" />
                  <el-table-column prop="bookinngNum" label="转预定" />
                  <el-table-column prop="applicationNum" label="转入住" />
                </el-table>
              </el-row>
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
import costLine from '@/components/chart/costLine'

export default {
  name: 'statistical',
  components: {
    statisticalBlock,
    circularPie,
    verticalBar,
    costLine
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
      // 欠费统计
      arrearsList: [],
      // 费用统计
      monthCostList: [],
      // 接待统计
      receptionList: [],
      // 家访统计
      applicationList: [],
      // 居住统计
      livehandleList: [],
      // 预收款统计
      collectionCostList: [],
      // 测试居住情况统计
      csArray: [
        {
          name: '机构1',
          data: [5.5, 6.7, 8.1, 7.4, 7.5, 8.6]
        },
        {
          name: '机构2',
          data: [7.2, 6.3, 8.4, 7.5, 7.6, 7.7]
        },
        {
          name: '机构3',
          data: [7.2, 8.3, 8.4, 7.7, 8.4, 7.9]
        },
        {
          name: '机构4',
          data: [7.2, 7.2, 7.2, 7.2, 7.2, 7.2]
        },
        {
          name: '机构5',
          data: [8.3, 8.3, 8.3, 8.3, 8.3, 8.3]
        },
        {
          name: '机构6',
          data: [6.4, 6.4, 6.4, 6.4, 6.4, 6.4]
        },
      ]
    }
  },
  async mounted() {
    let _this = this
    window.onresize = () => {
      _this.$refs.costAccounted0[0].chartResize()
      _this.$refs.costAccounted1[0].chartResize()
      _this.$refs.costAccounted2[0].chartResize()
      _this.$refs.advancePayment.chartResize()
      _this.$refs.costLine.chartResize()
    }
    await this.getLftData()
    await this.getRightData()
    setTimeout(() => {
      this.loading = false
    }, 1000)

  },
  methods: {
    getLftData() {
      getStatisticsNum({}).then(res => {
        this.surveyCostList = res.data.surveyCostList
        this.staffList = res.data.staffList
        this.arrearsList = res.data.arrearsList
      }).catch(errorMsg => {
        console.log(errorMsg)
      })
    },
    getRightData() {
      getStatisticsNumByTime({ startTime: this.startTime, endTime: this.endTime }).then(res => {
        console.log(res)
        this.monthCostList = res.data.monthCostList
        this.receptionList = res.data.receptionList
        this.applicationList = res.data.applicationList
        this.livehandleList = res.data.livehandleList
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
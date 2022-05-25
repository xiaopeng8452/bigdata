<template>
  <el-row :gutter="30">
    <el-col :span="7" style="height: 88vh">
      <home-block class="dv-home-box height-forty-five" title="机构居住情况">
        <dv-loading v-if="loading">Loading...</dv-loading>
        <el-row v-else>
          <el-row
            :gutter="20"
            v-for="(list, index) in bdOrgInfoList.slice(0, 3)"
            :key="list.orgInfoId"
            class="situation-line"
          >
            <el-col :span="8">
              <el-progress
                v-if="list.orgName"
                type="circle"
                :percentage="
                  Number(((list.liveSum * 100) / list.bedSum).toFixed(0)) || 0
                "
                :color="['#ff902a', '#f55858', '#5adc9a'][index]"
                :text-inside="false"
                :width="progressWidth"
                class="home-progress"
              ></el-progress>
            </el-col>
            <el-col :span="16">
              <h5
                class="situation-title align-left"
                :style="
                  'color:' + ['#ff902a', '#f55858', '#5adc9a'][index] + ''
                "
              >
                <el-row type="flex">
                  {{ list.orgName }}
                  <el-rate
                    class="situation-rate"
                    v-model="[5, 4, 4][index]"
                    :max="[5, 4, 4][index]"
                    disabled
                  />
                </el-row>
              </h5>
              <el-row type="flex" class="situation-subtitle">
                <el-col>床位数：{{ list.bedSum }} 张</el-col>
                <el-col>实际入住：{{ list.liveSum }} 张</el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-row>
      </home-block>
      <home-block class="dv-home-box height-fifty-five" title="机构员工情况">
        <dv-loading v-if="loading">Loading...</dv-loading>
        <!-- <dv-scroll-board
          v-else
          :config="usStaffObj"
          class="home-table height-full"
        /> -->
        <el-row v-else class="div-full" style="padding-top: 2vh">
          <el-table
            :data="bdOrgInfoList"
            border
            class="rzkj-table div-full"
            height="100%"
          >
            <el-table-column prop="orgName" label="机构" />
            <el-table-column prop="staffSum" label="总人数" />
            <el-table-column prop="nurseSum" label="护理员人数" />
          </el-table>
        </el-row>
      </home-block>
    </el-col>
    <el-col :span="10">
      <el-row style="height: 58vh">
        <dv-loading v-if="loading">Loading...</dv-loading>
        <div v-else class="home-map">
          <div class="map-numbers">
            <el-row
              v-for="(item, key, index) in homeData"
              class="map-numbers-line"
              :key="index"
            >
              <el-row class="map-number-title">
                {{
                  index === 2
                    ? "入院老人"
                    : index === 1
                    ? "工作人员"
                    : "机构数量"
                }}
              </el-row>
              <el-row :gutter="10" type="flex">
                <div :span="8" v-for="(num, numIndex) in item" :key="numIndex">
                  <dv-digital-flop
                    :config="mapNumber(num, numIndex)"
                    class="map-number"
                    :style="{
                      width: tagfontSize * 1.2 + 'px',
                      height: tagfontSize * 1.4 + 'px',
                    }"
                  />
                </div>
                <div class="map-unit">{{ index ? "位" : "个" }}</div>
              </el-row>
            </el-row>
          </div>
          <custom-map
            ref="mechanismLayout"
            :area-data="bdAddrDistList"
            :one-point="getPointData('1')"
            :two-point="getPointData('2')"
          ></custom-map>
        </div>
      </el-row>
      <el-row style="height: 30vh">
        <home-block class="dv-home-box height-full" title="实时消息">
          <dv-loading v-if="loading">Loading...</dv-loading>
          <div v-else>
            <dv-scroll-board
              ref="realTimeNews"
              :config="realTimeObj"
              class="real-table"
              style="height: 21vh"
            />
          </div>
        </home-block>
      </el-row>
    </el-col>
    <el-col :span="7" style="height: 88vh">
      <home-block class="dv-home-box height-forty-five" title="长者年龄分布">
        <dv-loading v-if="loading">Loading...</dv-loading>
        <horizontal-bar
          v-else
          ref="ageDistribution"
          :age-lists="computedArray('ageRange', 'bdAgeDistList')"
          :age-data="computedArray('oldmanCount', 'bdAgeDistList')"
        ></horizontal-bar>
      </home-block>
      <home-block class="dv-home-box height-fifty-five" title="视频监控">
        <dv-loading v-if="loading">Loading...</dv-loading>
        <el-row v-else class="monitoring-box">
          <el-row id="monitoringVideoRow">
            <video
              class="monitoring-current"
              id="monitoringVideo"
              autoplay="true"
              loop="true"
              muted
              :poster="monitoringImgs[monitoringActive].picUrl"
            >
              <source
                :src="monitoringImgs[monitoringActive].videoUrl"
                type="video/mp4"
              />
            </video>
          </el-row>
          <el-row :gutter="10">
            <el-col
              :span="8"
              v-for="(imgItem, index) in monitoringImgs"
              :key="index"
            >
              <el-image
                class="monitoring-item"
                :src="imgItem.picUrl"
                fit="fit"
                :lazy="true"
                @click="monitoringChange(imgItem, index)"
              ></el-image>
            </el-col>
          </el-row>
        </el-row>
      </home-block>
    </el-col>
  </el-row>
</template>

<script>
import { getHomeData, getHomeMsg } from '@/request/api.js'
import horizontalBar from '@/components/chart/horizontalBar'
import customMap from '@/components/chart/customMap'
import homeBlock from '@/components/block/homeBlock'
export default {
  components: {
    horizontalBar,
    customMap,
    homeBlock
  },
  data() {
    return {
      screenWidth: document.documentElement.clientWidth,//屏幕宽度
      screenHeight: document.documentElement.clientHeight,//屏幕高度
      progressWidth: 80,
      tagfontSize: 32,
      websocket: null,
      // 全部机构信息
      bdOrgInfoList: [],
      // 地图数据
      bdAddrDistList: [],
      // 机构员工情况2
      // usStaffObj: {
      //   header: ['机构', '总人数', '护理员人数'],
      //   headerHeight: 60,
      //   rowNum: 7,
      //   data: [],
      //   columnWidth: [],
      //   headerBGC: 'transparent',
      //   oddRowBGC: 'transparent',
      //   evenRowBGC: 'rgba(18,95,188,.6)',
      //   align: ['center', 'center', 'center']
      // },
      loading: true,
      // 实时消息
      realTimeObj: {
        header: ['类型', '时间', '机构', '项目', '内容'],
        data: [],
        columnWidth: [80, 170, 140, 90],
        headerBGC: 'transparent',
        oddRowBGC: 'transparent',
        evenRowBGC: 'rgba(18,95,188,.4)',
        align: ['center', 'center', 'center', 'center', 'center']
      },
      homeData: {
        allOrgSum: '000',
        allStaffSum: '000',
        allOldmanSum: '000'
      },
      // 长者年龄数据
      bdAgeDistList: [],
      // 视频监控
      monitoringActive: 0,
      monitoringImgs: [
        { picUrl: './static/img/video1.png', videoUrl: './static/video/video1.mp4' },
        { picUrl: './static/img/video2.png', videoUrl: './static/video/video2.mp4' },
        { picUrl: './static/img/video3.png', videoUrl: './static/video/video3.mp4' }
      ]
    }
  },
  watch: {
    screenHeight(newVal) {
      this.progressWidth = newVal > 1070 ? 96 : 80
      this.tagfontSize = newVal > 1070 ? 36 : 32
      this.$refs.ageDistribution.chartResize()
      this.$refs.mechanismLayout.chartResize()
    }
  },
  async mounted() {
    window.onresize = () => { // 定义窗口大小变更通知事件
      this.screenWidth = document.documentElement.clientWidth; //窗口宽度
      this.screenHeight = document.documentElement.clientHeight; //窗口高度
    };
    this.progressWidth = this.screenHeight > 1070 ? 96 : 80
    this.tagfontSize = this.screenHeight > 1070 ? 36 : 32
    await this.getData()
    await this.getRtMessage()
    this.newWebSocket()
  },
  destroyed() {
    this.websocket && this.websocket.close()
  },
  methods: {
    getRtMessage() {
      getHomeMsg({}).then(res => {
        setTimeout(() => {
          res.data.forEach(list => {
            this.realTimeObj.data.push(
              [
                `<span class="table-tag ${['bg-default', 'bg-primary', 'bg-danger', 'bg-success'][list.msgType]}">${['未知', '机构', '居家', '社区'][list.msgType]}</span>`,
                `${list.createTime}`,
                `${list.orgName}`,
                `${list.msgTitle}`,
                `<span style="cursor: pointer;" title="${list.msgContent}">${list.msgContent}</span>`
              ]
            )
          });
          this.realTimeObj = { ...this.realTimeObj }
          this.loading = false
        }, 600);
      }).catch(errorMsg => {
        console.log(errorMsg)
      })

    },
    getData() {
      this.homeAssignment({
    "limitType": "1",
    "bdOrgInfoList": [
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:00",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "orgInfoId": 150662,
        "orgName": "浦口养老院",
        "bedSum": 7,
        "liveSum": 4,
        "liveRate": "57",
        "staffSum": 1,
        "nurseSum": 0,
        "csysLocation": "118.916284,32.030148",
        "deptType": "1"
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:00",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "orgInfoId": 150663,
        "orgName": "滨江养老院",
        "bedSum": 1,
        "liveSum": 0,
        "liveRate": "0",
        "staffSum": 9,
        "nurseSum": 3,
        "csysLocation": "118.73295,32.033641",
        "deptType": "1"
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:00",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "orgInfoId": 150664,
        "orgName": "禄口敬老院",
        "bedSum": 7,
        "liveSum": 6,
        "liveRate": "86",
        "staffSum": 3,
        "nurseSum": 0,
        "csysLocation": "118.834573,32.040626",
        "deptType": "1"
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:00",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "orgInfoId": 150665,
        "orgName": "江宁老年公寓",
        "bedSum": 3,
        "liveSum": 3,
        "liveRate": "100",
        "staffSum": 5,
        "nurseSum": 2,
        "csysLocation": "118.800241,32.301593",
        "deptType": "1"
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:00",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "orgInfoId": 150666,
        "orgName": "老年公寓",
        "bedSum": 4,
        "liveSum": 3,
        "liveRate": "75",
        "staffSum": 1,
        "nurseSum": 0,
        "csysLocation": "118.719904,32.184279",
        "deptType": "2"
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:00",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "orgInfoId": 150667,
        "orgName": "测试测试",
        "bedSum": 0,
        "liveSum": 0,
        "liveRate": "0",
        "staffSum": 0,
        "nurseSum": 0,
        "csysLocation": "0,0",
        "deptType": "1"
      }
    ],
    "bdAgeDistList": [
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:01",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "ageDistId": 138971,
        "ageRange": "60以下",
        "oldmanCount": 8
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:01",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "ageDistId": 138972,
        "ageRange": "60-70",
        "oldmanCount": 8
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:01",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "ageDistId": 138973,
        "ageRange": "70-80",
        "oldmanCount": 2
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:01",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "ageDistId": 138974,
        "ageRange": "80-90",
        "oldmanCount": 3
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:01",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "ageDistId": 138975,
        "ageRange": "90以上",
        "oldmanCount": 2
      }
    ],
    "bdAddrDistList": [
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:00",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "addrDistId": 70598,
        "regionName": "玄武区",
        "oldmanSum": 22
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:00",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "addrDistId": 70599,
        "regionName": "秦淮区",
        "oldmanSum": 1
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:00",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "addrDistId": 70600,
        "regionName": "鼓楼区",
        "oldmanSum": 1
      }
    ],
    "allOrgSum": 6,
    "allStaffSum": 19,
    "allOldmanSum": 16
  })
      // getHomeData({}).then(res => {
      //   if (res.code === 0) {
      //     this.homeAssignment(res.data)
      //   } else if (res.code === 2) {
      //     this.GLOBAL.loginStatus = false
      //   } else {
      //     this.$message({
      //       message: res.msg,
      //       type: 'warning'
      //     });
      //   }
      // }).catch(errorMsg => {
      //   console.log(errorMsg)
      // })
    },
    homeAssignment(data) {
      // if (!data.limitType) {
      //   this.bdAgeDistList = [{ "ageDistId": 45051, "ageRange": "60以下", "createTime": 1614047640000, "oldmanCount": 6, "params": {} }, { "ageDistId": 45052, "ageRange": "60-70", "createTime": 1614047640000, "oldmanCount": 3, "params": {} }, { "ageDistId": 45053, "ageRange": "70-80", "createTime": 1614047640000, "oldmanCount": 2, "params": {} }, { "ageDistId": 45054, "ageRange": "80-90", "createTime": 1614047640000, "oldmanCount": 2, "params": {} }, { "ageDistId": 45055, "ageRange": "90以上", "createTime": 1614047640000, "oldmanCount": 12, "params": {} }]
      // } else {
      //   this.bdAgeDistList = data.bdAgeDistList
      //   this.bdAgeDistList[4].oldmanCount = 0
      // }
      this.bdAgeDistList = data.bdAgeDistList
      this.bdOrgInfoList = data.bdOrgInfoList
      // 机构员工情况赋值
      // this.usStaffObj.rowNum = data.bdOrgInfoList.length > 6 ? 7 : 6
      // data.bdOrgInfoList.forEach((list) => {
      //   this.usStaffObj.data.push([list.orgName, list.staffSum, list.nurseSum])
      // })
      // this.usStaffObj = { ...this.usStaffObj }
      // 获取地图块数据
      data.bdAddrDistList.forEach(list => {
        this.bdAddrDistList.push({ name: list.regionName, value: list.oldmanSum, value2: 2 })
      })
      setTimeout(() => {
        this.homeData.allOldmanSum = (data.allOldmanSum + '').padStart(3, '0')
        this.homeData.allOrgSum = (data.allOrgSum + '').padStart(3, '0')
        this.homeData.allStaffSum = (data.allStaffSum + '').padStart(3, '0')
        this.$forceUpdate()
      }, 400)
    },
    // 点击切换播放视频
    monitoringChange(item, index) {
      // document.getElementById("monitoringVideoRow").innerHTML = ` <source src="${url}" type="video/mp4"/>`
      document.getElementById("monitoringVideoRow").innerHTML = `
        <video
          class="monitoring-current"
          id="monitoringVideo"
          autoplay="true"
          loop="true"
          muted
          poster="${item.picUrl}"
        >
          <source
            src="${item.videoUrl}"
            type="video/mp4"
          />
        </video>
      `
      this.monitoringActive = index
    },
    // 地图左上角数据拆分
    mapNumber(value, index) {
      return { number: [Number(value)], style: { fontSize: this.tagfontSize, fill: '#fff' } }
    },
    computedArray(name, array) {
      let resArr = []
      if (this[array].length) {
        this[array].forEach(item => {
          resArr.push(item[name])
        })
      }
      return resArr
    },
    // 根据返回数据获取地图不同类型点数据
    getPointData(pointsType) {
      let res = []
      if (this.bdOrgInfoList.length) {
        this.bdOrgInfoList.forEach(list => {
          if (pointsType === list.deptType) {
            if (list.csysLocation.indexOf('，') !== -1) {
              res.push({ name: list.orgName, value: list.csysLocation.split("，"), value2: list.bedSum, value3: list.liveSum })
            } else {
              res.push({ name: list.orgName, value: list.csysLocation.split(","), value2: list.bedSum, value3: list.liveSum })
            }
          }
        })
      }
      return res
    },
    //实现webSocket
    newWebSocket() {
      let _this = this
      let currentIp = this.$axios.defaults.baseURL.split('http://').join('');
      var wsUrl = 'ws://' + currentIp + '/api/websocket/server';
      //判断当前浏览器是否支持WebSocket
      if ('WebSocket' in window) {
        this.websocket = new WebSocket(wsUrl);
      } else {
        this.$message.error('Not support websocket');
      };
      //连接发生错误的回调方法
      this.websocket.onerror = function () {
        console.log("出错");
        _this.reconnect(wsUrl);
      };
      //连接成功建立的回调方法
      this.websocket.onopen = function (event) {
        heartCheck.reset().start();      //心跳检测重置
        console.log("open");
      };
      //接收到消息的回调方法
      this.websocket.onmessage = function (event) {
        heartCheck.reset().start();
        if (event.data && event.data !== 'onMessage->ping') {
          let jsonObj = JSON.parse(event.data)
          console.log(event.data)
          if (jsonObj.code == 0) {
            switch (jsonObj.data.interName) {
              case 'getHomeData':
                _this.homeAssignment(jsonObj.data.data)
                break;
              case 'getHomeMsg':
                _this.realTimeUpdate(jsonObj.data.data)
                break;
              default:
                // console.log(event.msg)
                break;
            }
          }
        }

      };
      //连接关闭的回调方法
      this.websocket.onclose = function () {
        console.log("close");
        // _this.reconnect(wsUrl);
      };
      //心跳检测
      var heartCheck = {
        timeout: 50000,        //1分钟发一次心跳
        timeoutObj: null,
        serverTimeoutObj: null,
        reset: function () {
          clearTimeout(this.timeoutObj);
          clearTimeout(this.serverTimeoutObj);
          return this;
        },
        start: function () {
          var self = this;
          self.timeoutObj && clearTimeout(self.timeoutObj);
          self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
          self.timeoutObj = setTimeout(function () {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            _this.websocket.readyState == 1 && _this.websocket.send("ping");
            self.serverTimeoutObj = setTimeout(function () {//如果超过一定时间还没重置，说明后端主动断开了
              _this.websocket.close();     //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            }, self.timeout)
          }, this.timeout)
        }
      }
    },
    sendMsg() {
      let message = '我的';
      this.websocket && this.websocket.send(message);
    },
    reconnect() {
      let lockReconnect = false
      if (lockReconnect) return;
      lockReconnect = true;
      setTimeout(() => {     //没连接上会一直重连，设置延迟避免请求过多
        this.newWebSocket();
        lockReconnect = false;
      }, 2000);
    },
    // 实时消息webscoket更新
    realTimeUpdate(data) {
      data.forEach(list => {
        this.realTimeObj.data.push(
          [
            `<span class="table-tag ${['bg-default', 'bg-primary', 'bg-danger', 'bg-success'][list.msgType]}">${['未知', '机构', '居家', '社区'][list.msgType]}</span>`,
            `${list.createTime}`,
            `${list.orgName}`,
            `${list.msgTitle}`,
            `<span style="cursor: pointer;" title="${list.msgContent}">${list.msgContent}</span>`
          ]
        )
      });
      this.$refs['realTimeNews'].updateRows(this.realTimeObj.data);
    }
  }
}
</script>

<style lang="scss" scoped>
.situation-line {
  margin-top: 1vh;
  .home-progress {
    /deep/ .el-progress__text {
      color: #fff;
    }
  }
  .situation-title {
    font-size: 1.25em;
    margin: 1.25vh 0 1.2vh;
    .situation-rate {
      margin-left: 10px;
      margin-top: 2px;
      /deep/ .el-rate__icon {
        font-size: 24px;
        margin-right: 0;
      }
    }
  }
  .situation-subtitle {
    color: #d2deef;
    font-size: 1em;
    text-align: left;
  }
}
.dv-home-box {
  /deep/ .dv-border-box-11-title {
    fill: #44f0e9;
    font-weight: 600;
  }
}
// 布局
.home-center-bottom {
  padding-top: 6vh;
}

.home-table {
  /deep/ .header-item {
    color: #02f1fa;
    font-size: 1.125em;
  }
}
// 实时消息表格
.real-table {
  width: 100%;
  /deep/ .header-item {
    color: #02f1fa;
  }
}
.home-map {
  position: relative;
  height: 100%;
  .map-numbers {
    position: absolute;
    left: 3vw;
    top: 2vh;
    .map-numbers-line {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
      .map-number-title {
        text-align: left;
        margin-bottom: 10px;
        font-size: 1.125em;
        margin-left: -5px;
      }
      .map-number {
        width: 42px;
        height: 56px;
        background-color: #d34e17;
        margin-right: 10px;
      }
      .map-unit {
        display: flex;
        align-items: flex-end;
        font-size: 0.925em;
      }
    }
  }
}
.monitoring-box {
  height: 100%;

  .monitoring-item {
    width: 100%;
    height: 9.5vh;
    border-radius: 5px;
  }
}
</style>
<style>
.table-tag {
  padding: 4px 14px;
  border-radius: 8px;
}
.monitoring-current {
  width: 100%;
  height: 29vh;
  margin-bottom: 0.5vh;
  border-radius: 10px;
}
</style>
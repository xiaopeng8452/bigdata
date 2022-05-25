<template>
  <div class="monitor-container">
    <dv-loading v-if="loading">Loading...</dv-loading>
    <el-main v-if="!loading">
      <!-- <el-button
        style="position:position: fixed;top:20vh"
        @click="warningNotify"
        >测试</el-button
      > -->
      <el-row class="nurse-station-search">
        <dv-border-box-13 :color="['#02cedb', '#fd6929']">
          <el-form
            class="nurse-station-form"
            ref="form"
            :inline="true"
            :model="searchForm"
            label-width="120px"
          >
            <el-row type="flex">
              <el-col>
                <el-form-item label="当前楼栋：">
                  <el-select
                    v-model="searchForm.build"
                    placeholder="请选择楼栋"
                  >
                    <el-option
                      v-for="(item, index) in buildItems"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="当前楼层：">
                  <el-select
                    v-model="searchForm.floor"
                    placeholder="请选择楼层"
                  >
                    <el-option
                      v-for="(item, index) in floorItems"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col class="nurse-station-form-del">
                <span v-if="searchForm.bedNum">
                  床位总数：<b>{{ searchForm.bedNum }}</b> 张
                </span>
                <span v-if="searchForm.newStay">
                  新入住人数：<b>{{ searchForm.newStay }}</b> 位
                </span>
                <span v-if="searchForm.askLeave">
                  请假人数：<b>{{ searchForm.askLeave }}</b> 位
                </span>
              </el-col>
            </el-row>
          </el-form>
        </dv-border-box-13>
      </el-row>
      <el-row :gutter="10">
        <el-col
          :span="4"
          class="room-item"
          v-for="(item, roomIndex) in roomItems"
          :key="roomIndex"
        >
          <dv-border-box-12
            class="room-item-box"
            :color="['rgba(2,206,219,.5)', '#74dcd6']"
          >
            <el-row class="room-item_title">
              <span>{{ item.name }}</span>
              <transition name="el-fade-in-linear">
                <i
                  v-if="roomSos == roomIndex"
                  class="el-icon-message-solid room-icon"
                ></i>
              </transition>
            </el-row>
            <el-row type="flex" :gutter="10" class="room-item-lists">
              <el-col
                class="room-item-list"
                v-for="(list, bedIndex) in item.oldmanLists"
                :key="bedIndex"
              >
                <div class="oldman-list">
                  <p class="oldman-list_name">
                    {{ list.name }}
                    <transition name="el-fade-in-linear">
                      <i
                        v-if="roomIndex == 0 && bedSos == bedIndex"
                        class="el-icon-message-solid bed-icon"
                      ></i>
                    </transition>
                  </p>
                  <p class="oldman-list-line">
                    <span
                      :class="
                        dataStatus(list.state, list.pneusis, [8, 20])
                          ? 'text-normal'
                          : 'text-danger'
                      "
                      ><b v-show="list.state == 4">呼吸：</b>
                      <b :class="list.state == 4 && 'align-left'">{{
                        list.state == 4 ? list.pneusis : "----"
                      }}</b>
                    </span>
                  </p>
                  <p class="oldman-list-line">
                    <span
                      :class="
                        dataStatus(list.state, list.heartbeat, [50, 100])
                          ? 'text-normal'
                          : 'text-danger'
                      "
                    >
                      <b v-show="list.state == 4">心跳：</b
                      ><b :class="list.state == 4 && 'align-left'">{{
                        list.state == 4 ? list.heartbeat : "----"
                      }}</b>
                    </span>
                  </p>
                  <el-tag
                    class="tag-custom"
                    :class="
                      [
                        'tag-leave',
                        'tag-offline',
                        'tag-normal',
                        'tag-offline',
                        'tag-normal',
                      ][list.state]
                    "
                    size="mini"
                    Plain
                  >
                    {{
                      ["离床", "设备离线", "卧床", "异常", "在床"][list.state]
                    }}
                  </el-tag>
                </div>
              </el-col>
            </el-row>
          </dv-border-box-12>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      buildItems: [
        {
          dictLabel: '主楼',
          dictValue: '1',
        },
        {
          dictLabel: '副楼',
          dictValue: '2',
        }
      ],
      floorItems: [
        {
          dictLabel: '二层',
          dictValue: '2',
        },
        {
          dictLabel: '三层',
          dictValue: '3',
        },
        {
          dictLabel: '四层',
          dictValue: '4',
        },
        {
          dictLabel: '五层',
          dictValue: '5',
        },
        {
          dictLabel: '六层',
          dictValue: '6',
        }
      ],
      searchForm: {
        build: '1',
        floor: '2',
        bedNum: '318',
        newStay: '12',
        askLeave: '4',
      },
      roomItems: [
        {
          name: '201',
          oldmanLists: [
            {
              name: '李光远',
              state: 0,  // 0.离床  1.离线  4.在床
              pneusis: 56,
              heartbeat: 70
            },
            {
              name: '倪昌法',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            }
          ]
        },
        {
          name: '202',
          oldmanLists: [
            {
              name: '周钰华',
              state: 1,
              pneusis: 0,
              heartbeat: 0
            }
          ]
        },
        {
          name: '203',
          oldmanLists: [
            {
              name: '梁连林',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            },
            {
              name: '张明如',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            }
          ]
        },
        {
          name: '204',
          oldmanLists: [
            {
              name: '罗修侠',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            },
            {
              name: '刘城惠',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            }
          ]
        },
        {
          name: '205',
          oldmanLists: [
            {
              name: '林佩卿',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            },
            {
              name: '殷地',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            }
          ]
        },
        {
          name: '206',
          oldmanLists: [
            {
              name: '李振安',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            },
            {
              name: '陈云福',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            }
          ]
        },
        {
          name: '301',
          oldmanLists: [
            {
              name: '刘道琴',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            },
            {
              name: '吴惜英',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            }
          ]
        },
        {
          name: '302',
          oldmanLists: [
            {
              name: '谢培方',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            },
            {
              name: '戴遵林',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            }
          ]
        },
        {
          name: '303',
          oldmanLists: [
            {
              name: '徐岳庭',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            },
            {
              name: '褚秀芳',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            }
          ]
        },
        {
          name: '304',
          oldmanLists: [
            {
              name: '汪家伦',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            }
          ]
        },
        {
          name: '305',
          oldmanLists: [
            {
              name: '石明静',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            },
            {
              name: '吴万銮',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            }
          ]
        },
        {
          name: '306',
          oldmanLists: [
            {
              name: '霍显忠',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            },
            {
              name: '仲跻瑚',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            }
          ]
        },
        {
          name: '307',
          oldmanLists: [
            {
              name: '郑美鸳',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            },
            {
              name: '陆明',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            }
          ]
        },
        {
          name: '308',
          oldmanLists: [
            {
              name: '孙丽华',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            },
            {
              name: '宋介华',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            }
          ]
        },
        {
          name: '401',
          oldmanLists: [
            {
              name: '李端云',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            },
            {
              name: '李康安',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            }
          ]
        },
        {
          name: '402',
          oldmanLists: [
            {
              name: '许世连',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            },
            {
              name: '徐珍琴',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            }
          ]
        },
        {
          name: '403',
          oldmanLists: [
            {
              name: '周福松',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            }
          ]
        },
        {
          name: '405',
          oldmanLists: [
            {
              name: '王秀兰',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            },
            {
              name: '黄世珍',
              state: 1,
              pneusis: 56,
              heartbeat: 70
            }
          ]
        }
      ],
      roomSos: null,
      bedSos: null,
      speechState: true
    }
  },
  props: {
    activeMenu: {
      type: Number,
      default: 0
    }
  },
  watch: {
    activeMenu(val) {
      console.log(val)
    },
  },
  mounted() {
    this.newWebSocket()
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  destroyed() {
    this.websocket && this.websocket.close()
  },
  methods: {

    dataStatus(state, data, threshold) {
      // state 床位状态  data 数据  threshold 阀值上下限
      return state == 4 ? (data >= threshold[0] && data <= threshold[1]) : true
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
              case 'getSleep':
                _this.monitorUpdate(jsonObj.data.data)
                break;
              case 'getAlarm':
                _this.warningNotify(jsonObj.data.data)
                break;
              default:

                break;
            }
          }
        }
      };
      //连接关闭的回调方法
      this.websocket.onclose = function () {
        console.log("close");
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
      this.websocket && this.websocket.send('我的');
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
    // 老人身体数据
    monitorUpdate(data) {
      Object.assign(this.roomItems[0].oldmanLists[0], data)
      this.$forceUpdate()
    },
    // 报警通知
    warningNotify(data) {
      let _this = this
      if (data.alarmType == 1) {
        this.bedSos = 0
      } else {
        this.roomSos = 0
      }
      this.$notify({
        title: '警告',
        message: `主楼 101房间${data.alarmType == 2 ? '卫生间设备' : ' 李光远长者 床旁设备'}发出警报提示，请相关人员尽快处理！`,
        type: 'warning',
        position: 'bottom-right',
        duration: 0,
        onClose() {
          if (data.alarmType == 2) {
            _this.roomSos = null
          } else {
            _this.bedSos = null
          }
        }
      })
      if (this.speechState) {
        this.speechState = false
        this.speech(data)
        setTimeout(() => {
          this.speechState = true
        }, 10000);
      }
    },
    // 语音播报
    speech(data) {
      let readWords = `主楼 101房间${data.alarmType == 2 ? '卫生间设备' : ' 李光远长者 床旁设备'}发出警报提示 请相关人员尽快处理`
      let url = "http://tts.baidu.com/text2audio?lan=zh&ctp=1&ie=UTF-8&text=" + encodeURI(readWords);
      let audioCon = new Audio(url);
      audioCon.src = url;
      audioCon.play();  //播放阅读
    }
  }
}
</script>

<style lang="scss" scoped>
$text-color: #37cfe6;
$danger-color: rgb(255, 37, 37);
$border-color: rgba(2, 206, 219, 0.5);
.monitor-container {
  height: calc(100% - 60px);
  .nurse-station-search {
    margin-bottom: 1vh;
    .nurse-station-form {
      padding-top: 30px;
      text-align: left;
      .nurse-station-form-del {
        text-align: right;
        color: $text-color;
        font-size: 1.5rem;
        height: 40px;
        line-height: 40px;
        span {
          margin-right: 5vw;
        }
      }
    }
  }

  .room-item {
    margin: 4px 0;
    .room-item-box {
      padding: 0 20px 20px;
    }
    .room-item_title {
      position: relative;
      font-size: 1.5rem;
      font-weight: bold;
      padding: 18px 0;
      color: $text-color;
      .room-icon {
        position: absolute;
        right: 56px;
        top: 23px;
        transform: all 1s;
        color: #f00;
        animation: call-police 1s linear infinite;
      }
    }
    .room-item-lists {
      .room-item-list {
        margin: 0 auto;
        .oldman-list {
          padding: 10px;
          font-size: 0.95rem;
          background-color: #071966;
          text-align: center;
          border-radius: 8px;
          color: $text-color;
          p {
            margin: 5px 0 15px;
            height: 20px;
            line-height: 20px;
          }
          .oldman-list_name {
            position: relative;
            font-weight: bold;
            font-size: 1.125rem;
            .bed-icon {
              position: absolute;
              right: 0px;
              top: 3px;
              font-size: 1rem;
              color: #f00;
              transform: all 1s;
              animation: call-police 2s linear infinite;
            }
          }
          .oldman-list-line {
            span {
              display: flex;
              justify-content: center;
              b {
                width: 65%;
                font-weight: normal;
                text-align: right;
                &:last-child {
                  width: 35%;
                  text-align: center;
                }
              }
            }
          }
          .text-normal {
            color: $text-color;
          }
          .text-danger {
            color: $danger-color;
          }
        }
      }
    }
  }
}
</style>
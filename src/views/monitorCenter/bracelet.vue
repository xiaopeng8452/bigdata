<template>
  <div class="monitor-container">
    <dv-loading v-if="loading">Loading...</dv-loading>
    <el-main v-if="!loading">
      <div id="container" style="height: calc(100vh - 120px)"></div>
      <div class="theme-box">
        <el-radio
          v-for="(theme, index) in themes"
          v-model="themeType"
          :label="theme.value"
          :key="index"
          class="theme-radio"
          @change="changeTheme($event)"
          >{{ theme.name }}</el-radio
        >
      </div>
    </el-main>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loading: true,
      themeType: 'dark',
      themes: [
        {
          name: '标准',
          value: 'normal'
        },
        {
          name: '幻影黑',
          value: 'dark'
        },
        {
          name: '月光银',
          value: 'light'
        },
        {
          name: '远山黛',
          value: 'whitesmoke'
        },
        {
          name: '草色青',
          value: 'fresh'
        },
        {
          name: '雅士灰',
          value: 'grey'
        },
        {
          name: '涂鸦',
          value: 'graffiti'
        },
        {
          name: '马卡龙',
          value: 'macaron'
        },
        {
          name: '靛青蓝',
          value: 'blue'
        },
        {
          name: '极夜蓝',
          value: 'darkblue'
        }
      ],
      markerList: [
        {
          name: '李光远',
          age: '76',
          sex: 1,
          imei: '868221001063174',
          address: '江苏省南京市建邺区泰山路159号',
          lon: '118.7430745',
          lat: '31.9970874',
          imgUrl: '/static/oldman/old1.jpg',
          time_begin: ''
        },
        {
          name: '孙丽华',
          age: '68',
          sex: 2,
          imei: '111',
          address: '江苏省南京市建邺区嵩山路121号',
          lon: '118.741735',
          lat: '32.002097',
          imgUrl: '/static/oldman/old2.jpg'
        },
        {
          name: '许世连',
          age: '79',
          sex: 2,
          imei: '222',
          address: '江苏省南京市建邺区嵩山路126号',
          lon: '118.739062',
          lat: '32.000692',
          imgUrl: '/static/oldman/old6.jpg'
        },

        {
          name: '周钰华',
          age: '82',
          sex: 1,
          imei: '333',
          address: '江苏省南京市建邺区松花江西路82号',
          lon: '118.729755',
          lat: '32.012875',
          imgUrl: '/static/oldman/old3.jpg'
        },
        {
          name: '梁连林',
          age: '71',
          sex: 1,
          imei: '444',
          address: '江苏省南京市建邺区和西大街87号',
          lon: '118.725543',
          lat: '31.991849',
          imgUrl: '/static/oldman/old7.jpg'
        },
        {
          name: '李振安',
          age: '81',
          sex: 1,
          imei: '555',
          address: '江苏省南京市建邺区乐山路199号',
          lon: '118.714717',
          lat: '31.998764',
          imgUrl: '/static/oldman/old8.jpg'
        }
      ],
      markers: [],
      speechState: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.init()
    }, 800) //延时加载地图，保证数据获取成功
  },
  destroyed() {
    if (!!this.map) {
      this.map.destroy();
    }
  },
  methods: {
    init() {
      let aMapScript = document.createElement('script')
      aMapScript.setAttribute('src', 'https://webapi.amap.com/maps?v=1.4.11&key=f8a2fc107017a0800834a34609b80500')
      document.head.appendChild(aMapScript)
      aMapScript.onload = () => {
        this.storeMap = new AMap.Map('container', {
          resizeEnable: true,
          center: [118.741992, 31.997196],
          zoom: 17,
          viewMode: '3D'//使用3D视图
        });
        this.changeTheme(this.themeType)
        this.initializeMarker()

      }
      this.loading = false
      this.newWebSocket()
    },
    initializeMarker() {
      this.markerList.forEach((list, index) => {
        let marker = new AMap.Marker({
          icon: new AMap.Icon({
            image: "/static/tools/position.png",
            // size: new AMap.Size(43.8, 60),  //图标大小
            // imageSize: new AMap.Size(21.9, 30),
            zIndex: index + 1,
            clickable: true
          }),
          map: this.storeMap,
          position: [list.lon, list.lat],
          offset: new AMap.Pixel(-13, -30)
        });
        marker.setLabel({
          offset: new AMap.Pixel(36, 34),  //设置文本标注偏移量
          content: `<div class='info'>${list.name}</div>`, //设置文本标注内容
          direction: 'left'
        });
        // marker.setMap(this.storeMap);
        marker.on('click', this.clickMarker);   // 绑定marker点击事件
        this.markers.push(marker)
      })
      this.storeMap.setFitView();
    },
    // 修改主题
    changeTheme(event) {
      var styleName = "amap://styles/" + event;
      this.storeMap.setMapStyle(styleName);
    },
    clickMarker(e) {
      let tagCode = 0;
      let actualObj = e.target ? e.target : e
      this.markers.forEach((marker, index) => {
        if (marker._amap_id == actualObj._amap_id) { tagCode = index }
      })
      let infoContent = `
        <div class="oldman-info-box">
        	<div class="oldman-info">
        		<h4>${this.markerList[tagCode].name}</h4>
        		<p><label>年龄：</label><span>${this.markerList[tagCode].age}岁</span></p>
        		<p><label>性别：</label><span>${['', '男', '女', '未知'][this.markerList[tagCode].sex]}</span></p>
        		<p><label>地址：</label><span>${this.markerList[tagCode].address}</span></p>
            <div class="time" style="display:${this.markerList[tagCode].time_begin && 'block'}">警报时间：${this.markerList[tagCode].time_begin}</div>
        	</div>
        	<!-- 照片 -->
        	<div class="oldman-photo">
        		<img src="${this.markerList[tagCode].imgUrl ? this.markerList[tagCode].imgUrl : '/static/oldman/oldhead.png'}">
        	</div>
        </div>
      `
      let infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(-4, -66),
        content: infoContent  //使用默认信息窗体框样式，显示信息内容
      });
      infoWindow.open(this.storeMap, actualObj.Ce.position)
      infoWindow.on('close', this.showInfoClose)
      this.storeMap.setCenter(actualObj.Ce.position)
      this.storeMap.setZoom(16)
    },
    // 信息窗体关闭回调
    showInfoClose() {
      this.markers[0].setAnimation('AMAP_ANIMATION_NONE');
      this.markers[0].setIcon('/static/tools/position.png');
    },
    // sos报警
    callPolice(data) {
      this.markerList.forEach((list, index) => {
        if (list.imei == data.imei) {
          this.markers[index].setAnimation('AMAP_ANIMATION_BOUNCE');
          this.markers[index].setIcon('/static/tools/position2.png');
          Object.assign(this.markerList[index], data)
          this.clickMarker(this.markers[index])
          if (this.speechState) {
            this.speechState = false
            this.speech(data)
            setTimeout(() => {
              this.speechState = true
            }, 10000);
          }
        }
      })
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
          if (jsonObj.code == 0) {
            if (jsonObj.data.interName == 'getWatchSOS') {
              _this.callPolice(jsonObj.data.data)
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
    // 语音播报
    speech(data) {
      let readWords = `李光远长者在${data.address} 发出警报提示 请相关人员尽快处理`
      let url = "http://tts.baidu.com/text2audio?lan=zh&ctp=1&ie=UTF-8&text=" + encodeURI(readWords);
      let audioCon = new Audio(url);
      audioCon.src = url;
      audioCon.play();  //播放阅读
    }
  }
}
</script>

<style lang="scss" scoped>
$info-bj-color: rgba(299, 299, 299, 0.8);
$info-text-color: #333;
.monitor-container {
  height: calc(100% - 120px);
  .theme-box {
    position: fixed;
    width: 120px;
    right: 30px;
    top: 40vh;
    padding: 20px;
    text-align: left;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
    .theme-radio {
      margin: 5px 0;
      color: #111213;
    }
  }
  /deep/ .amap-marker-label {
    background-color: rgba(2, 206, 219, 0.6);
    border-color: #02cedb;
    border-radius: 4px;
    padding: 2px 5px;
    .info {
      color: #fff;
    }
  }
  /deep/ .amap-info-content {
    background-color: $info-bj-color;
    box-shadow: 0 0 5px #ddd;
    .oldman-info-box {
      position: relative;
      width: 370px;
      height: 180px;
      margin: 0 10px 0 20px;
      .oldman-info {
        position: relative;
        h4 {
          padding: 10px 0;
          font-weight: bold;
          font-size: 1.4em;
          color: #000;
          margin: 16px 0;
        }
        p {
          margin: 12px 0;
          color: $info-text-color;
          label {
            margin-right: 10px;
          }
          span {
          }
        }
        .time {
          position: absolute;
          left: 0;
          top: -16px;
          color: #f00;
          font-weight: bold;
          display: none;
          animation: call-police 0.4s linear infinite;
        }
      }
      .oldman-photo {
        position: absolute;
        right: 16px;
        top: 0px;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
    .amap-info-close {
      color: $info-text-color;
    }
  }
  /deep/ .amap-info-sharp {
    border-top-color: $info-bj-color;
  }
  /deep/ .amap-logo {
    display: none !important;
  }
  /deep/ .amap-copyright {
    display: none !important;
  }
}
</style>
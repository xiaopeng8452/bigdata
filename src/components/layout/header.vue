<template>
  <el-row class="layout-header">
    <el-row class="layout-header-line" :gutter="4">
      <el-col :span="7" class="height-full relative">
        <div class="head-arrow head-arrow-left arrow-left1"></div>
        <div class="head-arrow head-arrow-left arrow-left2"></div>
        <div class="head-arrow head-arrow-left arrow-left3"></div>
        <div class="head-arrow head-arrow-left arrow-left4"></div>
        <div class="head-arrow head-arrow-left arrow-left5"></div>
        <div class="head-arrow head-arrow-left arrow-left6"></div>
        <div class="head-arrow head-arrow-left arrow-left7"></div>
        <div class="head-arrow head-arrow-left arrow-left8"></div>
        <div class="head-arrow head-arrow-left arrow-left9"></div>
      </el-col>
      <el-col :span="10" class="height-full"></el-col>
      <el-col :span="7" class="height-full relative">
        <div class="head-arrow head-arrow-right arrow-right1"></div>
        <div class="head-arrow head-arrow-right arrow-right2"></div>
        <div class="head-arrow head-arrow-right arrow-right3"></div>
        <div class="head-arrow head-arrow-right arrow-right4"></div>
        <div class="head-arrow head-arrow-right arrow-right5"></div>
        <div class="head-arrow head-arrow-right arrow-right6"></div>
        <div class="head-arrow head-arrow-right arrow-right7"></div>
        <div class="head-arrow head-arrow-right arrow-right8"></div>
        <div class="head-arrow head-arrow-right arrow-right9"></div>
      </el-col>
    </el-row>
    <el-row class="layout-header-box" :gutter="4">
      <el-col :span="7">
        <el-row type="flex">
          <el-col :span="11" class="layout-time align-left m-t-sm">
            <p class="layout-time-date">{{ basicInfo.nowDate }}</p>
            <p class="layout-time-time">{{ basicInfo.nowTime }}</p>
          </el-col>
          <el-col :span="12" class="layout-menus">
            <el-row
              v-for="(item, index) in routes.slice(0, 2)"
              class="layout-menu"
              :key="index"
              :class="activeRoute === item.path ? 'layout-menu-active' : ''"
              @click.native="routerTo(item)"
              >{{ item.name }}
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="10" class="layout-header-title">
        <el-row type="flex" class="layout-header-title-box">
          <svg-icon class="layout-logo" icon-class="logo" />
          <h1 class="header-title">{{ basicInfo.title }}</h1>
        </el-row>
        <el-row class="layout-title-bg">
          <el-row class="layout-title-bg_line">
            <dv-border-box-8
              :color="['#01b6eb', '#ffffff']"
              backgroundColor="#01b6eb"
              :dur="80"
              class="m-l-n"
              style="width: calc(100% + 20px); height: 3px"
            />
          </el-row>
        </el-row>
      </el-col>
      <el-col :span="7">
        <el-row type="flex">
          <el-col :span="12" :offset="1" class="layout-menus">
            <!-- v-if="GLOBAL.userType" -->
            <template v-if="GLOBAL.userType">
              <el-row
                v-for="(item, index) in routes.slice(2, 4)"
                class="layout-menu"
                :class="activeRoute === item.path ? 'layout-menu-active' : ''"
                :key="index"
                @click.native="routerTo(item)"
                >{{ item.name }}
              </el-row>
              <router-link target="_blank" :to="{ path: '/nurse' }">
                <el-row class="layout-menu">护士监测</el-row>
              </router-link>
            </template>
          </el-col>
          <el-col :span="11" class="layout-weather align-right m-t-sm">
            <!-- <p class="layout-time-temperature">{{ basicInfo.temperature }}℃</p>
            <p class="layout-time-scene">{{ basicInfo.scene }}</p> -->
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { getNowDate } from '@/util/index.js'
import svgIcon from '@/components/SvgIcon'

export default {
  name: 'layoutHeader',
  components: {
    svgIcon
  },
  data() {
    return {
      basicInfo: {
        title: '瑞芝康健智慧养老大数据平台',
        nowDate: getNowDate('date'),
        nowTime: getNowDate('time'),
        temperature: '9~20',
        scene: '多云转晴'
      },
      menuActive: 0
    }
  },
  computed: {
    routes() {
      return this.$router.options.routes[0].children
    },
    activeRoute() {
      return this.$route.path
    },
    nurseStationUrl() {
      return '/nurseStation'
    }
  },
  mounted() {
    this.updateTime()
  },
  methods: {
    updateTime() {
      setInterval(() => {
        this.basicInfo.nowDate = getNowDate('date')
        this.basicInfo.nowTime = getNowDate('time')
      }, 1000)
    },
    routerTo(obj) {
      this.menuActive = this.routes.findIndex((item) => { return item.path === obj.path })
      this.$router.push({ path: obj.path })
    }
  }
}
</script>

<style lang="scss">
$rzkj-theme: #ea5413;
$rzkj-import: #00ffff;
$rzkj-data: #fff;
$rzkj-text-import: #37cfe6;

.layout-header {
  position: relative;
  margin: 1vh 0 1.5vh;
  .layout-header-line {
    position: absolute;
    width: 100%;
    height: 3px;
    top: 10px;
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      #02a3d9,
      #02a3d9,
      #02a3d9,
      rgba(0, 0, 0, 0)
    );
    .head-arrow {
      &::before {
        position: absolute;
        top: -9px;
        display: block;
        content: "";
        height: 10px;
        animation-name: arrowFlash;
        animation-duration: 9s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      &::after {
        position: absolute;
        top: 0px;
        display: block;
        content: "";
        height: 14px;
        animation-name: arrowFlash;
        animation-duration: 9s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
    }
    .head-arrow-left {
      &::before {
        transform: skew(45deg);
        -webkit-transform: skew(45deg);
        -moz-transform: skew(45deg);
        -o-transform: skew(45deg);
        -ms-transform: skew(45deg);
      }
      &::after {
        transform: skew(-45deg);
        -webkit-transform: skew(-45deg);
        -moz-transform: skew(-45deg);
        -o-transform: skew(-45deg);
        -ms-transform: skew(-45deg);
      }
    }
    .arrow-left1 {
      &::before {
        width: 22px;
        right: 30px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 1),
          rgba(1, 198, 226, 0.9)
        );
        animation-delay: 8s;
      }
      &::after {
        width: 22px;
        right: 30px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 1),
          rgba(1, 198, 226, 0.9)
        );
        animation-delay: 8s;
      }
    }
    .arrow-left2 {
      &::before {
        width: 20px;
        right: 2 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.9),
          rgba(1, 198, 226, 0.8)
        );
        animation-delay: 7s;
      }
      &::after {
        width: 20px;
        right: 2 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.9),
          rgba(1, 198, 226, 0.8)
        );
        animation-delay: 7s;
      }
    }
    .arrow-left3 {
      &::before {
        width: 18px;
        right: 3 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.8),
          rgba(1, 198, 226, 0.7)
        );
        animation-delay: 6s;
      }
      &::after {
        width: 18px;
        right: 3 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.8),
          rgba(1, 198, 226, 0.7)
        );
        animation-delay: 6s;
      }
    }
    .arrow-left4 {
      &::before {
        width: 16px;
        right: 4 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.7),
          rgba(1, 198, 226, 0.6)
        );
        animation-delay: 5s;
      }
      &::after {
        width: 16px;
        right: 4 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.7),
          rgba(1, 198, 226, 0.6)
        );
        animation-delay: 5s;
      }
    }
    .arrow-left5 {
      &::before {
        width: 14px;
        right: 5 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.6),
          rgba(1, 198, 226, 0.5)
        );
        animation-delay: 4s;
      }
      &::after {
        width: 14px;
        right: 5 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.6),
          rgba(1, 198, 226, 0.5)
        );
        animation-delay: 4s;
      }
    }
    .arrow-left6 {
      &::before {
        width: 12px;
        right: 6 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.5),
          rgba(1, 198, 226, 0.4)
        );
        animation-delay: 3s;
      }
      &::after {
        width: 12px;
        right: 6 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.5),
          rgba(1, 198, 226, 0.4)
        );
        animation-delay: 3s;
      }
    }
    .arrow-left7 {
      &::before {
        width: 10px;
        right: 7 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.4),
          rgba(1, 198, 226, 0.3)
        );
        animation-delay: 2s;
      }
      &::after {
        width: 10px;
        right: 7 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.4),
          rgba(1, 198, 226, 0.3)
        );
        animation-delay: 2s;
      }
    }
    .arrow-left8 {
      &::before {
        width: 8px;
        right: 8 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.3),
          rgba(1, 198, 226, 0.2)
        );
        animation-delay: 1s;
      }
      &::after {
        width: 8px;
        right: 8 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.3),
          rgba(1, 198, 226, 0.2)
        );
        animation-delay: 1s;
      }
    }
    .arrow-left9 {
      &::before {
        width: 6px;
        right: 9 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.2),
          rgba(1, 198, 226, 0.1)
        );
        animation-delay: 0s;
      }
      &::after {
        width: 10px;
        right: 9 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.2),
          rgba(1, 198, 226, 0.1)
        );
        animation-delay: 0s;
      }
    }
    // right
    .head-arrow-right {
      &::before {
        transform: skew(-45deg);
        -webkit-transform: skew(-45deg);
        -moz-transform: skew(-45deg);
        -o-transform: skew(-45deg);
        -ms-transform: skew(-45deg);
      }
      &::after {
        transform: skew(45deg);
        -webkit-transform: skew(45deg);
        -moz-transform: skew(45deg);
        -o-transform: skew(45deg);
        -ms-transform: skew(45deg);
      }
    }
    .arrow-right1 {
      &::before {
        width: 22px;
        left: 30px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 1),
          rgba(1, 198, 226, 0.9)
        );
        animation-delay: 8s;
      }
      &::after {
        width: 22px;
        left: 30px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 1),
          rgba(1, 198, 226, 0.9)
        );
        animation-delay: 8s;
      }
    }
    .arrow-right2 {
      &::before {
        width: 20px;
        left: 2 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.9),
          rgba(1, 198, 226, 0.8)
        );
        animation-delay: 7s;
      }
      &::after {
        width: 20px;
        left: 2 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.9),
          rgba(1, 198, 226, 0.8)
        );
        animation-delay: 7s;
      }
    }
    .arrow-right3 {
      &::before {
        width: 18px;
        left: 3 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.8),
          rgba(1, 198, 226, 0.7)
        );
        animation-delay: 6s;
      }
      &::after {
        width: 18px;
        left: 3 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.8),
          rgba(1, 198, 226, 0.7)
        );
        animation-delay: 6s;
      }
    }
    .arrow-right4 {
      &::before {
        width: 16px;
        left: 4 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.7),
          rgba(1, 198, 226, 0.6)
        );
        animation-delay: 5s;
      }
      &::after {
        width: 16px;
        left: 4 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.7),
          rgba(1, 198, 226, 0.6)
        );
        animation-delay: 5s;
      }
    }
    .arrow-right5 {
      &::before {
        width: 14px;
        left: 5 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.6),
          rgba(1, 198, 226, 0.5)
        );
        animation-delay: 4s;
      }
      &::after {
        width: 14px;
        left: 5 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.6),
          rgba(1, 198, 226, 0.5)
        );
        animation-delay: 4s;
      }
    }
    .arrow-right6 {
      &::before {
        width: 12px;
        left: 6 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.5),
          rgba(1, 198, 226, 0.4)
        );
        animation-delay: 3s;
      }
      &::after {
        width: 12px;
        left: 6 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.5),
          rgba(1, 198, 226, 0.4)
        );
        animation-delay: 3s;
      }
    }
    .arrow-right7 {
      &::before {
        width: 10px;
        left: 7 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.4),
          rgba(1, 198, 226, 0.3)
        );
        animation-delay: 2s;
      }
      &::after {
        width: 10px;
        left: 7 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.4),
          rgba(1, 198, 226, 0.3)
        );
        animation-delay: 2s;
      }
    }
    .arrow-right8 {
      &::before {
        width: 8px;
        left: 8 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.3),
          rgba(1, 198, 226, 0.2)
        );
        animation-delay: 1s;
      }
      &::after {
        width: 8px;
        left: 8 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.3),
          rgba(1, 198, 226, 0.2)
        );
        animation-delay: 1s;
      }
    }
    .arrow-right9 {
      &::before {
        width: 6px;
        left: 9 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.2),
          rgba(1, 198, 226, 0.1)
        );
        animation-delay: 0s;
      }
      &::after {
        width: 10px;
        left: 9 * 32px;
        background-image: linear-gradient(
          to left,
          rgba(1, 198, 226, 0.2),
          rgba(1, 198, 226, 0.1)
        );
        animation-delay: 0s;
      }
    }
    @keyframes arrowFlash {
      0% {
        opacity: 1;
      }
      25% {
        opacity: 0.6;
      }
      50% {
        opacity: 0.2;
      }
      75% {
        opacity: 0.6;
      }
      100% {
        opacity: 1;
      }
    }
  }
  .layout-header-box {
    .layout-header-title {
      background-color: #060c46;
      .layout-header-title-box {
        justify-content: center;
        margin-bottom: 8px;
        padding-top: 10px;
      }
    }
  }

  .layout-time,
  .layout-weather {
    color: $rzkj-text-import;
    height: 76px;
    .layout-time-date,
    .layout-time-temperature {
      font-size: 24px;
      letter-spacing: 2px;
      line-height: 36px;
      margin: 0;
    }
    .layout-time-time,
    .layout-time-scene {
      margin: 0;
      font-weight: bold;
      font-size: 30px;
      letter-spacing: 6px;
      line-height: 40px;
    }
    // .layout-time-temperature {
    // }
    .layout-time-scene {
      font-size: 24px;
    }
  }
  .layout-title-bg {
    position: relative;
    &::before {
      display: block;
      content: "";
      position: absolute;
      width: 3px;
      height: 80px;
      bottom: -8px;
      left: 20px;
      transform: rotateZ(-40deg);
      background-color: #01aae0;
    }
    &:after {
      display: block;
      content: "";
      position: absolute;
      width: 3px;
      height: 80px;
      bottom: -8px;
      right: 20px;
      transform: rotateZ(40deg);
      background-color: #01aae0;
    }
    .layout-title-bg_line {
      width: calc(100% - 92px);
      margin: 0 auto;
      overflow: hidden;
    }
  }
}
.layout-logo {
  font-size: 2.875rem;
  margin-right: 20px;
  margin-top: 5px;
}
.header-title {
  color: #ea5413;
  margin: 0;
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: 4px;
}
.layout-menus {
  display: flex;
  align-self: flex-end;
  justify-content: space-between;
  .layout-menu {
    width: 6vw;
    height: 2.2vw;
    line-height: 2.3vw;
    cursor: pointer;
    font-size: 0.875rem;
    color: #00ffff;
    background: url(../../assets/img/head-menu.png) no-repeat center;
    background-size: contain;
  }
  .layout-menu-active {
    color: #ec7848;
    background-image: url(../../assets/img/head-menu-a.png);
  }
}
</style>
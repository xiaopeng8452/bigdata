<template>
  <el-row
    class="m-l-n-md m-r-n-md"
    style="height: calc(97vh - 92px)"
    type="flex"
  >
    <dv-decoration-9 v-if="loading" class="load-element"
      >{{ loadNum }}%
    </dv-decoration-9>
    <el-row v-show="!loading" type="flex" class="div-full relative">
      <el-row class="institution-box">
        <el-col
          class="institution-item"
          v-for="(item, index) in institutions"
          :class="activeIndex === index ? 'institution-active' : ''"
          @click.native="changeUs(item.mainFigure, index)"
          :key="index"
        >
          <el-image class="institution-item_img" :src="item.thumb" fit="fit" />
          <el-row class="institution-item_text">{{ item.orgName }}</el-row>
        </el-col>
      </el-row>
      <el-row
        v-if="!isVr"
        class="institution-main-figure"
        :style="{
          'background-image':
            'url(' + institutions[activeIndex].mainFigure + ')',
        }"
      >
        <div class="main-figure-info">
          <div class="main-figure-info-block">
            <h5 class="main-figure-info-block_title">机构介绍</h5>
            <ul class="main-figure-info-block_lists">
              <li>名称：{{ institutions[activeIndex].fullName }}</li>
              <li>地址：{{ institutions[activeIndex].address }}</li>
              <li>
                星级：<el-rate
                  v-model="institutions[activeIndex].starLevel"
                  :max="institutions[activeIndex].starLevel"
                  disabled
                />
              </li>
            </ul>
          </div>
          <div class="main-figure-info-block">
            <h5 class="main-figure-info-block_title">人员介绍</h5>
            <ul class="main-figure-info-block_lists">
              <li>员工总数：{{ institutions[activeIndex].allSum }}</li>
              <li>护理员数：{{ institutions[activeIndex].nursingNum }}</li>
            </ul>
          </div>
        </div>
        <div class="main-figure-tags">
          <div
            class="main-figure-tag"
            v-for="(tag, index) in institutions[activeIndex].tags"
            :style="{ top: tag.top, left: tag.left }"
            :key="index"
            @click="chooseVr(tag.vrUrl)"
          >
            <span class="main-figure-tag_text">{{ tag.name }}</span>
            <i class="el-icon-location main-figure-tag_icon" />
          </div>
        </div>
      </el-row>
      <dv-decoration-9 v-else-if="isVr === 1" class="load-element">
        {{ loadNum }}%
      </dv-decoration-9>
      <iframe
        v-show="isVr === 2"
        :src="activeVrUrl"
        width="100%"
        height="100%"
        frameborder="no"
        border="0"
        class="institution-item-iframe"
      ></iframe>
    </el-row>
  </el-row>
</template>

<script>
import { getOrganStatistics } from '@/request/api.js'
export default {
  data() {
    return {
      loading: true,
      loadNum: 0,
      activeIndex: 0,
      isVr: 0,
      activeVrUrl: '',
      institutions: [
        {
          orgName: '老年公寓',
          orgInfoId: 140,
          thumb: './static/slt1.png',
          fullName: '瑞芝康健老年公寓',
          address: '南京市江宁区兴民南路78号',
          starLevel: 5,
          allSum: 0,
          nursingNum: 0,
          mainFigure: './static/fst1.png',
          tags: [
            {
              name: '大门',
              vrUrl: 'http://360vryun.com/t/9298e6c689fafbf0',
              top: '76vh',
              left: '34vw'
            },
            {
              name: '公寓楼',
              vrUrl: 'http://360vryun.com/t/789ab2b7f5872107',
              top: '28vh',
              left: '58vw'
            }
          ]
        },
        {
          orgName: '滨江颐养院',
          orgInfoId: 142,
          thumb: './static/slt2.png',
          fullName: '瑞芝康健滨江颐养院',
          address: '南京市滨江开发区陆郎镇河西社区汤铜路88号',
          starLevel: 4,
          allSum: 0,
          nursingNum: 0,
          mainFigure: './static/fst2.png',
          tags: [
            {
              name: '大门',
              vrUrl: 'http://360vryun.com/t/68be20d5f99cbd57',
              top: '76vh',
              left: '73vw'
            },
          ]
        },
        {
          orgName: '禄口颐养院',
          orgInfoId: 141,
          thumb: './static/slt3.png',
          fullName: '瑞芝康健禄口颐养院',
          address: '南京市江宁区禄口街道正阳路175号',
          starLevel: 4,
          allSum: 0,
          nursingNum: 0,
          vrUrl: ''
        }
      ],

    }
  },
  mounted() {
    this.getData()
    this.creatIframe()
  },
  methods: {
    getData() {
      getOrganStatistics({}).then(res => {
        res.data.forEach((item, index) => {
          this.institutions.forEach((list, index1) => {
            if (item.orgInfoId === list.orgInfoId) {
              this.institutions[index1].orgName = item.orgName
              this.institutions[index1].allSum = item.allSum
              this.institutions[index1].nursingNum = item.nursingNum
            }
          })
        })
      }).catch(errorMsg => {
        console.log(errorMsg)
      })


    },
    creatIframe() {
      let interval = setInterval(() => {
        if (this.loadNum < 100) {
          this.loadNum++
        } else {
          clearInterval(interval)
          this.loading = false
          this.loadNum = 0
        }
      }, 2)
    },
    changeUs(pic, index) {
      if (this.isVr && index >= 0) {
        this.$confirm(`此操作将返回${this.institutions[index].orgName}机构介绍首页, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.activeIndex = index
          this.isVr = false
        }).catch(() => {

        });
      } else {
        this.activeIndex = index
        this.isVr = false
        if (!pic) {
          this.$message({
            message: `当前机构暂无VR虚拟场景，为您自动跳转${this.institutions[0].orgName}场景`,
            type: 'warning'
          });
          setTimeout(() => {
            this.activeIndex = 0
          }, 1000);
        }
      }

    },
    chooseVr(url) {
      let _this = this
      this.activeVrUrl = url
      _this.isVr = 1
      let interval = setInterval(() => {
        if (_this.loadNum < 100) {
          _this.loadNum++
        } else {
          clearInterval(interval)
          _this.isVr = 2
          _this.loadNum = 0
        }
      }, 20)
    }
  }
}
</script>

<style lang="scss" scoped>
$main-color: #00eaff;

.load-element {
  width: 150px;
  height: 150px;
  margin: auto;
  color: $main-color;
  font-size: 26px;
  font-weight: bold;
  z-index: 4;
}
.institution-box {
  position: absolute;
  width: 24vh;
  top: 4vh;
  left: 4vw;
  z-index: 10;
  .institution-item {
    margin-top: 2vh;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    transition: all 1s;
    width: 26vh;
    height: 17vh;
    cursor: pointer;
    .institution-item_img {
      width: 100%;
      height: 100%;
      opacity: 0.7;
    }
    .institution-item_text {
      position: absolute;
      width: 100%;
      height: 40px;
      line-height: 40px;
      bottom: 0;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.4);
      color: $main-color;
    }
  }
  .institution-active {
    transform: scale(1.08);
    // box-shadow: 0 0 4px #000;
    .institution-item_img {
      opacity: 1;
    }
  }
}
.institution-main-figure {
  width: 100%;
  height: 100%;
  z-index: 5;
  background-size: cover;
  background-repeat: no-repeat;
  .main-figure-info {
    position: absolute;
    right: 3vh;
    top: 3vh;
    width: 588px;
    height: 327px;
    background: url("../../assets/img/vr_info_bj.png") no-repeat center;
    padding: 30px 50px 0;
    .main-figure-info-block {
      text-align: left;
      border-bottom: 1px solid #1b6483;
      letter-spacing: 1px;
      .main-figure-info-block_title {
        font-size: 0.95em;
        color: $main-color;
        border-left: 4px solid $main-color;
        padding-left: 10px;
        margin: 16px 0;
        line-height: 14px;
      }
      .main-figure-info-block_lists {
        padding-left: 1vw;
        li {
          display: flex;
          margin-bottom: 1vh;
          list-style: none;
        }
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
  .main-figure-tags {
    .main-figure-tag {
      position: absolute;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      .main-figure-tag_text {
        background-color: rgba(0, 48, 90, 0.7);
        box-shadow: 0 0 5px #00f4fd;
        padding: 2px 12px 5px;
        color: $main-color;
        border-radius: 8px;
      }
      .main-figure-tag_icon {
        font-size: 1.25em;
        color: $main-color;
        animation: iconFlash 1s ease-in-out infinite;
      }
    }
  }
}
.institution-item-iframe {
  z-index: 2;
}
@keyframes iconFlash {
  0% {
    margin-top: 2px;
  }
  50% {
    margin-top: 4px;
  }
  50% {
    margin-top: 6px;
  }
  70% {
    margin-top: 4px;
  }
  100% {
    margin-top: 2px;
  }
}
</style>
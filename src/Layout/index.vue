<template>
  <dv-full-screen-container>
    <dv-loading v-if="!showContainer" style="margin: auto"
      >Loading...</dv-loading
    >
    <el-row v-else class="layout-container">
      <layout-header></layout-header>
      <router-view :key="key" />
    </el-row>
  </dv-full-screen-container>
</template>

<script>
import layoutHeader from '@/components/layout/header.vue'
import { getUrlParam } from '@/util/index.js'
import { getHomeData } from '@/request/api.js'
export default {
  name: 'Layout',
  components: {
    layoutHeader
  },
  data() {
    return {
      showContainer: this.GLOBAL.loginStatus
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  mounted() {
    sessionStorage.getItem('token') || sessionStorage.setItem('token', getUrlParam('param'));
    this.verifyToken()
  },
  methods: {
    verifyToken() {
      getHomeData({}).then(res => {
        if (res.code === 0) {
          sessionStorage.getItem('loginPwd') || (this.GLOBAL.userType = 0)
          this.showContainer = true
        } else if (res.code === 2) {
          this.openPrompt()
        }
        else {
          this.GLOBAL.userType = 0
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      }).catch(errorMsg => {
        console.log(errorMsg)
      })
    },
    openPrompt() {
      this.$prompt('请输入大数据平台访问密码', '提示', {
        confirmButtonText: '确定',
        showClose: false,
        showCancelButton: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        inputType: 'password',
        inputValidator: function (value) {
          return value.length > 5
        },
        inputErrorMessage: '密码长度不少于6位数',
      }).then(({ value, msg }) => {
        // this.GLOBAL.loginPwd = value
        sessionStorage.setItem('loginPwd', value);
        getHomeData({}).then(res => {
          if (res.code === 0) {
            this.GLOBAL.userType = 1
            this.GLOBAL.loginStatus = true
            this.showContainer = true
          } else {
            this.openPrompt()
            this.$message.error('密码错误，请重新输入密码');
          }
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '取消输入'
        });
      });
    }
  }
}
</script>

<style scoped>
#dv-full-screen-container {
  /* background-color: #1b2f66; */
  background: url(../assets/bj.jpg) center;
  background-size: contain;
}
.layout-container {
  padding: 1.5vh 1.125vw;
}
</style>

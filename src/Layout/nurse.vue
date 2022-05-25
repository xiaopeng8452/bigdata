<template>
  <dv-full-screen-container class="nurse-station-bg">
    <el-header>
      <svg-icon class="nurse-station-logo" icon-class="logo2" />
      <span class="nurse-station-title">{{ title }}</span>
    </el-header>
    <el-row class="nurse-station-menus">
      <div
        class="nurse-menu"
        v-for="(item, index) in routes"
        :class="{ active: activeRoute == item.path }"
        :key="index"
        @click="changeMenu(item)"
      >
        <div class="text">{{ item.name }}</div>
        <!-- <div v-if="index" class="count">1</div> -->
      </div>
    </el-row>
    <router-view :key="key" :active-menu="activeMenu" />
  </dv-full-screen-container>
</template>

<script>
export default {
  name: 'nurseLayout',
  data() {
    return {
      title: '瑞芝康健护士站监控系统',
      activeMenu: 0
    }
  },
  computed: {
    key() {
      return this.$route.path
    },
    routes() {
      return this.$router.options.routes[1].children
    },
    activeRoute() {
      return this.$route.path
    },
  },
  methods: {
    changeMenu(obj) {
      this.activeMenu = this.routes.findIndex((item) => { return item.path === obj.path })
      this.$router.push({ path: obj.path })
    }
  }
}
</script>

<style lang="scss">
$menu-color: rgb(66, 94, 255);
$menu-active-color: #ff783d;
.nurse-station-bg {
  padding: 20px 0;
  background: url(../assets/bj.jpg) center;
  background-size: contain;
  .nurse-station-logo {
    font-size: 3.2rem;
    transform: translate(-5%, 10%);
  }
  .nurse-station-title {
    font-size: 2.2rem;
    font-weight: bold;
    color: #ea5413;
    letter-spacing: 6px;
    text-shadow: #fff 2px 0 2px, #fff 0 2px 2px, #fff -2px 0 2px,
      #fff 0 -2px 2px;
  }
  .nurse-station-menus {
    z-index: 10;
    position: fixed;
    left: 0;
    bottom: 30vh;
    width: 40px;
    .nurse-menu {
      position: relative;
      z-index: 1;
      padding: 0 12px 0 8px;
      transform: scale(0.8);
      transform-origin: left;
      transition: transform 0.2s;
      background-color: $menu-color;
      cursor: pointer;
      color: #ffffff;
      .text {
        width: 20px;
      }
      &::before,
      &::after {
        position: absolute;
        left: 0;
        display: block;
        content: "";
        width: 40px;
        height: 20px;
      }
      &:not(.active)::before {
        top: -19px;
        background-color: $menu-color;
        border-top-right-radius: 10px;
      }
      &:not(.active)::after {
        bottom: -19px;
        border-bottom-right-radius: 10px;
        background-color: $menu-color;
      }
    }
    .active {
      background-color: $menu-active-color;
      color: #fff;
      transform: scale(1);
      z-index: 2;
      margin-top: 22px;
      margin-bottom: 22px;
      &::before {
        top: -19px;
        background-color: $menu-active-color;
        border-top-right-radius: 12px;
      }
      &::after {
        bottom: -19px;
        border-bottom-right-radius: 12px;
        background-color: $menu-active-color;
      }
    }
  }
}
</style>
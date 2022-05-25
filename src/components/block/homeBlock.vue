<template>
  <el-row class="home-block">
    <el-row class="home-block-head">
      <el-col>{{ title }}</el-col>
    </el-row>
    <el-row class="home-block-container"><slot></slot></el-row>
  </el-row>
</template>

<script>
export default {
  name: 'homeBlock',
  props: {
    title: {
      type: String,
      defult: ''
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.home-block {
  padding-bottom: 2vh;
  padding-top: 0.5vh;
  .home-block-head {
    position: relative;
    height: 2.5em;
    line-height: 2.5em;
    font-size: 1.2em;
    color: #44f0e9;
    background-image: linear-gradient(
      rgba(29, 252, 244, 0.6),
      rgba(29, 252, 244, 0.3),
      rgba(29, 252, 244, 0.1)
    );
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
    &::before {
      display: block;
      content: "";
      width: 2.5vw;
      height: 100%;
      position: absolute;
      left: 26%;
      background: url("../../assets/img/head-left.png") no-repeat right center;
    }
    &::after {
      display: block;
      content: "";
      width: 2.5vw;
      padding: 1px 0;
      height: 100%;
      position: absolute;
      right: 26%;
      background: url("../../assets/img/head-right.png") no-repeat left center;
    }
  }
  .home-block-container {
    padding: 10px 20px;
    height: calc(100% - 50px);
    background-color: rgba(5, 36, 105, 0.5);
    border-bottom-left-radius: 1em;
    border-bottom-right-radius: 1em;
  }
}
</style>
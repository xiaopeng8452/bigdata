<template>
  <el-row class="block">
    <el-row class="block-head">
      <el-col v-if="title">{{ title }}</el-col>
      <el-row v-if="tags" type="flex" style="justify-content: center">
        <span
          v-for="(tag, index) in tags"
          class="head-tag"
          :class="activeTag === index ? 'head-tag-active' : ''"
          :key="index"
          @click="changeTag(index)"
        >
          {{ tag }}
        </span>
      </el-row>
    </el-row>
    <el-row class="block-container"><slot></slot></el-row>
  </el-row>
</template>

<script>
export default {
  name: 'statisticalBlock',
  props: {
    title: {
      type: String,
      defult: ''
    },
    tags: {
      type: Array,
      defult: () => ([])
    }
  },
  data() {
    return {
      activeTag: 0
    }
  },
  methods: {
    changeTag(index) {
      if (this.activeTag !== index) {
        this.activeTag = index
        this.$emit('changeTag', index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$import-color: #00eaff;

.block {
  // padding-bottom: 2vh;
  // padding-top: 0.5vh;
  .block-head {
    position: relative;
    height: 2.5em;
    line-height: 2.5em;
    font-size: 1.2em;
    color: #44f0e9;
    background-image: linear-gradient(
      rgba(29, 252, 244, 0.4),
      rgba(29, 252, 244, 0.2),
      rgba(29, 252, 244, 0)
    );
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
    .head-tag {
      border: 1px solid $import-color;
      color: $import-color;
      border-radius: 10px;
      padding: 2px 1.6vw;
      margin: 0.5em 10px;
      height: 1.5em;
      line-height: 1.3em;
      cursor: pointer;
    }
    .head-tag-active {
      background-color: $import-color;
      color: #000;
    }
  }
  .block-container {
    padding: 10px 20px;
    height: calc(100% - 50px);
    background-color: rgba(5, 36, 105, 0.2);
    border-bottom-left-radius: 1em;
    border-bottom-right-radius: 1em;
  }
}
</style>
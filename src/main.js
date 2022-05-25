// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import dataV from '@jiaminghi/data-view'
import echarts from 'echarts'
import '@/icons' // icon
import '@/styles/index.scss' // global css
import global from '@/util/global'

Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.prototype.$echarts = echarts
Vue.prototype.GLOBAL = global   // 挂载全局变量

Vue.use(dataV);
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

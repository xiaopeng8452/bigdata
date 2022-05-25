import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/Layout'
import nurseLayout from '@/Layout/nurse'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      icon: 'component',
      redirect: 'home',
      component: Layout,
      children: [
        {
          path: '/home',
          name: '首页',
          component: () => import('@/views/home/index')
        },
        {
          path: '/aboutUs',
          name: '机构介绍',
          component: () => import('@/views/aboutUs/index')
        },
        {
          path: '/statistical',
          name: '统计分析',
          component: () => import('@/views/statistical/edit')
        },
        // {
        //   path: '/nurseStation',
        //   name: '护士监控',
        //   component: () => import('@/views/nurseStation/index')
        // }
      ]
    },
    {
      path: '/monitorCenter',
      name: '护士站监测系统',
      redirect: 'nurse',
      component: nurseLayout,
      children: [
        {
          path: '/nurse',
          name: '护士监控',
          component: () => import('@/views/monitorCenter/index')
        },
        {
          path: '/bracelet',
          name: '手环监测',
          component: () => import('@/views/monitorCenter/bracelet')
        }
      ]
    }
  ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
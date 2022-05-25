import { get, post } from './http'

// 获取登录状态及大屏首页数据
export const getHomeData = obj => get('/api/bigScreen/getHomeData', obj);

// 获取实时消息接口
export const getHomeMsg = obj => get('/api/bigScreen/getHomeMsg', obj);

// 获取机构介绍信息接口
export const getOrganStatistics = obj => get('/api/bigScreen/getOrganStatistics', obj);

// 获取统计分析左侧数据接口
export const getStatisticsNum = obj => get('/api/bigScreen/getStatisticsNum', obj);

// 获取统计分析右侧数据接口
export const getStatisticsNumByTime = obj => get('/api/bigScreen/getStatisticsNumByTime', obj);

// 测试post请求接口
export const selectApplicationDetail = obj => post('/app/evalutionCenter/selectApplicationDetail', obj);
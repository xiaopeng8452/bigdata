import Mock from 'mockjs'

// 获取登录状态及大屏首页数据
Mock.mock('/api/bigScreen/getHomeData', {
  "code": 0,
  "msg": "success",
  "total": null,
  "rows": null,
  "data": {
    "limitType": "1",
    "bdOrgInfoList": [
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:00",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "orgInfoId": 150662,
        "orgName": "浦口养老院",
        "bedSum": 7,
        "liveSum": 4,
        "liveRate": "57",
        "staffSum": 1,
        "nurseSum": 0,
        "csysLocation": "118.916284,32.030148",
        "deptType": "1"
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:00",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "orgInfoId": 150663,
        "orgName": "滨江养老院",
        "bedSum": 1,
        "liveSum": 0,
        "liveRate": "0",
        "staffSum": 9,
        "nurseSum": 3,
        "csysLocation": "118.73295,32.033641",
        "deptType": "1"
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:00",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "orgInfoId": 150664,
        "orgName": "禄口敬老院",
        "bedSum": 7,
        "liveSum": 6,
        "liveRate": "86",
        "staffSum": 3,
        "nurseSum": 0,
        "csysLocation": "118.834573,32.040626",
        "deptType": "1"
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:00",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "orgInfoId": 150665,
        "orgName": "江宁老年公寓",
        "bedSum": 3,
        "liveSum": 3,
        "liveRate": "100",
        "staffSum": 5,
        "nurseSum": 2,
        "csysLocation": "118.800241,32.301593",
        "deptType": "1"
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:00",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "orgInfoId": 150666,
        "orgName": "老年公寓",
        "bedSum": 4,
        "liveSum": 3,
        "liveRate": "75",
        "staffSum": 1,
        "nurseSum": 0,
        "csysLocation": "118.719904,32.184279",
        "deptType": "2"
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:00",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "orgInfoId": 150667,
        "orgName": "测试测试",
        "bedSum": 0,
        "liveSum": 0,
        "liveRate": "0",
        "staffSum": 0,
        "nurseSum": 0,
        "csysLocation": "0,0",
        "deptType": "1"
      }
    ],
    "bdAgeDistList": [
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:01",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "ageDistId": 138971,
        "ageRange": "60以下",
        "oldmanCount": 8
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:01",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "ageDistId": 138972,
        "ageRange": "60-70",
        "oldmanCount": 8
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:01",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "ageDistId": 138973,
        "ageRange": "70-80",
        "oldmanCount": 2
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:01",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "ageDistId": 138974,
        "ageRange": "80-90",
        "oldmanCount": 3
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:01",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "ageDistId": 138975,
        "ageRange": "90以上",
        "oldmanCount": 2
      }
    ],
    "bdAddrDistList": [
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:00",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "addrDistId": 70598,
        "regionName": "玄武区",
        "oldmanSum": 22
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:00",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "addrDistId": 70599,
        "regionName": "秦淮区",
        "oldmanSum": 1
      },
      {
        "searchValue": null,
        "createBy": null,
        "createTime": "2021-04-02 08:46:00",
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "params": {},
        "addrDistId": 70600,
        "regionName": "鼓楼区",
        "oldmanSum": 1
      }
    ],
    "allOrgSum": 6,
    "allStaffSum": 19,
    "allOldmanSum": 16
  }
})

// 获取实时消息接口
Mock.mock('/api/bigScreen/getHomeMsg', {
  "code": 0,
  "msg": "success",
  "total": null,
  "rows": null,
  "data": []
})

// 获取机构介绍信息接口
Mock.mock('/api/bigScreen/getOrganStatistics', {
  "code": 0,
  "msg": "success",
  "total": null,
  "rows": null,
  "data": []
})

// 获取统计分析左侧数据接口
Mock.mock('/api/bigScreen/getStatisticsNum', {
  "code": 0,
  "msg": "success",
  "total": null,
  "rows": null,
  "data": []
})

// 获取统计分析右侧数据接口
Mock.mock('/api/bigScreen/getStatisticsNumByTime', {
  "code": 0,
  "msg": "success",
  "total": null,
  "rows": null,
  "data": []
})

// 测试post请求接口
Mock.mock('/api/bigScreen/getHomeMsg', {
  "code": 0,
  "msg": "success",
  "total": null,
  "rows": null,
  "data": []
})
/* eslint-disable */
export default {
  "errcode": 0,
  "errmsg": "",
  "data": [{
      "id": "100",
      "name": "首页",
      "icon": "home_home",
      "href": "home",
      "child": []
    },
    {
      "id": "150",
      "name": "设备管理",
      "icon": "device_mage",
      "href": "device",
      "child": [
        { "id": "151", "name": "产品概述", "icon": "", "href": "deviceSummary" },
        { "id": "152", "name": "设备管理", "icon": "", "href": "deviceManage" },
        { "id": "153", "name": "非智能设备", "icon": "", "href": "StupidManage" },
        { "id": "154", "name": "设备地图", "icon": "", "href": "deviceMap" }
      ]
    },
    {
      "id": "200",
      "name": "账号管理",
      "icon": "account_mage",
      "href": "admin",
      "child": [
        { "id": "201", "name": "服务人员审核", "icon": "", "href": "adminReview" },
        { "id": "202", "name": "前端账号管理", "icon": "", "href": "adminFrontend" },
        { "id": "203", "name": "运营账号管理", "icon": "", "href": "adminBackend" },
        { "id": "204", "name": "代理商账号管理", "icon": "", "href": "adminAgent" }
      ]
    },
    {
      "id": "250",
      "name": "用户管理",
      "icon": "user_mage",
      "href": "user",
      "child": [
        { "id": "251", "name": "用户画像", "icon": "", "href": "userPersonas" },
        { "id": "252", "name": "用户列表", "icon": "", "href": "userList" }
      ]
    },
    {
      "id": "300",
      "name": "滤芯管理",
      "icon": "filter_mage",
      "href": "filter",
      "child": [
        { "id": "301", "name": "滤芯防伪管理", "icon": "", "href": "filterManage" }
      ]
    },
    {
      "id": "350",
      "name": "告警与推送",
      "icon": "alarm_icon",
      "href": "push",
      "child": [
        { "id": "351", "name": "滤芯更换提醒", "icon": "", "href": "pushRemind" },
        { "id": "352", "name": "信息推送", "icon": "", "href": "pushPush" },
        { "id": "353", "name": "信息推送记录", "icon": "", "href": "PushInfoRecord" },
        { "id": "354", "name": "用户反馈管理", "icon": "", "href": "pushFeedback" },
        { "name": "咨询推送记录", "icon": "", "href": "PushConsultRecord" },
        { "name": "广告图片设置", "icon": "", "href": "PushAdPicture" },
        { "id": "355", "name": "设备报警记录", "icon": "", "href": "PushAlarmRecord" },
        { "id": "356", "name": "推送模板管理", "icon": "", "href": "pushTemplate" }
      ]
    },
    {
      "id": "400",
      "name": "服务管理",
      "icon": "service_mage",
      "href": "serve",
      "child": [
        { "id": "401", "name": "待处理订单", "icon": "", "href": "serveWaiting" },
        { "id": "402", "name": "处理中订单", "icon": "", "href": "serveHandling" },
        { "id": "403", "name": "已处理订单", "icon": "", "href": "serveSolved" }
      ]
    },
    {
      "name": "财务系统",
      "icon": "home_home",
      "href": "finance",
      "hasChild": false,
      "child": [
        { "name": "财务管理", "icon": "", "href": "FinanceManage" },
      ]
    },
    {
      "name": "租赁1管理",
      "icon": "service_mage",
      "href": "rent",
      "child": [
        { "name": "租赁规则列表", "icon": "", "href": "RentRuleList" },
        { "name": "设备规则管理", "icon": "", "href": "RentRuleManage" }
      ]
    },
    // {
    //   "id": "450",
    //   "name": "升级管理",
    //   "icon": "service_mage",
    //   "href": "upgrade",
    //   "child": [
    //     { "id": "451", "name": "版本管理", "icon": "", "href": "upgradeVersion" },
    //     // { "name": "创建升级任务", "icon": "", "href": "upgradeCreate" },
    //     { "id": "452", "name": "升级记录查询", "icon": "", "href": "upgradeRecord" }
    //   ]
    // },
    {
      "id": "500",
      "name": "系统设置",
      "icon": "system_set",
      "href": "system",
      "child": [
        // { "name": "产品型号设置", "icon": "", "href": "SystemModelSet" },
        // { "name": "产品批次维护", "icon": "", "href": "SystemBatch" },
        { "id": "501", "name": "参数设置", "icon": "", "href": "SystemSetting" }
      ]
    },
    {
      "id": "550",
      "name": "系统日志",
      "icon": "log_manage",
      "href": "log",
      "child": [
        { "id": "551", "name": "人员登录信息", "icon": "", "href": "logUserinfo" },
        { "id": "552", "name": "账号分配信息", "icon": "", "href": "logAssign" }
      ]
    }
  ]
}

/* eslint-disable */
export default {
  "errcode": 0,
  "errmsg": "",
  "data": [{
      "memu_title": "首页",
      "icon": "home_home",
      "hash": "home",
      "hasChild": false,
      "child": []
    }, {
      "memu_title": "设备管理",
      "icon": "device_mage",
      "hash": "device",
      "hasChild": true,
      "child": [
        { "memu_title": "产品概述", "icon": "", "hash": "deviceSummary" },
        { "memu_title": "设备管理", "icon": "", "hash": "deviceManage" },
        { "memu_title": "设备地图", "icon": "", "hash": "deviceMap" }
      ]
    },
    {
      "memu_title": "账号管理",
      "icon": "account_mage",
      "hash": "admin",
      "child": [
        { "memu_title": "服务人员审核", "icon": "", "hash": "adminReview" },
        { "memu_title": "前端账号管理", "icon": "", "hash": "adminFrontend" },
        { "memu_title": "运营账号管理", "icon": "", "hash": "adminBackend" },
        { "memu_title": "代理商账号管理", "icon": "", "hash": "adminAgent" }
      ]
    },
    {
      "memu_title": "用户管理",
      "icon": "user_mage",
      "hash": "user",
      "child": [
        { "memu_title": "用户画像", "icon": "", "hash": "userPersonas" },
        { "memu_title": "用户列表", "icon": "", "hash": "userList" }
      ]
    },
    {
      "memu_title": "滤芯管理",
      "icon": "filter_mage",
      "hash": "filter",
      "child": [
        { "memu_title": "滤芯防伪管理", "icon": "", "hash": "filterManage" }
      ]
    },
    {
      "memu_title": "告警与推送",
      "icon": "alarm_icon",
      "hash": "push",
      "child": [
        { "memu_title": "滤芯更换提醒", "icon": "", "hash": "pushRemind" },
        { "memu_title": "信息公告推送", "icon": "", "hash": "pushPush" },
        { "memu_title": "信息推送记录", "icon": "", "hash": "PushInfoRecord" },
        { "memu_title": "用户反馈管理", "icon": "", "hash": "pushFeedback" },
        { "memu_title": "咨询推送记录", "icon": "", "hash": "PushConsultRecord" },
        { "memu_title": "广告图片设置", "icon": "", "hash": "PushAdPicture" },
        { "memu_title": "设备报警记录", "icon": "", "hash": "PushAlarmRecord" },
        { "memu_title": "推送模板管理", "icon": "", "hash": "pushTemplate" }
      ]
    },
    {
      "memu_title": "服务管理",
      "icon": "service_mage",
      "hash": "serve",
      "child": [
        { "memu_title": "待处理订单", "icon": "", "hash": "serveWaiting" },
        { "memu_title": "处理中订单", "icon": "", "hash": "serveHandling" },
        { "memu_title": "已处理订单", "icon": "", "hash": "serveSolved" }
      ]
    }, {
      "memu_title": "财务系统",
      "icon": "home_home",
      "hash": "finance",
      "hasChild": false,
      "child": [
        { "memu_title": "财务管理", "icon": "", "hash": "FinanceManage" },
      ]
    },

    {
      "memu_title": "租赁管理",
      "icon": "service_mage",
      "hash": "rent",
      "child": [
        { "memu_title": "租赁规则列表", "icon": "", "hash": "RentRuleList" },
        { "memu_title": "设备规则管理", "icon": "", "hash": "RentRuleManage" }
      ]
    },
    {
      "memu_title": "进销存管理",
      "icon": "service_mage",
      "hash": "inventory",
      "child": [
        { "memu_title": "进销存管理", "icon": "", "hash": "inventoryManage" }
      ]
    },
    {
      "memu_title": "升级管理",
      "icon": "service_mage",
      "hash": "upgrade",
      "child": [
        { "memu_title": "版本管理", "icon": "", "hash": "upgradeVersion" },
        { "memu_title": "创建升级任务", "icon": "", "hash": "upgradeCreate" },
        { "memu_title": "升级记录查询", "icon": "", "hash": "upgradeRecord" }
      ]
    },
    {
      "memu_title": "系统设置",
      "icon": "system_set",
      "hash": "system",
      "child": [
        { "memu_title": "产品型号设置", "icon": "", "hash": "SystemModelSet" },
        { "memu_title": "产品批次维护", "icon": "", "hash": "SystemBatch" },
        { "memu_title": "参数设置", "icon": "", "hash": "SystemSetting" }
      ]
    },
    {
      "memu_title": "系统日志",
      "icon": "log_manage",
      "hash": "log",
      "child": [
        { "memu_title": "人员员登录信息", "icon": "", "hash": "logUserinfo" },
        { "memu_title": "账号分配信息", "icon": "", "hash": "logAssign" }
      ]
    }
  ]
}

/**
 * 配合ElSelectOption数据结合使用，会根据name加载所需要的下拉框数据
 * 已经配置的：
 * feedbackType：用户反馈
 * deviceStatus: 设备状态
 * deviceTypeType: 设备类型
 * networkType: 网络状态
 * communicteType: 通讯方式
 * useStatus: 使用状态
 * informStatus: 通知状态
 * filterStatus: 滤芯状态
 * informType: 通知类型
 * choiceTemplate: 选择模板(数据时动态获取的)
 * handleStatus: 处理状态【用户反馈管理页面】
 * handleWay: 处理方式【用户反馈管理页面
 * feedbackFrom: 反馈来源【用户反馈管理页面】
 * alarmType: 报警类型
 * templateType: 模板类型
 * templateInformType：信息类型
 * templatePushType：推送类型
 * templatePushChannel：推送渠道
 * serviceCategory：服务分类
 * questionCategory：问题分类
 * orderTimeout：订单超时
 * roleType：角色类型
 * accountStatus：账号状态
 */
const ElSelectName = {
  bankType: { name: 'bankType', title: '开户银行', width: 100 }, // 问题反馈类型【用户反馈管理页面】
  feedbackType: { name: 'feedbackType', title: '反馈类型', width: 100 }, // 问题反馈类型【用户反馈管理页面】
  deviceStatus: { name: 'deviceStatusType', title: '设备状态', width: 100 }, // 设备状态框
  deviceTestStatus: { name: 'deviceTestStatus', title: '状态', width: 100 }, // 设备状态框
  deviceType: { name: 'deviceTypeType', title: '设备类型', width: 100 }, // 设备类型
  network: { name: 'networkType', title: '网络状态', width: 100 }, // 网络状态
  // upgradeNetwork: { name: 'upgradeNetwork', title: '网络状态', width: 100 }, // 网络状态
  communicte: { name: 'communicteType', title: '通讯方式', width: 140 }, // 通讯方式
  useStatus: { name: 'useStatus', title: '使用状态', width: 100 }, // 通讯方式
  informStatus: { name: 'informStatus', title: '通知状态', width: 100 }, // 通知状态
  filterStatus: { name: 'filterStatus', title: '滤芯状态', width: 100 }, // 滤芯状态
  informType: { name: 'informType', title: '通知类型', width: 100 }, // 通知类型
  choiceTemplate: { name: 'choiceTemplate', title: '选择模板', width: 100 }, // 选择模板(ElSelectOption中不写)【数据时动态获取的】
  handleStatus: { name: 'handleStatus', title: '处理状态', width: 100 }, // 处理状态【用户反馈管理页面】
  handleWay: { name: 'handleWay', title: '处理方式', width: 100 }, // 处理方式【用户反馈管理页面】
  feedbackFrom: { name: 'feedbackFrom', title: '反馈来源', width: 100 }, // 反馈来源【用户反馈管理页面】
  alarmType: { name: 'alarmType', title: '报警类型', width: 100 }, // 报警类型
  templateType: { name: 'templateType', title: '模板类型', width: 100 }, // 模板类型
  templateInformType: { name: 'templateInformType', title: '信息类型', width: 100 }, // 信息类型 【推送模板页面】
  templatePushType: { name: 'templatePushType', title: '推送类型', width: 100 }, // 推送类型 【推送模板页面】
  templatePushChannel: { name: 'templatePushChannel', title: '推送渠道', width: 100 }, // 推送渠道 【推送模板页面】
  serviceCategory: { name: 'serviceCategory', title: '服务类型', width: 100 }, // 服务分类 【待处理订单页面】
  questionCategory: { name: 'questionCategory', title: '问题分类', width: 100 }, // 问题分类 【待处理订单页面】
  operationHandle: { name: 'operationHandle', title: '运营处理', width: 100 }, // 运营处理 【服务人员管理】
  feeddbackOperationHandle: { name: 'feeddbackOperationHandle', title: '运营处理', width: 100 }, // 运营处理 【用户反馈管理】
  auditHandle: { name: 'auditHandle', title: '审核处理', width: 100 }, // 运营处理 【服务人员管理】
  auditStatus: { name: 'auditStatus', title: '审核状态', width: 100 }, // 运营处理 【服务人员管理】
  orderTimeout: { name: 'orderTimeout', title: '订单超时', width: 100 }, // 订单超时【处理中订单页面】
  roleType: { name: 'roleType', title: '角色类型', width: 100 }, // 角色类型【前端账号管理页面】
  searchRoleType: { name: 'searchRoleType', title: '角色类型', width: 100 }, // 角色类型【前端账号管理页面】
  roleTypeOperation: { name: 'roleTypeOperation', title: '角色类型', width: 130 }, // 角色类型【运营账号管理】
  accountStatus: { name: 'accountStatus', title: '账号状态', width: 100 }, // 账号状态【前端账号管理页面】
  filterNumber: { name: 'filterNumber', title: '滤芯个数', width: 100 }, // 滤芯个数【产品型号设置页面】
  filterType: { name: 'filterType', title: '滤芯类型', width: 100 }, // 滤芯类型【产品型号设置页面】
  filterVerify: { name: 'filterVerify', title: '滤芯验证', width: 100 }, // 滤芯验证【产品型号设置页面】
  leaseType: { name: 'leaseType', title: '租赁方式', width: 100 }, // 租赁方式【产品型号设置页面】
  dispatchOrder: { name: 'dispatchOrder', title: '派单处理', width: 100 }, // 滤芯个数【产品型号设置页面】
  emergencyLevel: { name: 'emergencyLevel', title: '紧急程度', width: 100 }, // 紧急程度【待处理订单页面】
  agentLevel: { name: 'agentLevel', title: '所属等级', width: 100 }, // 代理商所属等级【代理商账号管理页面】
  applyScene: { name: 'applyScene', title: '适用场景', width: 100 }, // 适用场景【租赁规则列表】
  rentModel: { name: 'rentModel', title: '租赁模式', width: 100 }, // 租赁模式【租赁规则列表】
  rentModelHasAll: { name: 'rentModelHasAll', title: '租赁模式', width: 100 }, // 租赁模式带全部【租赁规则列表】
  selectBrand: { name: 'selectBrand', title: '选择品牌', width: 100 }, // 选择品牌【租赁规则列表】
  selectSeries: { name: 'selectSeries', title: '选择系列', width: 100 }, // 选择系列【租赁规则列表】
  selectModel: { name: 'selectModel', title: '选择型号', width: 100 }, // 选择型号【租赁规则列表】
  measureUnit: { name: 'measureUnit', title: '计量单位', width: 50 }, // 计量单位【租赁规则列表】
  addPictureType: { name: 'addPictureType', title: '类型', width: 200 }, // 广告图片类型【新增广告图片】
  addPictureChoiceApp: { name: 'addPictureChoiceApp', title: '选择App', width: 100 }, // 广告图片类型【选择App】
  financeTime: { name: 'financeTime', title: '选择时间', width: 100 }, // 财务管理【选择时间】
  financeType: { name: 'financeType', title: '收支类型', width: 100 }, // 财务管理【收支类型】
  financeState: { name: 'financeState', title: '交易状态', width: 100 }, // 财务管理【交易状态】
  financeOrder: { name: 'financeOrder', title: '订单类型', width: 100 } // 财务管理【订单类型】
}

export default {
  install(Vue) {
    Vue.prototype.$ElSelectName = ElSelectName;
  }
}

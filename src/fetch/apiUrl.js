const apiUrl = {
  'accountInitPwd': 'account/init_pwd', // account - 初始化账号密码
  'serviceAccountBackInitPwd': 'service_account_back/init_pwd', // service_account_back - 服务账号初始化账号密码
  'accountDel': 'account/del', // account - 删除账号
  'menuGetList': 'menu/get_list', // menu - 获取菜单列表
  'accountChangePwd': 'account/change_pwd', // account - 修改密码
  'accountGetAccountInfo': 'account/get_account_info', // account - 获取账号信息
  'UploadifyUploadFile': 'Uploadify/upload_file', // Uploadify - 上传文件
  'UploadifyUploadImage': 'Uploadify/upload_image', // Uploadify - 上传图片
  'UploadifyUploadImageByWangEditor': 'Uploadify/upload_image_by_wangEditor', // Uploadify - 上传图片(wangEditor富文本)
  // 登录部分
  'accountLogin': 'account/login', // 登录
  'accountLogout': 'account/logout', // 登出
  // 'accountToken':'token/get_token',//获取token
  /* ==== 账号管理部分 ==== */
  // 服务人员审核
  'serviceAccountFrontList': 'Server/get_servers', // service_account_front - 获取服务账号申请列表(服务人员审核列表)
  'serviceAccountFrontDetail': 'Server/get_service', // service_account_front - 获取服务账号申请详情(服务人员审核)
  'serviceAccountFrontAdd': 'Server/add_service', // service_account_front - 新增申请处理记录(服务人员审核)
  'serviceAccountFrontEdit': 'Server/edit_service', // service_account_front - 获取服务账号申请审核列表(服务人员审核)
  'serviceAccountFrontDelete': 'Server/del_service', // service_account_front - 获取服务账号申请审核列表(服务人员审核)
  // 前端账号管理
  'serviceAccountBackAdd': 'service_account_back/add', // 新增
  'serviceAccountBackEdit': 'service_account_back/edit', // 编辑
  'serviceAccountBackGetDetail': 'service_account_back/get_detail', // 详情
  'serviceAccountBackGetList': 'service_account_back/get_list', // 列表
  // 运营账号管理
  'accountOperateGetList': 'account_operate/get_list', // 列表
  'accountOperateGetDetail': 'account_operate/get_detail', // 详情
  'accountOperateAdd': 'account_operate/add', // 新增
  'accountOperateEdit': 'account_operate/edit', // 编辑
  // 代理商账号管理
  'accountAgentGetList': 'account_agent/get_list', // 列表
  'accountAgentGetAccountList': 'account_agent/get_account_list', // 列表2
  'accountAgentGetDetail': 'account_agent/get_detail', // 详情
  'accountAgentAdd': 'account_agent/add', // 新增
  'accountAgentEdit': 'account_agent/edit', // 编辑
  'accountAgentDel': 'account_agent/del_agent', // 编辑
  'accountAgentExport': 'account_agent/export_agent', // 导出
  /* ==== 设备管理部分 ==== */
  // 导入设备
  'DeviceImportList': 'Device/import_list', // 列表
  'DeviceImportAdd': 'Device/add_device ', // 新建
  'DeviceImport': 'Device/import', // 导入
  'DeviceImportExport': 'Device/export_import_list', // 导出
  'DeviceImportDelete': 'Device/delete_device', // 删除
  'DeviceAllAgent': 'account_agent/all_agent ', // 所有代理商接口
  'DeviceSetAgent': 'device/set_device_agent ', // 设置代理商
  // 设备检测
  'DeviceTestList': 'Device/import_list_test', // 列表
  'DeviceTestAdd': 'Device/add_device_test', // 新建
  'DeviceTestEdit': 'Device/edit_device_test', // 编辑
  'DeviceTestDelete': 'Device/delete_device_test', // 批量删除
  'DeviceTestImport': 'Device/import_test', // 导入
  // 设备管理
  'DeviceDeviceList': 'Device/device_list', // 设备列表
  'DeviceDeviceWarningLog': 'Device/device_warning_log', // 设备报警日志
  'DeviceDeviceOperateLog': 'Device/device_operate_log', // 操作设备日志
  'exportDevice': 'Device/export_device', // 导出
  'DeviceDeviceDetail': 'Device/device_detail', // 详情
  'DeviceDeviceReset': 'Device/reset_device', // 重置设备数据
  'DeviceFilterReset': 'Device/reset_filter', // 重置滤芯数据
  'DeviceExpireTime': 'Device/edit_device_expire_time', // 设备有效期
  // 产品概述
  'DeviceOverview': 'Device/overview', // 4个统计
  'DeviceActiveGraph': 'Device/active_graph', // 1.激活设备统计曲线图
  'DeviceOnlineGraph': 'Device/online_graph', // 2.在线设备统计曲线图
  'DeviceWaterGraph': 'Device/water_graph', // 3.设备制水量统计曲线图
  'DeviceLivelyGraph': 'Device/lively_graph', // 4.活跃设备统计曲线图
  // 非智能设备管理
  'DeviceGetNonSmartDeviceList': 'Device/get_non_smart_device_list', // 列表
  'DeviceAddNonSmartDevice': 'Device/add_non_smart_device', // 添加
  'DeviceUpdateNonSmartDevice': 'Device/update_non_smart_device', // 修改
  'DeviceDeleteNonSmartSevice': 'Device/delete_non_smart_device', // 删除
  'exportNonSmartDevice': 'Device/export_non_smart_device', // 导出
  // 设备地图部分
  'DeviceDeviceMapOverview': 'Device/device_map_overview', // 设备地图
  /* ==== 服务管理部分 ==== */
  // 待处理订单
  'FaultRepairGetServiceList': 'Fault_repair/get_service_list', // Fault_repair - 获取待处理订单列表
  'FaultRepairServiceCheck': 'Fault_repair/service_check', // Fault_repair - 订单审核
  'FaultRepairServiceSendOut': 'Fault_repair/service_send_out', // Fault_repair - 后台派单
  'FaultRepairGetCheckList': 'Fault_repair/get_check_list', // Fault_repair - 审核记录
  'FaultRepairGetDispatchList': 'Fault_repair/get_dispatch_list', // Fault_repair - 派单记录
  'FaultRepairGetDetails': 'Fault_repair/get_details', // Fault_repair - 获取服务详情
  'FaultRepairGetServers': 'Fault_repair/get_servers', // Fault_repair - 获取服务人员列表
  'FaultRepairDelServers': 'Fault_repair/del_service', // Fault_repair - 派单撤回
  // 处理中订单
  'FaultRepairGetServiceToBeCompleted': 'Fault_repair/get_service_to_be_completed', // Fault_repair - 获取处理中订单列表
  'FaultRepairGetServiceTree': 'Fault_repair/get_service_tree', // Fault_repair - 服务流程图
  // 已经处理订单
  'FaultRepairGetCompletedList': 'Fault_repair/get_completed_list', // Fault_repair - 获取已完成订单列表
  'FaultRepairGetEvaluation': 'Fault_repair/get_evaluation', // Fault_repair - 获取评价
  /* ==== 告警与推送部分 ==== */
  // 用户反馈管理
  'FeedbackGetFeedbackList': 'Feedback/get_feedback_list', // Feedback - 获取反馈列表
  'FeedbackGetFeedbackLogList': 'Feedback/get_feedback_log_list', // Feedback - 获取反馈处理记录列表
  'FeedbackGetFeedbackDetail': 'Feedback/get_feedback_detail', // Feedback - 获取反馈详情
  'FeedbackDealFeedback': 'Feedback/deal_feedback', // Feedback - 处理反馈
  // 推送模板设置
  'msgTemplateGetList': 'msg_template/get_list', // Msg_template - 获取模版列表
  'msgTemplateGetAll': 'msg_template/get_all', // Msg_template - 获取模版列表
  'msgTemplateGetDetail': 'msg_template/get_detail', // Msg_template - 获取模版详情
  'msgTemplateAdd': 'msg_template/add', // Msg_template - 添加模版
  'msgTemplateEdit': 'msg_template/edit', // Msg_template - 编辑模版
  'msgTemplateDel': 'msg_template/del', // Msg_template - 删除模版
  // 咨询推送记录
  'informationDel': 'information/del', // information - 删除资讯
  'informationAdd': 'information/add', // information - 新增资讯
  'informationEdit': 'information/edit', // information - 编辑资讯
  'informationGetList': 'information/get_list', // information - 获取资讯列表
  'informationGetDetail': 'information/get_detail', // information - 获取资讯详情
  // 广告图片设置
  'advertisementDel': 'advertisement/del', // advertisement - 删除广告图片
  'advertisementAdd': 'advertisement/add', // advertisement - 新增广告图片
  'advertisementGetList': 'advertisement/get_list', // advertisement - 获取广告图片列表
  // 信息公告推送
  'UserMsgSendMsgs': 'User_msg/send_msgs', // User_msg - 批量发送消息
  'UserMsgGetMsgList': 'User_msg/get_msg_list', // User_msg - 获取信息推送列表
  'UserMsgGetUserList': 'User_msg/get_user_list', // User_msg - 获取用户列表
  // 设备报警记录
  'DeviceWarningGetWarningList': 'Device_warning/get_warning_list', // Device_warning - 设备报警记录
  // 更换滤芯提醒
  'FilterWarningSendMsgs': 'Filter_warning/send_msgs', // Filter_warning - 批量发送消息
  'FilterWarningGetUserDevice': 'Filter_warning/get_user_device', // Filter_warning - 获取用户设备列表
  /* ==== 用户管理部分 ==== */
  // 用户画像
  'UserUserStatistics': 'User/user_statistics', // 用户统计
  'UserAgeMap': 'User/age_map', // 用户年龄分布
  'UserSexMap': 'User/sex_map', // 用户性别分布
  'UserUserMap': 'User/user_map', // 用户地图分布(省份)
  // 用户列表
  'UserUsers': 'User/users', // 列表
  'UserUserDevices': 'User/user_devices', // 用户设备
  'UserRxportUsers': 'User/export_users', // 导出
  /* ==== 财务管理部分 ==== */
  // 财务管理
  'financeIndex': 'finance/index', // 列表
  'financeExportData': 'finance/export_data', // 导出
  'financeEarnMoney': 'finance/earn_money', // 财务收益
  'financeWithMoney': 'finance/with_money ', // 立即提现
  'financeShowBonus': 'finance/show_bonus ', // 详情
  // 提现管理
  'financeGetAuditList': 'finance/get_audit_list', // 列表
  'financePassAudit': 'finance/pass_audit', // 审核,通过或者拒绝
  'financeGetRequest': 'finance/get_ips_request', // 提现账号信息
  'financeExportAuditData': 'finance/export_audit_list', // 导出
  // 分润记录
  'financeRecordGetList': 'bonus/bonus_list', // 列表
  'financeRecordGetDetail': 'bonus/get_detail', // 详情
  'financeRecordAdd': 'bonus/add_bonus', // 新增
  'financeRecordEdit': 'bonus/edit_bonus', // 编辑
  'financeRecordDel': 'bonus/del_bonus', // 删除
  'financeRecordExport': 'bonus/export_data', // 导出
  // 分润管理
  'financeBonusGetList': 'bonus/get_list', // 列表
  'financeBonusGetDetail': 'bonus/get_detail', // 详情
  'financeBonusAdd': 'bonus/add_bonus', // 新增
  'financeBonusEdit': 'bonus/edit_bonus', // 编辑
  'financeBonusDel': 'bonus/del_bonus', // 删除
  /* ==== 系统设置部分 ==== */
  // 参数设置
  'SystemSaveBoards': 'System/save_boards', // System - 保存勾选要展示的面板
  'SystemAccountBoards': 'System/account_boards', // System - 2.获取需要在首页展示的面板
  'SystemBoards': 'System/boards', // System - 3.获取所有面板
  // 品牌管理
  'SystemBrandList': 'merchant/brand_list', // 获取列表
  'SystemBrandListOption': 'merchant/get_brands', // 下拉选择
  'SystemBrandAdd': 'merchant/add_brand', // 新增
  'SystemBrandEdit': 'merchant/edit_brand', // 编辑
  // 系列管理
  'SystemSeriesList': 'merchant/series_list', // 获取列表
  'SystemSeriesListOption': 'merchant/get_series', // 下拉选择
  'SystemSeriesAdd': 'merchant/add_series', // 新增
  'SystemSeriesEdit': 'merchant/edit_series', // 编辑
  // 型号管理
  'SystemModelSetList': 'merchant/model_list', // 获取列表
  'SystemModelSetListOption': 'merchant/get_models', // 下拉选择
  'SystemModelSetAdd': 'merchant/add_models', // 新增
  'SystemModelSetEdit': 'merchant/edit_models', // 编辑
  // 批次管理
  'SystemBatchList': 'device/import_list ', // 获取列表
  'SystemBatchAdd': 'merchant/add_merchants', // 新增
  'SystemBatchImport': 'device/import', // 批量导入
  /* ==== 租赁管理部分 => 租赁规则列表 ==== */
  'leaseLeaseList': 'lease/lease_list', // lease - 1.获取租赁规则表
  'leaseAddLease': 'lease/add_lease', // lease - 2.添加租赁规则
  'leaseOneLease': 'lease/one_lease', // lease - 3.获取一个租赁规则
  'leaseAddPackage': 'lease/add_package', // lease - 4.添加套餐
  'leaseDelLease': 'lease/del_lease', // lease - 删除租赁规则
  /* ==== 租赁管理部分 => 设备规则管理 ==== */
  'deviceLeaseSetList': 'device_lease/get_list', // device_lease - 获取设备规则列表
  /* ==== 滤芯管理部分 ==== */
  // 滤芯防伪管理
  'FilterGetFilterList': 'Filter/get_filter_list', // Filter - 获取滤芯列表
  'FilterImportFilter': 'Filter/import_filter', // Filter - 上传滤芯
  /* ==== 升级管理部分 ==== */
  'FirmwareLists': 'firmware/lists', // firmware - 获取固件版本管理列表
  'FirmwareDetail': 'firmware/detail', // firmware - 获取固件版本详情
  'UpgradeLogLists': 'upgrade_log/lists', // upgrade_log - 获取设备升级记录
  'OssUploadGetPostObjectParams': 'Oss_upload/get_post_object_params', // Oss_upload - 获取OSS表单上传参数
  /* ==== 系统日志部分 ==== */
  'AccountAssignGetAssignLog': 'Account_assign/get_assign_log', // Account_assign - 获取分配记录
  'LoginLogGetLoginLog': 'Login_log/get_login_log' // Login_log - 人员登录信息
}

export default apiUrl;

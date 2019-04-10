/**
 * 下来框所有数据集合，与ElSelectName结合使用
 */
export const ElSelectOption = {
  feedbackType: [ // ok 反馈类型(1净水器问题，2网络问题，3使用问题，4其他问题)
    { value: '', label: '全部' },
    { value: '1', label: '净水器问题' },
    { value: '2', label: '网络问题' },
    { value: '3', label: '使用问题' },
    { value: '4', label: '其他问题' }
  ],
  // deviceStatusType: [
  //   { value: '', label: '全部' },
  //   { value: '0', label: '正常' },
  //   { value: '1', label: '非正常' }
  // ],
  deviceStatusType: [ // 设备状态: 0 正常 1 锁定 2 停机 3待激活
    { value: '', label: '全部' },
    { value: '1', label: '正常' },
    { value: '2', label: '锁定' },
    { value: '3', label: '停机' }
  ],
  deviceTestStatus: [ // 设备检测状态: 0 未测试 1 通过 2 不通过 3 不通过
    { value: '3', label: '全部' },
    { value: '0', label: '未测试' },
    { value: '1', label: '通过' },
    { value: '2', label: '不通过' }
  ],
  deviceTypeType: [
    { value: '选项1', label: '全部5445' },
    { value: '选项2', label: '设备故障' },
    { value: '选项3', label: 'APP端使用' },
    { value: '选项4', label: '安装请求' },
    { value: '选项5', label: '售后请求' }
  ],
  networkType: [ // 网络状态(0离线、1在线、2故障)
    { value: '', label: '全部' },
    { value: '0', label: '离线' },
    { value: '1', label: '在线' }
  ],
  // upgradeNetwork: [ // 网络状态(0离线、1在线)
  //   { value: '', label: '全部' },
  //   { value: '0', label: '离线' },
  //   { value: '1', label: '在线' }
  // ],
  communicteType: [ // 通讯方式 (1 2G,2 WIFI)
    { value: '1', label: '2G' },
    { value: '2', label: 'WIFI' }
  ],
  useStatus: [ // 滤芯使用状态 (-1全部,0未使用,1已使用)
    { value: '-1', label: '全部' },
    { value: '0', label: '未使用' },
    { value: '1', label: '已使用' }
  ],
  informStatus: [ // 通知状态(1全部2已通知3未通知)
    { value: '1', label: '全部' },
    { value: '2', label: '已通知' },
    { value: '3', label: '未通知' }
  ],
  filterStatus: [ // 滤芯状态(1全部2正常3需更换)
    { value: '1', label: '全部' },
    { value: '2', label: '正常' },
    { value: '3', label: '需更换' }
  ],
  informType: [
    { value: '选项1', label: '全部' },
    { value: '选项2', label: '已使用' },
    { value: '选项3', label: '未使用' }
  ],
  handleStatus: [ // (0待处理1处理中2已处理3已转服务管理) 处理状态【用户反馈管理页面】
    { value: '', label: '全部' },
    { value: '0', label: '待处理' },
    { value: '1', label: '处理中' },
    { value: '2', label: '已处理' },
    { value: '3', label: '已转服务管理' }
  ],
  handleWay: [ // (1后台处理2转服务管理) 处理方式【用户反馈管理页面】
    { value: '', label: '全部' },
    { value: '1', label: '后台处理' },
    { value: '2', label: '转服务管理' }
  ],
  feedbackFrom: [ // 反馈来源【用户反馈管理页面】 反馈途径(1微信)
    { value: '2', label: 'APP' }
  ],
  // 设备报警记录【报警类型】
  alarmType: [
    { value: '', label: '全部' },
    { value: '1', label: '漏水报警' },
    { value: '2', label: '连续制水检修故障' },
    { value: '3', label: '冲洗阀故障' },
    { value: '4', label: '电磁阀故障' },
    { value: '5', label: '热水电磁阀故障' },
    { value: '6', label: '冷水电磁阀故障' },
    { value: '7', label: 'UV灯故障' },
    { value: '8', label: '数据异常' },
    { value: '9', label: '流量异常' },
    { value: '10', label: '逆水阀故障' },
    { value: '11', label: '水泵故障' },
    { value: '12', label: 'TDS值报警' },
    { value: '13', label: '加热胆故障' },
    { value: '14', label: '压力异常故障' },
    { value: '15', label: '原水TDS值超标' },
    { value: '16', label: '净水TDS值异常' },
    { value: '17', label: '净水箱液位传感器异常' },
    { value: '18', label: '废水箱液位传感器异常' },
    { value: '19', label: '滤芯1报警' },
    { value: '20', label: '滤芯2报警' },
    { value: '21', label: '滤芯3报警' },
    { value: '22', label: '滤芯4报警' },
    { value: '23', label: '滤芯5报警' },
    { value: '24', label: '滤芯6报警' },
    { value: '25', label: '滤芯7报警' },
    { value: '26', label: '租赁到期报警' }
  ],
  templateType: [
    { value: '选项1', label: '自动' },
    { value: '选项2', label: '手动' }
  ],
  templateInformType: [ // (1-滤芯提醒，2-优惠信息，3-升级提醒，4-系统公告，5-活动信息，6-广告信息)
    { value: '1', label: '滤芯提醒' },
    { value: '2', label: '优惠信息' },
    { value: '3', label: '升级提醒' },
    { value: '4', label: '系统公告' },
    { value: '5', label: '活动信息' },
    { value: '6', label: '广告信息' }
  ],
  templatePushType: [
    { value: '1', label: '规则促发' }
  ],
  templatePushChannel: [
    // { value: '1', label: '小程序' },
    { value: '2', label: 'app' }
  ],
  serviceCategory: [ // 服务类型(1安装,2售后)
    { value: '', label: '全部' },
    { value: '1', label: '安装' },
    { value: '2', label: '售后' },
    { value: '3', label: '拆机' }
  ],
  questionCategory: [ // 问题类型(1净水器问题，2网络问题，3使用问题，4其他问题，5安装)
    { value: '', label: '全部' },
    { value: '1', label: '服务质量' },
    { value: '2', label: '产品质量' },
    { value: '3', label: '水质变差' },
    { value: '4', label: '无法开机' },
    { value: '6', label: '其他' }
  ],
  operationHandle: [ // 审核状态(1审核中,2审核通过,3完成)
    { value: '1', label: '审核中' },
    { value: '2', label: '审核通过' },
    { value: '3', label: '完成' }
  ],
  feeddbackOperationHandle: [ // 处理状态(0待处理1处理中2已处理3已转服务管理)
    { value: '0', label: '待处理' },
    { value: '1', label: '处理中' },
    { value: '2', label: '处理完成' },
    { value: '3', label: '已转服务管理' }
  ],
  orderTimeout: [ // 订单超时(1全部,2正常,3超时)
    { value: '1', label: '全部' },
    { value: '2', label: '正常' },
    { value: '3', label: '超时' }
  ],
  roleType: [ // ok
    { value: '1', label: '专职安装维修' },
    { value: '2', label: '兼职安装维修' }
  ],
  searchRoleType: [ // ok
    { value: '', label: '全部' },
    { value: '1', label: '专职安装维修' },
    { value: '2', label: '兼职安装维修' }
  ],
  /* =================账号管理=================== */
  // 代理商账号管理【银行类型】
  bankType: [
    { value: '1100', label: '中国工商银行' },
    { value: '1101', label: '中国农业银行' },
    { value: '1102', label: '招商银行' },
    { value: '1103', label: '兴业银行' },
    { value: '1104', label: '中信银行' },
    { value: '1106', label: '中国建设银行' },
    { value: '1107', label: '中国银行' },
    { value: '1108', label: '交通银行' },
    { value: '1109', label: '浦东发展银行' },
    { value: '1110', label: '民生银行' },
    { value: '1111', label: '华夏银行' },
    { value: '1112', label: '光大银行' },
    { value: '1113', label: '北京银行' },
    { value: '1114', label: '广发银行' },
    { value: '1116', label: '上海银行' },
    { value: '1119', label: '中国邮政储蓄银行' },
    { value: '1120', label: '浙商银行' },
    { value: '1121', label: '平安银行' },
    { value: '1123', label: '渤海银行' },
    { value: '1827', label: '恒丰银行' }
  ],
  // 运营账号管理【角色类型】
  roleTypeOperation: [
    { value: '1', label: '管理员' },
    { value: '2', label: '运营' }
  ],
  // 运营账号管理【账号状态】
  accountStatus: [
    { value: '1', label: '正常' },
    { value: '2', label: '禁止' }
  ],
  filterNumber: [
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' }
  ],
  filterType: [ // 滤芯类型1-流量、2-时间、3-混合
    { value: '1', label: '流量' },
    { value: '2', label: '时间' }
    // { value: '3', label: '混合' }
  ],
  filterVerify: [ // 滤芯验证0-不需要、1-需要
    { value: '0', label: '不需要' },
    { value: '1', label: '需要' }
  ],
  leaseType: [ // 租赁方式0-零售、1-流量、2-时间
    { value: '0', label: '零售' },
    { value: '1', label: '流量' },
    { value: '2', label: '时间' }
  ],
  auditHandle: [ // 1-审核中、2-拒绝、3-通过(用的是这个)
    // { value: '0', label: '未审核' },
    { value: '1', label: '审核中' },
    { value: '2', label: '拒绝' },
    { value: '3', label: '通过' }
  ],
  auditStatus: [ //  0-未审核、1-审核中、2-已拒绝、3-已通过
    { value: '', label: '全部' },
    { value: '0', label: '未审核' },
    { value: '1', label: '审核中' },
    { value: '2', label: '拒绝' },
    { value: '3', label: '通过' }
  ],
  dispatchOrder: [ // 1-审核中、2-拒绝、3-通过(用的是这个)
    { value: '1', label: '审核中' },
    { value: '2', label: '拒绝' },
    { value: '3', label: '通过' }
  ],
  emergencyLevel: [ // 紧急程度(1一般,2紧急,3非常紧急)
    { value: '1', label: '一般' },
    { value: '2', label: '紧急' },
    { value: '3', label: '非常紧急' }
  ],
  // 代理商账号管理【代理商等级类型】
  agentLevel: [
    { value: '1', label: '总代' },
    { value: '2', label: '加盟' },
    { value: '3', label: '分销' }
  ],
  applyScene: [ //  适用场景
    { value: '1', label: '商用租赁机' },
    { value: '2', label: '家用租赁机' }
  ],
  rentModel: [ //  租赁模式
    { value: '1', label: '时间租赁' },
    { value: '2', label: '流量租赁' }
  ],
  rentModelHasAll: [ //  租赁模式
    { value: '', label: '全部' },
    { value: '1', label: '流量租赁' },
    { value: '2', label: '时间租赁' }
  ],
  selectBrand: [ //  选择品牌
    { value: '1', label: '美淳' }
  ],
  selectSeries: [ //  选择系列
    { value: '1', label: '智能净水器' }
  ],
  selectModel: [ //  选择型号
    { value: '1', label: '001' }
  ],
  measureUnit: [ //  选择型号
    { value: '1', label: '年' },
    { value: '2', label: '月' },
    { value: '3', label: '日' }
  ],
  measureUnitFlow: [ //  选择型号
    { value: '4', label: '升' }
  ],
  addPictureType: [ //  选择图片类型 类型 1、启动页面，2、首页banner（最多5张），3、滤芯1说明，4、滤芯2说明，5、滤芯3说明，6、滤芯4说明，7、滤芯5说明，8、滤芯6说明，9、滤芯7说明
    { value: '1', label: '启动页面' },
    { value: '2', label: '首页banner（最多5张）' },
    { value: '3', label: '滤芯1说明' },
    { value: '4', label: '滤芯2说明' },
    { value: '5', label: '滤芯3说明' },
    { value: '6', label: '滤芯4说明' },
    { value: '7', label: '滤芯5说明' },
    { value: '8', label: '滤芯6说明' },
    { value: '9', label: '滤芯7说明' }
  ],
  /* =================财务管理=================== */
  financeTime: [ //  选择型号
    { value: '1', label: '今天' },
    { value: '2', label: '7天' },
    { value: '3', label: '一个月' },
    { value: '4', label: '半年' }
  ],
  financeType: [ //  收支类型
    { value: '0', label: '全部' },
    { value: '1', label: '收入' },
    { value: '2', label: '支出' }
  ],
  financeState: [ //  交易状态
    { value: '', label: '全部' },
    { value: '1', label: '成功' },
    { value: '0', label: '失败' }
  ],
  financeOrder: [ //  订单类型
    { value: '0', label: '全部' },
    { value: '1', label: '购买套餐' },
    { value: '2', label: '押金' }
  ],
  // 提现管理【审批状态】
  financeLookState: [
    { value: '', label: '全部' },
    { value: '0', label: '已拒绝' },
    { value: '1', label: '审核中' },
    { value: '2', label: '已审核' }
  ],
  // 提现管理【金额类型】
  financeMoney: [
    { value: '1', label: '奖励' },
    { value: '2', label: '惩罚' }
  ],
  // 分润记录【分润类型】
  financeRecordType: [
    { value: '1', label: '代理分润' },
    { value: '2', label: '介绍分润' },
    { value: '3', label: '用户分润' }
  ],
  filterStatus2: [ // 设备状态(1全部2正常3需更换) zengbin add
    { value: '1', label: '全部' },
    { value: '2', label: '在线' },
    { value: '3', label: '离线' }
  ],
};

export const MaxLengthConfig = {
  deviceId: 12, // 设备ID 长度
  mac: 15, // mac
  deviceName: 12, // 设备名称
  deviceBrand: 12, // 设备品牌
  deviceSeries: 12, // 设备系列
  deviceModel: 12, // 设备型号
  deviceAddress: 13, // 设备地址
  detailAddress: 13, // 详细地址
  userName: 16, // 用户姓名
  tel: 11, // 电话号码的长度 ok
  filterId: 11, // 滤芯ID长度
  templateName: 30, // 模板名称
  templateInformCon: 140, // 信息内容
  templateInfoLink: 200, // 信息内容
  infoTitle: 30, // 标题
  serviceNumber: 40, // 服务单号
  accountSingle: 15, // 账号 ok
  nameSingle: 20, // 姓名
  passwordSingle: 18, // 密码配置 ok
  oldPassword: 18, // 旧密码配置 ok
  newPassword: 18, // 新密码置 ok
  reNewPassword: 18, // 确认新密码配置 ok
  emailSingle: 100, // 单独邮箱配置 ok
  remarkSingle: 140, // 单独备注配置 ok
  companyPosition: 40, // 单独备注配置 ok
  companyName: 60, // 公司名称
  liceseID: 12, // liceseID
  startNumber: 12, // 起始号
  endNumber: 12, // 截至号
  handleType: 12, // 操作类型
  handlePerson: 12, // 操作人
  versionNo: 20, // 操作人
  versionDescription: 60, // 操作人
  loginAccount: 60, // 登录账号
  ruleName: 60, // 规则名称
  ruleCash: 60, // 租赁押金
  rulePackageName: 60, // 套餐名称
  rulePackageCharge: 60, // 套餐费用
  ruleBuyNo: 60, // 购买用量
  ruleTryNo: 60, // 试用用量
  measureUnitLimit: 60, // 计量单位限额
  measureUnitMore: 60, // 计量单位内满额
  measureUnitLimitValidity: 60, // 计量单位有效期
  ruleChargeOnly: 60, // 多少元
  ruleUnitOnly: 60, // 多少升
  linkAddress: 60 // 多少升
};

/**
 * 侧滑页 input框、select框常量定义
 * input框宽度： inputWidth
 * select宽度：selectWidth
 */
export const SlidePageConfig = {
  slideWidthA: '600',
  inputWidthA: '400',
  selectWidthA: '400',
  slideWidthB: '800',
  inputWidthB: '500',
  selectWidthB: '500'
}

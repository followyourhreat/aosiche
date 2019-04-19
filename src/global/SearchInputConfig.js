/**
 * input输入框，标题、placeholder、width( 主内容区顶部 )
 * 设备ID: deviceId
 * 设备MAC: mac
 * 设备名称：deviceName
 * 设备品牌: deviceBrand
 * 设备系列: deviceSeries
 * 设备型号: deviceModel
 * 设备地址: deviceAddress
 * 详细地址: detailAddress
 * 用户姓名：userName
 * 手机号码: moblie
 * 滤芯ID：filterId
 * 模板名称：templateName
 * 信息内容：templateInformCon
 * 信息链接：templateInfoLink
 * 服务单号：serviceNumber
 */
import { MaxLengthConfig } from './constant';

const SearchInputConfig = {
  default: { title: '默认查询标题头', placeholder: '请输入标题头', width: 140, length: 255 }, // 搜索输入框默认设置,没事,别瞎改我的配置
  deviceId: { title: '设备ID', placeholder: '请输入设备ID', width: 140, length: MaxLengthConfig.deviceId }, // 设备ID 配置
  mac: { title: '设备MAC', placeholder: '请输入设备MAC', width: 140, length: MaxLengthConfig.mac }, // 设备MAC 配置
  deviceName: { title: '设备名称', placeholder: '请输入设备名称', width: 140, length: MaxLengthConfig.deviceName }, // 设备名称 配置
  deviceBrand: { title: '设备品牌', placeholder: '请输入设备品牌', width: 140, length: MaxLengthConfig.deviceBrand }, // 设备品牌 配置
  deviceSeries: { title: '设备系列', placeholder: '请输入设备系列', width: 140, length: MaxLengthConfig.deviceSeries }, // 设备品牌 配置
  deviceModel: { title: '设备型号', placeholder: '请输入设备型号', width: 140, length: MaxLengthConfig.deviceModel }, // 设备型号 配置
  deviceAddress: { title: '设备地址', placeholder: '请输入设备地址', width: 140, length: MaxLengthConfig.deviceAddress }, // 设备地址 配置
  detailAddress: { title: '详细地址', placeholder: '请输入详细地址', width: 140, length: MaxLengthConfig.detailAddress }, // 详细地址 配置
  userName: { title: '用户姓名', placeholder: '请输入用户姓名', width: 140, length: MaxLengthConfig.userName }, // 用户姓名 配置
  moblie: { title: '手机号码', placeholder: '请输入手机号码', width: 120, length: MaxLengthConfig.tel }, // 电话号码配置
  filterId: { title: '滤芯ID', placeholder: '请输入滤芯ID', width: 120, length: MaxLengthConfig.filterId }, // 滤芯ID配置
  templateName: { title: '模板名称', placeholder: '请输入模板名称', width: 120, length: MaxLengthConfig.templateName }, // 模板名称配置
  templateInformCon: { title: '信息内容', placeholder: '请输入信息内容', width: 120, length: MaxLengthConfig.templateInformCon }, // 信息内容配置
  templateInfoLink: { title: '信息链接', placeholder: '请输入信息链接', width: 120, length: MaxLengthConfig.templateInfoLink }, // 信息链接配置
  infoTitle: { title: '标题', placeholder: '请输入标题', width: 120, length: MaxLengthConfig.infoTitle }, // 标题【推送模板管理页面】
  serviceNumber: { title: '服务单号', placeholder: '请输入服务单号', width: 120, length: MaxLengthConfig.serviceNumber }, // 服务单号配置
  accountSingle: { title: '账号', placeholder: '请输入账号', width: 120, length: MaxLengthConfig.accountSingle }, // 单独账号配置
  nameSingle: { title: '姓名', placeholder: '请输入姓名', width: 120, length: MaxLengthConfig.nameSingle }, // 单独姓名配置
  passwordSingle: { title: '密码', placeholder: '请输入密码', width: 120, length: MaxLengthConfig.passwordSingle }, // 密码配置
  oldPassword: { title: '旧密码', placeholder: '请输入旧密码', width: 120, length: MaxLengthConfig.oldPassword }, // 旧密码配置
  newPassword: { title: '新密码', placeholder: '请输入新密码', width: 120, length: MaxLengthConfig.newPassword }, // 新密码配置
  reNewPassword: { title: '确认密码', placeholder: '请输入确认密码', width: 120, length: MaxLengthConfig.reNewPassword }, // 确认新密码配置
  emailSingle: { title: '邮箱地址', placeholder: '请输入邮箱', width: 120, length: MaxLengthConfig.emailSingle }, // 单独邮箱配置
  remarkSingle: { title: '备注', placeholder: '请输入备注', width: 120, length: MaxLengthConfig.remarkSingle }, // 单独备注配置
  companyPosition: { title: '公司职务', placeholder: '请输入公司职务', width: 120, length: MaxLengthConfig.companyPosition }, // 公司职务配置
  companyName: { title: '公司名称', placeholder: '请输入公司名称', width: 120, length: MaxLengthConfig.companyName }, // 公司职务配置
  liceseID: { title: 'liceseID', placeholder: '请输入liceseID', width: 120, length: MaxLengthConfig.liceseID }, // 公司职务配置
  startNumber: { title: '起始号', placeholder: '请输入起始号', width: 120, length: MaxLengthConfig.startNumber }, // 起始号配置
  endNumber: { title: '截至号', placeholder: '请输入截至号', width: 120, length: MaxLengthConfig.endNumber }, // 截至号配置
  handleType: { title: '操作类型', placeholder: '请输入操作类型', width: 120, length: MaxLengthConfig.handleType }, // 操作类型置
  handlePerson: { title: '操作人', placeholder: '请输入操作人', width: 120, length: MaxLengthConfig.handlePerson }, // 操作人配置
  versionNo: { title: '版本号', placeholder: '请输入版本号', width: 120, length: MaxLengthConfig.versionNo }, // 版本号
  versionDescription: { title: '版本说明', placeholder: '请输入版本说明', width: 140, length: MaxLengthConfig.versionDescription }, // 版本号
  loginAccount: { title: '登录账号', placeholder: '请输入登录账号', width: 140, length: MaxLengthConfig.loginAccount }, // 版本号
  ruleName: { title: '规则名称', placeholder: '请输入规则名称', width: 140, length: MaxLengthConfig.ruleName }, // 规则名称
  ruleCash: { title: '租赁押金', placeholder: '请输入租赁押金', width: 140, length: MaxLengthConfig.ruleCash }, // 租赁押金
  rulePackageName: { title: '套餐名称', placeholder: '请输入套餐名称', width: 140, length: MaxLengthConfig.rulePackageName }, // 套餐名称
  rulePackageCharge: { title: '套餐费用', placeholder: '请输入套餐费用', width: 140, length: MaxLengthConfig.rulePackageCharge }, // 套餐费用
  ruleBuyNo: { title: '购买用量', placeholder: '请输入购买用量', width: 120, length: MaxLengthConfig.ruleBuyNo }, // 购买用量
  ruleTryNo: { title: '试用用量', placeholder: '请输入试用用量', width: 140, length: MaxLengthConfig.ruleTryNo }, // 试用用量
  measureUnitLimit: { title: '计量单位限额', placeholder: '请输入限额', width: 140, length: MaxLengthConfig.measureUnitLimit }, // 计量单位限额
  measureUnitMore: { title: '计量单位内满额', placeholder: '请输入限额', width: 140, length: MaxLengthConfig.measureUnitMore }, // 计量单位内满额
  measureUnitLimitValidity: { title: '计量单位有效期', placeholder: '计量单位有效期', width: 140, length: MaxLengthConfig.measureUnitLimitValidity }, // 计量单位限额
  ruleChargeOnly: { title: '', placeholder: '输入金额', width: 40, length: MaxLengthConfig.ruleChargeOnly }, // 多少元
  ruleNumberOnly: { title: '', placeholder: '输入数字', width: 40, length: MaxLengthConfig.ruleNumberOnly }, // 多少
  ruleUnitOnly: { title: '', placeholder: '输入容量', width: 40, length: MaxLengthConfig.ruleUnitOnly }, // 多少升
  linkAddress: { title: '链接地址', placeholder: '请输入链接地址', width: 140, length: MaxLengthConfig.linkAddress }, // 链接地址
  agent: { title: '代理商', placeholder: '请输入代理商', width: 140, length: MaxLengthConfig.linkAddress }, // 链接地址

};

export default {
  install(Vue) {
    Vue.prototype.$SearchInputConfig = SearchInputConfig;
  }
}

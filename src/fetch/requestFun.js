import Vue from "vue";
import fetch from './index';
import apiUrl from './apiUrl';
import Validate from './Validate';
import { aesEncrypt } from "../utils/dtAes";
// import isEmpty from "../utils/isEmpty";
import { send } from './formdata';

/* ==== 用户http请求提示 =====  */
const SuccessTips = (con, callbck, type = 'success') => {
  Vue.prototype.$message({
    showClose: true,
    message: con,
    duration: 1500,
    type: type
  });
  setTimeout(() => {
    callbck && callbck()
  }, 1400);
};
/* ==== 获取apply_id ==== */
const GetApplyId = () => {
  let _applyId = localStorage.getItem('Three-Apply_Id');
  return _applyId;
};
// 初始化密码
const accountInitPwd = (ids, callback) => {
  fetch(apiUrl.accountInitPwd, { 'ids_str': ids }).then(msg => {
    SuccessTips('初始化密码成功', () => { callback && callback(msg) })
  })
};

// 服务账号初始化账号密码 - service_account_back
const serviceAccountBackInitPwd = (ids, callback) => {
  fetch(apiUrl.serviceAccountBackInitPwd, { 'ids_str': ids }).then(msg => {
    SuccessTips('初始化密码成功', () => { callback && callback(msg) })
  })
};

// account - 删除账号
const accountDel = (params, callback) => {
  fetch(apiUrl.accountDel, params).then(msg => {
    SuccessTips('删除成功', () => { callback && callback(msg) })
  })
};

// menu - 获取菜单列表
const menuGetList = (callback) => {
  fetch(apiUrl.menuGetList, {}).then(msg => { callback && callback(msg) })
}

// account - 修改密码
const accountChangePwd = (params, callback) => {
  let _params = params;
  let vArr = [
    ['old_pwd', _params.old_pwd, '旧密码', 'empty'],
    ['new_pwd', _params.new_pwd, '新密码', 'empty|password'],
    ['re_pwd', _params.re_pwd, '确认新密码', 'empty|password']
  ]
  let _Validated = Validate(vArr);
  if (!_Validated) { return };
  if (_params.new_pwd !== _params.re_pwd) {
    Vue.prototype.$message.warning('新密码与确认密码不一致');
    return;
  };
  fetch(apiUrl.accountChangePwd, { 'old_pwd': aesEncrypt(_params.old_pwd), 'new_pwd': aesEncrypt(_params.new_pwd), 're_pwd': aesEncrypt(_params.re_pwd) }).then(msg => { callback && callback(msg) })
}

// account - 获取账号信息
const accountGetAccountInfo = (callback) => {
  fetch(apiUrl.accountGetAccountInfo, {}).then(msg => { callback && callback(msg) })
}

// Uploadify - 上传文件
const UploadifyUploadFile = (file, callback) => {
  // 'myfile' 是与后台协定的名字
  send(apiUrl.UploadifyUploadFile, { 'myfile': file }).then(msg => { callback && callback(msg) }).catch(err => {
    Vue.prototype.$message.warning(err.errmsg);
  })
}

// Uploadify - 上传图片
const UploadifyUploadImage = (file, callback) => {
  // 'myfile' 是与后台协定的名字
  send(apiUrl.UploadifyUploadImage, { 'myfile': file }).then(msg => { callback && callback(msg) }).catch(err => {
    Vue.prototype.$message.warning(err.errmsg);
  })
}

// Uploadify - 上传固件
const UploadifyUploadBin = (file, callback) => {
  // 'myfile' 是与后台协定的名字
  send('uploadify/upload_bin', { 'myfile': file }).then(msg => { callback && callback(msg) }).catch(err => {
    Vue.prototype.$message.warning(err.errmsg);
  })
}

/* ======  登陆  ======= */
// 用户登陆
const accountLogin = (username, password, callback) => {
  fetch(apiUrl.accountLogin, { 'account': username, 'password': password }).then(msg => {
    SuccessTips('登录成功', () => { callback && callback(msg) })
  })
};

// account - 登出
const accountLogout = (callback) => {
  fetch(apiUrl.accountLogout, {}).then(msg => {
    SuccessTips('退出成功', () => { callback && callback(msg) });
  })
};

/* ======  账号管理部分 => 服务人员审核  ======= */
// service_account_front - 列表
const serviceAccountFrontList = (params, callback) => {
  fetch(apiUrl.serviceAccountFrontList, params).then(msg => { callback && callback(msg) })
}

// service_account_front - 新增
const serviceAccountFrontAdd = (params, callback) => {
  let vArr = [
    ['name', params.name, '姓名', 'empty'],
    ['mobile', params.mobile, '手机号码', 'empty|phone']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.serviceAccountFrontAdd, params).then((msg) => {
    SuccessTips('添加成功', () => { callback && callback(msg); })
  })
}
// service_account_front - 编辑
const serviceAccountFrontEdit = (params, callback) => {
  let vArr = [
    ['name', params.name, '姓名', 'empty'],
    ['mobile', params.mobile, '手机号码', 'empty|phone']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.serviceAccountFrontEdit, params).then((msg) => {
    SuccessTips('编辑成功', () => { callback && callback(msg); })
  })
}
// service_account_front - 删除
const serviceAccountFrontDelete = (params, callback) => {
  fetch(apiUrl.serviceAccountFrontDelete, params).then((msg) => {
    SuccessTips('删除成功', () => { callback && callback(msg); })
  })
}
// service_account_front - 详情
const serviceAccountFrontDetail = (params, callback) => {
  fetch(apiUrl.serviceAccountFrontDetail, params).then(msg => { callback && callback(msg) })
}

/* ======  账号管理部分 => 服务账号管理  ======= */
// service_account_back - 获取服务账号[后台创建=>]列表
const serviceAccountBackGetList = (params, callback) => {
  let _params = params;
  let vArr = [
    ['username', _params.username, '账号', 'options|empty|account'],
    ['fullname', _params.fullname, '姓名', 'options|empty']
  ]
  let _Validated = Validate(vArr);
  if (!_Validated) { return };
  fetch(apiUrl.serviceAccountBackGetList, { 'page': _params.page, 'username': _params.username, 'fullname': _params.fullname, 'role_type': _params.role_type }).then(msg => {
    callback && callback(msg)
  })
}

// service_account_back - 新增服务账号
const serviceAccountBackAdd = (params, callback) => {
  let _params = params;
  let vArr = [
    ['username', _params.username, '账号', 'empty|account'],
    ['password', _params.password, '密码', 'empty|password'],
    ['fullname', _params.fullname, '用户姓名', 'empty'],
    ['mobile', _params.mobile, '手机号码', 'empty|phone'],
    ['email', _params.email, '邮箱', 'empty|email'],
    // ['area_province_code', _params.area_province_code, '服务地区', 'empty'],
    // ['area_city_code', _params.area_city_code, '服务地区', 'empty'],
    ['area_ids', _params.area_ids, '服务地区', 'empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  _params.username = aesEncrypt(_params.username);
  _params.password = aesEncrypt(_params.password);
  fetch(apiUrl.serviceAccountBackAdd, _params).then(msg => {
    SuccessTips('新增成功', () => { callback && callback(msg) })
  })
};
// service_account_back - 编辑服务账号
const serviceAccountBackEdit = (params, callback) => {
  let _params = params;
  let vArr = [
    ['username', _params.username, '账号', 'empty|account'],
    ['fullname', _params.fullname, '用户姓名', 'empty'],
    ['mobile', _params.mobile, '手机号码', 'empty|phone'],
    ['email', _params.email, '邮箱', 'empty|email'],
    ['area_ids', _params.area_ids, '服务地区', 'empty']
    // ['area_province_code', _params.area_province_code, '服务地区', 'empty'],
    // ['area_city_code', _params.area_city_code, '服务地区', 'empty'],
    // ['area_district_ids', _params.area_district_ids, '服务地区', 'empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  _params.username = aesEncrypt(_params.username);
  fetch(apiUrl.serviceAccountBackEdit, _params).then(msg => {
    SuccessTips('编辑成功', () => { callback && callback(msg) })
  })
}

// 获取服务账号[后台创建]详情
const serviceAccountBackGetDetail = (id, callback) => {
  fetch(apiUrl.serviceAccountBackGetDetail, { 'id': id }).then(msg => { callback && callback(msg) })
};

/* ==== 账号管理部分 => 运营账号管理 ===== */
// account_operate - 获取运营账号列表
const accountOperateGetList = (params, callback) => {
  let _params = params;
  fetch(apiUrl.accountOperateGetList, { 'page': _params.page, 'username': _params.username, 'fullname': _params.fullname }).then(msg => {
    callback && callback(msg)
  })
}

// account_operate - 新增运营账号
const accountOperateAdd = (params, callback) => {
  let _params = params;
  let vArr = [
    ['username', _params.username, '账号', 'empty|account'],
    ['password', _params.password, '密码', 'empty|password'],
    ['fullname', _params.fullname, '用户姓名', 'empty'],
    ['mobile', _params.mobile, '手机号码', 'empty|phone'],
    ['company_position', _params.company_position, '公司职务', 'empty'],
    ['email', _params.email, '邮箱', 'empty|email']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  _params.username = aesEncrypt(_params.username);
  _params.password = aesEncrypt(_params.password);
  fetch(apiUrl.accountOperateAdd, _params).then(msg => {
    SuccessTips('新增成功', () => { callback && callback(msg) })
  })
};

// account_operate - 编辑运营账号
const accountOperateEdit = (params, callback) => {
  let _params = params;
  let vArr = [
    ['username', _params.username, '账号', 'empty|account'],
    ['fullname', _params.fullname, '用户姓名', 'empty'],
    ['mobile', _params.mobile, '手机号码', 'empty|phone'],
    ['company_position', _params.company_position, '公司职务', 'empty'],
    ['email', _params.email, '邮箱', 'empty|email']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  _params.username = aesEncrypt(_params.username);
  fetch(apiUrl.accountOperateEdit, _params).then(msg => {
    SuccessTips('编辑成功', () => { callback && callback(msg) })
  })
}

// 获取服务账号[后台创建]详情
const accountOperateGetDetail = (id, callback) => {
  fetch(apiUrl.accountOperateGetDetail, { 'id': id }).then(msg => { callback && callback(msg) })
};

/* ==== 账号管理部分 => 代理商账号管理  ==== */
// account_agent - 获取代理商账号列表
const accountAgentGetList = (params, callback) => {
  fetch(apiUrl.accountAgentGetList, params).then(msg => { callback && callback(msg) })
};
// account_agent - 获取代理商账号详情
const accountAgentGetAccountList = (params, callback) => {
  fetch(apiUrl.accountAgentGetAccountList, params).then(msg => { callback && callback(msg) })
};
// account_agent - 获取代理商账号详情
const accountAgentGetDetail = (id, callback) => {
  fetch(apiUrl.accountAgentGetDetail, { 'id': id }).then(msg => { callback && callback(msg) })
};
// account_agent - 新增代理商账号
const accountAgentAdd = (params, callback) => {
  let _params = params;
  let vArr = [
    ['username', _params.username, '账号', 'empty|account'],
    ['password', _params.password, '密码', 'empty|password'],
    ['fullname', _params.fullname, '姓名', 'empty'],
    ['mobile', _params.mobile, '电话号码', 'empty|phone'],
    ['level_type', _params.level_type, '所属等级', 'empty'],
    ['address', _params.address, '详细地址', 'empty'],
    ['menu_ids', _params.menu_ids, '权限', 'empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) {
    return;
  }
  let _urlData = Object.assign({}, params, {
    'username': aesEncrypt(_params.username),
    'password': aesEncrypt(_params.password)
  })
  fetch(apiUrl.accountAgentAdd, _urlData).then(msg => {
    SuccessTips('添加成功', () => { callback && callback(msg) })
  })
};
// account_agent - 编辑代理商账号
const accountAgentEdit = (params, callback) => {
  let _params = params;
  let vArr = [
    ['username', _params.username, '账号', 'empty|account'],
    ['fullname', _params.fullname, '姓名', 'empty'],
    ['mobile', _params.mobile, '电话号码', 'empty|phone'],
    ['level_type', _params.level_type, '所属等级', 'empty'],
    ['address', _params.address, '详细地址', 'empty'],
    ['menu_ids', _params.menu_ids, '权限', 'empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) {
    return;
  }
  let _urlData = Object.assign({'id': _params.id}, params, {
    'username': aesEncrypt(_params.username),
    'password': _params.password ? aesEncrypt(_params.password) : ''
  })
  fetch(apiUrl.accountAgentEdit, _urlData).then(msg => {
    SuccessTips('修改成功', () => { callback && callback(msg) })
  })
};
// 删除
const accountAgentDel = (params, callback) => {
  fetch(apiUrl.accountAgentDel, params).then(msg => {
    SuccessTips('删除成功', () => { callback && callback(msg) })
  });
};
// 导出
const accountAgentExport = (params, callback) => {
  fetch(apiUrl.accountAgentExport, params).then(msg => {
    SuccessTips('导出成功', () => { callback && callback(msg) })
  });
};
/* ==== 设备管理部分 ==== */
/* ------- 导入设备 -------- */
// 列表
const DeviceImportList = (params, callback) => {
  fetch(apiUrl.DeviceImportList, params).then(msg => { callback && callback(msg) });
};
// 新建
const DeviceImportAdd = (params, callback) => {
  fetch(apiUrl.DeviceImportAdd, params).then(msg => {
    SuccessTips('添加成功', () => { callback && callback(msg) })
  });
};
// 导出
const DeviceImportExport = (params, callback) => {
  fetch(apiUrl.DeviceImportExport, params).then(msg => {
    SuccessTips('导出成功', () => { callback && callback(msg) })
  });
};
// 删除
const DeviceImportDelete = (params, callback) => {
  fetch(apiUrl.DeviceImportDelete, params).then(msg => {
    SuccessTips('删除成功', () => { callback && callback(msg) })
  });
};
//  所有代理商接口
const DeviceAllAgent = (params, callback) => {
  fetch(apiUrl.DeviceAllAgent, params).then(msg => { callback && callback(msg) });
};
// 设置代理商接口
const DeviceSetAgent = (params, callback) => {
  fetch(apiUrl.DeviceSetAgent, params).then(msg => {
    SuccessTips('操作成功', () => { callback && callback(msg) })
  });
};
// Device - 设备列表
const DeviceDeviceList = (params, callback) => {
  let _params = params;
  let vArr = [
    ['device_id', _params.device_id, '设备ID', 'options|empty|greaterZero']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.DeviceDeviceList, _params).then(msg => { callback && callback(msg) });
};
/* ==== 设备管理部分 ==== */
/* ------- 升级设备 -------- */
// 列表
const DeviceUpdateList = (params, callback) => {
  fetch('firmware/lists', params).then(msg => { callback && callback(msg) });
};
// 新建
const DeviceUpdateAdd = (params, callback) => {
  fetch('firmware/save', params).then(msg => {
    SuccessTips('添加成功', () => { callback && callback(msg) })
  });
};
// 编辑
const DeviceUpdateEdit = (params, callback) => {
  fetch('firmware/save', params).then(msg => {
    SuccessTips('添加成功', () => { callback && callback(msg) })
  });
};
// 删除
const DeviceUpdateDelete = (params, callback) => {
  fetch('firmware/del', params).then(msg => {
    SuccessTips('删除成功', () => { callback && callback(msg) })
  });
};
// 升级
const DeviceUpdateUpgrade = (params, callback) => {
  fetch('firmware/upgrade', params).then(msg => {
    SuccessTips(msg.errmsg, () => { callback && callback(msg) })
  });
};
// 批量升级
const DeviceUpdateBatchUpgrade = (params, callback) => {
  fetch('firmware/batch_upgrade', params).then(msg => {
    SuccessTips(msg.errmsg, () => { callback && callback(msg) })
  });
};
// 查看版本
const DeviceUpdateVersion = (params, callback) => {
  fetch('firmware/get_version', params).then(msg => {
    SuccessTips(msg.errmsg, () => { callback && callback(msg) })
  });
};
/* ------- 设备检测 -------- */
// 列表
const DeviceTestList = (params, callback) => {
  fetch(apiUrl.DeviceTestList, params).then(msg => { callback && callback(msg) });
};
// 删除
const DeviceTestDelete = (params, callback) => {
  fetch(apiUrl.DeviceTestDelete, params).then(msg => {
    SuccessTips('删除成功', () => { callback && callback(msg) })
  });
};
// 导入
const DeviceTestImport = (fileName, callback) => {
  fetch(apiUrl.DeviceTestImport, { 'myfile': fileName }).then(msg => {
    SuccessTips('导入成功', () => { callback && callback(msg) })
  });
};

// Device - 设备报警日志
const DeviceDeviceWarningLog = (deviceId, page, callback) => {
  fetch(apiUrl.DeviceDeviceWarningLog, { 'device_id': deviceId, 'page': page }).then(msg => { callback && callback(msg) });
};

// Device - 操作设备日志
const DeviceDeviceOperateLog = (deviceId, page, callback) => {
  fetch(apiUrl.DeviceDeviceOperateLog, { 'device_id': deviceId, 'page': page }).then(msg => { callback && callback(msg) });
};
// Filter - 设备导入
const DeviceImport = (params, callback) => {
  fetch(apiUrl.DeviceImport, params).then(msg => {
    SuccessTips('导入成功', () => { callback && callback(msg) });
  })
}
// Device - 导出设备
const exportDevice = (deviceId, callback) => {
  fetch(apiUrl.exportDevice, { 'device_id': deviceId }).then(msg => {
    SuccessTips('导出成功', () => { callback && callback(msg) })
  });
};

// Device - 设备详情
const DeviceDeviceDetail = (deviceId, callback) => {
  fetch(apiUrl.DeviceDeviceDetail, { 'device_id': deviceId }).then(msg => { callback && callback(msg) });
};

// Device - 设备重置数据
const DeviceDeviceReset = (params, callback) => {
  fetch(apiUrl.DeviceDeviceReset, params).then(msg => {
    SuccessTips('重置成功', () => { callback && callback(msg) })
  });
};

// Device - 重置滤芯数据
const DeviceFilterReset = (params, callback) => {
  fetch(apiUrl.DeviceFilterReset, params).then(msg => {
    SuccessTips('重置成功', () => { callback && callback(msg) })
  });
};

// Device - 设备有效期
const DeviceExpireTime = (params, callback) => {
  fetch(apiUrl.DeviceExpireTime, params).then(msg => {
    SuccessTips('操作成功', () => { callback && callback(msg) })
  });
};

// Device - 设备详情
const DeviceOverview = (callback) => {
  fetch(apiUrl.DeviceOverview, {}).then(msg => { callback && callback(msg) });
};

/* ==== 设备管理部分 => 产品概述 ==== */
// Device_graph - 1.激活设备统计曲线图
const DeviceActiveGraph = (type, callback) => {
  fetch(apiUrl.DeviceActiveGraph, { 'type': type }).then(msg => { callback && callback(msg) })
};

// Device_graph - 2.在线设备统计曲线图
const DeviceOnlineGraph = (type, callback) => {
  fetch(apiUrl.DeviceOnlineGraph, { 'type': type }).then(msg => { callback && callback(msg) })
};

// Device_graph - 3.设备制水量统计曲线图
const DeviceWaterGraph = (type, callback) => {
  fetch(apiUrl.DeviceWaterGraph, { 'type': type }).then(msg => { callback && callback(msg) })
};

// Device_graph - 4.活跃设备统计曲线图
const DeviceLivelyGraph = (type, callback) => {
  fetch(apiUrl.DeviceLivelyGraph, { 'type': type }).then(msg => { callback && callback(msg) })
};

/* ==== 设备管理 => 非智能设备 === */
// Device - 获取非智能设备列表
const DeviceGetNonSmartDeviceList = (params, callback) => {
  let _params = params;
  let vArr = [
    ['device_id', _params.device_id, '设备ID', 'options|empty|greaterZero']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.DeviceGetNonSmartDeviceList, _params).then(msg => { callback && callback(msg) });
};

//  Device - 添加非智能设备
const DeviceAddNonSmartDevice = (params, callback) => {
  let _params = params;
  let vArr = [
    ['device_name', _params.device_name, '设备名称', 'empty'],
    ['brand', _params.brand, '设备品牌', 'empty'],
    ['series', _params.series, '设备系列', 'empty'],
    ['model', _params.model, '设备型号', 'empty'],
    ['province_code', _params.province_code, '省市区', 'empty|area'],
    ['city_code', _params.city_code, '省市区', 'empty|area'],
    ['district_code', _params.district_code, '省市区', 'empty|area'],
    ['addr', _params.addr, '详细地址', 'empty'],
    ['realname', _params.realname, '用户姓名', 'empty'],
    ['mobile', _params.mobile, '手机号码', 'empty|phone']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) {
    return;
  }
  fetch(apiUrl.DeviceAddNonSmartDevice, _params).then(msg => {
    SuccessTips('添加成功', () => { callback && callback(msg) })
  })
}

// Device - 修改非智能设备
const DeviceUpdateNonSmartDevice = (params, callback) => {
  let _params = params;
  let vArr = [
    ['device_name', _params.device_name, '设备名称', 'empty'],
    ['brand', _params.brand, '设备品牌', 'empty'],
    ['series', _params.series, '设备系列', 'empty'],
    ['model', _params.model, '设备型号', 'empty'],
    ['province_code', _params.province_code, '省市区', 'empty|area'],
    ['city_code', _params.city_code, '省市区', 'empty|area'],
    ['district_code', _params.district_code, '省市区', 'empty|area'],
    ['addr', _params.addr, '详细地址', 'empty'],
    ['realname', _params.realname, '用户姓名', 'empty'],
    ['mobile', _params.mobile, '手机号码', 'empty|phone']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) {
    return;
  }
  fetch(apiUrl.DeviceUpdateNonSmartDevice, _params).then(msg => {
    SuccessTips('编辑成功', () => { callback && callback(msg) })
  })
};

// Device - 删除非智能设备
const DeviceDeleteNonSmartSevice = (ids, callback) => {
  fetch(apiUrl.DeviceDeleteNonSmartSevice, { 'device_id': ids }).then(msg => {
    SuccessTips('设备删除成功', () => { callback && callback(msg) })
  })
};

// Device - 导出非智能设备
const exportNonSmartDevice = (deviceId, callback) => {
  fetch(apiUrl.exportNonSmartDevice, { 'device_id': deviceId }).then(msg => {
    SuccessTips('导出成功', () => { callback && callback(msg) })
  });
};

/* ==== 设备管理 => 设备地图 === */
const DeviceDeviceMapOverview = (areaId = '100000', callback) => {
  fetch(apiUrl.DeviceDeviceMapOverview, { 'area_id': areaId }).then(msg => { callback && callback(msg) })
};

/* ==== 服务管理部分 => 待处理订单 ==== */
// Fault_repair - 获取待处理订单列表
const FaultRepairGetServiceList = (params, callback) => {
  fetch(apiUrl.FaultRepairGetServiceList, params).then(msg => { callback && callback(msg) })
};

// Fault_repair - 订单审核
const FaultRepairServiceCheck = (params, callback) => {
  let _params = params;
  let vArr = [
    ['remark', _params.remark, '信息内容', 'empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.FaultRepairServiceCheck, { 'service_id': _params.service_id, 'state': _params.state, 'remark': _params.remark }).then(msg => {
    SuccessTips('审核成功', () => { callback && callback(msg) })
  })
};

// Fault_repair - 后台派单
const FaultRepairServiceSendOut = (params, callback) => {
  fetch(apiUrl.FaultRepairServiceSendOut, params).then(msg => {
    SuccessTips('派单成功', () => { callback && callback(msg) })
  })
};

// Fault_repair - 审核记录
const FaultRepairGetCheckList = (params, callback) => {
  fetch(apiUrl.FaultRepairGetCheckList, params).then(msg => { callback && callback(msg) })
};

// Fault_repair - 派单记录
const FaultRepairGetDispatchList = (params, callback) => {
  fetch(apiUrl.FaultRepairGetDispatchList, params).then(msg => { callback && callback(msg) })
};

// Fault_repair - 获取服务详情
const FaultRepairGetDetails = (params, callback) => {
  fetch(apiUrl.FaultRepairGetDetails, params).then(msg => { callback && callback(msg) })
};

// Fault_repair - 获取服务详情
const FaultRepairGetServers = (params, callback) => {
  fetch(apiUrl.FaultRepairGetServers, params).then(msg => { callback && callback(msg) })
};

// Fault_repair - 删除
const FaultRepairDelServers = (params, callback) => {
  fetch(apiUrl.FaultRepairDelServers, params).then(msg => {
    SuccessTips('操作成功', () => { callback && callback(msg) })
  })
};

/* ==== 服务管理部分 => 处理中订单 ==== */
// Fault_repair - 获取处理中订单列表
const FaultRepairGetServiceToBeCompleted = (params, callback) => {
  let _params = params;
  let _urlData = {
    'page': _params.page,
    'service_id': _params.service_id,
    'service_type': _params.service_type,
    'query_type': _params.query_type,
    'province_code': _params.province_code,
    'city_code': _params.city_code,
    'district_code': _params.district_code,
    'time_type': _params.time_type
  }
  fetch(apiUrl.FaultRepairGetServiceToBeCompleted, _urlData).then(msg => { callback && callback(msg) })
};

// Fault_repair - 服务流程图
const FaultRepairGetServiceTree = (serviceId, callback) => {
  fetch(apiUrl.FaultRepairGetServiceTree, { 'service_id': serviceId }).then(msg => { callback && callback(msg) })
};

/* ==== 服务管理部分 => 经完成的订单 ==== */
// Fault_repair - 获取已完成订单列表
const FaultRepairGetCompletedList = (params, callback) => {
  let _params = params;
  let _urlData = {
    'page': _params.page,
    'service_id': _params.service_id,
    'service_type': _params.service_type,
    'query_type': _params.query_type,
    'province_code': _params.province_code,
    'city_code': _params.city_code,
    'district_code': _params.district_code
  }
  fetch(apiUrl.FaultRepairGetCompletedList, _urlData).then(msg => { callback && callback(msg) })
};

// Fault_repair - 获取评价
const FaultRepairGetEvaluation = (params, callback) => {
  fetch(apiUrl.FaultRepairGetEvaluation, params).then(msg => { callback && callback(msg) })
};

/* ==== 告警与推送 => 用户反馈管理 ==== */
// Feedback - 获取反馈列表
const FeedbackGetFeedbackList = (params, callback) => {
  let _params = params;
  let _urlData = {
    'page': _params.page,
    'query_type': _params.query_type,
    'state': _params.state,
    'method': _params.method,
    'channel': _params.channel
  };
  fetch(apiUrl.FeedbackGetFeedbackList, _urlData).then(msg => { callback && callback(msg) })
};

// Feedback - 获取反馈处理记录列表
const FeedbackGetFeedbackLogList = (id, callback) => {
  fetch(apiUrl.FeedbackGetFeedbackLogList, { 'id': id }).then(msg => { callback && callback(msg) })
};

// Feedback - 获取反馈详情
const FeedbackGetFeedbackDetail = (id, callback) => {
  fetch(apiUrl.FeedbackGetFeedbackDetail, { 'id': id }).then(msg => { callback && callback(msg) })
};

// Feedback - 处理反馈
const FeedbackDealFeedback = (params, callback) => {
  let _params = params
  fetch(apiUrl.FeedbackDealFeedback, { 'id': _params.id, 'state': _params.state, 'remark': _params.remark }).then(msg => {
    SuccessTips('处理成功', () => {
      callback && callback(msg)
    })
  })
};

/* ==== 告警与推送部分 => 推送模板设置 ==== */
// Msg_template - 获取模版列表
const msgTemplateGetList = (params, callback) => {
  fetch(apiUrl.msgTemplateGetList, { 'page': params.page, 'msg_type': params.msgType || '' }).then(msg => {
    callback && callback(msg)
  })
};

// Msg_template - 获取模版列表
const msgTemplateGetAll = (params, callback) => {
  fetch(apiUrl.msgTemplateGetAll, { 'page': params.page, 'msg_type': params.msgType || '' }).then(msg => {
    callback && callback(msg)
  })
};

// Msg_template - 获取模版详情
const msgTemplateGetDetail = (id, callback) => {
  fetch(apiUrl.msgTemplateGetDetail, { 'id': id }).then(msg => { callback && callback(msg) })
};

// Msg_template - 添加模版
const msgTemplateAdd = (params, callback) => {
  let _params = params;
  let vArr = [
    ['name', _params.name, '模板名称', 'empty'],
    ['title', _params.title, '标题', 'empty'],
    ['content', _params.content, '信息内容', 'empty'],
    ['url', _params.url, '信息链接', 'empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  // fetch(apiUrl.msgTemplateAdd, {
  //   'id': _params.id,
  //   'msg_type': _params.msg_type,
  //   'name': _params.name,
  //   'title': _params.title,
  //   'content': _params.content,
  //   'url': _params.url
  // }).then(msg => { SuccessTips('提交成功', () => { callback && callback(msg) }) });
  fetch(apiUrl.msgTemplateAdd, _params).then(msg => { SuccessTips('提交成功', () => { callback && callback(msg) }) })
};

// Msg_template - 编辑模版
const msgTemplateEdit = (params, callback) => {
  let _params = params;
  let vArr = [
    ['name', _params.name, '模板名称', 'empty'],
    ['title', _params.title, '标题', 'empty'],
    ['content', _params.content, '信息内容', 'empty'],
    ['url', _params.url, '信息链接', 'empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.msgTemplateEdit, _params).then(msg => { SuccessTips('提交成功', () => { callback && callback(msg) }) })
    // fetch(apiUrl.msgTemplateEdit, {
    //   'id': _params.id,
    //   'msg_type': _params.msg_type,
    //   'name': _params.name,
    //   'title': _params.title,
    //   'content': _params.content,
    //   'url': _params.url
    // }).then(msg => { SuccessTips('提交成功', () => { callback && callback(msg) }) })
};

// Msg_template - 删除模版
const msgTemplateDel = (id, callback) => {
  fetch(apiUrl.msgTemplateDel, { 'ids_str': id }).then(msg => {
    SuccessTips('模板删除成功', () => { callback && callback(msg) })
  })
};
/* ==== 告警与推送部分 => 广告图片设置 ==== */
// information - 删除资讯
const informationDel = (id, callback) => {
  fetch(apiUrl.informationDel, { 'id': id }).then(msg => {
    SuccessTips('删除成功', () => { callback && callback(msg) })
  })
}

// information - 新增资讯
const informationAdd = (params, callback) => {
  let _params = params;
  let vArr = [
    ['title', _params.title, '标题', 'empty'],
    ['content', _params.content, '内容', 'empty'],
    ['cover_img', _params.cover_img, '封面图片', 'empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.informationAdd, params).then(msg => {
    SuccessTips('新增咨询成功', () => { callback && callback(msg) })
  })
}

// information - 编辑资讯
const informationEdit = (params, callback, tips = '保存成功') => {
  fetch(apiUrl.informationEdit, params).then(msg => {
    SuccessTips(tips, () => { callback && callback(msg) })
  })
}

// information - 获取资讯列表
const informationGetList = (params, callback) => {
  fetch(apiUrl.informationGetList, params).then(msg => { callback && callback(msg) })
}

// information - 获取资讯详情
const informationGetDetail = (id, callback) => {
  fetch(apiUrl.informationGetDetail, { 'id': id }).then(msg => { callback && callback(msg) })
}

/* ==== 告警与推送部分 => 广告图片设置 ==== */
// advertisement - 删除广告图片
const advertisementDel = (id, callback) => {
  fetch(apiUrl.advertisementDel, { 'id': id }).then(msg => {
    SuccessTips('图片删除成功', () => { callback && callback(msg) })
  })
}

// advertisement - 新增广告图片
const advertisementAdd = (type, image, url, callback) => {
  fetch(apiUrl.advertisementAdd, { 'type': type, 'image': image, 'url': url }).then(msg => {
    SuccessTips('图片添加成功', () => { callback && callback(msg) })
  })
}

// advertisement - 获取广告图片列表
const advertisementGetList = (page, callback) => {
  fetch(apiUrl.advertisementGetList, { 'page': page }).then(msg => { callback && callback(msg) })
}

/* ==== 告警与推送 => 信息公告推送 ==== */
// User_msg - 批量发送消息
const UserMsgSendMsgs = (msgId, uidArr, callback) => {
  if (!msgId) {
    Vue.prototype.$message.warning('请选择模板');
    return;
  }
  if (!uidArr.length) {
    Vue.prototype.$message.warning('请选择要发送的用户');
    return;
  }
  fetch(apiUrl.UserMsgSendMsgs, { 'msg_id': msgId, 'uid': uidArr.join(',') }).then(msg => {
    SuccessTips('发送成功', () => { callback && callback(msg) })
  })
};

// User_msg - 获取信息推送列表
const UserMsgGetMsgList = (page, callback) => {
  fetch(apiUrl.UserMsgGetMsgList, { 'page': page }).then(msg => { callback && callback(msg) });
};

// User_msg - 获取用户列表
const UserMsgGetUserList = (params, callback) => {
  let _params = params;
  let vArr = [
    ['contact', _params.contact, '手机号', 'options|empty|phoneDim']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.UserMsgGetUserList, {
    'page': _params.page,
    'contact': _params.contact,
    'province_code': _params.province_code,
    'city_code': _params.city_code,
    'district_code': _params.district_code
  }).then(msg => {
    callback && callback(msg)
  })
}

/* ==== 告警与推送部分 => 设备报警记录 ==== */
const DeviceWarningGetWarningList = (params, callback) => {
  let _params = params;
  let vArr = [
    ['device_id', _params.device_id, '设备ID', 'options|empty|greaterZero']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.DeviceWarningGetWarningList, params).then(msg => { callback && callback(msg) })
}

/* ==== 告警与推送部分 => 滤芯更换提醒 ==== */
// Filter_warning - 批量发送消息
const FilterWarningSendMsgs = (templateId, idArr, callback) => {
  if (!templateId) { Vue.prototype.$message.warning('请选择模板'); return; }
  if (!idArr.length) { Vue.prototype.$message.warning('请选择要发送的用户'); return; }
  fetch(apiUrl.FilterWarningSendMsgs, { 'msg_id': templateId, 'device_id': idArr.join(',') }).then(msg => {
    SuccessTips('发送成功', () => { callback && callback(msg) })
  })
}

// Filter_warning - 获取用户设备列表
const FilterWarningGetUserDevice = (params, callback) => {
  fetch(apiUrl.FilterWarningGetUserDevice, params).then(msg => { callback && callback(msg) })
}

/* ==== 用户管理部分 => 用户画像 ==== */
// User - 用户统计
const UserUserStatistics = (callback) => {
  fetch(apiUrl.UserUserStatistics, {}).then(msg => { callback && callback(msg) });
}

// User - 用户年龄分布
const UserAgeMap = (callback) => {
  fetch(apiUrl.UserAgeMap, {}).then(msg => { callback && callback(msg) });
}

// User - 用户性别分布
const UserSexMap = (callback) => {
  fetch(apiUrl.UserSexMap, {}).then(msg => { callback && callback(msg) });
}

// User - 6.用户地图分布(省份)
const UserUserMap = (callback) => {
  fetch(apiUrl.UserUserMap, {}).then(msg => { callback && callback(msg) });
}

/* ==== 用户管理部分 => 用户列表 ==== */
// User - 用户列表
const UserUsers = (params, callback) => {
  fetch(apiUrl.UserUsers, params).then(msg => { callback && callback(msg) });
}

// User - 用户设备
const UserUserDevices = (uid, callback) => {
  fetch(apiUrl.UserUserDevices, { 'uid': uid }).then(msg => { callback && callback(msg) });
}

// // User - 用户列表导出
const UserRxportUsers = (uidStr, callback) => {
  fetch(apiUrl.UserRxportUsers, { 'uid': uidStr }).then(msg => {
    SuccessTips('导出成功', () => { callback && callback(msg) })
  });
};
/* ==== 财务部分 => 财务管理部分 ==== */
const financeIndex = (params, callback) => {
  fetch(apiUrl.financeIndex, params).then(msg => { callback && callback(msg) });
}
// 导出财务列表
const financeExportData = (deviceId, callback) => {
  fetch(apiUrl.financeExportData, { 'id': deviceId }).then(msg => {
    SuccessTips('导出成功', () => { callback && callback(msg) })
  });
};
// 财务收益
const financeEarnMoney = (params, callback) => {
  fetch(apiUrl.financeEarnMoney, params).then(msg => { callback && callback(msg) });
};
// 提现
const financeWithMoney = (params, callback) => {
  fetch(apiUrl.financeWithMoney, params).then(msg => { callback && callback(msg) });
};
// 详情
const financeShowBonus = (params, callback) => {
  fetch(apiUrl.financeShowBonus, params).then(msg => { callback && callback(msg) });
};
/* ==== 财务部分 => 提现管理 ==== */
const financeGetAuditList = (params, callback) => {
  fetch(apiUrl.financeGetAuditList, params).then(msg => { callback && callback(msg) });
}
const financePassAudit = (params, callback) => {
  fetch(apiUrl.financePassAudit, params).then(msg => {
    SuccessTips('操作成功', () => { callback && callback(msg) })
  });
}
const financeGetRequest = (params, callback) => {
  fetch(apiUrl.financeGetRequest, params).then(msg => { callback && callback(msg) });
}// 导出财务列表
const financeExportAuditData = (params, callback) => {
  fetch(apiUrl.financeExportAuditData, params).then(msg => {
    SuccessTips('导出成功', () => { callback && callback(msg) })
  });
}
/* ==== 财务部分 => 分润记录 ==== */
const financeRecordGetList = (params, callback) => {
  fetch(apiUrl.financeRecordGetList, params).then(msg => { callback && callback(msg) });
}
const financeRecordGetDetail = (params, callback) => {
  fetch(apiUrl.financeRecordGetDetail, params).then(msg => { callback && callback(msg) });
}
const financeRecordAdd = (params, callback) => {
  fetch(apiUrl.financeRecordAdd, params).then(msg => { callback && callback(msg) });
}
const financeRecordEdit = (params, callback) => {
  fetch(apiUrl.financeRecordEdit, params).then(msg => { callback && callback(msg) });
}
const financeRecordDel = (params, callback) => {
  fetch(apiUrl.financeRecordDel, params).then(msg => { callback && callback(msg) });
}
const financeRecordExport = (params, callback) => {
  fetch(apiUrl.financeRecordExport, params).then(msg => {
    SuccessTips('导出成功', () => { callback && callback(msg) })
  });
};
/* ==== 财务部分 => 分润管理 ==== */
const financeBonusGetList = (params, callback) => {
  fetch(apiUrl.financeBonusGetList, params).then(msg => { callback && callback(msg) });
}
const financeBonusGetDetail = (params, callback) => {
  fetch(apiUrl.financeBonusGetDetail, params).then(msg => { callback && callback(msg) });
}
const financeBonusAdd = (params, callback) => {
  fetch(apiUrl.financeBonusAdd, params).then(msg => { callback && callback(msg) });
}
const financeBonusEdit = (params, callback) => {
  fetch(apiUrl.financeBonusEdit, params).then(msg => { callback && callback(msg) });
}
const financeBonusDel = (params, callback) => {
  fetch(apiUrl.financeBonusDel, params).then(msg => { callback && callback(msg) });
}
/* ==== 系统设置部分 => 参数设置 ==== */
// System - 保存勾选要展示的面板
const SystemSaveBoards = (idsStr, callback) => {
  fetch(apiUrl.SystemSaveBoards, { 'board_ids': idsStr }).then(msg => {
    SuccessTips('保存成功', () => { callback && callback(msg) })
  })
}

// System - 2.获取需要在首页展示的面板
const SystemAccountBoards = (callback) => {
  fetch(apiUrl.SystemAccountBoards, {}).then(msg => { callback && callback(msg) })
}

// System - 3.获取所有面板
const SystemBoards = (callback) => {
  fetch(apiUrl.SystemBoards, {}).then(msg => { callback && callback(msg) })
}
/* ==== 系统设置部分 => 品牌管理 ==== */
// 品牌管理 - 获取列表
const SystemBrandList = (params, callback) => {
  fetch(apiUrl.SystemBrandList, params).then(msg => { callback && callback(msg) })
}
// 品牌管理 -下拉选择
const SystemBrandListOption = (params, callback) => {
  fetch(apiUrl.SystemBrandListOption, params).then(msg => { callback && callback(msg) })
}
// 品牌管理 - 新增
const SystemBrandAdd = (params, callback) => {
  // let _params = params;
  // let vArr = [
  //   ['enterprise_id', _params.enterprise_id, '企业', 'empty']
  // ];
  // let _Validated = Validate(vArr);
  // if (!_Validated) { return; }
  fetch(apiUrl.SystemBrandAdd, params).then(msg => {
    SuccessTips('新增成功', () => { callback && callback(msg) })
  })
}
// 品牌管理 - 编辑
const SystemBrandEdit = (params, callback) => {
  fetch(apiUrl.SystemBrandEdit, params).then(msg => {
    SuccessTips('编辑成功', () => { callback && callback(msg) })
  })
}
/* ==== 系统设置部分 => 系列管理 ==== */
// 系列管理 - 获取列表
const SystemSeriesList = (params, callback) => {
  fetch(apiUrl.SystemSeriesList, params).then(msg => { callback && callback(msg) })
}
// 系列管理 - 下拉选择
const SystemSeriesListOption = (params, callback) => {
  fetch(apiUrl.SystemSeriesListOption, params).then(msg => { callback && callback(msg) })
}
// 系列管理 - 新增
const SystemSeriesAdd = (params, callback) => {
  let _params = params;
  let vArr = [
    ['brand_id', _params.brand_id, '品牌', 'empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.SystemSeriesAdd, params).then(msg => {
    SuccessTips('新增成功', () => { callback && callback(msg) })
  })
}
// 系列管理 - 编辑
const SystemSeriesEdit = (params, callback) => {
  fetch(apiUrl.SystemSeriesEdit, params).then(msg => {
    SuccessTips('编辑成功', () => { callback && callback(msg) })
  })
}
/* ==== 系统设置部分 => 型号管理 ==== */
// 型号管理 - 获取列表
const SystemModelSetList = (params, callback) => {
  fetch(apiUrl.SystemModelSetList, params).then(msg => { callback && callback(msg) })
}
// 型号管理 - 下拉选择
const SystemModelSetListOption = (params, callback) => {
  fetch(apiUrl.SystemModelSetListOption, params).then(msg => { callback && callback(msg) })
}
// 型号管理 - 新增
const SystemModelSetAdd = (params, callback) => {
  let _params = params;
  let vArr = [
    ['series_id', _params.series_id, '系列', 'empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.SystemModelSetAdd, params).then(msg => {
    SuccessTips('新增成功', () => { callback && callback(msg) })
  })
}
// 型号管理 - 编辑
const SystemModelSetEdit = (params, callback) => {
  fetch(apiUrl.SystemModelSetEdit, params).then(msg => {
    SuccessTips('编辑成功', () => { callback && callback(msg) })
  })
}
/* ==== 系统设置部分 => 批次管理 ==== */
// 批次管理 - 获取列表
const SystemBatchList = (params, callback) => {
  fetch(apiUrl.SystemBatchList, params).then(msg => { callback && callback(msg) })
}
// 批次管理 - 新增
const SystemBatchAdd = (params, callback) => {
  fetch(apiUrl.SystemBatchAdd, params).then(msg => {
    SuccessTips('新增成功', () => { callback && callback(msg) })
  })
}
// 批次管理 - 批量导入
const SystemBatchImport = (params, callback) => {
  let _params = params;
  let vArr = [
    ['model_id', _params.model_id, '型号', 'empty']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.SystemBatchImport, params).then(msg => {
    SuccessTips('导入成功', () => { callback && callback(msg) })
  })
}
/* ==== 租赁管理部分 => 租赁规则列表 ==== */
// lease - 1.获取租赁规则表
const leaseLeaseList = (params, callback) => {
  fetch(apiUrl.leaseLeaseList, params).then(msg => { callback && callback(msg) })
}

// 选择产品接口(后续添加)
const deviceModelMenu = (params, callback) => {
  fetch('device/model_menu', {}).then(msg => { callback && callback(msg) })
}

// lease - 2.添加租赁规则
const leaseAddLease = (params, ruleTitleCheck, callback) => {
  let _params = params;
  console.log(params)
  let vArr = [
    ['name', _params.name, '租赁规则名称', 'empty'],
    ['scene', _params.scene, '使用场景', 'empty'],
    ['type', _params.type, '租赁模式', 'empty'],
    ['brand_id', _params.brand_id, '品牌', 'empty'],
    ['series_id', _params.series_id, '系列', 'empty'],
    ['model_id', _params.model_id, '型号', 'empty']
    // ['province_code', _params.province_code, '省市区', 'area'],
    // ['city_code', _params.scene, '省市区', 'empty'],
    // ['district_code', _params.scene, '省市区', 'empty']
  ];
  let _list = JSON.parse(params.pack_list);
  _list.forEach((item, index) => {
    vArr.push(['name' + index, item.name, '规则4套餐名称', 'empty'], ['amount' + index, item.amount, '规则4购买用量', 'empty|greaterZero'], ['money' + index, item.money, '规则4套餐费用', 'empty|greaterZero']);
  })
  if (ruleTitleCheck.ruleTitleCheck5) {
    vArr.push(['over_pack_money', _list[0].over_pack_money, '规则5计量单位金额', 'empty|greaterZero'], ['over_pack_flow', _list[0].over_pack_flow, '规则5计量单位容量', 'empty|greaterZero'], ['over_flow_amount', _list[0].over_flow_amount, '规则5超出费用容量', 'empty|greaterZero'], ['over_flow_money', _list[0].over_flow_money, '规则5超出费用金额', 'empty|greaterZero'])
  }
  if (ruleTitleCheck.ruleTitleCheck6) {
    vArr.push(['discount_amount', _list[0].discount_amount, '规则6计量单位内满额', 'empty|greaterZero'], ['discount_money', _list[0].discount_money, '规则6超出费用金额', 'empty|greaterZero'])
  }
  if (ruleTitleCheck.ruleTitleCheck2) {
    vArr.push(['deposit', _params.deposit, '规则2套餐费用', 'empty|greaterZero']);
  }
  if (ruleTitleCheck.ruleTitleCheck3) {
    vArr.push(['trial_name', _params.trial_name, '规则3套餐名称', 'empty'], ['trial_number', _params.trial_number, '规则3试用用量', 'empty|greaterZero']);
  }
  if (ruleTitleCheck.ruleTitleCheck7) {
    vArr.push(['free_number', _params.free_number, '规则7赠送条件', 'empty|greaterZero'])
  }
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.leaseAddLease, params).then(msg => {
    SuccessTips('新增成功', () => { callback && callback(msg) })
  })
};

// lease - 3.获取一个租赁规则
const leaseOneLease = (id, callback) => {
  fetch(apiUrl.leaseOneLease, { 'id': id }).then(msg => { callback && callback(msg) })
}

// lease - 删除租赁规则
const leaseDelLease = (id, callback) => {
  fetch(apiUrl.leaseDelLease, { 'id': id }).then(msg => {
    SuccessTips('规则删除成功', () => { callback && callback(msg) })
  })
};
// lease - 4.添加套餐
// const leaseAddPackage = (callback) => {
//   fetch(apiUrl.leaseAddPackage, {}).then(msg => { callback && callback(msg) })
// }

/* ==== 租赁管理部分 => 设备规则管理 ==== */
// device_lease - 获取设备规则列表
const deviceLeaseSetList = (params, callback) => {
  fetch(apiUrl.deviceLeaseSetList, params).then(msg => { callback && callback(msg) })
}

/* ==== 滤芯管理部分 => 滤芯防伪管理 ==== */
// Filter - 获取滤芯列表
const FilterGetFilterList = (params, callback) => {
  fetch(apiUrl.FilterGetFilterList, params).then(msg => { callback && callback(msg) })
}

// Filter - 上传滤芯
const FilterImportFilter = (fileName, callback) => {
  fetch(apiUrl.FilterImportFilter, { 'myfile': fileName }).then(msg => {
    SuccessTips('导入成功', () => { callback && callback(msg) });
  })
}

/* ==== 升级管理部分 => 版本管理 ==== */
// firmware - 获取固件版本管理列表
const FirmwareLists = (page, callback) => {
  fetch(apiUrl.FirmwareLists, { 'page': page }).then(msg => { callback && callback(msg) })
};
// firmware - 获取固件版本详情
const FirmwareDetail = (id, callback) => {
  fetch(apiUrl.FirmwareDetail, { 'id': id }).then(msg => { callback && callback(msg) })
};
// Oss_upload - 获取OSS表单上传参数
const OssUploadGetPostObjectParams = (callback) => {
  fetch(apiUrl.OssUploadGetPostObjectParams, { 'type': 1 }).then(msg => {
    SuccessTips('删除成功', () => { callback && callback(msg) })
  })
};
/* ==== 升级管理部分 => 升级记录 ==== */
// upgrade_log - 获取设备升级记录
const UpgradeLogLists = (params, callback) => {
  let _params = params;
  let vArr = [
    ['device_id', _params.device_id, '设备ID', 'options|empty|greaterZero']
  ];
  let _Validated = Validate(vArr);
  if (!_Validated) { return; }
  fetch(apiUrl.UpgradeLogLists, params).then(msg => { callback && callback(msg) })
};
/* ==== 系统日志部分 ==== */
// Account_assign - 获取分配记录
const AccountAssignGetAssignLog = (params, callback) => {
  fetch(apiUrl.AccountAssignGetAssignLog, params).then(msg => { callback && callback(msg) })
};
// Login_log - 人员登录信息
const LoginLogGetLoginLog = (params, callback) => {
  fetch(apiUrl.LoginLogGetLoginLog, params).then(msg => { callback && callback(msg) })
};
// Login_log - 设备日志信息
const DeviceLog = (params, callback) => {
  fetch('upgrade_log/get_upgrade_log', params).then(msg => { callback && callback(msg) })
};


//dlw
//獲取搜索訂單
const Orderall  = (params,callback) => {
   fetch(apiUrl.Orderall,params).then(msg => { callback && callback(msg) })
};

const gettoken  = (callback) => {
  fetch(apiUrl.gettoken).then(msg => {
    callback && callback(msg)
  })
};
const logall  = (params,callback) => {
  fetch(apiUrl.logall,params).then(msg => {
    callback && callback(msg)
  })
};
const addorder  = (params,callback) => {
  fetch(apiUrl.addorder,params).then(msg => {
    callback && callback(msg)
  })
};
const logoff  = (params,callback) => {
  fetch(apiUrl.logoff,params).then(msg => {
    SuccessTips('退出成功', () => { callback && callback(msg) })
  })
};
const audit  = (params,callback) => {
  fetch(apiUrl.audit,params).then(msg => {
    SuccessTips('审核成功', () => { callback && callback(msg) })
  })
};
const orderpay  = (params,callback) => {
  fetch(apiUrl.orderpay,params).then(msg => {
    callback && callback(msg)
  })
};
const polls  = (params,callback) => {
  fetch(apiUrl.polls,params,false).then(msg => {
    callback && callback(msg)
  })
};
const activegraph  = (params,callback) => {
  fetch(apiUrl.activegraph,params,false).then(msg => {
    callback && callback(msg)
  })
};





//搜索功能
const getlog  = (params,callback) => {
  fetch(apiUrl.getlog,params,false).then(msg => {
    callback && callback(msg)
  })
};
const getorder  = (params,callback) => {
  fetch(apiUrl.getorder,params,false).then(msg => {
    callback && callback(msg)
  })
};





//llx
//llx
//device设备列表1
const deviceAll = (params,callback) => {
  fetch(apiUrl.deviceAll,params).then(msg => {
    callback && callback(msg)
  })
};
//index首页
const indexInfo = (params,callback) => {
  fetch(apiUrl.indexInfo,params).then(msg =>{
    callback && callback(msg)
  })
};
//设备新增
const addDevice = (params,callback) =>{
  fetch(apiUrl.addDevice,params).then(msg =>{
    callback && callback(msg)
  })
};
// //设备删除
// const frost = (params,callback) =>{
//   fetch(apiUrl.frost,params).then(msg =>{
//     callback && callback(msg)
//   })
// };
// 固件升级
const Upgrade =(params,callback) =>{
  fetch(apiUrl.Upgrade,params).then(msg =>{
    callback && callback(msg)
  })
};
// //导出设备
// const ExportDevice=(params,callback) =>{
//   fetch(apiUrl.ExportDevice,params).then(msg =>{
//     callback && callback(msg)
//   })
// };
//筛选设备
const getDevice =(params,callback) =>{
  fetch(apiUrl.getDevice,params).then(msg =>{
    callback && callback(msg)
  })
};
//编辑设备
const editorDevice =(params,callback) =>{
  fetch(apiUrl.editorDevice,params).then(msg =>{
    callback && callback(msg)
  })
};
//预通知记录
const pushDevice =(params,callback) =>{
  fetch(apiUrl.pushDevice,params).then(msg =>{
    callback && callback(msg)
  })
};
//设备次数到期提醒列表
const pushGetAll =(params,callback) =>{
  fetch(apiUrl.pushGetAll,params).then(msg =>{
    callback && callback(msg)
  })
};
//批量删除到期提醒数据
const pushDelete=(params,callback) =>{
  fetch(apiUrl.pushDelete,params).then(msg =>{
    callback && callback(msg)
  })
};
//短信推送
const pushMessage=(params,callback) =>{
  fetch(apiUrl.pushMessage,params).then(msg =>{
    callback && callback(msg)
  })
};




//获取所有用户列表信息  zengbin
const getAll = (params, callback) => {
  fetch(apiUrl.getAll, params).then(msg => { callback && callback(msg) })
};
//重置密码 zengbin
const reset = (params, callback) => {
  fetch(apiUrl.reset, params).then(msg => { callback && callback(msg) })
};
//编辑用户信息 zengbin
const up_user = (params, callback) => {
  fetch(apiUrl.up_user, params).then(msg => { callback && callback(msg) })
};
//新增用户  zengbin
const add_user = (params, callback) => {
  fetch(apiUrl.add_user, params).then(msg => { callback && callback(msg) })
};
//冻结用户  zengbin
const frost = (params, callback) => {
  fetch(apiUrl.frost, params).then(msg => { callback && callback(msg) })
};

const userfrost = (params, callback) => {
  fetch(apiUrl.userfrost, params).then(msg => { callback && callback(msg) })
};

//device设备列表1  zengbin
// const deviceAll = (params, callback) => {
//   fetch(apiUrl.deviceAll, params).then(msg => {
//     callback && callback(msg)
//   })
// };
//音频固件列表  zengbin
const videoAll = (params, callback) => {
  fetch(apiUrl.videoAll, params).then(msg => {
    callback && callback(msg)
  })
};
//音频删除   zengbin
const videoFrost = (params, callback) => {
  fetch(apiUrl.videoFrost, params).then(msg => {
    callback && callback(msg)
  })
};
//音频新增上传   zengbin
const videoUpload = (params, callback) => {
  send(apiUrl.videoUpload, params).then(msg => {
    callback && callback(msg)
  })
};
//音频搜索 zengbin
const videoSearch = (params, callback) => {
  fetch(apiUrl.videoSearch, params).then(msg => {
    callback && callback(msg)
  })
};
//查询用户  zengbin
const userSearch = (params, callback) => {
  fetch(apiUrl.userSearch, params).then(msg => {
    callback && callback(msg)
  })
};

//设备详情
const detailDevice=(params,callback) =>{
  fetch(apiUrl.detailDevice,params).then(msg=>{
    callback && callback(msg)
  })
}

export default {
  //dlw
  Orderall,
  gettoken,
  logall,
  addorder,
  logoff,
  audit,
  orderpay,
  polls,
  activegraph,
  getorder,
  pushDevice,



//搜索功能

  getlog,








// llx
  deviceAll,
  indexInfo,
  addDevice,
  frost,
  Upgrade,
  // ExportDevice,
  getDevice,
  editorDevice,
detailDevice,
  pushGetAll,
  pushDelete,
  pushMessage,



  //zengbing
  getAll,
  reset,
  up_user,
  add_user,

  videoAll,
  videoFrost,
  videoUpload,
  videoSearch,
  userSearch,
  userfrost,





  SuccessTips,
  GetApplyId, // 获取apply-id
  accountInitPwd, // 初始化账号密码
  serviceAccountBackInitPwd, // 服务账号初始化账号密码
  accountDel,
  menuGetList,
  accountChangePwd, // account - 修改密码
  accountGetAccountInfo, // account - 获取账号信息
  UploadifyUploadFile, // Uploadify - 上传文件
  UploadifyUploadImage, // Uploadify - 上传图片
  UploadifyUploadBin, // Uploadify - 上传图片
  accountLogin,

  accountLogout,
  /* ======  账号管理部分 => 服务账号管理  ======= */
  serviceAccountFrontList, // service_account_front - 获取服务账号申请列表(服务人员审核列表)
  serviceAccountFrontAdd, // service_account_front - 获取服务账号申请列表(服务人员审核列表)
  serviceAccountFrontEdit, // service_account_front - 获取服务账号申请列表(服务人员审核列表)
  serviceAccountFrontDelete, // service_account_front - 获取服务账号申请列表(服务人员审核列表)
  serviceAccountFrontDetail, // service_account_front - 获取服务账号申请详情(服务人员审核)
  /* ======  账号管理部分 => 服务账号管理  ======= */
  serviceAccountBackGetList, // service_account_back - 获取服务账号[后台创建=>]列表
  serviceAccountBackAdd, // service_account_back - 新增服务账号
  serviceAccountBackEdit, // service_account_back - 编辑服务账号
  serviceAccountBackGetDetail, // 获取服务账号[后台创建]详情
  /* ==== 账号管理部分 => 运营账号管理 ===== */
  accountOperateGetList, // account_operate - 获取运营账号列表
  accountOperateAdd, // account_operate - 新增运营账号
  accountOperateEdit, // account_operate - 编辑运营账号
  accountOperateGetDetail, // 获取服务账号[后台创建]详情
  // 账号管理部分 => 代理商账号管理
  accountAgentGetList, // account_agent - 获取代理商账号列表
  accountAgentGetAccountList,
  accountAgentGetDetail, // account_agent - 获取代理商账号详情
  accountAgentAdd, // account_agent - 新增代理商账号
  accountAgentEdit, // account_agent - 编辑代理商账号
  accountAgentDel, // account_agent - 编辑代理商账号
  accountAgentExport, // 导出
  /* ==== 设备管理部分 => 产品概述 ==== */
  DeviceActiveGraph, // Device_graph - 1.激活设备统计曲线图
  // 设备管理部分 => 导入设备
  DeviceImportList,
  DeviceImportAdd,
  DeviceImportExport,
  DeviceImportDelete,
  DeviceAllAgent,
  DeviceSetAgent,
  // 设备管理部分 => 设备升级
  DeviceUpdateList,
  DeviceUpdateAdd,
  DeviceUpdateEdit,
  DeviceUpdateDelete,
  DeviceUpdateUpgrade,
  DeviceUpdateBatchUpgrade,
  DeviceUpdateVersion,
  // 设备管理部分 => 设备检测
  DeviceTestList,
  DeviceTestDelete,
  DeviceTestImport,
  // 设备管理部分 => 设备管理
  DeviceDeviceList,
  DeviceDeviceWarningLog, // Device - 设备报警日志
  DeviceDeviceOperateLog, // Device - 操作设备日志
  DeviceImport, // Device - 导入设备
  exportDevice, // Device - 导出设备
  DeviceDeviceDetail, // Device - 设备详情
  DeviceDeviceReset, // Device - 设备重置数据
  DeviceFilterReset, // Device - 设备重置数据
  DeviceExpireTime, // Device - 设备重置数据
  DeviceOverview, // 设备首页4个统计
  // 设备管理部分 => 设备地图
  DeviceDeviceMapOverview, // Device_graph - 1.激活设备统计曲线图
  DeviceOnlineGraph, // Device_graph - 2.在线设备统计曲线图
  DeviceWaterGraph, // Device_graph - 3.设备制水量统计曲线图
  DeviceLivelyGraph, // Device_graph - 4.活跃设备统计曲线图
  // 设备管理部分 => 非智能设备管理
  DeviceGetNonSmartDeviceList, // Device - 获取非智能设备列表
  DeviceAddNonSmartDevice, //  Device - 添加非智能设备
  DeviceUpdateNonSmartDevice, // Device - 修改非智能设备
  DeviceDeleteNonSmartSevice, // Device - 删除非智能设备
  exportNonSmartDevice, // Device - 导出非智能设备
  // 服务管理部分 => 待处理订单
  FaultRepairGetServiceList, // Fault_repair - 获取待处理订单列表
  FaultRepairServiceCheck, // Fault_repair - 订单审核
  FaultRepairServiceSendOut, // Fault_repair - 后台派单
  FaultRepairGetCheckList, // Fault_repair - 审核记录
  FaultRepairGetDispatchList, // Fault_repair - 派单记录
  FaultRepairGetDetails, // Fault_repair - 获取服务详情
  FaultRepairGetServers, // Fault_repair - 获取服务人员列表
  FaultRepairDelServers, // Fault_repair - 获取服务人员列表
  // 服务管理部分 => 处理中订单
  FaultRepairGetServiceToBeCompleted, // Fault_repair - 获取处理中订单列表
  FaultRepairGetServiceTree, // Fault_repair - 服务流程图
  // 服务管理部分 => 经完成的订单
  FaultRepairGetCompletedList, // Fault_repair - 获取已完成订单列表
  FaultRepairGetEvaluation, // Fault_repair - 获取评价
  // 告警与推送部分 => 用户反馈管理
  FeedbackGetFeedbackList, // Feedback - 获取反馈列表
  FeedbackGetFeedbackLogList, // Feedback - 获取反馈处理记录列表
  FeedbackGetFeedbackDetail, // Feedback - 获取反馈详情
  FeedbackDealFeedback, // Feedback - 处理反馈
  // 告警与推送部分 => 推送模板设置
  msgTemplateGetList, // Msg_template - 获取模版列表
  msgTemplateGetAll, // Msg_template - 获取模版列表
  msgTemplateGetDetail, // Msg_template - 获取模版详情
  msgTemplateAdd, // Msg_template - 添加模版
  msgTemplateEdit, // Msg_template - 编辑模版
  msgTemplateDel, // Msg_template - 删除模版
  /* ==== 告警与推送部分 => 广告图片设置 ==== */
  informationDel, // information - 删除资讯
  informationAdd, // information - 新增资讯
  informationEdit, // information - 编辑资讯
  informationGetList, // information - 获取资讯列表
  informationGetDetail, // information - 获取资讯详情
  /* ==== 告警与推送部分 => 广告图片设置 ==== */
  advertisementDel, // advertisement - 删除广告图片
  advertisementAdd, // advertisement - 新增广告图片
  advertisementGetList, // advertisement - 获取广告图片列表
  /* ==== 告警与推送部分 => 信息公告推送 ==== */
  UserMsgSendMsgs, // User_msg - 批量发送消息
  UserMsgGetMsgList, // User_msg - 批量发送消息
  UserMsgGetUserList, // User_msg - 批量发送消息
  /* ==== 告警与推送部分 => 设备报警记录 ==== */
  DeviceWarningGetWarningList,
  /* ==== 告警与推送部分 => 滤芯更换提醒 ==== */
  FilterWarningSendMsgs, // Filter_warning - 批量发送消息
  FilterWarningGetUserDevice, // Filter_warning - 获取用户设备列表
  /* ==== 用户管理部分 => 用户画像 ==== */
  UserUserStatistics, // User - 用户统计
  UserAgeMap, // User - 用户年龄分布
  UserSexMap, // User - 用户性别分布
  UserUserMap, // User - 6.用户地图分布(省份)
  /* ==== 用户管理部分 => 用户列表 ==== */
  UserUsers, // User - 用户列表
  UserUserDevices, // User - 用户设备
  UserRxportUsers, // User - 用户列表导出
  /* ==== 财务部分 => 财务管理部分 ==== */
  financeIndex, // finance - 财务管理
  financeExportData, // 导出财务列表
  financeEarnMoney, // 导出财务收益
  financeWithMoney, // 提现
  financeShowBonus, // 提现
  /* ==== 财务部分 => 提现管理 ==== */
  financeGetAuditList, // 列表
  financePassAudit, // 审核
  financeGetRequest, // 审核
  financeExportAuditData, // 导出
  /* ==== 财务部分 => 分润记录 ==== */
  financeRecordGetList,
  financeRecordGetDetail,
  financeRecordAdd,
  financeRecordEdit,
  financeRecordDel,
  financeRecordExport,
  /* ==== 财务部分 => 分润管理 ==== */
  financeBonusGetList,
  financeBonusGetDetail,
  financeBonusAdd,
  financeBonusEdit,
  financeBonusDel,
  /* ==== 系统设置部分 => 参数设置 ==== */
  SystemSaveBoards, // System - 保存勾选要展示的面板
  SystemAccountBoards, // System - 2.获取需要在首页展示的面板
  SystemBoards, // System - 获取需要在首页展示的面板
  /* ==== 系统设置部分 => 品牌管理 ==== */
  SystemBrandList, // 获取列表
  SystemBrandListOption, // 下拉选择
  SystemBrandAdd, // 新增
  SystemBrandEdit, // 编辑
  /* ==== 系统设置部分 => 系列管理 ==== */
  SystemSeriesList, // 获取列表
  SystemSeriesListOption, // 下拉选择
  SystemSeriesAdd, // 新增
  SystemSeriesEdit, // 编辑
  /* ==== 系统设置部分 => 型号管理 ==== */
  SystemModelSetList, // 获取列表
  SystemModelSetListOption, // 下拉选择
  SystemModelSetAdd, // 新增
  SystemModelSetEdit, // 编辑
  /* ==== 系统设置部分 => 批次管理 ==== */
  SystemBatchList, // 获取列表
  SystemBatchAdd, // 新增
  SystemBatchImport, // 批量导入
  /* ==== 租赁管理部分 => 租赁规则列表 ==== */
  leaseLeaseList, // lease - 1.获取租赁规则表
  deviceModelMenu, // lease - 1.获取产品列表
  leaseAddLease, // lease - 2.添加租赁规则
  leaseOneLease, // lease - 3.获取一个租赁规则
  leaseDelLease, // 删除租赁规则
  // leaseAddPackage, // lease - 4.添加套餐
  /* ==== 租赁管理部分 => 设备规则管理 ==== */
  deviceLeaseSetList, // device_lease - 获取设备规则列表
  /* ==== 滤芯管理部分 => 滤芯防伪管理 ==== */
  FilterGetFilterList, // Filter - 获取滤芯列表
  FilterImportFilter, // Filter - 上传滤芯
  /* ==== 升级管理部分 => 版本管理 ==== */
  FirmwareLists, // firmware - 获取固件版本管理列表
  OssUploadGetPostObjectParams, // Oss_upload - 获取OSS表单上传参数
  FirmwareDetail, // firmware - 获取固件版本详情
  /* ==== 升级管理部分 => 升级记录 ==== */
  UpgradeLogLists, // upgrade_log - 获取设备升级记录
  /* ==== 系统日志部分 ==== */
  AccountAssignGetAssignLog, // Account_assign - 获取分配记录
  LoginLogGetLoginLog, // // Login_log - 人员登录信息
  DeviceLog // 设备日志信息
}

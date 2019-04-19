const TableConfig = {
  'stupidManage': {
    api: '',
    solts: '',
    checkedIdName: 'device_id',
    columns: [
      { 'th': '设备ID', 'thKey': 'device_id' },
      { 'th': '设备名称', 'thKey': 'device_name' },
      { 'th': '设备品牌', 'thKey': 'brand_name', 'filter': 'FilterRoleType' },
      { 'th': '设备系列', 'thKey': 'series_name' },
      { 'th': '设备型号', 'thKey': 'model_name' },
      { 'th': '所在省份', 'thKey': 'province' },
      { 'th': '所在城市', 'thKey': 'city' },
      { 'th': '所在地区', 'thKey': 'district' },
      { 'th': '激活日期', 'thKey': 'atime' },
      { 'th': '用户姓名', 'thKey': 'realname' },
      { 'th': '手机号码', 'thKey': 'mobile' },
      { 'th': '操作', 'thKey': 'device_name', 'action': 'edit' }
    ]
  }
}

export {
  TableConfig
}

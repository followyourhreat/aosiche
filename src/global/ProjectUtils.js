import Vue from 'vue';

const ConfirmTip = (text, callback) => {
  Vue.prototype.$messageBox.confirm(text, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then((action) => {
    if (action === 'confirm') {
      callback && callback(action);
    }
  }).catch(() => {
    Vue.prototype.$message({
      type: 'info',
      message: '已取消'
    });
  });
}

// 把每个人列表加checked字段(选择列表中用)
const ListAddChecked = (arr) => {
  let _arr = Array.from(arr);
  _arr.forEach(val => {
    val.checked = false;
  })
  return _arr;
};

// 全选中处理
const ListItemAllChecked = (arr) => {
  let _arr = Array.from(arr);
  _arr.forEach(val => {
    val.checked = true;
  })
  return _arr;
}

// 全选未中处理
const ListItemAllNoChecked = (arr) => {
  let _arr = Array.from(arr);
  _arr.forEach(val => {
    val.checked = false;
  })
  return _arr;
}

// 获取选中item的id 返回id数组
const GetCheckedItemIds = (arr, type = 'id') => {
  let _arr = arr;
  let _idArr = [];
  _arr.forEach(val => {
    if (val.checked) {
      _idArr.push(val[type])
    }
  });
  return _idArr;
}

// 单个点击list - item时判断是否全选择
const ListItemJudegeAllChecked = (arr) => {
  let _arr = Array.from(arr);
  let _isAllChecked = _arr.every(val => {
    return val.checked;
  })
  return _isAllChecked;
}

// 权限数据转换
const RightDataChange = (arr) => {
  let _arr = arr;
  let _rightArr = [];
  _arr.forEach(val => {
    let _children = val.child;
    let _childArr = [];
    _children.forEach(val1 => {
      _childArr.push({ 'id': val1.id, 'label': val1.name })
    });
    _rightArr.push({
      'id': val.id,
      'label': val.name,
      'children': _childArr
    })
  });
  return _rightArr;
}

// 获取地区的数组 遇到all返回0；
const AreaDateChange = (obj) => {
  let _valueCode = obj.code;
  let _valueText = obj.text;
  let _pCode = _valueCode[0] ? ((_valueCode[0] === 'all') ? '0' : (_valueCode[0])) : '0';
  let _cCode = _valueCode[1] ? ((_valueCode[1] === 'all') ? '0' : (_valueCode[1])) : '0';
  let _dCode = _valueCode[2] ? ((_valueCode[2] === 'all') ? '0' : (_valueCode[2])) : '0';
  let _pText = _valueText[0] ? _valueText[0] : '';
  let _cText = _valueText[1] ? _valueText[1] : '';
  let _dText = _valueText[2] ? _valueText[2] : '';
  return {
    code: [_pCode, _cCode, _dCode],
    text: [_pText, _cText, _dText]
  }
};

/**
 * 设置省市区默认值
 * @params arr传进省市区数组code [11000, 11000, 1000]
 * 返回的数组一定得是字符串
 */
const SetAreaDefault = (pCode = '', cCode = '', dCode = '') => {
  let _pCode = pCode;
  let _cCode = cCode;
  let _dCode = dCode;
  if (typeof _pCode !== 'string') { _pCode.toString(); }
  if (typeof _cCode !== 'string') { _cCode.toString(); }
  if (typeof _dCode !== 'string') { _dCode.toString(); }
  return [_pCode, _cCode, _dCode];
}

/**
 * 图表日转换
 * "20180103" => 01-13
 */
const ChartDateChange = (day, type = ' - ') => {
  let _day = day,
    _month = _day.substring(4, 6),
    _date = _day.substring(6);
  return _month + type + _date
}

/**
 * 图表月转换
 * "201701" => 2017-01
 */

const ChartMonthChange = (day, type = ' - ') => {
  let _day = day,
    _month = _day.substring(4, 6), _year = _day.substring(0, 4);
  return _year + type + _month
}

export default {
  ConfirmTip,
  ListAddChecked,
  RightDataChange,
  ListItemAllChecked,
  ListItemAllNoChecked,
  ListItemJudegeAllChecked,
  GetCheckedItemIds,
  AreaDateChange,
  SetAreaDefault,
  ChartDateChange,
  ChartMonthChange
}

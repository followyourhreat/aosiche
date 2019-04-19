import dateFormat from "../utils/dateFormat";
/**
 * 【注意：要使用mixin时候，单个Vue页面命名必须与mixin文件命名一致】
 * 主页上面的搜索，  以search|top命名
 * 侧滑，以slide名称
 * topSearchActive   查询按钮
 * topAreaChange   头部地区筛选
 * paginationChangeActive 翻页
 * checkAllItemActive table全选
 * checkItemActive  table单选
 * dateSearchChange  日期范围选择
 */
// 头部查询按钮事件
export const topSearchActive = {
  methods: {
    topSearchActive() {
      this.pageNumber = 1;
      if (this.currentPage !== this.pageNumber) {
        this.currentPage = this.pageNumber;
      } else {
        this.getMainList(this.getUrlData());
      }
    }
  }
}

// 头部地区筛选
/**
 * searchAreaData: [0, 0, 0] 需要配合data中searchAreaData使用
 */
export const topAreaChange = {
  methods: {
    topAreaChange(value) {
      let _valueCode = value.code;
      let _pCode = _valueCode[0] ? ((_valueCode[0] === '100000') ? '0' : (_valueCode[0])) : '0';
      let _cCode = _valueCode[1] ? ((_valueCode[1] === 'all') ? '0' : (_valueCode[1])) : '0';
      let _dCode = _valueCode[2] ? ((_valueCode[2] === 'all') ? '0' : (_valueCode[2])) : '0';
      this.searchAreaData[0] = _pCode;
      this.searchAreaData[1] = _cCode;
      this.searchAreaData[2] = _dCode;
    }
  }
}

// table 页面变化时候翻页
export const paginationChangeActive = {
  methods: {
    paginationChangeActive(val) {
      this.pageNumber = val;
      // console.log(val);
      this.getMainList(this.getUrlData());
    }
  }
}

// table全选按钮
export const checkAllItemActive = {
  methods: {
    checkAllItemActive(x) {
      this.allItemChecked = !x;
      if (this.allItemChecked) {
        this.listArr = this.$projectUtils.ListItemAllChecked(this.listArr);
      } else {
        this.listArr = this.$projectUtils.ListItemAllNoChecked(this.listArr);
      }
    }
  }
}

// table单选
export const checkItemActive = {
  methods: {
    checkItemActive(x) {
      x.checked = !x.checked;
      this.allItemChecked = this.$projectUtils.ListItemJudegeAllChecked(this.listArr);
    }
  }
}

/**
 * 时间范围
 * data 里必须是这个变量
 * searchDate: { start: '', end: '' }
 * 分为
 * startDateSearchChange()
 * endDateSearchChange
 * 时间返回格式为yyyy-MM-dd
 */
export const dateSearchChange = {
  methods: {
    startDateSearchChange(date1) {
      if (!date1) { this.searchDate.start = ''; return; }
      this.searchDate.start = dateFormat(date1, 'yyyy-MM-dd');
    },
    endDateSearchChange(date2) {
      if (!date2) { this.searchDate.end = ''; return; }
      this.searchDate.end = dateFormat(date2, 'yyyy-MM-dd');
    }
  }
}

/**
 * 时间范围
 * data 里必须是这个变量
 * searchDate: { start: '', end: '' }
 * 分为
 * startDateSearchChange()
 * endDateSearchChange
 * 时间返回格式为yyyy-MM-dd
 */
export const dateSearchChange2 = {
  methods: {
    startDateSearchChange2(date1) {
      if (!date1) { this.searchDate2.start = ''; return; }
      this.searchDate2.start = dateFormat(date1, 'yyyy-MM-dd');
    },
    endDateSearchChange2(date2) {
      if (!date2) { this.searchDate2.end = ''; return; }
      this.searchDate2.end = dateFormat(date2, 'yyyy-MM-dd');
    }
  }
}

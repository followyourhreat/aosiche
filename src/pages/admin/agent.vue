<template>
  <div calss="push-remind-outer">
    <div class="dt-search-top">
      <!-- 账号 -->
      <dt-search-input  ref="userNameSearchRef" title="账号" placeholder ='请输入账号'></dt-search-input>

      <!-- 姓名 -->
      <dt-search-input  ref="fullNameSearchRef" title="姓名" placeholder ='请输入姓名'></dt-search-input>

      <!-- 手机号 -->
      <dt-search-input ref="mobileSearchRef" title="手机号" placeholder ='请输入手机号'></dt-search-input>

      <dt-select-option-dynamic ref='introducerSearchRef' optiosTitle='介绍人' :optionsData ='optionsData0' conWidth = '120'></dt-select-option-dynamic>

      <div class="dt-search-cell">

      </div>
    </div>
    <div class="dt-search-top">
      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive">查 询</button>
        <button type="button" class="dt-btn dt-btn-add"  @click="topAddActive">新 增</button>
        <button type="button" class="dt-btn dt-btn-export" @click="topExportActive">导 出</button>
        <!-- <button type="button" class="dt-btn dt-btn-delete" @click="topDeleteActive">删 除</button> -->
      </div>
    </div>

    <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th class="tw-handle-account">账号</th>
                    <th class="tw-use-status">账号状态</th>
                    <th class="tw-user-name">姓名</th>
                    <th class="tw-telephone">手机号码</th>
                    <th class="tw-agent-grade">所属等级</th>
                    <th class="tw-staff-position">介绍人</th>
                    <th class="tw-company-name">上一级</th>
                    <th class="tw-company-name">添加人</th>
                    <th class="tw-time-ss">添加时间</th>
                    <th class="tw-handle-edit2">操作</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <td>{{item.username}}</td>
                  <td>{{item.state == 1 ? '正常' : '禁用'}}</td>
                  <td>{{item.fullname}}</td>
                  <td>{{item.mobile}}</td>
                  <td>{{item.level_type|FilterAgentLevelType}}</td>
                  <td>{{item.introducer_name}}</td>
                  <td>{{item.leader_name}}</td>
                  <td>{{item.create_name}}</td>
                  <td>{{item.ctime}}</td>
                  <td class="dt-table-edit">
                    <!-- <b @click="financeEarnMoney(item)">收益</b> -->
                    <b @click="tableEditActive(item)">编 辑</b>
                    <b @click="tableDeleteActive(item)" class="dt-table-detele">删 除</b>
                    <!-- <b class="dt-table-detele" @click="initPasswordActive(item)">初始化密码</b> -->
                  </td>
                </tr>
              </tbody>
          </table>
          <div class="no-data-tip" v-if="!listArr.length">暂无数据</div>
        </div>
        <div class="dt-page-wrap">
          <el-pagination class="dt-page-reset"  :page-size="10"  @current-change="paginationChangeActive" :current-page="pageNumber" layout="total, prev, pager, next, jumper" :total="listTotal">
          </el-pagination>
        </div>
      </div>
      <!-- 表格 end -->

      <!-- 侧滑start -->
      <dt-slide-page slideTitle='新增代理商账号' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul>
          <!-- 账号 -->
          <li>
            <dt-search-input ref="userNameSlideRef"  :disabled ='isEditSlideFlag':inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.accountSingle.title" :placeholder ='$SearchInputConfig.accountSingle.placeholder' :maxLength = '$SearchInputConfig.accountSingle.length' defaultValue = ''></dt-search-input>
          </li>

          <!-- 密码 -->
          <li>
            <dt-search-input  ref="passwordSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.passwordSingle.title" :placeholder ='$SearchInputConfig.passwordSingle.placeholder' :maxLength = '$SearchInputConfig.passwordSingle.length' defaultValue = ''></dt-search-input>
          </li>

          <!-- 用户姓名 -->
          <li>
            <dt-search-input  ref="fullNameSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.userName.title" :placeholder ='$SearchInputConfig.userName.placeholder' :maxLength = '$SearchInputConfig.userName.length' defaultValue = ''></dt-search-input>
          </li>

          <!-- 手机号码 -->
          <li>
            <dt-search-input  ref="mobileSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.moblie.title" :placeholder ='$SearchInputConfig.moblie.placeholder' :maxLength = '$SearchInputConfig.moblie.length' defaultValue = ''></dt-search-input>
          </li>

          <!-- 公司名称 -->
          <li v-show = "false">
            <dt-search-input  ref="companyNameSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.companyName.title" :placeholder ='$SearchInputConfig.companyName.placeholder' :maxLength = '$SearchInputConfig.companyName.length' defaultValue = ''></dt-search-input>
          </li>

          <!-- 商户号 -->
          <li>
            <dt-search-input ref="shopNumSlideRef" :inputWidth='SlidePageConfig.inputWidthA' title="商户号" placeholder ='请输入商户号' defaultValue = ''></dt-search-input>
          </li>

          <!-- 开户银行 -->
          <li>
            <dt-select-option ref='bankTypeSlideRef' :conWidth = 'SlidePageConfig.inputWidthA' optiosTitle='开户银行' :optionsName ='$ElSelectName.bankType.name' defaultValue=''></dt-select-option>
          </li>

          <!-- 银行卡号 -->
          <li>
            <dt-search-input ref="bankNumSlideRef" :inputWidth='SlidePageConfig.inputWidthA' title="银行卡号" placeholder ='请输入银行卡号' defaultValue = ''></dt-search-input>
          </li>

          <!-- 介绍人 -->
          <li v-show = "accountInfo.type == '1'||accountInfo.type == '3'">
            <dt-select-option-search ref='introducerSlideRef' optiosTitle='介绍人' :optionsData ='optionsData1' :conWidth = 'SlidePageConfig.inputWidthA' @remoteMethod="remoteMethod1"></dt-select-option-search>
          </li>

          <!-- 账号状态 -->
          <li>
            <dt-select-option ref='accountStatusSlideRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.accountStatus.title' :optionsName ='$ElSelectName.accountStatus.name' defaultValue=''></dt-select-option>
          </li>

          <!-- 联系地址 -->
          <li>
            <dt-search-input  ref="addressSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.detailAddress.title" :placeholder ='$SearchInputConfig.detailAddress.placeholder' defaultValue = ''></dt-search-input>
          </li>

          <!-- 合同日期 -->
          <li>
            <dt-date-range2 ref="dateRangeSlideRef" title='合同日期' @startDateChange='startDateSearchChange' @endDateChange='endDateSearchChange'></dt-date-range2>
          </li>

          <!-- 所属等级 -->
          <li>
            <!-- <dt-select-option ref='agentLevelSlideRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.agentLevel.title' :optionsName ='$ElSelectName.agentLevel.name'></dt-select-option> -->
            <dt-select-option-dynamic ref='agentLevelSlideRef' optiosTitle='所属等级' :optionsData ='agentLevel' :conWidth = 'SlidePageConfig.inputWidthA' @selectValueChange="selectValueChange"></dt-select-option-dynamic>
          </li>
          <!-- 上级供应商 -->
          <li v-show = "accountInfo.type == '1'||accountInfo.type == '3'">
            <dt-select-option-search ref='pidSlideRef' optiosTitle='上级供应商' :optionsData ='optionsData2' :conWidth = 'SlidePageConfig.inputWidthA' @remoteMethod="remoteMethod2"></dt-select-option-search>
          </li>
          <!-- 权限管理 start -->
          <li class="slide-first-title">
            <span>权限管理</span>
          </li>
          <li>
            <div>
              <el-tree
                :data="rightData"
                show-checkbox
                node-key="id"
                ref="tree"
                :default-expanded-keys="[]"
                :default-checked-keys="defaultCheckedRight"
                :props="defaultProps">
              </el-tree>
            </div>
          </li>
          <!-- 权限管理 end -->
        </ul>

        <div class="slide-btn-wrap">
          <button class="dt-btn" @click="slideSureActive">确定</button>
          <button class="dt-btn dt-btn-cancel" @click="slideCancelActive">取消</button>
        </div>
      </dt-slide-page>
      <!-- 侧滑 end -->

      <!-- 侧滑start -->
      <dt-slide-page slideTitle='代理商收益' :class="{'slide-page-show': slideShow2}" @hideSlidePage='slideShow2 = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul>
          <li>
            <div class="dt-search-cell">
              <i class="dt-search-title">上个月：</i>
              <span class="dt-search-con" style="width: 400px;">¥{{earnMoney.last_month}}</span>
            </div>
          </li>
          <li>
            <div class="dt-search-cell">
              <i class="dt-search-title">当前月：</i>
              <span class="dt-search-con" style="width: 400px;">¥{{earnMoney.month}}</span>
            </div>
          </li>
        </ul>
      </dt-slide-page>
      <!-- 侧滑 end -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { dtSlidePage, dtDateRange2, dtSelectOptionDynamic } from '../../global/searchComponents';
import { SlidePageConfig } from "../../global/constant.js";
import { paginationChangeActive, topSearchActive, checkAllItemActive, checkItemActive, dateSearchChange } from "../../global/mixin";
export default {
  components: {
    dtSlidePage,
    dtDateRange2,
    dtSelectOptionDynamic
  },
  mixins: [paginationChangeActive, topSearchActive, checkAllItemActive, checkItemActive, dateSearchChange],
  data() {
    return {
      SlidePageConfig,
      currentPage: 1,
      isEditSlideFlag: false,
      slideShow: false,
      pageNumber: 1,
      listArr: [],
      listTotal: 0,
      slideSubmitId: 0,
      allItemChecked: false,
      slideAreaData: [0, 0, 0],
      slideAreaDefault: ['', '', ''],
      rightData: [],
      defaultCheckedRight: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      agentLevel: [],
      optionsData0: [],
      name1: '',
      optionsData1: [],
      name2: '',
      optionsData2: [],
      searchDate: {
        start: '',
        end: ''
      },
      areaChoiceTags: [],
      slideShow2: false,
      earnMoney: {
        last_month: '',
        month: ''
      }
    }
  },
  computed: {
    ...mapGetters(['accountInfo'])
  },
  mounted() {
    // 获取介绍人
    // this.getAccountList();
    // // 权限管理菜单列表
    // this.getMenuList();
    // // 数据列表
    // this.getMainList(this.getUrlData());
  },
  methods: {
    selectValueChange(val) {
      this.$refs.pidSlideRef.value = '';
      this.name2 = '';
      this.getAccountList2();
    },
    remoteMethod1(val) {
      console.log(val)
      // if (val === '') {
      //   return
      // }
      this.name1 = val;
      this.getAccountList1();
    },
    remoteMethod2(val) {
      console.log(val)
      // if (val === '') {
      //   return
      // }
      this.name2 = val;
      this.getAccountList2();
    },
    // 所属级别
    getAgentLevel() {
      if (this.accountInfo.type === '1' || this.accountInfo.type === '3') {
        // type值1时是厂家,拥有所有所属级别
        this.agentLevel = [
          { value: '1', label: '总代' },
          { value: '2', label: '加盟' },
          { value: '3', label: '分销' }
        ];
      } else {
        // type值2时是代理商,上级供应商是当前用户
        if (this.accountInfo.level_type === '1') {
          this.agentLevel = [
            { value: '2', label: '加盟' },
            { value: '3', label: '分销' }
          ];
        } else if (this.accountInfo.level_type === '2') {
          this.agentLevel = [
            { value: '3', label: '分销' }
          ];
        } else {
          this.agentLevel = [];
        }
      }
    },
    // 获取查询条件介绍人
    getAccountList() {
      this.$http.accountAgentGetAccountList({}, msg => {
        var arr = ['', '总代', '加盟', '分销'];
        var list = msg.data;
        list.forEach(item => {
          item.value = item.id;
          item.label = item.username + '/' + item.fullname + '(' + arr[item.level_type] + ')';
        })
        this.optionsData0 = JSON.parse(JSON.stringify(list));
        this.optionsData0.unshift({value: '', label: '全部'});
      });
    },
    // 获取添加编辑时介绍人
    getAccountList1() {
      this.optionsData1 = [];
      this.$http.accountAgentGetAccountList({
        level_type: '',
        name: this.name1
      }, msg => {
        var arr = ['', '总代', '加盟', '分销'];
        var list = msg.data;
        list.forEach(item => {
          item.value = item.id;
          item.label = item.username + '/' + item.fullname + '(' + arr[item.level_type] + ')';
        })
        this.optionsData1 = JSON.parse(JSON.stringify(list));
        this.optionsData1.unshift({value: '9999', label: '无'});
      });
    },
    // 获取上级供应商
    getAccountList2() {
      this.optionsData2 = [];
      this.$http.accountAgentGetAccountList({
        level_type: this.$refs.agentLevelSlideRef.value,
        name: this.name2
      }, msg => {
        var arr = ['', '总代', '加盟', '分销'];
        var list = msg.data;
        list.forEach(item => {
          item.value = item.id;
          item.label = item.username + '/' + item.fullname + '(' + arr[item.level_type] + ')';
        })
        this.optionsData2 = JSON.parse(JSON.stringify(list));
        this.optionsData2.unshift({value: '9999', label: '无'});
      });
    },
    initPasswordActive(info) {
      this.$projectUtils.ConfirmTip('是否确认初始化密码', msg => {
        if (msg === 'confirm') { this.$http.accountInitPwd(info.id, msg => {}) }
      })
    },
    topAddActive() {
      this.slideShow = true;
      this.isEditSlideFlag = false;
      this.getAgentLevel();
      this.name1 = '';
      this.getAccountList1();
      this.name2 = '';
      this.getAccountList2();
      this.setRefsEmpty();
    },
    topDeleteActive(item) {
      this.$projectUtils.ConfirmTip('确定删除账号？', msg => {
        this.$http.accountDel(item.id, msg => {
          this.getMainList(this.getUrlData());
        });
      })
    },
    financeEarnMoney(item) {
      this.slideShow2 = true;
      this.$http.financeEarnMoney({id: item.id}, msg => {
        this.earnMoney = msg.data;
      });
    },
    tableEditActive(item) {
      this.getAgentLevel();
      this.setRefsEmpty();
      let _info = item;
      this.isEditSlideFlag = true;
      this.slideShow = true;
      this.slideSubmitId = _info.id;
      this.$http.accountAgentGetDetail(_info.id, msg => {
        this.setRefsValue(msg.data);
        this.remoteMethod1(msg.data.introducer_name);
        this.remoteMethod2(msg.data.leader_name);
      });
    },
    slideSureActive() {
      let _addUrlData = this.getRefsValue();
      if (this.isEditSlideFlag) {
        let _editUrlData = Object.assign({}, _addUrlData);
        _editUrlData.id = this.slideSubmitId;
        this.$http.accountAgentEdit(_editUrlData, msg => {
          this.slideShow = false;
          this.getMainList(this.getUrlData());
        });
      } else {
        this.$http.accountAgentAdd(_addUrlData, msg => {
          this.slideShow = false;
          this.getMainList(this.getUrlData());
        });
      }
      this.getAccountList();
    },
    slideCancelActive() {
      this.slideShow = false;
      this.setRefsEmpty();
    },
    handleClose(tag, index) {
      this.areaChoiceTags.splice(index, 1);
      this.slideAreaDefault = this.setAreaDefault(this.areaChoiceTags);
    },
    searchAreaChange(value) {
      let _changeArea = this.$projectUtils.AreaDateChange(value);
      this.searchAreaData[0] = _changeArea.code[0];
      this.searchAreaData[1] = _changeArea.code[1];
      this.searchAreaData[2] = _changeArea.code[2];
    },
    slideAreaChange(value) {
      let _value = value;
      let _has = this.areaChoiceTags.some(val => {
        return val.code.join(',') === _value.code.join(',');
      });
      if (_has) { return };
      this.areaChoiceTags.push(_value);
    },
    // 组件内使用的功能函数
    getUrlData() {
      return {
        'page': this.pageNumber,
        'username': this.$refs.userNameSearchRef.value,
        'fullname': this.$refs.fullNameSearchRef.value,
        'mobile': this.$refs.mobileSearchRef.value,
        'introducer_id': this.$refs.introducerSearchRef.value
      }
    },
    getRefsValue() {
      var menuIdArr = this.$refs.tree.getCheckedKeys(true);
      return {
        'username': this.$refs.userNameSlideRef.value,
        'password': this.$refs.passwordSlideRef.value,
        'fullname': this.$refs.fullNameSlideRef.value,
        'state': this.$refs.accountStatusSlideRef.value,
        'mobile': this.$refs.mobileSlideRef.value,
        'company': this.$refs.companyNameSlideRef.value,
        'shopNum': this.$refs.shopNumSlideRef.value,
        'bankType': this.$refs.bankTypeSlideRef.value,
        'bankNum': this.$refs.bankNumSlideRef.value,
        'level_type': this.$refs.agentLevelSlideRef.value,
        'address': this.$refs.addressSlideRef.value,
        'contract_start_time': this.searchDate.start,
        'contract_end_time': this.searchDate.end,
        'introducer_id': this.$refs.introducerSlideRef.value,
        'pid': this.accountInfo.type === '1' || this.accountInfo.type === '3' ? this.$refs.pidSlideRef.value : this.accountInfo.id,
        'menu_ids': menuIdArr.join()
      }
    },
    setRefsEmpty() {
      this.$refs.tree.setCheckedKeys([]); // tree全向置空
      this.$refs.userNameSlideRef.value = '';
      this.$refs.passwordSlideRef.value = '';
      this.$refs.fullNameSlideRef.value = '';
      this.$refs.accountStatusSlideRef.value = '';
      this.$refs.mobileSlideRef.value = '';
      this.$refs.companyNameSlideRef.value = '';
      this.$refs.shopNumSlideRef.value = '';
      this.$refs.bankTypeSlideRef.value = '';
      this.$refs.bankNumSlideRef.value = '';
      this.$refs.agentLevelSlideRef.value = '';
      this.$refs.addressSlideRef.value = '';
      this.$refs.dateRangeSlideRef.value1 = '';
      this.$refs.dateRangeSlideRef.value2 = '';
      this.$refs.introducerSlideRef.value = '';
      this.$refs.pidSlideRef.value = '';
      this.slideAreaDefault = ['', '', ''];
      this.areaChoiceTags = [];
    },
    setRefsValue(msg) {
      let _msg = msg;
      this.areaChoiceTags = [];
      // input 赋值
      this.$refs.userNameSlideRef.value = _msg.username;
      this.$refs.passwordSlideRef.value = '';
      this.$refs.fullNameSlideRef.value = _msg.fullname;
      this.$refs.accountStatusSlideRef.value = _msg.state;
      this.$refs.mobileSlideRef.value = _msg.mobile;
      this.$refs.companyNameSlideRef.value = _msg.company;
      this.$refs.shopNumSlideRef.value = _msg.shop_num;
      this.$refs.bankTypeSlideRef.value = _msg.bank_type;
      this.$refs.bankNumSlideRef.value = _msg.bank_num;
      this.$refs.agentLevelSlideRef.value = _msg.level_type;
      this.$refs.addressSlideRef.value = _msg.address;
      this.$refs.dateRangeSlideRef.value1 = _msg.contract_start_time;
      this.$refs.dateRangeSlideRef.value2 = _msg.contract_end_time;
      this.searchDate.start = _msg.contract_start_time;
      this.searchDate.end = _msg.contract_end_time;
      this.$refs.introducerSlideRef.value = _msg.introducer_id;
      this.$refs.pidSlideRef.value = _msg.pid;
      this.$refs.tree.setCheckedKeys(_msg.menu_ids.split(','));
    },
    getMainList(params) {
      this.allItemChecked = false;
      this.$http.accountAgentGetList(params, msg => {
        let _msg = msg.data;
        this.listArr = this.$projectUtils.ListAddChecked(_msg.list);
        this.listTotal = Number(_msg.total);
      });
    },
    getMenuList() {
      this.$http.menuGetList(msg => {
        let _msg = msg.data;
        this.rightData = this.$projectUtils.RightDataChange(_msg, true);
      })
    },
    tableDeleteActive(item) {
      this.$projectUtils.ConfirmTip('确定删除？', msg => {
        this.$http.accountAgentDel({id: item.id}, msg => {
          this.getMainList(this.getUrlData());
        });
      })
    },
    setAreaDefault(data) {
      let _data = data;
      if (!_data.length) {
        return ['', '', ''];
      }
      let _code = _data[_data.length - 1].code;
      let _pCode = _code[0] ? _code[0] : '';
      let _cCode = _code[1] ? _code[1] : '';
      let _dCode = _code[2] ? _code[2] : '';
      return [_pCode, _cCode, _dCode];
    },
    topExportActive() {
      this.$projectUtils.ConfirmTip('确定导出？', msg => {
        this.$http.accountAgentExport(this.getUrlData(), msg => {
          window.location.href = msg.file;
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tw-handle-edit2{
  width: 150px;
}
.template-send-rule{
  .rule-wrap{
    display: flex;
    height: 110px;
    i{
      display: inline-block;
      line-height: 30px;
    }
    span{
      height: auto;
      width: 400px;
      p{
        height: 30px;
        line-height: 30px;
        margin-bottom: 8px;
        display: flex;
        b:nth-of-type(1){
          width: 120px;
          vertical-align: top;
          padding-left: 22px;
          background: url("../../statics/img/icon_danxuan_off.png") no-repeat left center/ 14px auto;
          &.rule-active{
            background: url("../../statics/img/icon_danxuan_on.png") no-repeat left center/ 14px auto;
          }
        }
        b:nth-of-type(2){
          flex: 1;
          text-align: right;
          input{
            width: 120px;
            margin: 0 4px;
          }
        }
      }
    }
  }
}
.slide-checked-area {
  .show-area{
    display: flex;
    width: 470px;
    i:nth-of-type(1){
      font-size: 12px;
      width: 84px;
      color: #999;
      line-height: 24px;
    }
    i:nth-of-type(2){
      flex: 1;
      .el-tag{
        margin:0 6px 6px 0;
      }
    }
  }
}
</style>


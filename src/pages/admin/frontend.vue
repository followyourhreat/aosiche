<template>
  <div calss="push-remind-outer">
    <div class="dt-search-top">
      <!-- 账号 -->
      <dt-search-input
        ref="userNameSearchRef"
        :inputWidth="$SearchInputConfig.accountSingle.width"
        :title="$SearchInputConfig.accountSingle.title"
        :placeholder="$SearchInputConfig.accountSingle.placeholder"
        :maxLength="$SearchInputConfig.accountSingle.length"
        defaultValue
      ></dt-search-input>

      <!-- 姓名 -->
      <dt-search-input
        ref="fullNameSearchRef"
        :inputWidth="$SearchInputConfig.nameSingle.width"
        :title="$SearchInputConfig.nameSingle.title"
        :placeholder="$SearchInputConfig.nameSingle.placeholder"
        :maxLength="$SearchInputConfig.nameSingle.length"
        defaultValue
      ></dt-search-input>

      <!-- 角色类型 -->
      <dt-select-option
        ref="roleTypeSearchRef"
        :optiosTitle="$ElSelectName.searchRoleType.title"
        :optionsName="$ElSelectName.searchRoleType.name"
        :conWidth="$ElSelectName.searchRoleType.width"
      ></dt-select-option>

      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive">查 询</button>
      </div>
    </div>
    <div class="dt-search-top">
      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-add" @click="topAddActive">新 增</button>
      </div>
    </div>

    <!-- 表格 start -->
    <div class="dt-table-outer">
      <div class="dt-table-true-wrap">
        <table class="dt-table-same" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th class="tw-handle-account">账号</th>
              <th class="tw-user-name">姓名</th>
              <th class="tw-composite-score">综合评分</th>
              <th class="tw-telephone">手机号码</th>
              <th class="tw-area">服务区域</th>
              <th class="tw-belong-agent">所属代理商</th>
              <th class="tw-agent-grade">代理商级别</th>
              <th class="tw-staff-no">员工编号</th>
              <!-- <th class="tw-staff-position">员工职务</th> -->
              <th class="tw-role-type">角色类型</th>
              <!-- <th class="tw-company-name">公司</th> -->
              <th class="tw-use-status">状态</th>
              <th class="tw-time-ss">最近登录时间</th>
              <th class="tw-address">联系地址</th>
              <th class="tw-handle-edit2">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in listArr" :key="index">
              <td>{{item.username}}</td>
              <td>{{item.fullname}}</td>
              <td>{{item.score}}</td>
              <td>{{item.mobile}}</td>
              <td>{{item.service_area}}</td>
              <td>{{item.agent_fullname}}</td>
              <td>{{item.agent_level_name}}</td>
              <td>{{item.id}}</td>
              <!-- <td>{{item.company_position}}</td> -->
              <td>{{item.role_type|FilterRoleType}}</td>
              <!-- <td>{{item.company}}</td> -->
              <td>{{item.state|FilterUseStatus}}</td>
              <td>{{item.last_login_time*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
              <td>{{item.address}}</td>
              <td class="dt-table-edit">
                <b @click="toEditAcount(item)">编 辑</b>
                <b class="dt-table-detele" @click="initPasswordActive(item)">初始化密码</b>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="no-data-tip" v-if="!listArr.length">暂无数据</div>
      </div>
      <div class="dt-page-wrap">
        <el-pagination
          class="dt-page-reset"
          :page-size="10"
          @current-change="paginationChangeActive"
          :current-page="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="listTotal"
        ></el-pagination>
      </div>
    </div>
    <!-- 表格 end -->

    <!-- 侧滑start -->
    <dt-slide-page
      slideTitle="前端账号管理"
      :class="{'slide-page-show': slideShow}"
      @hideSlidePage="slideShow = false"
      :slideWidth="SlidePageConfig.slideWidthA"
    >
      <ul>
        <!-- 账号 -->
        <li>
          <dt-search-input
            :disabled="isEditSlideFlag"
            ref="userNameSlideRef"
            :inputWidth="SlidePageConfig.inputWidthA"
            :title="$SearchInputConfig.accountSingle.title"
            :placeholder="$SearchInputConfig.accountSingle.placeholder"
            :maxLength="$SearchInputConfig.accountSingle.length"
            defaultValue
          ></dt-search-input>
        </li>

        <!-- 密码 -->
        <li v-show="!isEditSlideFlag">
          <dt-search-input
            ref="passwordSlideRef"
            :inputWidth="SlidePageConfig.inputWidthA"
            :title="$SearchInputConfig.passwordSingle.title"
            :placeholder="$SearchInputConfig.passwordSingle.placeholder"
            :maxLength="$SearchInputConfig.passwordSingle.length"
            defaultValue
          ></dt-search-input>
        </li>

        <!-- 用户姓名 -->
        <li>
          <dt-search-input
            ref="fullNameSlideRef"
            :inputWidth="SlidePageConfig.inputWidthA"
            :title="$SearchInputConfig.userName.title"
            :placeholder="$SearchInputConfig.userName.placeholder"
            :maxLength="$SearchInputConfig.userName.length"
            defaultValue
          ></dt-search-input>
        </li>

        <!-- 手机号码 -->
        <li>
          <dt-search-input
            ref="mobileSlideRef"
            :inputWidth="SlidePageConfig.inputWidthA"
            :title="$SearchInputConfig.moblie.title"
            :placeholder="$SearchInputConfig.moblie.placeholder"
            :maxLength="$SearchInputConfig.moblie.length"
            defaultValue
          ></dt-search-input>
        </li>

        <!-- 邮箱 -->
        <li>
          <dt-search-input
            ref="emailSlideRef"
            :inputWidth="SlidePageConfig.inputWidthA"
            :title="$SearchInputConfig.emailSingle.title"
            :placeholder="$SearchInputConfig.emailSingle.placeholder"
            :maxLength="$SearchInputConfig.emailSingle.length"
            defaultValue
          ></dt-search-input>
        </li>

        <!-- 角色类型 -->
        <li>
          <dt-select-option
            ref="roleTypeSlideRef"
            :conWidth="SlidePageConfig.inputWidthA"
            :optiosTitle="$ElSelectName.roleType.title"
            :optionsName="$ElSelectName.roleType.name"
            defaultValue="1"
          ></dt-select-option>
        </li>
        <!-- 账号状态 -->
        <li>
          <dt-select-option
            ref="accountStatusSlideRef"
            :conWidth="SlidePageConfig.inputWidthA"
            :optiosTitle="$ElSelectName.accountStatus.title"
            :optionsName="$ElSelectName.accountStatus.name"
            defaultValue="1"
          ></dt-select-option>
        </li>

        <!-- 备注 -->
        <li>
          <dt-search-textarea
            ref="remarkSlideRef"
            inputHeight="96"
            :inputWidth="SlidePageConfig.inputWidthA"
            :title="$SearchInputConfig.remarkSingle.title"
            :placeholder="$SearchInputConfig.remarkSingle.placeholder"
            :maxLength="$SearchInputConfig.remarkSingle.length"
            defaultValue
          ></dt-search-textarea>
        </li>
        <!-- 服务地区 -->
        <li>
          <dt-search-area
            needAll="0"
            :defaultOptions="areaSlideDefault"
            :inputWidth="SlidePageConfig.inputWidthA"
            optionsTitle="服务地区"
            @areaUpdate="areaChange"
          ></dt-search-area>
        </li>
        <li class="slide-checked-area" v-show="areaChoiceTags.length">
          <div class="show-area">
            <i>您选择的区域:</i>
            <i>
              <el-tag
                v-for="(tag, index) in areaChoiceTags"
                :key="index"
                size="small"
                closable
                @close="handleClose(tag ,index)"
              >{{tag.text[0] + tag.text[1] + tag.text[2]}}</el-tag>
            </i>
          </div>
        </li>
      </ul>

      <div class="slide-btn-wrap">
        <button class="dt-btn" @click="slideSureActive">确定</button>
        <button class="dt-btn dt-btn-cancel" @click="slideCancelActive">取消</button>
      </div>
    </dt-slide-page>
    <!-- 侧滑 end -->
  </div>
</template>

<script>
import { dtSlidePage, dtSearchTextarea } from "../../global/searchComponents";
import { SlidePageConfig } from "../../global/constant.js";
import { topSearchActive, paginationChangeActive } from "../../global/mixin.js";
export default {
  mixins: [topSearchActive, paginationChangeActive],
  data() {
    return {
      SlidePageConfig,
      currentPage: 1,
      pageNumber: 1,
      areaSlideDefault: [],
      areaChoiceData: {
        province: { code: "", text: "" },
        city: { code: "", text: "" },
        district: []
      },
      areaChoiceTags: [],
      isEditSlideFlag: false,
      accountId: 0,
      slideShow: false,
      listArr: [],
      listTotal: 0
    };
  },
  mounted() {
    this.getMainList(this.getUrlData());
  },
  methods: {
    getUrlData() {
      return {
        page: this.pageNumber,
        username: this.$refs.userNameSearchRef.value,
        fullname: this.$refs.fullNameSearchRef.value,
        role_type: this.$refs.roleTypeSearchRef.value
      };
    },
    getMainList(params) {
      this.$http.serviceAccountBackGetList(params, msg => {
        let _msg = msg.data;
        this.listArr = _msg.list;
        this.currentPage = this.pageNumber;
        this.listTotal = Number(_msg.total);
      });
    },
    getRefs() {
      let _refsValue = {
        userName: this.$refs.userNameSlideRef.value,
        password: this.$refs.passwordSlideRef.value,
        fullName: this.$refs.fullNameSlideRef.value,
        mobile: this.$refs.mobileSlideRef.value,
        email: this.$refs.emailSlideRef.value,
        roleType: this.$refs.roleTypeSlideRef.value,
        accountStatus: this.$refs.accountStatusSlideRef.value,
        remark: this.$refs.remarkSlideRef.value
      };
      return _refsValue;
    },
    setRefsEmpty() {
      this.$refs.userNameSlideRef.value = "";
      this.$refs.passwordSlideRef.value = "";
      this.$refs.fullNameSlideRef.value = "";
      this.$refs.mobileSlideRef.value = "";
      this.$refs.emailSlideRef.value = "";
      this.$refs.roleTypeSlideRef.value = "1";
      this.$refs.accountStatusSlideRef.value = "1";
      this.$refs.remarkSlideRef.value = "";
    },
    editSlide(msg) {
      let _msg = msg;
      // input 赋值
      this.$refs.userNameSlideRef.value = _msg.username;
      this.$refs.passwordSlideRef.value = _msg.password;
      this.$refs.fullNameSlideRef.value = _msg.fullname;
      this.$refs.mobileSlideRef.value = _msg.mobile;
      this.$refs.emailSlideRef.value = _msg.email;
      this.$refs.roleTypeSlideRef.value = _msg.role_type;
      this.$refs.accountStatusSlideRef.value = _msg.state;
      this.$refs.remarkSlideRef.value = _msg.remark;
      let _areaArr = _msg.area;
      this.areaChoiceData = {
        province: { code: "", text: "" },
        city: { code: "", text: "" },
        district: []
      };
      if (_areaArr[0].id) {
        this.areaChoiceData.province.code = _areaArr[0].id;
        this.areaChoiceData.province.text = _areaArr[0].name;
        if (_areaArr[0].data[0].id) {
          this.areaChoiceData.city.code = _areaArr[0].data[0].id;
          this.areaChoiceData.city.text = _areaArr[0].data[0].name;
          let _district = _areaArr[0].data[0].data;
          _district.forEach((val, index) => {
            this.areaChoiceData.district.push({
              code: val.id,
              text: val.name
            });
            let _tagValue = {
              code: [_areaArr[0].id, _areaArr[0].data[0].id, val.id],
              text: [_areaArr[0].name, _areaArr[0].data[0].name, val.name]
            };
            this.areaChoiceTags.push(_tagValue);
          });
        }
      }
      this.areaSlideDefault = this.setAreaDefault();
    },
    setAreaDefault(data) {
      if (!this.areaChoiceData.district.length) {
        return ["", "", ""];
      }
      let _pCode = this.areaChoiceData.province.code;
      let _cCode = this.areaChoiceData.city.code;
      let _dCode = this.areaChoiceData.district[
        this.areaChoiceData.district.length - 1
      ].code;
      return [_pCode, _cCode, _dCode];
    },
    areaChange(value) {
      let _value = value;
      let vm = this;
      if (vm.areaChoiceData.province.code === "") {
        vm.areaChoiceData.province.code = _value.code[0];
        vm.areaChoiceData.province.text = _value.text[0];
      } else if (vm.areaChoiceData.province.code !== _value.code[0]) {
        vm.$message.error("服务地区只能选择同一个省"); // 如果是同一个市改变地区选择默认值
        vm.areaSlideDefault = vm.setAreaDefault();
        return;
      }
      if (vm.areaChoiceData.city.code === "") {
        vm.areaChoiceData.city.code = _value.code[1];
        vm.areaChoiceData.city.text = _value.text[1];
      } else if (vm.areaChoiceData.city.code !== _value.code[1]) {
        this.$message.error("服务地区只能选择同一个市");
        vm.areaSlideDefault = vm.setAreaDefault(); // 如果是同一个市改变地区选择默认值
        return;
      }
      if (vm.areaChoiceData.district.length === 0) {
        vm.areaChoiceData.district.push({
          code: _value.code[2],
          text: _value.text[2]
        });
        this.areaChoiceTags.push(_value);
      } else {
        let _hasSameDistrict = false;
        vm.areaChoiceData.district.forEach((val, index) => {
          if (val.code === _value.code[2]) {
            this.$message.error("请选择不同区"); // 如果是同一个市改变地区选择默认值
            _hasSameDistrict = true;
            vm.areaSlideDefault = vm.setAreaDefault();
            return;
          }
        });
        if (!_hasSameDistrict) {
          vm.areaChoiceData.district.push({
            code: _value.code[2],
            text: _value.text[2]
          });
          this.areaChoiceTags.push(_value);
        }
      }
      // this.areaChoiceTags.push(_value.text[0] + _value.text[1] + _value.text[2])
    },
    initPasswordActive(info) {
      this.$projectUtils.ConfirmTip("是否确认初始化密码", msg => {
        if (msg === "confirm") {
          this.$http.serviceAccountBackInitPwd(info.id, msg => {});
        }
      });
    },
    topAddActive() {
      this.areaChoiceTags = [];
      this.areaSlideDefault = [];
      this.isEditSlideFlag = false;
      this.slideShow = true;
      this.setRefsEmpty();
      this.areaChoiceData = {
        province: { code: "", text: "" },
        city: { code: "", text: "" },
        district: []
      };
    },
    toEditAcount(info) {
      let _info = info;
      this.setRefsEmpty();
      this.isEditSlideFlag = true;
      this.slideShow = true;
      this.areaChoiceTags = [];
      this.areaSlideDefault = ["130000", "130200", "130202"];
      this.accountId = _info.id;
      this.$http.serviceAccountBackGetDetail(_info.id, msg => {
        this.editSlide(msg.data);
      });
    },
    slideSureActive() {
      let _refsValue = this.getRefs();
      let _userName = _refsValue.userName;
      let _password = _refsValue.password;
      let _fullName = _refsValue.fullName;
      let _mobile = _refsValue.mobile;
      let _email = _refsValue.email;
      let _roleType = _refsValue.roleType;
      let _accountStatus = _refsValue.accountStatus;
      let _remark = _refsValue.remark;
      // let _provinceCode = this.areaChoiceData.province.code;
      // let _cityCode = this.areaChoiceData.city.code;
      let _districtCodeArr = [];
      this.areaChoiceData.district.forEach(val => {
        _districtCodeArr.push(val.code);
      });
      let _addUrlData = {
        username: _userName,
        password: _password,
        fullname: _fullName,
        mobile: _mobile,
        email: _email, // [可选]
        role_type: _roleType,
        state: _accountStatus,
        remark: _remark, // [可选]
        // area_province_code: _provinceCode,
        // area_city_code: _cityCode,
        area_ids: _districtCodeArr.join(",")
      };
      if (this.isEditSlideFlag) {
        let _editUrlData = Object.assign({}, _addUrlData);
        delete _editUrlData.password;
        _editUrlData.id = this.accountId;
        this.$http.serviceAccountBackEdit(_editUrlData, msg => {
          this.slideShow = false;
          this.getMainList(this.getUrlData());
        });
      } else {
        this.$http.serviceAccountBackAdd(_addUrlData, msg => {
          this.slideShow = false;
          this.getMainList(this.getUrlData());
        });
      }
    },
    slideCancelActive() {
      this.slideShow = false;
      this.setRefsEmpty();
    },
    handleClose(tag, index) {
      this.areaChoiceData.district.forEach((val, ind) => {
        if (val.code === tag.code[2]) {
          this.areaChoiceData.district.splice(ind, 1);
          this.areaSlideDefault = this.setAreaDefault();
        }
      });
      // 当tag删除完后将areaChoiceData重置
      if (!this.areaChoiceData.district.length) {
        this.areaChoiceData = {
          province: { code: "", text: "" },
          city: { code: "", text: "" },
          district: []
        };
        this.areaSlideDefault = this.setAreaDefault();
      }
      this.areaChoiceTags.splice(index, 1);
    }
  },
  components: {
    dtSearchTextarea,
    dtSlidePage
  }
};
</script>

<style lang="scss" scoped>
.tw-handle-edit2 {
  width: 150px;
}
.template-send-rule {
  .rule-wrap {
    display: flex;
    height: 110px;
    i {
      display: inline-block;
      line-height: 30px;
    }
    span {
      height: auto;
      width: 400px;
      p {
        height: 30px;
        line-height: 30px;
        margin-bottom: 8px;
        display: flex;
        b:nth-of-type(1) {
          width: 120px;
          vertical-align: top;
          padding-left: 22px;
          background: url("../../statics/img/icon_danxuan_off.png") no-repeat
            left center/ 14px auto;
          &.rule-active {
            background: url("../../statics/img/icon_danxuan_on.png") no-repeat
              left center/ 14px auto;
          }
        }
        b:nth-of-type(2) {
          flex: 1;
          text-align: right;
          input {
            width: 120px;
            margin: 0 4px;
          }
        }
      }
    }
  }
}
.slide-checked-area {
  .show-area {
    display: flex;
    width: 470px;
    i:nth-of-type(1) {
      font-size: 12px;
      width: 84px;
      color: #999;
      line-height: 24px;
    }
    i:nth-of-type(2) {
      flex: 1;
      .el-tag {
        margin: 0 6px 6px 0;
      }
    }
  }
}
</style>


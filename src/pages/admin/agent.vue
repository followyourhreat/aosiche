<template>
  <div calss="push-remind-outer">
    <div class="dt-search-top">
      <!-- 账号 -->
      <dt-search-input ref="userNameSearchRef" title="账号" placeholder="请输入账号"></dt-search-input>

      <!-- 姓名 -->
      <dt-search-input ref="fullNameSearchRef" title="姓名" placeholder="请输入姓名"></dt-search-input>

      <!-- 手机号 -->
      <!-- <dt-search-input ref="mobileSearchRef" title="手机号" placeholder="请输入手机号"></dt-search-input>

      <dt-select-option-dynamic
        ref="introducerSearchRef"
        optiosTitle="介绍人"
        :optionsData="optionsData0"
        conWidth="120"
      ></dt-select-option-dynamic>-->

      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive">查 询</button>
        <button type="button" class="dt-btn dt-btn-add" @click="topAddActive">新 增</button>
        <!-- <button type="button" class="dt-btn dt-btn-export" @click="topExportActive">导 出</button> -->
      </div>
    </div>
    <!-- <div class="dt-search-top">
      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive">查 询</button>
        <button type="button" class="dt-btn dt-btn-add" @click="topAddActive">新 增</button>
        <button type="button" class="dt-btn dt-btn-export" @click="topExportActive">导 出</button>
        <button type="button" class="dt-btn dt-btn-delete" @click="topDeleteActive">删 除</button>
      </div>
    </div>-->

    <!-- 表格 start -->
    <div class="dt-table-outer">
      <div class="dt-table-true-wrap">
        <el-table ref="multipleTable" :data="listArr" tooltip-effect="dark" style="width: 100%">
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <!-- <el-table-column  label="序号" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>-->
          <el-table-column prop="id" label="序号" width></el-table-column>
          <el-table-column prop="account" label="账号" width></el-table-column>
          <el-table-column prop="username" label="姓名" width></el-table-column>
          <el-table-column prop="phone" label="手机号码" width></el-table-column>
          <!-- <el-table-column prop="salt" label="员工编号" width></el-table-column>
          <el-table-column prop="company_position" label="员工职务" width="150"></el-table-column>
          <el-table-column label="角色类型" width="120">
            <template slot-scope="scope">{{ scope.row.role_type|FilterPositionRoleType }}</template>
          </el-table-column>-->
          <el-table-column
            prop="state"
            label="状态"
            width="120"
            :filters="[{ text: '正常', value: '1' }, { text: '禁用', value: '0' }]"
            :filter-method="filterTag"
          >
            <template slot-scope="scope">
              <!-- {{ scope.row.state == 1 ? '正常':'禁用' }} -->
              <el-tag
                :type="scope.row.state === '0' ? 'danger' : 'success'"
                disable-transitions
              >{{scope.row.state == 1 ? '正常':'禁用'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="utime" label="最近登录时间" width="200">
            <template
              slot-scope="scope"
            >{{ scope.row.utime*1000|DateFormat('yyyy-MM-dd hh:mm:ss') }}</template>
          </el-table-column>
          <el-table-column prop="province" label="省" width></el-table-column>
          <el-table-column prop="city" label="市" width></el-table-column>
          <el-table-column prop="district" label="区" width></el-table-column>
          <el-table-column prop="site" label="联系地址" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="260" prop="id">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleReset(scope.row.id)">密码初始化</el-button>
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">
                <span v-if="scope.row.state == 0">启用</span>
                <span v-else>禁用</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- <el-dialog
                title="提示"
                :visible.sync="modal1"
                width="30%"
                center>
                <span>确定要重置密码吗?</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="modal1 = false">取 消</el-button>
                  <el-button type="primary" @click="handleReset(item.id)">确 定</el-button>
                </span>
        </el-dialog>-->
        <div class="no-data-tip" v-if="!listArr.length">暂无数据</div>
      </div>

      <div class="dt-page-wrap">
        <el-pagination
          class="dt-page-reset"
          :page-size="10"
          @current-change="paginationChangeActive"
          :current-page="pageNumber"
          layout="total, prev, pager, next, jumper"
          :total="listTotal"
        ></el-pagination>
      </div>
    </div>
    <!-- 表格 end -->

    <!-- 模态框 start -->

    <el-dialog slot="title" :visible.sync="modal1" width="30%" center>
      <slot name="title">
        <span v-if="itemId == 0" class="el-dialog__title">新增</span>
        <span v-if="itemId == 1" class="el-dialog__title">编辑</span>
      </slot>
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="ruleForm2.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="ruleForm2.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="itemId == 0">
          <el-input v-model="ruleForm2.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model.number="ruleForm2.phone"></el-input>
        </el-form-item>
        <el-form-item label="省市区">
          <dt-search-area
            @areaUpdate="topAreaChange"
            :defaultOptions="districts"
            :optionsTitle="optionsTitle"
          ></dt-search-area>
        </el-form-item>
        <el-form-item label="地址" prop="site">
          <el-input v-model.number="ruleForm2.site"></el-input>
        </el-form-item>

        <el-form-item label="角色状态" prop="state">
          <el-radio v-model="ruleForm2.state" label="1">正常</el-radio>
          <el-radio v-model="ruleForm2.state" label="0">禁止</el-radio>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">保存</el-button>
          <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 模态框 end-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  dtSlidePage,
  dtDateRange2,
  dtSelectOptionDynamic
} from "../../global/searchComponents";
import { SlidePageConfig } from "../../global/constant.js";
import { regionDataPlus, CodeToText } from "element-china-area-data";
import {
  paginationChangeActive,
  topSearchActive,
  topAreaChange,
  checkAllItemActive,
  checkItemActive,
  dateSearchChange
} from "../../global/mixin";
export default {
  components: {
    dtSlidePage,
    dtDateRange2,
    dtSelectOptionDynamic
  },
  mixins: [
    paginationChangeActive,
    topSearchActive,
    topAreaChange,
    checkAllItemActive,
    checkItemActive,
    dateSearchChange
  ],
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
      slideAreaDefault: ["", "", ""],
      rightData: [],
      defaultCheckedRight: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      agentLevel: [],
      optionsData0: [],
      name1: "",
      optionsData1: [],
      name2: "",
      optionsData2: [],
      searchDate: {
        start: "",
        end: ""
      },
      areaChoiceTags: [],
      slideShow2: false,
      earnMoney: {
        last_month: "",
        month: ""
      },
      modal1: false,
      itemId: 1,
      ruleForm2: {
        id: "",
        account: "",
        username: "",
        phone: "",
        state: "",
        utime: "",
        site: "",
        province: "",
        city: "",
        district: "",
        password: ""
      },
      options: regionDataPlus,
      selectedOptions: [],

      rules2: {
        // pass: [{ validator: validatePass, trigger: "blur" }],
      },
      optionsTitle: "",
      districts: ["110000", "110100", "110101"],
      districtsText: []
    };
  },
  computed: {
    ...mapGetters(["accountInfo"])
  },
  mounted() {
    // 获取介绍人
    // this.getAccountList();
    // // 权限管理菜单列表
    // this.getMenuList();
    // // 数据列表
    // this.getMainList(this.getUrlData());
    var uid = localStorage.getItem("aoid");
    this.getMainList();
    this.ruleForm2.id = uid;
  },
  methods: {
    filterTag(value, row) {
      return row.state === value;
    },
    topAreaChange(val) {
      this.districts = val.code;
      this.districtsText = val.text;
      console.log(this.districtsText);
    },
    getMainList(params) {
      this.$http.getAll(params, res => {
        this.listArr = res.data.data;
        this.listTotal = res.data.data.length;
      });
    },

    handleReset(index) {
      console.log(index);
      this.$http.reset({ uid: index }, res => {
        this.$message({
          showClose: true,
          message: "密码重置成功",
          type: "success"
        });
        this.getMainList();
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(item) {
      console.log(item);
      this.modal1 = true;
      this.itemId = 1;
      this.districts = ["110000", "110100", "110101"];

      console.log(this.districts);

      this.ruleForm2 = Object.assign({}, item);
      // this.getMainList();
    },
    handleDelete(index, row) {
      this.$http.frost({ uid: row.id, state: row.state }, res => {
        this.$message({
          showClose: true,
          message: "操作成功",
          type: "success"
        });
        this.getMainList();
      });
    },

    filterTag(value, row) {
      return row.state === value;
    },

    //编辑  新增---   保存
    submitForm(formName) {
      if (this.itemId == 0) {
        console.log(this.districtsText);
        this.ruleForm2.province = this.districtsText[0];
        this.ruleForm2.city = this.districtsText[1];
        this.ruleForm2.district = this.districtsText[2];
        console.log(this.ruleForm2.province);
        this.$http.add_user(this.ruleForm2, msg => {
          this.$message({
            showClose: true,
            message: "新增用户成功",
            type: "success"
          });
          this.getMainList();
        });
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$http.up_user(this.ruleForm2, res => {
              this.getMainList();
            });
            this.modal1 = false;
          } else {
            console.log("提交错误!!");
            return false;
          }
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //省市区
    addressChange(arr) {
      console.log(arr);
      console.log(CodeToText[arr[0]], CodeToText[arr[1]], CodeToText[arr[2]]);
    },
    //新增用户
    topAddActive() {
      // this.isEditSlideFlag = false;
      // this.slideShow = true;
      // this.setRefsEmpty();
      this.districts = [];
      this.modal1 = true;
      this.itemId = 0;
      this.ruleForm2 = {
        id: this.uid,
        account: "",
        username: "",
        phone: "",
        state: "",
        utime: "",
        site: "",
        province: "",
        city: "",
        district: ""
      };
    },

    selectValueChange(val) {
      this.$refs.pidSlideRef.value = "";
      this.name2 = "";
      this.getAccountList2();
    },
    remoteMethod1(val) {
      console.log(val);
      // if (val === '') {
      //   return
      // }
      this.name1 = val;
      this.getAccountList1();
    },
    remoteMethod2(val) {
      console.log(val);
      // if (val === '') {
      //   return
      // }
      this.name2 = val;
      this.getAccountList2();
    },
    // 所属级别
    getAgentLevel() {
      if (this.accountInfo.type === "1" || this.accountInfo.type === "3") {
        // type值1时是厂家,拥有所有所属级别
        this.agentLevel = [
          { value: "1", label: "总代" },
          { value: "2", label: "加盟" },
          { value: "3", label: "分销" }
        ];
      } else {
        // type值2时是代理商,上级供应商是当前用户
        if (this.accountInfo.level_type === "1") {
          this.agentLevel = [
            { value: "2", label: "加盟" },
            { value: "3", label: "分销" }
          ];
        } else if (this.accountInfo.level_type === "2") {
          this.agentLevel = [{ value: "3", label: "分销" }];
        } else {
          this.agentLevel = [];
        }
      }
    },
    // 获取查询条件介绍人
    getAccountList() {
      this.$http.accountAgentGetAccountList({}, msg => {
        var arr = ["", "总代", "加盟", "分销"];
        var list = msg.data;
        list.forEach(item => {
          item.value = item.id;
          item.label =
            item.username +
            "/" +
            item.fullname +
            "(" +
            arr[item.level_type] +
            ")";
        });
        this.optionsData0 = JSON.parse(JSON.stringify(list));
        this.optionsData0.unshift({ value: "", label: "全部" });
      });
    },
    // 获取添加编辑时介绍人
    getAccountList1() {
      this.optionsData1 = [];
      this.$http.accountAgentGetAccountList(
        {
          level_type: "",
          name: this.name1
        },
        msg => {
          var arr = ["", "总代", "加盟", "分销"];
          var list = msg.data;
          list.forEach(item => {
            item.value = item.id;
            item.label =
              item.username +
              "/" +
              item.fullname +
              "(" +
              arr[item.level_type] +
              ")";
          });
          this.optionsData1 = JSON.parse(JSON.stringify(list));
          this.optionsData1.unshift({ value: "9999", label: "无" });
        }
      );
    },
    // 获取上级供应商
    getAccountList2() {
      this.optionsData2 = [];
      this.$http.accountAgentGetAccountList(
        {
          level_type: this.$refs.agentLevelSlideRef.value,
          name: this.name2
        },
        msg => {
          var arr = ["", "总代", "加盟", "分销"];
          var list = msg.data;
          list.forEach(item => {
            item.value = item.id;
            item.label =
              item.username +
              "/" +
              item.fullname +
              "(" +
              arr[item.level_type] +
              ")";
          });
          this.optionsData2 = JSON.parse(JSON.stringify(list));
          this.optionsData2.unshift({ value: "9999", label: "无" });
        }
      );
    },
    initPasswordActive(info) {
      this.$projectUtils.ConfirmTip("是否确认初始化密码", msg => {
        if (msg === "confirm") {
          this.$http.accountInitPwd(info.id, msg => {});
        }
      });
    },
    // topAddActive() {
    //   this.slideShow = true;
    //   this.isEditSlideFlag = false;
    //   this.getAgentLevel();
    //   this.name1 = "";
    //   this.getAccountList1();
    //   this.name2 = "";
    //   this.getAccountList2();
    //   this.setRefsEmpty();
    // },
    topDeleteActive(item) {
      this.$projectUtils.ConfirmTip("确定删除账号？", msg => {
        this.$http.accountDel(item.id, msg => {
          this.getMainList(this.getUrlData());
        });
      });
    },
    financeEarnMoney(item) {
      this.slideShow2 = true;
      this.$http.financeEarnMoney({ id: item.id }, msg => {
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
        return val.code.join(",") === _value.code.join(",");
      });
      if (_has) {
        return;
      }
      this.areaChoiceTags.push(_value);
    },
    // 组件内使用的功能函数
    getUrlData() {
      return {
        page: this.pageNumber,
        username: this.$refs.userNameSearchRef.value,
        fullname: this.$refs.fullNameSearchRef.value,
        mobile: this.$refs.mobileSearchRef.value,
        introducer_id: this.$refs.introducerSearchRef.value
      };
    },
    getRefsValue() {
      var menuIdArr = this.$refs.tree.getCheckedKeys(true);
      return {
        username: this.$refs.userNameSlideRef.value,
        password: this.$refs.passwordSlideRef.value,
        fullname: this.$refs.fullNameSlideRef.value,
        state: this.$refs.accountStatusSlideRef.value,
        mobile: this.$refs.mobileSlideRef.value,
        company: this.$refs.companyNameSlideRef.value,
        shopNum: this.$refs.shopNumSlideRef.value,
        bankType: this.$refs.bankTypeSlideRef.value,
        bankNum: this.$refs.bankNumSlideRef.value,
        level_type: this.$refs.agentLevelSlideRef.value,
        address: this.$refs.addressSlideRef.value,
        contract_start_time: this.searchDate.start,
        contract_end_time: this.searchDate.end,
        introducer_id: this.$refs.introducerSlideRef.value,
        pid:
          this.accountInfo.type === "1" || this.accountInfo.type === "3"
            ? this.$refs.pidSlideRef.value
            : this.accountInfo.id,
        menu_ids: menuIdArr.join()
      };
    },
    setRefsEmpty() {
      this.$refs.tree.setCheckedKeys([]); // tree全向置空
      this.$refs.userNameSlideRef.value = "";
      this.$refs.passwordSlideRef.value = "";
      this.$refs.fullNameSlideRef.value = "";
      this.$refs.accountStatusSlideRef.value = "";
      this.$refs.mobileSlideRef.value = "";
      this.$refs.companyNameSlideRef.value = "";
      this.$refs.shopNumSlideRef.value = "";
      this.$refs.bankTypeSlideRef.value = "";
      this.$refs.bankNumSlideRef.value = "";
      this.$refs.agentLevelSlideRef.value = "";
      this.$refs.addressSlideRef.value = "";
      this.$refs.dateRangeSlideRef.value1 = "";
      this.$refs.dateRangeSlideRef.value2 = "";
      this.$refs.introducerSlideRef.value = "";
      this.$refs.pidSlideRef.value = "";
      this.slideAreaDefault = ["", "", ""];
      this.areaChoiceTags = [];
    },
    setRefsValue(msg) {
      let _msg = msg;
      this.areaChoiceTags = [];
      // input 赋值
      this.$refs.userNameSlideRef.value = _msg.username;
      this.$refs.passwordSlideRef.value = "";
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
      this.$refs.tree.setCheckedKeys(_msg.menu_ids.split(","));
    },
    // getMainList(params) {
    //   this.allItemChecked = false;
    //   this.$http.accountAgentGetList(params, msg => {
    //     let _msg = msg.data;
    //     this.listArr = this.$projectUtils.ListAddChecked(_msg.list);
    //     this.listTotal = Number(_msg.total);
    //   });
    // },
    getMenuList() {
      this.$http.menuGetList(msg => {
        let _msg = msg.data;
        this.rightData = this.$projectUtils.RightDataChange(_msg, true);
      });
    },
    tableDeleteActive(item) {
      this.$projectUtils.ConfirmTip("确定删除？", msg => {
        this.$http.accountAgentDel({ id: item.id }, msg => {
          this.getMainList(this.getUrlData());
        });
      });
    },
    setAreaDefault(data) {
      let _data = data;
      if (!_data.length) {
        return ["", "", ""];
      }
      let _code = _data[_data.length - 1].code;
      let _pCode = _code[0] ? _code[0] : "";
      let _cCode = _code[1] ? _code[1] : "";
      let _dCode = _code[2] ? _code[2] : "";
      return [_pCode, _cCode, _dCode];
    },
    topExportActive() {
      this.$projectUtils.ConfirmTip("确定导出？", msg => {
        this.$http.accountAgentExport(this.getUrlData(), msg => {
          window.location.href = msg.file;
        });
      });
    }
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
.dt-btn.dt-btn-export,
.dt-btn.dt-btn-add,
.dt-btn.dt-btn-search {
  padding: 0 20px;
}
</style>


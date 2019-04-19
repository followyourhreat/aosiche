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
      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-search" @click="handleSearch">查 询</button>
        <button type="button" class="dt-btn dt-btn-add" @click="topAddActive">新 增</button>
      </div>
    </div>

    <!-- 表格 start -->
    <div class="dt-table-outer">
      <div class="dt-table-true-wrap">
        <el-table
          ref="multipleTable"
          :data="listArr"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- <el-table-column  label="序号" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>-->
          <el-table-column prop="id" label="序号" width="60" type="index"></el-table-column>
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
        <!--<div class="no-data-tip" v-if="!listArr.length">暂无数据</div>-->
      </div>

      <div class="dt-page-wrap">
        <el-pagination
          class="dt-page-reset"
          :page-size="page"
          @current-change="handlePage"
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
          <el-input v-model="ruleForm2.account"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="ruleForm2.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="itemId == 0">
          <el-input v-model="ruleForm2.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model.number="ruleForm2.phone"></el-input>
        </el-form-item>
        <el-form-item label="省市区">
          <dt-search-area
            @areaUpdate="topAreaChange"
            :defaultOptions="districts"
            :optionsTitle="optionsTitle"
            class="backend-area"
          ></dt-search-area>
        </el-form-item>
        <el-form-item label="地址" prop="site">
          <el-input v-model.number="ruleForm2.site"></el-input>
        </el-form-item>

        <el-form-item label="角色状态" prop="state">
          <el-radio v-model="ruleForm2.state" label="1">正常</el-radio>
          <el-radio v-model="ruleForm2.state" label="0">禁止</el-radio>
        </el-form-item>
        <el-form-item label="账号权限" prop="checkList">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="设备"></el-checkbox>
            <el-checkbox label="账号管理"></el-checkbox>
            <el-checkbox label="到期提醒与推送"></el-checkbox>
            <el-checkbox label="交易订单管理"></el-checkbox>
            <el-checkbox label="系统日志"></el-checkbox>
          </el-checkbox-group>
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
import { dtSlidePage } from "../../global/searchComponents";
import { SlidePageConfig } from "../../global/constant.js";
import { regionDataPlus, CodeToText } from "element-china-area-data";
import {
  paginationChangeActive,
  topSearchActive,
  topAreaChange,
  checkAllItemActive,
  checkItemActive
} from "../../global/mixin";
// import { validate } from "../../fetch/Validate";
export default {
  mixins: [
    paginationChangeActive,
    topSearchActive,
    topAreaChange,
    checkAllItemActive,
    checkItemActive
  ],
  data() {
    // var checkAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("年龄不能为空"));
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error("请输入数字值"));
    //     } else {
    //       if (value < 18) {
    //         callback(new Error("必须年满18岁"));
    //       } else {
    //         callback();
    //       }
    //     }
    //   }, 1000);
    // };
    // var CheckTel = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error("请输入电话号码"));
    //   } else if (!Number.isInteger(value)) {
    //     callback(new Error("电话号码必须是数字"));
    //   } else if (value.toString().length != 11) {
    //     callback(new Error("电话号码必须是11位"));
    //   } else {
    //     callback();
    //   }
    // };
    // var checkList = (rule, value, callback) => {
    //   console.log(value);
    // };
    return {
      SlidePageConfig,
      currentPage: 1,
      page: 1,
      isEditSlideFlag: false,
      slideShow: false,
      pageNumber: 1,
      listArr: [],
      listTotal: 0,
      slideSubmitId: 0,
      allItemChecked: false,
      rightData: [],
      defaultCheckedRight: [201],
      defaultProps: {
        children: "children",
        label: "label"
      },
      multipleSelection: [],
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
        province_code: "",
        city: "",
        city_code: "",
        district: "",
        district_code: "",
        password: "",
        power: []
      },
      options: regionDataPlus,
      selectedOptions: [],
      checkList: [],
      rules2: {
        // account: [
        //   { required: true, message: "请输入账号", trigger: "blur" },
        //   { min: 3, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        // ],
        // username: [
        //   { required: true, message: "请输入用户名", trigger: "blur" },
        //   { min: 3, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        // ],
        // password: [
        //   { required: true, message: "请输入密码", trigger: "blur" },
        //   { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        // ],
        // phone: [
        //   {
        //     type: "number",
        //     required: true,
        //     validator: CheckTel,
        //     trigger: "blur"
        //   }
        // ],
        // checkList: [
        //   {
        //     required: true,
        //     message: "请至少选择一个权限",
        //     validator: checkList,
        //     trigger: "change"
        //   }
        // ],
        // state: [
        //   {
        //     required: true,
        //     message: "请至少选择一个角色状态",
        //     trigger: "change"
        //   }
        // ],
        // districts: [
        //   {
        //     required: true,
        //     message: "请选省市区",
        //     trigger: "blur"
        //   }
        // ]
      },
      optionsTitle: "",
      districts: ["110000", "110100", "110101"],
      districtsText: []
    };
  },
  computed: {
    // modelTitle() {
    //   return this.itemId ? "编辑" : "新增";
    // }
  },
  mounted() {
    // this.getMainList(this.getUrlData());
    // this.getMenuList();
    var uid = localStorage.getItem("aoid");
    this.getMainList();
    this.ruleForm2.id = uid;
  },
  methods: {
    // getUrlData() {
    //   return {
    //     'page': this.pageNumber,
    //     'username': this.$refs.userNameSearchRef.value,
    //     'fullname': this.$refs.fullNameSearchRef.value
    //   }
    // },
    topAreaChange(val) {
      this.districts = val.code;
      this.districtsText = val.text;
      console.log(this.districts);
    },
    getMainList(params) {
      this.$http.getAll(params, res => {
        if (res.data && res.data.data) {
          this.listArr = res.data.data;
          this.listTotal = res.data.sum_data;
          this.page = res.data.page;
        } else {
          this.listArr = [];
          this.listTotal = 0;
          this.page = 0;
        }
      });
    },

    handleReset(index) {
      // console.log(index);
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
      // console.log(item);
      this.modal1 = true;
      this.itemId = 1;
      this.checkList = [];

      if (item.power) {
        for (var i = 0; i <= item.power.length; i++) {
          if (item.power[i] == "1") {
            this.checkList.push("设备");
          } else if (item.power[i] == "2") {
            this.checkList.push("账号管理");
          } else if (item.power[i] == "3") {
            this.checkList.push("到期提醒与推送");
          } else if (item.power[i] == "4") {
            this.checkList.push("交易订单管理");
          } else if (item.power[i] == "5") {
            this.checkList.push("系统日志");
          }
        }
      } else {
        this.checkList = [];
      }

      this.districts = [];
      this.districts[0] = item.province_code;
      this.districts[1] = item.city_code;
      this.districts[2] = item.district_code;

      this.ruleForm2 = Object.assign({}, item);
      // this.getMainList();
    },
    handleDelete(index, row) {
      this.$http.userfrost({ uid: row.id, state: row.state }, res => {
        this.$message({
          showClose: true,
          message: "操作成功",
          type: "success"
        });
        this.getMainList();
      });
    },
    handleSearch() {
      this.$http.getAll(
        {
          account: this.$refs.userNameSearchRef.value,
          username: this.$refs.fullNameSearchRef.value
        },
        res => {
          if (res.data && res.data.data) {
            this.listArr = res.data.data;
            this.listTotal = res.data.sum_data;
            this.page = res.data.page;
          } else {
            this.pageNumber = 1;
            this.listArr = [];
            this.listTotal = 0;
            this.page = 0;
          }
        }
      );
    },
    filterTag(value, row) {
      return row.state === value;
    },

    //编辑  新增---   保存
    submitForm(formName) {
      if (this.itemId == 0) {
        if (this.districtsText[0] == "全国") {
          this.ruleForm2.province = this.districtsText[0];
          this.ruleForm2.city = "全部";
          this.ruleForm2.district = "全部";
          this.ruleForm2.province_code = this.districts[0];
          this.ruleForm2.city_code = 0;
          this.ruleForm2.district_code = 0;
        } else if (this.districtsText[1] == "") {
          this.ruleForm2.province = this.districtsText[0];
          this.ruleForm2.city = "全部";
          this.ruleForm2.district = "全部";
          this.ruleForm2.province_code = this.districts[0];
          this.ruleForm2.city_code = "all";
          this.ruleForm2.district_code = "all";
        } else if (this.districtsText[2] == "") {
          this.ruleForm2.province = this.districtsText[0];
          this.ruleForm2.city = this.districtsText[1];
          this.ruleForm2.district = "全部";
          this.ruleForm2.province_code = this.districts[0];
          this.ruleForm2.city_code = this.districts[1];
          this.ruleForm2.district_code = "all";
        } else {
          this.ruleForm2.province = this.districtsText[0];
          this.ruleForm2.city = this.districtsText[1];
          this.ruleForm2.district = this.districtsText[2];
          this.ruleForm2.province_code = this.districts[0];
          this.ruleForm2.city_code = this.districts[1];
          this.ruleForm2.district_code = this.districts[2];
        }
        var roleList = [];
        for (var i = 0; i <= this.checkList.length; i++) {
          if (this.checkList[i] == "设备") {
            roleList.push("1");
          } else if (this.checkList[i] == "账号管理") {
            roleList.push("2");
          } else if (this.checkList[i] == "到期提醒与推送") {
            roleList.push("3");
          } else if (this.checkList[i] == "交易订单管理") {
            roleList.push("4");
          } else if (this.checkList[i] == "系统日志") {
            roleList.push("5");
          }
        }
        console.log(roleList);
        this.ruleForm2.power = roleList;
        console.log(this.ruleForm2.power);
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$http.add_user(this.ruleForm2, msg => {
              this.$message({
                showClose: true,
                message: "新增用户成功",
                type: "success"
              });
              this.getMainList();
              this.modal1 = false;
            });
          } else {
            console.log("提交错误!!");
            return false;
          }
        });
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$http.up_user(this.ruleForm2, res => {
              this.$message({
                showClose: true,
                message: "编辑用户成功",
                type: "success"
              });
              this.getMainList();
              this.modal1 = false;
            });
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
    getUrlData() {
      return {
        current_page: this.pageNumber,
        account: this.$refs.userNameSearchRef.value,
        username: this.$refs.fullNameSearchRef.value
      };
    },

    //省市区
    addressChange(arr) {
      console.log(CodeToText[arr[0]], CodeToText[arr[1]], CodeToText[arr[2]]);
    },
    //新增用户
    topAddActive() {
      // this.isEditSlideFlag = false;
      // this.slideShow = true;
      // this.setRefsEmpty();
      this.checkList = [];
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
        district: "",
        province_code: "",
        city_code: "",
        district_code: ""
      };
    },
    //分页跳转

    handlePage(val) {
      let params = {
        current_page: val,
        account: this.$refs.userNameSearchRef.value,
        username: this.$refs.fullNameSearchRef.value
      };
      this.$http.getAll(params, res => {
        if (res.data && res.data.data) {
          this.listArr = res.data.data;
        } else {
          this.listArr = [];
        }
      });
    },

    toEditAcount(info) {
      this.setRefsEmpty();
      let _info = info;
      this.isEditSlideFlag = true;
      this.slideShow = true;
      this.slideSubmitId = _info.id;
      this.$http.accountOperateGetDetail(_info.id, msg => {
        this.editSlide(msg.data);
      });
    },
    slideSureActive() {
      let _refsValue = this.getRefs(),
        _menuIdArr = this.$refs.tree.getCheckedKeys(true),
        _menuIds = _menuIdArr.join(",");
      let _addUrlData = {
        username: _refsValue.userName,
        password: _refsValue.password,
        state: _refsValue.state,
        fullname: _refsValue.fullName,
        mobile: _refsValue.mobile,
        company_position: _refsValue.company_position, // [可选]
        email: _refsValue.email, // [可选]
        role_type: _refsValue.roleType,
        menu_ids: _menuIds
      };
      if (this.isEditSlideFlag) {
        let _editUrlData = Object.assign({}, _addUrlData);
        delete _editUrlData.password;
        _editUrlData.id = this.slideSubmitId;
        this.$http.accountOperateEdit(_editUrlData, msg => {
          this.slideShow = false;
          this.getMainList(this.getUrlData());
        });
      } else {
        this.$http.accountOperateAdd(_addUrlData, msg => {
          this.slideShow = false;
          this.getMainList(this.getUrlData());
        });
      }
    },
    slideCancelActive() {
      this.slideShow = false;
      this.setRefsEmpty();
    },
    setRefsEmpty() {
      this.$refs.userNameSlideRef.value = "";
      this.$refs.passwordSlideRef.value = "";
      this.$refs.fullNameSlideRef.value = "";
      this.$refs.mobileSlideRef.value = "";
      this.$refs.positionSlideRef.value = "";
      this.$refs.emailSlideRef.value = "";
      this.$refs.roleTypeSlideRef.value = "1";
      this.$refs.tree.setCheckedKeys([]);
    },
    getRefs() {
      let _refsValue = {
        userName: this.$refs.userNameSlideRef.value,
        password: this.$refs.passwordSlideRef.value,
        fullName: this.$refs.fullNameSlideRef.value,
        state: this.$refs.accountStatusSlideRef.value,
        mobile: this.$refs.mobileSlideRef.value,
        company_position: this.$refs.positionSlideRef.value,
        email: this.$refs.emailSlideRef.value,
        roleType: this.$refs.roleTypeSlideRef.value
      };
      return _refsValue;
    },
    editSlide(msg) {
      let _msg = msg;
      // input 赋值
      this.$refs.userNameSlideRef.value = _msg.username;
      this.$refs.passwordSlideRef.value = _msg.password;
      this.$refs.fullNameSlideRef.value = _msg.fullname;
      this.$refs.accountStatusSlideRef.value = _msg.state;
      this.$refs.mobileSlideRef.value = _msg.mobile;
      this.$refs.positionSlideRef.value = _msg.company_position;
      this.$refs.emailSlideRef.value = _msg.email;
      this.$refs.roleTypeSlideRef.value = _msg.role_type;
      this.$refs.tree.setCheckedKeys(_msg.menu_ids.split(","));
    },
    getMenuList() {
      this.$http.menuGetList(msg => {
        let _msg = msg.data;
        this.rightData = this.$projectUtils.RightDataChange(_msg, true);
      });
    }
  },
  computed: {
    slideTitle() {
      return this.isEditSlideFlag ? "编辑运营商账号" : "新增运营商账号";
    }
  },
  components: {
    dtSlidePage
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/constant.style.scss";
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
.el-tag--success {
  background: none !important;
  border: none !important;
}
.el-tag--danger {
  background: none !important;
  border: none !important;
}
.el-table thead {
  background: #eaf3fb;
}
.dt-btn.dt-btn-search {
  padding: 0 20px !important;
  margin-right: 20px;
}
.dt-btn.dt-btn-add {
  padding: 0 20px !important;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.el-dialog__title {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
}
.dt-search-title {
  display: none !important;
}
</style>


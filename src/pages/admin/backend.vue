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
        <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive">查 询</button>
        <button type="button" class="dt-btn dt-btn-add" @click="topAddActive">新 增</button>
      </div>
    </div>

    <!-- 表格 start -->
    <div class="dt-table-outer">
      <div class="dt-table-true-wrap">
        <el-table ref="multipleTable" :data="listArr" tooltip-effect="dark" style="width: 100%">
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <!-- <el-table-column  label="序号" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>-->
          <el-table-column prop="id" label="序号" width="60"></el-table-column>
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
export default {
  mixins: [
    paginationChangeActive,
    topSearchActive,
    topAreaChange,
    checkAllItemActive,
    checkItemActive
  ],
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };

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
    getUrlData() {
      return {
        page: this.pageNumber,
        account: this.$refs.userNameSearchRef.value,
        username: this.$refs.fullNameSearchRef.value
      };
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
</style>


<template>
  <div calss="push-remind-outer">
    <div class="dt-search-top">
      <!-- 账号 -->
      <dt-search-input  ref="userNameSearchRef" :inputWidth='$SearchInputConfig.accountSingle.width' :title="$SearchInputConfig.accountSingle.title" :placeholder ='$SearchInputConfig.accountSingle.placeholder' :maxLength = '$SearchInputConfig.accountSingle.length' defaultValue = ''></dt-search-input>
      <!-- 姓名 -->
      <dt-search-input  ref="fullNameSearchRef" :inputWidth='$SearchInputConfig.nameSingle.width' :title="$SearchInputConfig.nameSingle.title" :placeholder ='$SearchInputConfig.nameSingle.placeholder' :maxLength = '$SearchInputConfig.nameSingle.length' defaultValue = ''></dt-search-input>
      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive">查 询</button>
      </div>
    </div>
    <div class="dt-search-top">
      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-add"  @click="topAddActive">新 增</button>
        <button type="button" class="dt-btn dt-btn-delete" @click="topDeleteActive">删 除</button>
      </div>
    </div>

    <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th class="dt-table-check" :class="{'dt-table-checked': allItemChecked}" @click="checkAllItemActive(allItemChecked)"></th>
                    <th class="tw-handle-account">账号</th>
                    <th class="tw-user-name">姓名</th>
                    <th class="tw-telephone">手机号码</th>
                    <th class="tw-staff-no">员工编号</th>
                    <th class="tw-staff-position">员工职务</th>
                    <th class="tw-role-type">角色类型</th>
                    <th class="tw-use-status">状态</th>
                    <th class="tw-time-ss">最近登录时间</th>
                    <th class="tw-address">联系地址</th>
                    <th class="tw-handle-edit2">操作</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <td class="dt-table-check" :class="{'dt-table-checked': item.checked}" @click="checkItemActive(item)"></td>
                  <td>{{item.username}}</td>
                  <td>{{item.fullname}}</td>
                  <td>{{item.mobile}}</td>
                  <td>{{item.id}}</td>
                  <td>{{item.company_position}}</td>
                  <td>{{item.role_type|FilterPositionRoleType}}</td>
                  <td>{{item.state == 1 ? '正常':'禁用'}}</td>
                  <td>{{item.last_login_time*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                  <td>{{item.address}}</td>
                  <td class="dt-table-edit"><b @click="toEditAcount(item)">编 辑</b><b class="dt-table-detele" @click="initPasswordActive(item)">初始化密码</b></td>
                </tr>
              </tbody>
          </table>
          <div class="no-data-tip" v-if="!listArr.length">暂无数据</div>
        </div>
        <div class="dt-page-wrap">
          </el-pagination>
          <el-pagination class="dt-page-reset"  :page-size="10"  @current-change="paginationChangeActive" :current-page="pageNumber" layout="total, prev, pager, next, jumper" :total="listTotal">
          </el-pagination>
        </div>
      </div>
      <!-- 表格 end -->

      <!-- 侧滑start -->
      <dt-slide-page :slideTitle='slideTitle' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul>
          <!-- 账号 -->
          <li>
            <dt-search-input :disabled ='isEditSlideFlag' ref="userNameSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.accountSingle.title" :placeholder ='$SearchInputConfig.accountSingle.placeholder' :maxLength = '$SearchInputConfig.accountSingle.length' defaultValue = ''></dt-search-input>
          </li>

          <!-- 密码 -->
          <li v-show="!isEditSlideFlag">
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

          <!-- 公司职务 -->
          <li>
            <dt-search-input  ref="positionSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.companyPosition.title" :placeholder ='$SearchInputConfig.companyPosition.placeholder' :maxLength = '$SearchInputConfig.companyPosition.length' defaultValue = ''></dt-search-input>
          </li>

          <!-- 邮箱 -->
          <li>
            <dt-search-input  ref="emailSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.emailSingle.title" :placeholder ='$SearchInputConfig.emailSingle.placeholder' :maxLength = '$SearchInputConfig.emailSingle.length' defaultValue = ''></dt-search-input>
          </li>

          <!-- 角色类型 -->
          <li>
            <dt-select-option ref='roleTypeSlideRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.roleTypeOperation.title' :optionsName ='$ElSelectName.roleTypeOperation.name' defaultValue=''></dt-select-option>
          </li>

          <!-- 账号状态 -->
          <li>
            <dt-select-option ref='accountStatusSlideRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.accountStatus.title' :optionsName ='$ElSelectName.accountStatus.name' defaultValue=''></dt-select-option>
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
                :default-expanded-keys="[2, 3]"
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

  </div>
</template>

<script>
import { dtSlidePage } from '../../global/searchComponents';
import { SlidePageConfig } from "../../global/constant.js"
import { paginationChangeActive, topSearchActive, checkAllItemActive, checkItemActive } from "../../global/mixin";
export default {
  mixins: [paginationChangeActive, topSearchActive, checkAllItemActive, checkItemActive],
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
      rightData: [],
      defaultCheckedRight: [201],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {
    // this.getMainList(this.getUrlData());
    // this.getMenuList();
  },
  methods: {
    getUrlData() {
      return {
        'page': this.pageNumber,
        'username': this.$refs.userNameSearchRef.value,
        'fullname': this.$refs.fullNameSearchRef.value
      }
    },
    getMainList(params) {
      this.$http.accountOperateGetList(params, msg => {
        let _msg = msg.data;
        this.listArr = this.$projectUtils.ListAddChecked(_msg.list);
        this.listTotal = Number(_msg.total);
      });
    },
    topDeleteActive() {
      this.$projectUtils.ConfirmTip('确定删除账号？', msg => {
        let _idArr = this.$projectUtils.GetCheckedItemIds(this.listArr);
        this.$http.accountDel(_idArr, msg => {
          this.getMainList(this.getUrlData());
        });
      })
    },
    initPasswordActive(info) {
      this.$projectUtils.ConfirmTip('是否确认初始化密码', msg => {
        if (msg === 'confirm') { this.$http.accountInitPwd(info.id, msg => {}) }
      })
    },
    topAddActive() {
      this.isEditSlideFlag = false;
      this.slideShow = true;
      this.setRefsEmpty();
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
        _menuIds = _menuIdArr.join(',');
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
      this.$refs.userNameSlideRef.value = '';
      this.$refs.passwordSlideRef.value = '';
      this.$refs.fullNameSlideRef.value = '';
      this.$refs.mobileSlideRef.value = '';
      this.$refs.positionSlideRef.value = '';
      this.$refs.emailSlideRef.value = '';
      this.$refs.roleTypeSlideRef.value = '1';
      this.$refs.tree.setCheckedKeys([]);
    },
    getRefs() {
      let _refsValue = {
        'userName': this.$refs.userNameSlideRef.value,
        'password': this.$refs.passwordSlideRef.value,
        'fullName': this.$refs.fullNameSlideRef.value,
        'state': this.$refs.accountStatusSlideRef.value,
        'mobile': this.$refs.mobileSlideRef.value,
        'company_position': this.$refs.positionSlideRef.value,
        'email': this.$refs.emailSlideRef.value,
        'roleType': this.$refs.roleTypeSlideRef.value
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
      this.$refs.tree.setCheckedKeys(_msg.menu_ids.split(','));
    },
    getMenuList() {
      this.$http.menuGetList(msg => {
        let _msg = msg.data;
        this.rightData = this.$projectUtils.RightDataChange(_msg, true);
      })
    }
  },
  computed: {
    slideTitle() {
      return this.isEditSlideFlag ? '编辑运营商账号' : '新增运营商账号'
    }
  },
  components: {
    dtSlidePage
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/constant.style.scss";
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
</style>


<template>
  <div id="header">
    <div style="height:64px;text-align: center; background-color:#3186DC " class="log">
      <img width="36px" height="36px" src="../assets/img/ic-tubiao.png" style="margin-top: 20px;">
    </div>

    <div class="main-header">
      <div class="main-left">
        <div class="one-style">后台管理</div>
        <div class="two-style">Operating &nbsp The &nbsp Background</div>
      </div>
      <div class="main-title">
        <!--<tab-control :title="title" @tabClick="tabClick" ref="tabControl" v-show="isTabShow" class="tab-style"></tab-control>-->
      </div>
      <div class="main-right">
        <div class="ivu-poptip">
          <div class="main-right-change">
            <!-- <img src="../assets/img/ic-xinxi.png" alt=""> -->
          </div>
          <div class="main-right-out" @click="go_out">
            <div class="one-style">{{aousername}}</div>
            <div class="two-style">{{usertype}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 侧滑start -->
    <dt-slide-page
      slideTitle="修改密码"
      :class="{'slide-page-show': slideShow}"
      @hideSlidePage="slideShow = false"
      :slideWidth="SlidePageConfig.slideWidthA"
    >
      <ul>
        <!-- 旧密码 -->
        <li>
          <dt-search-input
            inputType="password"
            ref="oldPsdSlideRef"
            :inputWidth="SlidePageConfig.inputWidthA"
            :title="$SearchInputConfig.oldPassword.title"
            :placeholder="$SearchInputConfig.oldPassword.placeholder"
            :maxLength="$SearchInputConfig.oldPassword.length"
            defaultValue
          ></dt-search-input>
        </li>

        <!-- 新密码 -->
        <li>
          <dt-search-input
            inputType="password"
            ref="newPsdSlideRef"
            :inputWidth="SlidePageConfig.inputWidthA"
            :title="$SearchInputConfig.newPassword.title"
            :placeholder="$SearchInputConfig.newPassword.placeholder"
            :maxLength="$SearchInputConfig.newPassword.length"
            defaultValue
          ></dt-search-input>
        </li>

        <!-- 确认新密码 -->
        <li>
          <dt-search-input
            inputType="password"
            ref="reNewPsdSlideRef"
            :inputWidth="SlidePageConfig.inputWidthA"
            :title="$SearchInputConfig.reNewPassword.title"
            :placeholder="$SearchInputConfig.reNewPassword.placeholder"
            :maxLength="$SearchInputConfig.reNewPassword.length"
            defaultValue
          ></dt-search-input>
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
import { mapGetters } from "vuex";
import { dtSlidePage } from "../global/searchComponents";
import { SlidePageConfig } from "../global/constant.js";
// import TabControl from '../components/common/tabControl/tabControl'
export default {
  // components: {
  //   TabControl,
  // },
  data() {
    return {
      isShowHandle: true,
      slideShow: false,
      title: ["设备总览", "智能设备管理", "设备导入", "固件管理", "音频推送"],
      isTabShow: false,
      // goods:{
      //   'pop':{page:0,list:[]},
      //   'new':{page:0,list:[]},
      //   'sell':{page:0,list:[]}
      // },
      currentType: "设备总览",
      SlidePageConfig,
      uid: "",
      aousername: "",
      usertype: ""
    };
  },
  mounted() {
    this.uid = localStorage.getItem("aoid");
    this.usertype = localStorage.getItem("accountnum");

    this.aousername = localStorage.getItem("aousername");
    console.log(this.aousername);
  },
  computed: {
    ...mapGetters(["accountInfo"])
  },
  methods: {
    go_out() {
      this.$confirm("是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const params = {
            id: this.uid
          };
          this.$http.logoff(params, msg => {
            if (msg.errcode == 0) {
              localStorage.removeItem("aoid");
              localStorage.removeItem("accountnum");
              localStorage.removeItem("aousername");
              localStorage.removeItem("aotoken");
              this.$router.push({ name: "login" });
            }
          });

          //        this.$message({
          //          type: 'success',
          //          message: '删除成功!'
          //        });
        })
        .catch(() => {
          //        this.$message({
          //          type: 'info',
          //          message: '已取消删除'
          //        });
        });
    },

    tabClick(index) {
      // console.log(index)
      alert(index);
      // switch (index){
      //   case 0:
      //     this.currentType='pop';
      //     break;
      //   case 1:
      //     this.currentType='new';
      //     break;
      //   case 2:
      //     this.currentType='sell';
      //     break;
      //
      // }
    },
    showHandel: function(flag) {
      this.isShowHandle = flag;
    },
    logOutActive() {
      this.$http.accountLogout(msg => {
        localStorage.removeItem("Three-Access_Token");
        this.$router.push({ name: "login" });
      });
    },
    psdModifyActive() {
      this.slideShow = true;
      this.$refs.oldPsdSlideRef.value = "";
      this.$refs.newPsdSlideRef.value = "";
      this.$refs.reNewPsdSlideRef.value = "";
    },
    slideSureActive() {
      let _urlData = {
        old_pwd: this.$refs.oldPsdSlideRef.value,
        new_pwd: this.$refs.newPsdSlideRef.value,
        re_pwd: this.$refs.reNewPsdSlideRef.value
      };
      this.$http.accountChangePwd(_urlData, msg => {
        this.$message({
          showClose: true,
          message: "修改密码成功，将跳回首页重新登录",
          duration: 2000,
          type: "success"
        });
        setTimeout(() => {
          this.$router.replace({ name: "login" });
        }, 2000);
      });
    },
    slideCancelActive() {
      this.slideShow = false;
    }
  },
  components: {
    dtSlidePage
  }
};
</script>

<style lang="scss">
@import "../scss/constant.style.scss";
#header {
  position: fixed;
  width: 100%;
  height: 64px;
  min-width: 1200px;
  top: 0;
  box-shadow: 0 0 9px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s ease-in-out;
  background-color: #fff;
  z-index: 99;
  display: flex;
}
#header .log {
  height: 100%;
  width: 10%;
  padding-right: -10px;
  line-height: 64px;
  background: $color-header-logo-bg;
  text-align: center;
  // 正式不要
  color: #fff;
  font-size: 20px;
  // 正式不要
}
#header .main-header {
  width: 90%;
  z-index: 1;
  box-sizing: border-box;
  position: fixed;
  height: 64px;
  margin-left: 10%;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid #fafafa;
  display: flex;
  flex-direction: row;
  color: #dcdcdc;
  background: #ffffff;
  font-size: 14px;
  .main-title {
    flex: 10;
    display: flex;
    .tab-style {
      width: 100%;
    }
    .message-style {
      flex: 8;
      display: flex;
      justify-content: flex-end;
      padding-right: 20px;
      align-items: center;
    }
    .login-style {
      flex: 4;
      display: flex;
      align-items: center;
    }
  }
  .main-left {
    flex: 3;
    height: 64px;
    font-size: 16px;
    color: #3186dc;
    .one-style {
      flex: 1;
      padding-top: 10px;
    }
    .two-style {
      flex: 1;
      margin-top: 10px;
      font-size: 10px;
    }
  }
  .main-right {
    flex: 2.5;
    .ivu-poptip {
      display: flex;
      height: 60px;
      .main-right-change {
        flex: 1;
        height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 36px;
          height: 36px;
        }
      }
      .main-right-out {
        flex: 2;
        height: 64px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .one-style {
          flex: 1;
          color: #3186dc;
          padding-top: 10px;
          font-size: 16px;
        }
        .two-style {
          flex: 1;
          color: #9caac8;
          margin-top: 10px;
          font-size: 10px;
        }
      }
    }
  }
  .user {
    cursor: pointer;
  }
  .tips {
    color: #333;
    text-align: center;
    .tip-item {
      padding: 5px 0px;
      cursor: pointer;
    }
  }
}
.main-body {
  position: absolute;
  left: 200px;
  top: 60px;
  right: 0px;
  bottom: 0px;
  padding: 10px;
  background-color: #f0f0f0;
  transition: left 0.3s;
}
</style>

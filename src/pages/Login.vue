<template>
  <div id="login">
    <div class="login-con">
      <div class="logo-fotert">登录/login</div>
      <div class="login-con-inner">
        <!-- <p>账号：</p> -->
        <div class="log-account">
          <i></i>
          <span>
            <input type="text" class="dt-input" placeholder="请输入账号" v-model="username">
          </span>
        </div>
        <!-- <p>密码：</p> -->
        <div class="log-psd">
          <i></i>
          <span>
            <input
              type="password"
              class="dt-input"
              placeholder="请输入密码"
              @keyup.enter="submit"
              v-model="password"
            >
          </span>
        </div>
        <!-- <p class="log-err-tip">{{errWord}}</p> -->
        <button type="button" class="dt-btn" style="width:100%" @click="submit()">登 录</button>
      </div>
    </div>
  </div>
</template>

<script>
const USER_NAME_REG = /^[a-zA-Z0-9_]{3,15}$/;
export default {
  data() {
    return {
      username: "",
      password: "",
      errWord: ""
    };
  },
  mounted: function() {
    this.$http.gettoken(msg => {
      if (msg.errcode == 0) {
        localStorage.setItem("aotoken", msg.data);
      }
    });
  },

  methods: {
    submit() {
      console.log(this.username);

      if (!USER_NAME_REG.test(this.username)) {
        this.errWord = "账号格式不正确";
        this.$message.warning("账号格式不正确");
        return;
      }
      if (this.password.length > 18 || this.password.length < 6) {
        this.errWord = "密码格式不正确";
        this.$message.warning("密码格式不正确");
        return;
      }
      this.errWord = "";
      this.$http.accountLogin(this.username, this.password, msg => {
        //         let aoid=mes.data.id
        localStorage.setItem("aoid", msg.data.id);
        localStorage.setItem("power", msg.data.power);
        localStorage.setItem("accountnum", this.username);
        localStorage.setItem("aousername", msg.data.username);
        if (msg.errcode == 0) {
          this.$router.push({ name: "device-summary" });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/constant.style.scss";
@import "../scss/mixin";
#login {
  min-width: 1200px;
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  background: url("../assets/img/bg.png") center center no-repeat;
  background-size: cover;
}
.login-con {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 12px 11px 0 rgba(100, 100, 100, 0.3);
  width: 320px;
  min-height: 320px;
  background: #fff;
  border-radius: 8px;
  margin-top: -24px;
  color: #3186dc;
  z-index: 2;
}
.logo-fotert {
  width: 100%;
  height: 50px;
  margin: 0 auto;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
}

.login-con-inner {
  width: 90%;
  margin: 0 auto;
}
.log-account,
.log-psd {
  height: 40px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  background: #eeeeee;
  margin: 10px 0 30px 0;
  display: flex;
  font-size: 18px;
}

.log-account > i,
.log-psd > i {
  display: inline-block;
  width: 64px;
}

.log-account > i {
  background: url("../assets/img/icon_user.png") no-repeat center center / auto;
}

.log-psd > i {
  background: url("../assets/img/icon_password.png") no-repeat center center /
    auto;
}

.log-account > span,
.log-psd > span {
  flex: 1;
  input {
    border: 0;
    height: 100%;
    width: 100%;
    outline: none;
    background: #eeeeee;
    font-size: 14px;
  }
}
.log-account {
  margin: 24px 0 30px 0;
}

.login-con {
  .dt-btn {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 18px; // letter-spacing: 6px;
    border-radius: 5px;
    background: #3186dc;
    outline: none;
    color: white;
    border: 1px solid #3186dc;
    margin-top: 10px;
  }
}
</style>

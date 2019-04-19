<template>
  <side>
    <side-item path="/home/summary">
      <img slot="icon" src="../../assets/img/ic-shebei_nosel.png" alt>
      <img slot="icon-active" src="../../assets/img/ic-shebei.png" alt>
      <div slot="text">设备</div>
    </side-item>
    <side-item path="/admin/backend">
      <img slot="icon" src="../../assets/img/ic_zhanghao.png" alt>
      <img slot="icon-active" src="../../assets/img/ic-zhanghao.png" alt>
      <div slot="text">账号管理</div>
    </side-item>
    <side-item path="/push/remind">
      <img slot="icon" src="../../assets/img/ic-tuisong_nosel.png" alt>
      <img slot="icon-active" src="../../assets/img/ictuisongi.png" alt>
      <div slot="text">到期提醒与推送</div>
    </side-item>
    <side-item path="/serve/waiting">
      <img slot="icon" src="../../assets/img/ic-dingdan_nosel.png" alt>
      <img slot="icon-active" src="../../assets/img/ic-dingdan.png" alt>
      <div slot="text">交易订单管理</div>
    </side-item>
    <side-item path="/log/userInfo" v-if="id==1 || true ">
      <img slot="icon" src="../../assets/img/ic-xitong_nosel.png" alt>
      <img slot="icon-active" src="../../assets/img/ic-xitong.png" alt>
      <div slot="text">系统日志</div>
    </side-item>
    <!--<side-item path="/log/userInfo" v-for="item in arr">-->
    <!--{{item.icona}}-->
    <!--<span>1231</span>-->
    <!--<img  :src="item.icona" alt="">-->
    <!--<img  slot="icon-active"  :src="item.iconb" alt="">-->
    <!--<div slot="text">{{item.title}}</div>-->
    <!--</side-item>-->
  </side>
</template>

<script>
import Side from "./Side";
import SideItem from "./SideItem";
export default {
  components: {
    Side,
    SideItem
  },
  data() {
    return {
      arr: [
        {
          title: "设备",
          path: "/home/summary",
          icona: "../../assets/img/ic-shebei_nosel.png",
          iconb: "../../assets/img/ic-shebei.png"
        },
        {
          title: "账号管理",
          path: "/admin/backend",
          icona: "../../assets/img/ic_zhanghao.png",
          iconb: "../../assets/img/ic-zhanghao.png"
        },
        {
          title: "到期提醒与推送",
          path: "/push/remind",
          icona: "../../assets/img/ic-tuisong_nosel.png",
          iconb: "../../assets/img/ictuisongi.png"
        },
        {
          title: "交易订单管理",
          path: "/serve/waiting",
          icona: "../../assets/img/ic-dingdan_nosel.png",
          iconb: "../../assets/img/ic-dingdan.png"
        },
        {
          title: "系统日志",
          path: "/log/userInfo",
          icona: "../../assets/img/ic-xitong_nosel.png",
          iconb: "../../assets/img/ic-xitong.png"
        }
      ],
      id: "",
      power: "",
      powerBool: ""
    };
  },
  computed: {},
  mounted() {
    this.id = localStorage.getItem("aoid");
    this.power = localStorage.getItem("power");
    //      console.log(this.$route.params.path )
    // console.log(this.power);
    this.powerBools();
  },
  methods: {
    powerBools() {
      console.log(this.power);
      for (var i = 0; i <= this.power.length; i++) {
        if (this.power[i] != 5) {
          this.powerBool = false;
        } else {
          console.log("------abc------");
          this.powerBool = true;
        }
      }
    }
  },
  filters: {}
};
</script>
<style lang="scss">
</style>

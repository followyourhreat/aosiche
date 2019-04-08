<template>
  <side>
    <side-item path="/home/summary">
      <img slot="icon" src="../../assets/img/ic-shebei_nosel.png" alt="">
      <img  slot="icon-active"  src="../../assets/img/ic-shebei.png" alt="">
      <div slot="text">设备</div>
    </side-item>
    <side-item path="/admin/backend">
      <img slot="icon" src="../../assets/img/ic_zhanghao.png" alt="">
      <img  slot="icon-active"  src="../../assets/img/ic-zhanghao.png" alt="">
      <div slot="text">账号管理</div>
    </side-item>
    <side-item path="/push/remind">
      <img slot="icon" src="../../assets/img/ic-tuisong_nosel.png" alt="">
      <img  slot="icon-active"  src="../../assets/img/ictuisongi.png" alt="">
      <div slot="text">到期提醒与推送</div>
    </side-item>
    <side-item path="/serve/waiting">
      <img slot="icon" src="../../assets/img/ic-dingdan_nosel.png" alt="">
      <img  slot="icon-active"  src="../../assets/img/ic-dingdan.png" alt="">
      <div slot="text">交易订单管理</div>
    </side-item>
    <side-item path="/log/userInfo">
      <img slot="icon" src="../../assets/img/ic-xitong_nosel.png" alt="">
      <img  slot="icon-active"  src="../../assets/img/ic-xitong.png" alt="">
      <div slot="text">系统日志</div>
    </side-item>
  </side>
</template>

<script>
  import Side from './Side'
  import SideItem from './SideItem'
export default {
    components: {
      Side,
      SideItem
    }
};
</script>
<style lang="scss">
</style>

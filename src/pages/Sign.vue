<template>
  <div class="sign tc">
    <!-- <div class="logo">
      <img src="../assets/login_bg.png" alt="" :style="{backgroundImage:`url(${require(../path)})`}">
    </div> -->
    <transition name="fade" mode="out-in">
      <router-view class="form_box"></router-view>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
    .sign{
        width: 100%;
        height: 100%;
    }
</style>

<script>
export default {
  components: {
  }
}
</script>


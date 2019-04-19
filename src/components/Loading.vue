<template>
  <transition name="loading-fade">
    <div id="loading" v-if="isLoading">
      <div class="box">
        <img src="./loaders/circles.svg">
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'loading',
  computed: {
    ...mapGetters(['isLoading'])
  }
};
</script>

<style lang="scss">
@import "../scss/constant.style.scss";
#loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  min-width: $length-body-min-width;
  min-height: $length-body-min-height;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0 );
  .box {
    width: 32px;
    height: 32px;
  }
}
</style>
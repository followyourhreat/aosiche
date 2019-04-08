<template>
  <div class="side-item" @click="btnClick" :style="activeStyle">
    <div v-if="!isActive">
      <slot name="icon"></slot>
    </div>
    <div v-else>
      <slot name="icon-active"></slot>
    </div>
    <div>
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideItem",
  props: {
    path: String,
    activeClass: {
      type: String,
      default: "#3588DD"
    },
    backgroundClass: {
      type: String,
      default: "#fff"
    }
  },
  computed: {
    isActive() {
      var curPath = window.location.hash.split("#")[1];
      var patt1 = /home/;
      var patt2 = /admin/;
      var patt3 = /push/;
      var patt4 = /serve/;
      var patt5 = /log/;
      if (this.path == "/home/summary") {
        return patt1.test(curPath);
      } else if (this.path == "/admin/backend") {
        return patt2.test(curPath);
      } else if (this.path == "/push/remind") {
        return patt3.test(curPath);
      } else if (this.path == "/serve/waiting") {
        return patt4.test(curPath);
      } else if (this.path == "/log/userInfo") {
        return patt5.test(curPath);
      } else {
        return this.$route.path.indexOf(this.path) !== -1;
      }
    },
    activeStyle() {
      return this.isActive
        ? { color: this.activeClass, backgroundColor: this.backgroundClass }
        : {};
    }
  },
  methods: {
    btnClick() {
      this.$router.replace(this.path);
    }
  }
};
</script>

<style scoped>
.side-item {
  height: 100px;
  /*text-align: center;*/
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.side-item img {
  padding: 3px 3px;
  width: 36px;
  height: 36px;
  vertical-align: middle;
}
</style>

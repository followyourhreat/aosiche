<template>
  <nav class="sta-title">
    <span class="sta-title-con">{{titleCon}}</span>
    <!-- <span class="sta-show-more">查看更多<img src="../../statics/img/ic_arrow_right.png" alt=""></span> -->
    <span class="sta-show-more" @click="toMore">查看更多</span>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      titleCon: this.title
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    routerName: {
      type: String
    }
  },
  methods: {
    toMore() {
      this.$router.push({'name': this.routerName});
    }
  }
}
</script>

<style lang="scss" scoped>
.sta-title{
    height: 40px;
    line-height: 40px;
    display: flex;
    .sta-title-con{
      flex: 1;
    }
    .sta-show-more{
      width: 76px;
      cursor: pointer;
      color: #0097FF;
      font-size: 12px;
      background: url('../../statics/img/ic_arrow_right.png') no-repeat right center/auto;
    }
  }
</style>


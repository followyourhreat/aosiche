<template>
  <div class="wrap-404">
    <h1>404</h1>
    <button class="dt-btn" @click="backActive">返回</button>
  </div>
</template>

<script>
export default {
  methods: {
    backActive() {
      this.$router.back();
    }
  }
}
</script>


<style lang="scss" scoped>
.wrap-404{
  height: 180px;
  line-height: 180px;
  font-size: 100px;
  font-weight: 800;
  text-align: center;
  h1{
    padding-top: 100px;
  }
}
</style>


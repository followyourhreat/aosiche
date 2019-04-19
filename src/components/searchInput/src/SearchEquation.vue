<template>
  <div class="dt-search-cell">
    <i class="dt-search-title">{{titleValue}}：</i>
    <span class="dt-search-con">
      <input v-model="value2" type="text" placeholder="占比" class="dt-input">
    </span>
    <span class="slide-tip">占比需为小于1的6位小数</span>
  </div>
</template>

<script>
export default {
  name: 'dtSearchEquation',
  data() {
    return {
      value2: '',
      titleValue: this.title
    }
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  watch: {
    value2(newVal, oldVal) {
      this.value2 = newVal;
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
// 特殊定做组件
.dt-search-title{
  width: 130px;
}
.dt-search-con {
  input.dt-input{
    min-width: 100px;
    width: 100px;
    max-width: 100px;
  }
  input:focus{
    border-color: #409EFF;
  }
}
.slide-tip{
  font-size: 12px;
  color: #D4D4D4;
}
</style>



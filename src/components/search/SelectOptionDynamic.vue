<template>
  <div class="dt-search-cell">
    <i class="dt-search-title">{{optiosTitle}}：</i>
    <span class="dt-search-con" :style="{'width':selectWidth+'px'}">
      <el-select v-model="value" placeholder="请选择" @change="valueChange">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </span>
  </div>
</template>

<script>
// import { ElSelectOption } from "../../global/constant.js"
export default {
  data() {
    return {
      options: [],
      value: this.defaultValue,
      selectWidth: this.conWidth
    }
  },
  created() {
    this.options = this.optionsData;
    this.value = this.options[0] && this.options[0].value;
  },
  methods: {
    valueChange(value) {
      console.log(value)
      this.$emit('selectValueChange', value)
    }
  },
  props: {
    defaultValue: {
      type: null,
      default: ''
    },
    optionsData: {
      type: [Array],
      require: true
    },
    optiosTitle: {
      type: String,
      require: true
    },
    conWidth: {
      type: [String, Number],
      default: 100
    }
  },
  watch: {
    defaultValue(newVal) {
      this.value = newVal;
    },
    optionsData(newVal) {
      this.options = newVal;
    }
  }
}
</script>

<style lang="scss" scoped>
.dt-search-con{
  .el-select{
    width: 100%;
  }
}
</style>

<template>
  <div class="dt-search-cell">
    <i v-if="hasSelectTitle" class="dt-search-title">{{optiosTitle}}：</i>
    <span class="dt-search-con" :style="{'width':selectWidth+'px'}">
      <el-select v-model="value" placeholder="请选择" @change="valueChange">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </span>
  </div>
</template>

<script>
import { ElSelectOption } from "../../../global/constant.js"
export default {
  name: 'dtSelectOption',
  data() {
    return {
      options: [],
      value: this.defaultValue,
      label: '',
      selectWidth: this.conWidth
    }
  },
  created() {
    this.options = ElSelectOption[this.optionsName];
    this.value = this.options[0].value;
    this.label = this.options[0].label;
  },
  methods: {
    valueChange(value) {
      this.$emit('selectValueChange', value)
    }
  },
  props: {
    defaultValue: {
      type: null,
      default: ''
    },
    optionsName: {
      type: String,
      require: true
    },
    optiosTitle: {
      type: String,
      require: true
    },
    hasSelectTitle: {
      type: Boolean,
      default: true
    },
    conWidth: {
      type: [String, Number],
      default: 60
    }
  },
  watch: {
    defaultValue(newVal) {
      this.value = newVal;
    },
    options(val, newVal) {
      this.value = val[0].value;
      this.label = val[0].label;
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

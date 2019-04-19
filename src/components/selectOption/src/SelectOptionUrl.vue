<!-- 下拉选择框,接收父级传递数组组件 -->
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
export default {
  name: 'dtSelectOptionUrl',
  props: {
    defaultValue: {
      type: null,
      default: ''
    },
    optionsList: {
      type: Array,
      require: false
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
      default: 100
    }
  },
  data() {
    return {
      selectWidth: this.conWidth,
      options: this.optionsList,
      value: '',
      label: ''
    }
  },
  watch: {
    defaultValue(val) {
      this.value = val;
    },
    optionsList(val, newVal) {
      this.options = val;
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    valueChange(value) {
      this.$emit('selectValueChange', value)
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

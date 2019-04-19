<template>
  <div class="dt-search-cell">
    <i class="dt-search-title">{{optiosTitle}}：</i>
    <span class="dt-search-con" :style="{'width':selectWidth+'px'}">
      <el-select 
        v-model="value" 
        placeholder="请输入关键字搜索,选择其中一项" 
        @change="valueChange"
        @clear="valueClear"
        @focus="valueFocus"
        @blur="valueBlur"
        clearable
        default-first-option 
        filterable 
        remote 
        :remote-method="remoteMethod">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </span>
  </div>
</template>

<script>
export default {
  name: 'dtSelectOptionSearch',
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
    // 防抖函数
    debounce(fn, delay) {
      let timer = null
      return (() => {
        let context = this
        let args = arguments
        clearTimeout(timer)
        timer = setTimeout(() => {
          fn.apply(context, args)
        }, delay)
      })()
    },
    // 1秒后再触发变化
    remoteMethod(value) {
      console.log('remote', value)
      this.debounce(() => {
        this.$emit('remoteMethod', value);
      }, 1000)
    },
    valueClear(value) {
      console.log('clear', value)
      this.remoteMethod('');
    },
    valueFocus(value) {
      console.log('focus', value)
    },
    valueBlur(value) {
      console.log('blur', value)
    },
    valueChange(value) {
      console.log('change', value)
      this.$emit('selectValueChange', value);
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

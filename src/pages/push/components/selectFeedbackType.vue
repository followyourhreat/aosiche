<template>
  <div class="dt-search-cell">
    <i class="dt-search-title">反馈类型：</i>
    <span class="dt-search-con" style="width:90px">
      <el-select v-model="value" placeholder="请选择" @change="valueChange">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </span>
  </div>
</template>

<script>

export default {
  data() {
    return {
      options: [{
        value: '选项1',
        label: '全部'
      }, {
        value: '选项2',
        label: '设备故障'
      }, {
        value: '选项3',
        label: '微信端使用'
      }, {
        value: '选项4',
        label: '安装请求'
      }, {
        value: '选项5',
        label: '售后请求'
      }],
      value: this.defaultValue
    }
  },
  methods: {
    valueChange(value) {
      console.log(value)
    }
  },
  props: {
    defaultValue: {
      type: null,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

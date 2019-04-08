<template>
  <div class="dt-search-cell">
    <i class="dt-search-title">处理状态：</i>
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
        label: '已处理'
      }, {
        value: '选项3',
        label: '处理中'
      }, {
        value: '选项4',
        label: '待处理'
      }, {
        value: '选项5',
        label: '已转服务管理'
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

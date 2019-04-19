<template>
  <div class="dt-search-cell">
    <i class="dt-search-title">地区筛选：</i>
    <span class="dt-search-con" style="width:170px">
      <el-cascader size="large" :options="optionss" v-model="selectedOptions" @change="handleChange">
      </el-cascader>
    </span>
  </div>
</template>
<script>
import { regionDataPlus } from "element-china-area-data";
export default {
  data() {
    return {
      optionss: regionDataPlus,
      selectedOptions: []
    };
  },
  props: {},
  methods: {
    handleChange(value) {
      console.log(value);
      this.$emit("areaUpdate", value);
    }
  }
};
</script>

<style scoped>
.el-cascader {
  line-height: 30px;
}
</style>

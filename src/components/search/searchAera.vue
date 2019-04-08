<template>
  <div class="dt-search-cell">
    <i class="dt-search-title">{{title}}：</i>
    <span class="dt-search-con" :style="{'width':conWidth+'px'}">
      <el-cascader size="large" :options="optionss" :filterable =true :clearable=true v-model="selectedOptions" @change="handleChange">
      </el-cascader>
    </span>
  </div>
</template>
<script>
/**
 * 地区插件需要根据后台返回的数据进行
 * DtPCAreaDataPlus  城市编码  如果想要省市区名字需要引入DtPCAreacodeText
 * 详情查看../../utils/dtPcAreaDatafitEle.js
 */
// import { DtPCAreaDataPlus, DtPCAreacodeText } from "../../utils/dtPcAreaDatafitEle.js";
import { DtPCAreaDataPlus } from "../../utils/dtPcAreaDatafitEle.js";
export default {
  data() {
    return {
      optionss: DtPCAreaDataPlus,
      title: this.optionsTitle,
      selectedOptions: [],
      conWidth: this.inputWidth
    };
  },
  props: {
    inputWidth: {
      type: [String, Number],
      default: 200
    },
    optionsTitle: {
      type: [String],
      default: '地区筛选'
    }
  },
  methods: {
    handleChange(value) {
      console.log(value);
      this.$emit("areaUpdate", value);
    }
  }
};
</script>

<style scoped lang='scss'>
.dt-search-con {
  .el-cascader {
    line-height: 30px;
    width: 100%;
  }
}
</style>

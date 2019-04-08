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
// import { DtPCAreaDataPlus, DtPCAreaCodeText, DtPCAreaDataPlusAccordAll } from "../../../utils/dtPcAreaDatafitEle.js";
import { DtPCAreaDataPlusAccordAll, DtPCAreaCodeText } from "../../../utils/dtPcAreaDatafitEle.js";
export default {
  name: 'dtSearchArea',
  data() {
    return {
      // optionss: DtPCAreaDataPlus,
      optionss: [],
      title: this.optionsTitle,
      selectedOptions: this.defaultOptions,
      conWidth: this.inputWidth
    };
  },
  mounted() {
    let _needAll = Number(this.needAll);
    this.optionss = DtPCAreaDataPlusAccordAll(_needAll);
  },
  props: {
    inputWidth: {
      type: [String, Number],
      default: 200
    },
    optionsTitle: {
      type: [String],
      default: '地区筛选'
    },
    defaultOptions: {
      type: [Array],
      default: function () {
        return []
      }
    },
    needAll: {
      type: [Number, String],
      default: 1
    }
  },
  methods: {
    handleChange(value) {
      console.log(value);
      let _value = value;
      let _v0 = _value[0] ? ((_value[0] !== 'all') ? _value[0] : '') : '';
      let _v1 = _value[1] ? ((_value[1] !== 'all') ? _value[1] : '') : '';
      let _v2 = _value[2] ? ((_value[2] !== 'all') ? _value[2] : '') : '';
      let _t0 = DtPCAreaCodeText[_v0];
      let _t1 = DtPCAreaCodeText[_v1];
      let _t2 = DtPCAreaCodeText[_v2];
      let _textArr = [];
      let _codeArr = [];
      if (_v0) { _textArr[0] = _t0; };
      if (_v1) { _textArr[1] = _t1; };
      if (_v2) { _textArr[2] = _t2; };
      if (_v0) { _codeArr[0] = _v0; };
      if (_v1) { _codeArr[1] = _v1; };
      if (_v2) { _codeArr[2] = _v2; };
      let _codeAndText = {
        code: _codeArr,
        text: _textArr
      }
      console.log(_codeAndText);
      this.$emit("areaUpdate", _codeAndText);
    }
  },
  watch: {
    defaultOptions(newVal) {
      this.selectedOptions = newVal
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

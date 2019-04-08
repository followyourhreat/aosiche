<!-- 表单中企业-品牌-系列-型号关联组件 -->
<template>
  <div>
    <!-- 企业 -->
    <li v-show = "false">
      <dt-select-option-url ref="company" optiosTitle='企业名称' :optionsList ='option.companyList' :conWidth = 'SlidePageConfig.inputWidthA' @selectValueChange="selectValueChange"></dt-select-option-url>
    </li>
    <!-- 品牌 -->
    <li v-show = "currListShow.brand">
      <dt-select-option-url ref="brand" optiosTitle='品牌名称' :optionsList ='option.brandList' :conWidth = 'SlidePageConfig.inputWidthA' @selectValueChange="selectValueChange2"></dt-select-option-url>
    </li>
    <!-- 系列 -->
    <li v-show = "currListShow.series">
      <dt-select-option-url ref="series" optiosTitle='系列名称' :optionsList ='option.seriesList' :conWidth = 'SlidePageConfig.inputWidthA' @selectValueChange="selectValueChange3"></dt-select-option-url>
    </li>
    <!-- 型号 -->
    <li v-show = "currListShow.modelset">
      <dt-select-option-url ref="modelset" optiosTitle='型号名称' :optionsList ='option.modelsetList' :conWidth = 'SlidePageConfig.inputWidthA' @selectValueChange="selectValueChange4"></dt-select-option-url>
    </li>
  </div>
</template>

<script>
import { SlidePageConfig } from "../../../global/constant.js"
export default {
  name: 'dtSearchModel',
  props: {
    listShow: {
      type: Object,
      default: function () {
        return {company: false, brand: false, series: false, modelset: false}
      }
    }
  },
  data() {
    return {
      SlidePageConfig,
      currListShow: this.listShow,
      selectValue: {
        companyValue: '',
        brandValue: '',
        seriesValue: '',
        modelsetValue: ''
      },
      option: {
        companyList: [],
        brandList: [],
        seriesList: [],
        modelsetList: []
      }
    };
  },
  watch: {
  },
  mounted() {
    // this.getCompanyListOption();
    this.selectValueChange('');
  },
  methods: {
    //  获取企业
    getCompanyListOption() {
      this.$http.SystemCompanyListOption({}, msg => {
        let _msg = msg.data;
        _msg.forEach(item => {
          item.value = item.enterprise_id;
          item.label = item.enterprise_name;
        })
        this.option.companyList = _msg;
      });
      this.emitSelectValue();
    },
    //  企业变化查询品牌
    selectValueChange(val) {
      this.option = Object.assign(this.option, {brandList: [], seriesList: [], modelsetList: []});
      this.$refs.brand.value = '';
      this.$refs.series.value = '';
      this.$refs.modelset.value = '';
      if (this.currListShow.brand) {
        this.$http.SystemBrandListOption({enterprise_id: val}, msg => {
          let _msg = msg.data;
          _msg.forEach(item => {
            item.value = item.id;
            item.label = item.brand_name;
          })
          this.option.brandList = _msg;
        });
      }
      this.emitSelectValue();
    },
    //  品牌变化查询系列
    selectValueChange2(val) {
      this.option = Object.assign(this.option, {seriesList: [], modelsetList: []});
      this.$refs.series.value = '';
      this.$refs.modelset.value = '';
      if (this.currListShow.series) {
        this.$http.SystemSeriesListOption({brand_id: val}, msg => {
          let _msg = msg.data;
          _msg.forEach(item => {
            item.value = item.id;
            item.label = item.series_name;
          })
          this.option.seriesList = _msg;
        });
      }
      this.emitSelectValue();
    },
    //  系列变化查询型号
    selectValueChange3(val) {
      this.option = Object.assign(this.option, {modelsetList: []});
      this.$refs.modelset.value = '';
      if (this.currListShow.modelset) {
        this.$http.SystemModelSetListOption({series_id: val}, msg => {
          let _msg = msg.data;
          _msg.forEach(item => {
            item.value = item.id;
            item.label = item.model_name;
          })
          this.option.modelsetList = _msg;
        });
      }
      this.emitSelectValue();
    },
    //  型号变化查询
    selectValueChange4(val) {
      this.emitSelectValue();
    },
    emitSelectValue() {
      this.selectValue = {
        companyValue: this.$refs.company.value,
        brandValue: this.$refs.brand.value,
        seriesValue: this.$refs.series.value,
        modelsetValue: this.$refs.modelset.value
      }
      this.$emit("selectValue", this.selectValue);
    }
  }
};
</script>

<style scoped lang='scss'>
li{
  height: auto;
  overflow: hidden;
  margin-bottom: 16px;
}
</style>

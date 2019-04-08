// 普通下拉选择框
import selectOption from "./src/SelectOption.vue";
// 下拉选择框,接收父级传递数组组件
import selectOptionUrl from "./src/SelectOptionUrl.vue";
// 远程搜索下拉选择框
import selectOptionSearch from "./src/SelectOptionSearch.vue";
// 品牌=>系列=>型号,联级下拉选择框
import brandComponent from "./src/brandComponent.vue";
selectOption.install = function(Vue) {
  Vue.component(selectOption.name, selectOption);
  Vue.component(selectOptionUrl.name, selectOptionUrl);
  Vue.component(selectOptionSearch.name, selectOptionSearch);
  Vue.component(brandComponent.name, brandComponent);
}

export default selectOption;

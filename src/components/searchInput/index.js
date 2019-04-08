// 普通输入框
import SearchInput from "./src/SearchInput.vue";
// 方程式输入框
import SearchEquation from "./src/SearchEquation.vue";
SearchInput.install = function(Vue) {
  Vue.component(SearchInput.name, SearchInput);
  Vue.component(SearchEquation.name, SearchEquation);
}
export default SearchInput;

// 方式二：
// import SearchInputComponent from "./src/SearchInput.vue";
// const SearchInput = {
//   install: function(Vue) {
//     Vue.component(SearchInputComponent.name, SearchInputComponent);
//   }
// }

// export default SearchInput;

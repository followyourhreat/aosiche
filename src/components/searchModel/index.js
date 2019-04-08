import searchModelTop from './src/searchModelTop.vue';
import searchModel from './src/searchModel.vue';
searchModel.install = function(Vue) {
  Vue.component(searchModelTop.name, searchModelTop);
  Vue.component(searchModel.name, searchModel);
}
export default searchModel;

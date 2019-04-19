import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import iview from 'iview'
import router from './router';
import store from './store';
import './global/vueFilter';
import ajaxFun from './fetch/requestFun.js';
import ProjectUtils from './global/ProjectUtils';
// 引入自己写的组件 start
import Button from './components/Button/index.js';
import SearchInput from "./components/searchInput/index.js";
import selectOption from "./components/selectOption/index";
import searchArea from './components/searchArea/index'
import searchModel from './components/searchModel/index'
// import dateRange from './components/dateRange'
import ElSelectName from './global/ElSelectName';
import SearchInputConfig from './global/SearchInputConfig';
Vue.use(ElSelectName);
Vue.use(iview);
Vue.use(SearchInputConfig);
// Vue.component(DtButton.name, DtButton)
Vue.use(Button);
Vue.use(SearchInput);
Vue.use(selectOption);
Vue.use(searchArea);
Vue.use(searchModel);
// import install from './global/install';
// Vue.use(install);
// 引入自己写的组件 end
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Object.assign(Vue.prototype, {
  $http: ajaxFun,
  $projectUtils: ProjectUtils,
  $message: ElementUI.Message,
  $messageBox: ElementUI.MessageBox
});

Vue['config'].productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
});

router.afterEach(route => {
  store.dispatch('routerChange', route)
})

import { baseUrl } from '../config/index'
import axios from 'axios';
import Vue from 'vue';
import Store from '../store'
import qs from 'qs';
import formatParams from '../utils/formatParams';
// import { addCommonParams } from './paramsFormat'
axios.defaults.baseURL = baseUrl;
axios.defaults.timeout = 50000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 全局ajax请求拦截器
// POST传参序列化
axios.interceptors.request.use((config) => {
  config.headers.token = localStorage.getItem('aotoken');
  // config.headers.userid=localStorage.getItem('aoid');
  config.data = {

    userid: localStorage.getItem('aoid'),
    ...config.data
  };

  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  console.log(error);
});
const _closeLoading = () => { Store.dispatch('showLoading', false) };
const _openLoading = () => { Store.dispatch('showLoading', true) };

const fetchs = (url, params = {}, user = true) => {
  params = formatParams(params); // 参数序列化
  if (url !== 'user/login') {
    let aotoken = localStorage.getItem('aotoken');
    let aoid = localStorage.getItem('aoid');
    axios.defaults.headers['Access-Token'] = aotoken;
    axios.defaults.headers['access_token'] = aotoken;
    axios.defaults.headers['check_login'] = aoid;
    // console.log(aotoken)
    // console.log(aoid)
  } else {
    axios.defaults.headers['token'] = '';
    axios.defaults.headers['userid'] = '';
  }
  setTimeout(_openLoading, 0);
  setTimeout(_closeLoading, 30000); // 防止接口报错，后台30s不返回数据，过30s后loading消失
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        setTimeout(_closeLoading, 500);
        let _reData = response.data;
        if (_reData.errcode !== 0) {
          if (_reData.errcode === 400006 || _reData.errcode === 4001) {
            window.location.href = 'index.html';
            return;
          }
          Vue.prototype.$message({
            message: _reData.errmsg,
            type: 'error'
          });
          return;
        }
        resolve(response.data)
      })
      // , err => {
      //   console.log(48, err);
      //   reject(err)
      // })
      .catch((error) => {
        // console.log(52, error);
        Vue.prototype.$message({
          message: '请求出错，可能是网络问题',
          position: 'middle',
          duration: 2000
        });
        reject(error)
      })
  })
}
export default fetchs;

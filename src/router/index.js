import Vue from 'vue';
import Router from 'vue-router';
// import Sign from '../components/Sign.vue'  这种会把所有的东西都在vender里面
// const Login = () => import('../pages/Login.vue') 这样会按需加载
/* eslint func-call-spacing: ["error", "always", { "allowNewlines": true }] */
const Login = () =>
  import ('../pages/Login.vue');
const Home = () =>
  import ('../pages/home/Home.vue');
// 首页
// 设备管理
const DeviceSummary = () =>
  import ('../pages/device/summary.vue');
// const DeviceImport = () =>
//   import ('../pages/device/import.vue');
const DeviceManage = () =>
  import ('../pages/device/manage.vue');
const DeviceUpdate = () =>
  import ('../pages/device/update.vue');
const DeviceVideo = () =>
  import ('../pages/device/video.vue');
// 账号管理
const Admin = () =>
  import ('../pages/admin/admin.vue');
const AdminAgent = () =>
  import ('../pages/admin/agent.vue');
const AdminBackend = () =>
  import ('../pages/admin/backend.vue');
// const AdminFrontend = () =>
//   import ('../pages/admin/frontend.vue');
// const AdminReview = () =>
//   import ('../pages/admin/review.vue');

// 消息提醒与推送
const Push = () =>
  import ('../pages/push/push.vue');
const PushInfoRecord = () =>
  import ('../pages/push/InfoRecord.vue');
const PushRemind = () =>
  import ('../pages/push/remind.vue');
// 订单管理
const Serve = () =>
  import ('../pages/serve/serve.vue');
const ServeHandling = () =>
  import ('../pages/serve/handling.vue');
const ServeSolved = () =>
  import ('../pages/serve/solved.vue');
const ServeWaiting = () =>
  import ('../pages/serve/waiting.vue');
const ServePay = () =>
  import ('../pages/serve/pay.vue');

// 系统日志
const Log = () =>
  import ('../pages/log/log.vue');
const LogAssign = () =>
  import ('../pages/log/assign.vue');
const LogUserInfo = () =>
  import ('../pages/log/userinfo.vue');


import NotFoundComponent from "../pages/NotFoundComponent .vue";
/* eslint func-call-spacing: "off" */
Vue.use(Router);
export default new Router({
  // mode: 'history',
  routes: [
    { path: '*', component: NotFoundComponent },
    { path: '/', name: 'login', component: Login },
    {
      path: '/home',
      name: 'home',
      component: Home,
      title: '设备',
      children: [{
          path: 'summary',
          name: 'device-summary',
          component: DeviceSummary
        },
        {
          path: 'manage',
          name: 'device-manage',
          component: DeviceManage
        },
        // {
        //   path: 'import',
        //   name: 'device-import',
        //   component: DeviceImport
        // },
        {
          path: 'update',
          name: 'device-update',
          component: DeviceUpdate
        },
        {
          path: 'video',
          name: 'device-video',
          component: DeviceVideo
        }
      ],
    },
    // 账号管理
    {
      path: '/admin',
      component: Admin,
      title: '账号管理',
      children: [{
          path: 'backend',
          name: 'admin-backend',
          component: AdminBackend
        },
        {
          path: 'agent',
          name: 'admin-agent',
          component: AdminAgent
        }
      ]
    },
    //信息提醒与推送
    {
      path: '/push',
      component: Push,
      title: '到期提醒与推送',
      children: [{
          path: 'remind',
          name: 'push-remind',
          component: PushRemind
        },
        {
          path: 'infoRecord',
          name: 'push-infoRecord',
          component: PushInfoRecord
        }
      ]
    },
    //交易订单管理
    {
      path: '/serve',
      component: Serve,
      title: '订单管理',
      children: [{
          path: 'waiting',
          name: 'serve-waiting',
          component: ServeWaiting
        },
        {
          path: 'pay',
          name: 'serve-pay',
          component: ServePay
        },
        {
          path: 'handling',
          name: 'serve-handling',
          component: ServeHandling
        },
        {
          path: 'solved',
          name: 'serve-solved',
          component: ServeSolved
        }
      ]
    },
    // 系统日志
    {
      path: '/log',
      component: Log,
      title: '系统日志',
      children: [{
          path: 'userInfo',
          name: 'log-userInfo',
          component: LogUserInfo
        },
        {
          path: 'assign',
          name: 'log-assign',
          component: LogAssign
        }
      ]
    },
  ]
})

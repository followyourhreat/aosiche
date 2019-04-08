净水PC管理后台
====================

## 技术栈

vue2 + vuex + vue-router + webpack + ES6/7 + fetch + sass + flex + svg

## 项目运行

```
SVN： https://192.168.1.126/svn/development/code/web/pc-wanfujingshui

npm install

npm i node-sass sass-loader（额外）

npm run dev (访问线上后台系统)

npm run build (访问本地后台系统)

地区三级联动	基于Cascader 级联选择器

```
## 项目技术说明

```
mixin 对象统一加上 mix 前缀区分

挂在Vue.pototype上的参数统一加上 $ 前缀

ajax 验证方法 this.$validate() 传入的参数统一为对象形式

```
## 第三方插件
#### 1、地区三级联动插件
**基于Element-ui     Cascader 级联选择器** 

##### 数据来源
https://github.com/Plortinus/element-china-area-data

##### 安装

`npm install element-china-area-data -S`

##### 使用

```js
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
```
  2. `regionData`是省市区三级联动数据（不带“全部”选项）
  3. `provinceAndCityDataPlus`是省市区三级联动数据（带“全部”选项）
  4. `regionDataPlus`是省市区三级联动数据（带“全部”选项）
  5. "全部"选项绑定的value是空字符串`""`
  6. `CodeToText`是个大对象，属性是区域码，属性值是汉字 用法例如：`CodeToText['110000']`输出`北京市`
  7. `TextToCode`是个大对象，属性是汉字，属性值是区域码 用法例如：`TextToCode['北京市'].code`输出`110000`,`TextToCode['北京市']['市辖区'].code`输出`110100`,`TextToCode['北京市']['市辖区']['朝阳区'].code`输出`110105`
  
  #### 2、富文本编辑器
  ##### 插件文档地址
 http://www.wangeditor.com/




## 项目布局

```
.
├── build                                       // webpack配置文件
├── config                                     // 项目打包路径
├── elm                                         // 上线项目文件，放在服务器即可正常访问
├── screenshots                                 // 项目截图
├── src                                         // 源码目录
│   ├── components                              // 组件
│   │   ├── common                              // 公共组件
│   │   │   ├── alertTip.vue                    // 弹出框组件
│   │   │   ├── buyCart.vue                     // 购物车组件
│   │   │   ├── computeTime.vue                 // 倒计时组件
│   │   │   ├── loading.vue                     // 页面初始化加载数据的动画组件
│   │   │   ├── mixin.js                        // 组件混合(包括：指令-下拉加载更多，处理图片地址)
│   │   │   ├── ratingStar.vue                  // 评论的五颗星组件
│   │   │   └── shoplist.vue                    // msite和shop页面的餐馆列表公共组件
│   │   ├── footer
│   │   │   └── footGuide.vue                   // 底部公共组件
│   │   └── header
│   │       └── head.vue                        // 头部公共组件
│   ├── config                                  // 基本配置
│   │   ├── env.js                              // 环境切换配置
│   │   ├── fetch.js                            // 获取数据
│   │   ├── mUtils.js                           // 常用的js方法
│   │   └── rem.js                              // px转换rem
│   ├── images                                  // 公共图片
│   ├── page
│   │   ├── balance
│   │   │   ├── balance.vue                     // 余额页
│   │   │   └── children
│   │   │       └── detail.vue                  // 余额说明
│   │   ├── benefit
│   │   │   ├── benefit.vue                     // 红包页
│   │   │   └── children
│   │   │       ├── commend.vue                 // 推荐有奖
│   │   │       ├── coupon.vue                  // 代金券说明
│   │   │       ├── exchange.vue                // 兑换红包
│   │   │       ├── hbDescription.vue           // 红包说明
│   │   │       └── hbHistory.vue               // 历史红包
│   │   ├── city                 
│   │   │   └── city.vue                        // 当前城市页
│   │   ├── confirmOrder
│   │   │   ├── children
│   │   │   │   ├── children
│   │   │   │   │   ├── addAddress.vue          // 添加地址页
│   │   │   │   │   └── children
│   │   │   │   │       └── searchAddress.vue   // 搜索地址页
│   │   │   │   ├── chooseAddress.vue           // 选择地址页
│   │   │   │   ├── invoice.vue                 // 选择发票页
│   │   │   │   ├── payment.vue                 // 付款页
│   │   │   │   ├── remark.vue                  // 订单备注页 
│   │   │   │   └── userValidation.vue          // 用户验证页
│   │   │   └── confirmOrder.vue                // 确认订单页
│   │   ├── download
│   │   │   └── download.vue                    // 下载App
│   │   ├── find
│   │   │   └── find.vue                        // 发现页
│   │   ├── food
│   │   │   └── food.vue                        // 食品筛选排序页
│   │   ├── forget
│   │   │   └── forget.vue                      // 忘记密码，修改密码页
│   │   ├── home
│   │   │   └── home.vue                        // 首页
│   │   ├── login
│   │   │   └── login.vue                       // 登录注册页
│   │   ├── msite
│   │   │   └── msite.vue                       // 商铺列表页
│   │   ├── order
│   │   │   ├── children
│   │   │   │   └── orderDetail.vue             // 订单详情页
│   │   │   └── order.vue                       // 订单列表页
│   │   ├── points
│   │   │   ├── children
│   │   │   │   └── detail.vue                  // 积分说明
│   │   │   └── points.vue                      // 积分页
│   │   ├── profile
│   │   │   ├── children
│   │   │   │   ├── children
│   │   │   │   │   ├── address.vue             // 添加地址
│   │   │   │   │   └── children
│   │   │   │   │       ├── add.vue             // 新增地址
│   │   │   │   │       └── children
│   │   │   │   │           └── addDetail.vue   // 搜索地址
│   │   │   │   ├── info.vue                    // 帐户信息
│   │   │   │   └── setusername.vue             // 重置用户名
│   │   │   └── profile.vue                     // 个人中心
│   │   ├── search
│   │   │   └── search.vue                      // 搜索页
│   │   ├── service
│   │   │   ├── children
│   │   │   │   └── questionDetail.vue          // 问题详情
│   │   │   └── service.vue                     // 服务中心
│   │   ├── shop
│   │   │   ├── children
│   │   │   │   ├── children
│   │   │   │   │   └── shopSafe.vue            // 商铺认证信息页
│   │   │   │   ├── foodDetail.vue              // 商铺信息页
│   │   │   │   └── shopDetail.vue              // 单个商铺信息页
│   │   │   └── shop.vue                        // 商铺筛选页
│   │   └── vipcard
│   │       ├── children
│   │       │   ├── invoiceRecord.vue           // 购买记录
│   │       │   ├── useCart.vue                 // 使用卡号购买
│   │       │   └── vipDescription.vue          // 会员说明
│   │       └── vipcard.vue                     // 会员卡办理页
│   ├── plugins                                 // 引用的插件
│   ├── router
│   │   └── router.js                           // 路由配置
│   ├── service                                 // 数据交互统一调配
│   │   ├── getData.js                          // 获取数据的统一调配文件，对接口进行统一管理
│   │   └── tempdata                            // 开发阶段的临时数据
│   ├── store                                   // vuex的状态管理
│   │   ├── action.js                           // 配置actions
│   │   ├── getters.js                          // 配置getters
│   │   ├── index.js                            // 引用vuex，创建store
│   │   ├── modules                             // store模块
│   │   ├── mutation-types.js                   // 定义常量muations名
│   │   └── mutations.js                        // 配置mutations
│   └── style
│       ├── common.scss                         // 公共样式文件
│       ├── mixin.scss                          // 样式配置文件
│       └── swiper.min.css
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件
.

56 directories, 203 files
```


## 目标功能
- [x] 定位功能 -- 完成
- [x] 选择城市 -- 完成

## 全局样式说明
**为了以后项目可以复用，有些东西必须写成公共样式**
- 字体颜色（主要）
- 表格样式
- input框样式（包括 placehodler）
- 主背景颜色
##### 一、字体颜色



~~~~
主要字体颜色：$wordColor:""
~~~~


### 事件统一：
- 'topSearchActive':头部查询
- 'topAddActive':头部添加
- 'topDeleteActive':头部删除
- 'searchAreaChange':头部地址变化事件
- 'slideAreaChange':侧滑页面地址变化事件
- 'slideAreaDefault':侧滑页面地址默认数据
- 'checkAllItemActive':表格全选
- 'checkItemActive':表格单选
- 'tableEditActive':表格编辑
- 'tableDeleteActive':表格删除
- 'getRefs':获取侧滑refs
- 'setRefsEmpty':设置ref为空
- 'editSlide':编辑重置

### slideRef 统一名称
- deviceNameSlideRef：  设备名称
- deviceBrandSlideRef： 设备品牌
- deviceSeriesSlideRef：设备系列
- deviceModleSlideRef：设备型号
- addressSlideRef：详细地址
- fullNameSlideRef：用户姓名
- mobileSlideRef：手机号码
- userNameSlideRef：账号
- passwordSlideRef：密码
- positionSlideRef：公司职务
- companyNameSlideRef：公司名称
- emailSlideRef：邮箱
- roleTypeSlideRef：角色类型
- agentLevelSlideRef：代理商所属等级
- templateNameSlideRef：模板名称
- infoTitleSlideRef：信息标题
- msgTypeSlideRef：信息类型
- msgConSlideRef：信息内容
- msgLinkSlideRef：信息链接
- emailSlideRef：邮箱
- emailSlideRef：邮箱
- emailSlideRef：邮箱
- emailSlideRef：邮箱

### searchRef 统一名称
- userNameSearchRef：账号
- fullNameSearchRef：姓名
- telSearchRef：手机号码
- alarmTypeSearchRef：报警类型
- networkStatusSearchRef：网络状态
- deviceIdSearchRef：设备ID

### 注意事项
- 组件内的功能函数放在下面
- paginationChangeActive  翻页方法

### 账号
1、lsy 13828758660
1、lsy2 13828758660


**修改：2018-03-01 周六**

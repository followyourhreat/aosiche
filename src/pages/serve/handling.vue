<template>
  <div calss="serve-waiting-outer">
    <div class="dt-search-top">
     <!-- 服务单号 -->
      <dt-search-input  ref="serviceIdSearchRef" :inputWidth='$SearchInputConfig.serviceNumber.width' :title="$SearchInputConfig.serviceNumber.title" :placeholder ='$SearchInputConfig.serviceNumber.placeholder' :maxLength = '$SearchInputConfig.serviceNumber.length' defaultValue = ''></dt-search-input>

      <!-- 服务分类 -->
      <dt-select-option ref='sericeCategorySearchRef' :optiosTitle='$ElSelectName.serviceCategory.title' :optionsName ='$ElSelectName.serviceCategory.name' :conWidth = '$ElSelectName.serviceCategory.width'></dt-select-option>

      <!-- 问题分类 -->
      <dt-select-option ref='questionCategorySearchRef' :optiosTitle='$ElSelectName.questionCategory.title' :optionsName ='$ElSelectName.questionCategory.name' :conWidth = '$ElSelectName.questionCategory.width'></dt-select-option>

      <!-- 地区 -->
      <dt-search-area @areaUpdate='topAreaChange'></dt-search-area>

      <!-- 服务人员 -->
      <dt-select-option-dynamic ref='servicerSearchRef' conWidth = '140' optiosTitle='服务人员' :optionsData ='dispactchDataDataultTop' defaultValue = ''></dt-select-option-dynamic>

      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive">查 询</button>
      </div>
    </div>

    <!-- 表格 start -->
    <div class="dt-table-outer">
      <div class="dt-table-true-wrap">
        <table class="dt-table-same" cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th class="tw-service-number">服务单号</th>
                <th class="tw-service-type">服务类型</th>
                <th class="tw-question-category">问题分类</th>
                <th class="tw-time-ss">申请时间</th>
                <th class="tw-time-ss">派单时间</th>
                <th class="">服务人员</th>
                <th class="tw-device-brand">设备品牌</th>
                <th class="tw-device-series">设备系列</th>
                <th class="tw-device-model">设备型号</th>
                <th class="tw-province">所在省份</th>
                <th class="tw-city">所在城市</th>
                <th class="tw-district">所在地区</th>
                <th class="tw-handle-edit">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in listArr" :key="index">
                <td>{{item.service_id}}</td>
                <td>{{item.service_type|FilterServiceType}}</td>
                <td>{{item.query_type|FilterQuestionCategory}}</td>
                <td>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                <td>{{item.server_start_time*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                <td>{{item.server_name||'--'}}</td>
                <td>{{item.brand||'--'}}</td>
                <td>{{item.series||'--'}}</td>
                <td>{{item.model||'--'}}</td>
                <td>{{item.province}}</td>
                <td>{{item.city}}</td>
                <td>{{item.district}}</td>
                <td class="dt-table-edit">
                  <b @click="tableEditActive(item)">编辑</b>
                  <b class="dt-table-detele" @click="handleDelete(item)">撤销</b>
                </td>
              </tr>
            </tbody>
        </table>
        <div class="no-data-tip" v-if="!listArr.length">暂无数据</div>
      </div>
      <div class="dt-page-wrap">
        <el-pagination class="dt-page-reset"  :page-size="10"  @current-change="paginationChangeActive" :current-page.sync="pageNumber" layout="total, prev, pager, next, jumper" :total="listTotal">
        </el-pagination>
      </div>
    </div>
    <!-- 表格 end -->

    <!-- 侧滑start -->
      <dt-slide-page slideTitle='派单处理' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul class="order-ul">
          <!-- 模板名称 -->
          <li class="order-li-info order-li-title">
            <label>申请时间</label><label>服务类型</label><label>问题类型</label>
          </li>
          <li class="order-li-info">
            <label>{{serviceDetailInfo.utime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</label>
            <label>{{serviceDetailInfo.service_type|FilterServiceType}}</label>
            <label>{{serviceDetailInfo.query_type|FilterQuestionCategory}}</label>
          </li>

          <li class="order-li-info order-li-title">
            <label>客户姓名</label><label>联系电话</label><label>客户地址</label>
          </li>
          <li class="order-li-info">
            <label>{{serviceDetailInfo.nickname}}</label>
            <label>{{serviceDetailInfo.mobile}}</label>
            <label>{{serviceDetailInfo.province + serviceDetailInfo.city + serviceDetailInfo.district}}</label>
          </li>

          <li class="order-show-li">
            <div class="order-show-wrap">
              <h6>其他要求</h6>
              <!-- <div class="od-con"> {{serviceDetailInfo.description}} </div> -->
              <div class="od-con od-con-img">
                <section>{{serviceDetailInfo.description}} </section>
                <div class="img">
                  <label v-if="serviceDetailInfo.images" v-for="imgSrc in serviceDetailInfo.images">
                    <img @mouseenter = "imgMouseIn(imgSrc)" @mouseleave = "imgShowBig = false" :src="imgSrc" alt="">
                  </label>
                  <transition name="fade" mode="out-in">
                    <label v-if="imgShowBig" :class="{'img-bigger': 1 === 1}"><img :src="imgSrcBig" alt=""></label>
                  </transition>
                </div>
              </div>
            </div>
          </li>

          <li class="order-show-li" v-show="false">
            <div class="order-show-wrap">
              <h6>派单记录</h6>
              <div class="od-con od-con-record">
                <p v-for="(item, index) in recoredListArr" :key="index">
                  <span>
                      <b>{{item.role_type|FilterServicerType}}：{{item.fullname}}</b>
                      <b>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</b>
                  </span>
                  <span>{{item.state|FilterOrderReceiveState}}</span>
                </p>
                <div class="no-data-tip" v-show="!recoredListArr.length">暂无数据</div>
              </div>
            </div>
          </li>

          <!-- 派单处理(派单) -->
          <li>
            <dt-select-option-dynamic ref='servicerSlideRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.dispatchOrder.title' :optionsData ='dispactchDataDatault'></dt-select-option-dynamic>
          </li>

          <!-- 派单时间 -->
          <li>
            <div class="dt-search-cell">
              <i class="dt-search-title">派单时间：</i>
              <span class="dt-search-con" style="width: 400px;">
                {{serviceDetailInfo.server_start_time*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}
              </span>
            </div>
          </li>

        </ul>

        <div class="slide-btn-wrap">
          <button class="dt-btn" @click="slideSureActive">确定</button>
          <button class="dt-btn dt-btn-cancel" @click="slideShow = false">取消</button>
        </div>
      </dt-slide-page>
      <!-- 侧滑 end -->

  </div>
</template>

<script>
import { dtSearchTextarea, dtSlidePage, dtSelectOptionDynamic } from '../../global/searchComponents';
import { SlidePageConfig } from "../../global/constant.js"
import dateForm from '../../utils/dateFormat';
import { topSearchActive, paginationChangeActive, topAreaChange } from "../../global/mixin.js";
export default {
  mixins: [topSearchActive, paginationChangeActive, topAreaChange],
  data: () => ({
    SlidePageConfig,
    isEditSlideFlag: false,
    slideShow: false, // 查看订单
    slideShow2: false, // 审核
    pageNumber: 1,
    listArr: [],
    listTotal: 0,
    slideSubmitId: 0,
    searchAreaData: ['0', '0', '0'],
    dispactchDataDataultTop: [],
    dispactchDataDatault: [],
    serviceHandleStatusFlag: 0,
    dispatchListArr: [],
    checkListArr: [],
    recoredListArr: [],
    imgShowBig: false,
    serviceDetailInfo: {},
    orderSteps: {
      tree: [
        {title: '申请安装', description: ''},
        {title: '后台确认', description: ''},
        {title: '派单成功', description: ''},
        {title: '预约上门时间', description: '预约时间：2017-12-13 10:10:10，上门安装时间：2017-12-13 10:10:10'},
        {title: '服务中', description: '2017-11-15  20:00'},
        {title: '服务完成', description: '2017-11-15  20:00'},
        {title: '客户评价', description: '2017-11-15  20:00'},
        {title: '订单完成', description: '2017-11-15  20:00'}
      ],
      active: 5
    }
  }),
  mounted() {
    // this.getMainList(this.getUrlData());
    // // 获取服务人员列表
    // this.$http.FaultRepairGetServers({}, msg => {
    //   this.dispactchDataDataultTop = msg.data.map(val => ({value: val.server_id, label: val.name}));
    //   this.dispactchDataDatault = msg.data.map(val => ({value: val.server_id, label: val.name + '/' + val.province + val.city + val.district}));
    // });
  },
  methods: {
    // 获取列表求参数方法
    getUrlData() {
      return {
        'complete': 2,
        'page': this.pageNumber,
        'service_id': this.$refs.serviceIdSearchRef.value,
        'service_type': this.$refs.sericeCategorySearchRef.value,
        'query_type': this.$refs.questionCategorySearchRef.value,
        'server_id': this.$refs.servicerSearchRef.value,
        'province_code': this.searchAreaData[0],
        'city_code': this.searchAreaData[1],
        'district_code': this.searchAreaData[2]
      }
    },
    getMainList(params) {
      this.$http.FaultRepairGetServiceList(params, msg => {
        let _msg = msg.data;
        this.listArr = _msg.list;
        this.listTotal = Number(_msg.total);
      });
    },
    tableEditActive(item) {
       // 获取订单详情
      this.$http.FaultRepairGetDetails({service_id: item.service_id}, msg => {
        this.serviceDetailInfo = Object.assign({}, msg.data, {id: item.id});
        this.$refs.servicerSlideRef.value = this.serviceDetailInfo.server_id;
      });
      // // 获取派单记录
      // this.$http.FaultRepairGetDispatchList({service_id: item.service_id}, msg => {
      //   this.recoredListArr = msg.data.list;
      // });
      this.slideShow = true;
    },
    slideSureActive() {
      var _urlData = {
        'id': this.serviceDetailInfo.id,
        'server_ids': this.$refs.servicerSlideRef.value
      };
      this.$http.FaultRepairServiceSendOut(_urlData, msg => {
        this.slideShow = false;
        this.getMainList(this.getUrlData());
      });
    },
    searchAreaChange(value) {
      let _changeArea = this.$projectUtils.AreaDateChange(value);
      this.searchAreaData[0] = _changeArea.code[0];
      this.searchAreaData[1] = _changeArea.code[1];
      this.searchAreaData[2] = _changeArea.code[2];
    },
    editSlide(msg) {
      let _msg = msg;
      // input 赋值
      this.$refs.servicerSlideRef.value = '';
      this.$refs.emergencySlideRef.value = _msg.emergency;
    },
    getServiceDetails(id) { // 获取服务详情
      this.$http.FaultRepairGetDetails(id, msg => {
        let _msg = msg.data;
        this.serviceDetailInfo = _msg;
        this.editSlide(_msg);
      })
    },
    getDispatchList(id) { // 获取派单记录
      this.$http.FaultRepairGetDispatchList(id, msg => {
        let _msg = msg.data;
        this.recoredListArr = _msg.list;
      })
    },
    getServersList(serviceId, districtCode) { // Fault_repair - 获取服务详情
      this.$http.FaultRepairGetServers(serviceId, districtCode, msg => {
        let _msg = msg;
        let _arr = []
        _msg.data.forEach(val => {
          _arr.push({
            value: val.id,
            label: val.fullname
          })
        });
        this.dispactchDataDatault = _arr;
      })
    },
    getCheckList(id) { // 获取审核记录
      this.$http.FaultRepairGetCheckList(id, msg => {
        let _msg = msg.data;
        this.checkListArr = _msg.list;
      })
    },
    getServiceTree(serviceId) { // 获取服务流程图
      this.$http.FaultRepairGetServiceTree(serviceId, msg => {
        let _msg = msg.data;
        _msg.forEach(val => {
          let _val = val;
          let _step = Number(_val.step) - 1;
          if (Number(_val.mark)) {
            this.orderSteps.active = _step + 1;
          } else {
            this.orderSteps.active = _step;
          }
          if (_step === 2) {
            let _remarkArr = _val.remark.split('#$#');
            let _name = _remarkArr[0] || '';
            let _position = _remarkArr[1] || '';
            let _tel = _remarkArr[2] || '';
            this.orderSteps.tree[_step].description = `${_position}：${_name}（${_tel}）。派单时间：${dateForm(new Date(_val.ctime * 1000), 'yyyy-MM-dd hh:mm:ss')}`;
            if (Number(_val.mark) === 0) {
              this.orderSteps.tree[_step].title = '派单中';
            } else {
              this.orderSteps.tree[_step].title = '派单成功';
            }
          } else if (_step === 3) {
            this.orderSteps.tree[_step].description = `预约时间：2017-12-13 10:10:10，上门时间：2017-12-13 10:10:10`;
          } else {
            this.orderSteps.tree[_step].description = `${dateForm(new Date(_val.ctime * 1000), 'yyyy-MM-dd hh:mm:ss')}`;
          }
        })
      })
    },
    handleDelete(item) {
      this.$projectUtils.ConfirmTip('确定撤销？', msg => {
        this.$http.FaultRepairDelServers({id: item.id}, msg => {
          this.getMainList(this.getUrlData());
        })
      })
    },
    imgMouseIn(imgSrc) {
      this.imgShowBig = true;
      this.imgSrcBig = imgSrc;
    }
  },
  components: {
    dtSlidePage,
    dtSearchTextarea,
    dtSelectOptionDynamic
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/constant.style.scss';
.order-ul{
  width: 500px;
  .order-li-info{
    display: flex;
    line-height: 20px;
    font-size: $size-three;
    &.order-li-title{
      margin-bottom:0px;
      label{
        color: #B3B3B3;
        font-size: $size-two;
      }
    }
    label:nth-of-type(1){
      width: 180px;
    }

    label:nth-of-type(2){
      width: 126px;
    }

    label:nth-of-type(3){
      flex: 1;
    }
  }
}
.order-show-li{
  .order-show-wrap{
    height: 170px;
    border: 1px solid #DDDDDD;
    h6{
      padding-left: 16px;
      height: 40px;
      line-height: 40px;
    }
    .od-con{
      padding: 8px 16px;
      border-top: 1px solid #DDDDDD;
      height: 130px;
      line-height: 20px;
      overflow-y: auto;
      &.od-con-img{
        // display: flex;
        // position: relative;
        // section{
        //   flex: 1;
        // }
        .img{
          display: flex;
          position: relative;
        }
        label{
          width: 140px;
          line-height: 112px;
          text-align: center;
          img{
            width: 60%;
            max-height: 100%;
            vertical-align: middle;
            cursor: pointer;
          }
        }
        .img-bigger{
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 700px;
          height: 700px;
          z-index: 1000;
        }
      }
    }
    .od-con-record p{
      height: 50px;
      line-height: 50px;
      display: flex;
      span:nth-of-type(1){
        flex: 1;
        b{
          display: block;
          line-height: 20px;
          height: 20px;
        }
        b:nth-of-type(1){
          margin-top: 5px;
        }
        b:nth-of-type(2){
          font-size: $size-one;
          color: #999;
        }
      }
      span:nth-of-type(2){
        width: 80px;
        text-align: center;
      }
    }
  }
}
.order-process{
  .el-steps--vertical{
    width: 100%;
  }
}
.time-out{
   background: red;
   color: #FFF;
}
</style>


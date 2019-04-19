<template>
  <div calss="serve-waiting-outer">
    <div class="dt-search-top">

      <!--代理商-->
      <dt-search-input  ref="agent" :inputWidth='$SearchInputConfig.agent.width' :title="$SearchInputConfig.agent.title" :placeholder ='$SearchInputConfig.agent.placeholder' :maxLength = '$SearchInputConfig.agent.length' defaultValue = ''></dt-search-input>

      <dt-search-input  ref="handleTypeRef" :inputWidth='$SearchInputConfig.serviceNumber.width' :title="$SearchInputConfig.serviceNumber.title" :placeholder ='$SearchInputConfig.serviceNumber.placeholder' :maxLength = '$SearchInputConfig.serviceNumber.length' defaultValue = ''></dt-search-input>

      <dt-date-range title='操作时间' @startDateChange='startDateSearchChange' @endDateChange='endDateSearchChange'></dt-date-range>


      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-search" @click="find">查 询</button>
      </div>
    </div>

    <!-- 表格 start -->
    <div class="dt-table-outer">
      <div class="dt-table-true-wrap">
        <table class="dt-table-same" cellspacing="0" cellpadding="0">
          <thead>
          <tr class="">
            <th class="tw-service-number">序号</th>
            <th class="tw-service-number">服务单号</th>
            <!--<th class="tw-service-type">服务类型</th>-->
            <th class="tw-question-category">充值金额</th>
            <th class="tw-question-category">数量</th>
            <th class="tw-question-category">单价</th>
            <th class="tw-time-ss">请求时间</th>
            <th class="tw-device-brand">代理商</th>
            <!--<th class="tw-device-model">设备MAC</th>-->
            <!--<th class="tw-device-series">设备系列</th>-->
            <!--<th class="tw-province">所在省份</th>-->
            <!--<th class="tw-city">所在城市</th>-->
            <!--<th class="tw-district">所在地区</th>-->
            <th class="tw-handle-edit">状态</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in listArr" :key="index">
            <!--<td class="dt-table-check" :class="{'dt-table-checked': item.checked}" @click="checkItemActive(item)"></td>-->
            <td>{{index+1}}</td>
            <td>{{item.order_id}}</td>
            <!--<td>{{item.service_type|FilterServiceType}}</td>-->
            <td>{{item.money}}</td>
            <td>{{item.buy}}</td>
            <td>{{item.price}}</td>
            <td>{{item.paytime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
            <td>{{item.agent||'--'}}</td>
            <!--<td>{{item.series||'&#45;&#45;'}}</td>-->
            <!--<td>{{item.model||'&#45;&#45;'}}</td>-->
            <!--<td>{{item.province}}</td>-->
            <!--<td>{{item.city}}</td>-->
            <!--<td>{{item.district}}</td>-->
            <td class="dt-table-edit">
              <!--<b @click="tableEditActive(item)" v-if="showshenhe">审核</b>-->
              <!--<b v-else>不可支付</b>-->

              <span>支付成功</span>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="no-data-tip" v-if="!listArr.length">暂无数据</div>
      </div>
      <div class="dt-page-wrap" v-if="showfenye">
        <el-pagination class="dt-page-reset" :page-size="12"  @current-change="jumps" :current-page.sync="pageNumber" layout="total, prev, pager, next, jumper" :total="listTotal">
        </el-pagination>
      </div>
    </div>
    <!-- 表格 end -->


    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>是否通过？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="pass(4)">不通过</el-button>
    <el-button type="primary" @click="pass(1)">通 过</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import { dtDateRange } from '../../global/searchComponents';

  import { dtSearchTextarea, dtSlidePage, dtSelectOptionDynamic } from '../../global/searchComponents';
  import { SlidePageConfig } from "../../global/constant.js";
  import { topSearchActive, paginationChangeActive, topAreaChange, checkAllItemActive, checkItemActive ,dateSearchChange} from "../../global/mixin.js";
  //import { topSearchActive, paginationChangeActive, dateSearchChange } from '../../global/mixin.js';
  export default {
    mixins: [topSearchActive, paginationChangeActive, topAreaChange, checkAllItemActive, checkItemActive,dateSearchChange],
    data: () => ({
      SlidePageConfig,
      allItemChecked: false,
      serverIds: '',
      pageNumber: 1,
      prePage: 1,
      isEditSlideFlag: false,
      slideShow: false,
      imgShowBig: false,


      slideSubmitId: 0,

      dispactchDataDatault: [],
      serviceHandleStatusFlag: 0,
      dispatchListArr: [],
      checkListArr: [],
      recoredListArr: [],
      serviceDetailInfo: {},


//    bb:["110000","110100","110102"],
      centerDialogVisible:false,


      listArr: [],
      listTotal: 0,
      searchAreaData: ['0', '0', '0'],
      params:{
        id:this.id,
        account:this.account,
        state:2,
        agent:"",
        start:"",
        end:"",
        current_page:1,
//      province:"",
//      city:"",
//      district:""


      },
      showshenhe:false,
      //审核传输数据
      obj:{
        id:"",
        state:"",

      },
      searchDate: {
        start: '',
        end: ''
      },
      power:[],
      showfenye:true
    }),
    mounted() {
      this.params.id=localStorage.getItem('aoid')
      this.power=localStorage.getItem('power')
      if(this.params.id==1||this.power.indexOf(5)!=-1){
        this.showshenhe=true
      }
      this.params.account=localStorage.getItem('accountnum')
      this.getorderall(this.params)
    },
    methods: {
      // 组件内的功能函数
      //获取搜索待审核订单
      getorderall(params) {
        this.$http.Orderall(params, msg => {
          this.listArr = msg.data.data;
          this.listTotal=msg.data.sum_data

        });
      },

      //跳转
      jumps(val){
//      this.params.province=this.searchAreaData[0]
//      this.params.city=this.searchAreaData[1]
//      this.params.district=this.searchAreaData[2]
        this.params.current_page=val;
        var start =new Date(this.searchDate.start.replace(/\-/g,"/"))
        this.params.start = start.getTime()/1000;
        var end =new Date(this.searchDate.end.replace(/\-/g,"/"))
        this.params.end = (end.getTime()/1000)+86400;
        if(isNaN( this.params.start)){
          this.params.start=""
        }
        if(isNaN(this.params.end)){
          this.params.end=""
        }
        this.params.order_id=this.$refs.handleTypeRef.value,
        this.params.agent=this.$refs.agent.value
        this.$http.Orderall(this.params,msg => {
          if(msg.errcode==400010){
            this.listArr=""
          }else if(msg.errmsg=="数据为空"){
            this.listArr=[]
            this.listTotal=0

          }else{
            this.listArr=msg.data.data
            this.listTotal=msg.data.sum_data
          }
          return false
        });

      },
      //查询
//      find(){
////      this.params.province=this.searchAreaData[0]
////      this.params.city=this.searchAreaData[1]
////      this.params.district=this.searchAreaData[2]
//        var start =new Date(this.searchDate.start.replace(/\-/g,"/"))
//        this.params.start = start.getTime()/1000;
//        var end =new Date(this.searchDate.end.replace(/\-/g,"/"))
//        this.params.end = end.getTime()/1000;
//        if(isNaN( this.params.start)){
//          this.params.start=""
//        }
//        if(isNaN(this.params.end)){
//          this.params.end=""
//        }
//        this.params.agent=this.$refs.agent.value
//        if(this.params.currentPage!=1){
//          this.params.currentPage=1
//        }else{
//          this.$http.Orderall(this.params,msg => {
//
//            this.listArr=msg.data.data
//            this.listTotal=msg.data.sum_data
//
//            return false
//
//          });
//        }
//
//      },

      //查询
      find() {
        if(this.params.current_page==1){
          const that = this
          this.params.current_page=1;
          var start =new Date(this.searchDate.start.replace(/\-/g,"/"))
          this.params.start = start.getTime()/1000;
          var end =new Date(this.searchDate.end.replace(/\-/g,"/"))
          this.params.end = (end.getTime()/1000)+86400;
          if(isNaN( this.params.start)){
            this.params.start=""
          }
          if(isNaN(this.params.end)){
            this.params.end=""
          }
          this.params.order_id=this.$refs.handleTypeRef.value,
          this.params.agent=this.$refs.agent.value
          this.$http.Orderall(this.params,msg => {
            if(msg.errcode==400010){
              this.listArr=""
            }else if(msg.errmsg=="数据为空"){
              this.listArr=[]
              this.listTotal=0

            }else{
              this.listArr=msg.data.data
              this.listTotal=msg.data.sum_data
            }
            return false
          });

        }else{
          this.pageNumber=1
        }

      },
      //审核是否通过
      pass(val){
        this.obj.state=val

        this.$http.audit(this.obj,msg => {
          this.centerDialogVisible=false
          this.jumps(1)

          return false

        });
      },
      tableEditActive(item) {
        this.obj.id=item.id
        this.centerDialogVisible=true
      },

      slideSureActive() {

      },

    },
    components: {
      dtSlidePage,
      dtSearchTextarea,
      dtSelectOptionDynamic,
      dtDateRange,

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
</style>


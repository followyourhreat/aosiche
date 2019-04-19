<script src="../../../../apiUrl.js"></script>
<template>
  <div calss="serve-waiting-outer">
    <div class="dt-search-top">

      <!--代理商-->
      <dt-search-input  ref="agent" :inputWidth='$SearchInputConfig.agent.width' :title="$SearchInputConfig.agent.title" :placeholder ='$SearchInputConfig.agent.placeholder' :maxLength = '$SearchInputConfig.agent.length' defaultValue = ''></dt-search-input>
      <dt-search-input  ref="handleTypeRef" :inputWidth='$SearchInputConfig.serviceNumber.width' :title="$SearchInputConfig.serviceNumber.title" :placeholder ='$SearchInputConfig.serviceNumber.placeholder' :maxLength = '$SearchInputConfig.serviceNumber.length' defaultValue = ''></dt-search-input>


      <!-- <dt-date-range title='操作时间' @startDateChange='startDateSearchChange' @endDateChange='endDateSearchChange'></dt-date-range> -->


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
            <th class="tw-handle-edit">操作</th>
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
            <td>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
            <td>{{item.agent||'--'}}</td>
            <!--<td>{{item.series||'&#45;&#45;'}}</td>-->
            <!--<td>{{item.model||'&#45;&#45;'}}</td>-->
            <!--<td>{{item.province}}</td>-->
            <!--<td>{{item.city}}</td>-->
            <!--<td>{{item.district}}</td>-->
            <td class="dt-table-edit">
              <b @click="topay(item)">待支付</b>

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
    <!--支付弹窗-->
    <el-dialog
      title="请使用微信扫一扫支付订单"
      :visible.sync="payshow"
      width="25%"
      center
      :before-close="handleClose"
    >
     <img :src="payimg" class="pay_img">
      <span slot="footer" class="dialog-footer">
    <el-button @click="quxiao">取 消</el-button>
    <!--<el-button type="primary" @click="sure_pay">确 定</el-button>-->
  </span>
    </el-dialog>


  </div>
</template>

<script>
  import axios from 'axios';
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
      payshow:false,//支付弹窗是否显示
      centerDialogVisible:false,


      listArr: [],
      listTotal: 0,
      searchAreaData: ['0', '0', '0'],
      params:{
        id:this.id,
        account:this.account,
        state:1,
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
//      支付数据
      payobj:{
        id:"",
        uid:"",
        buy:"",
        money:""
      },
      payimg:"",
      interval:"",
      showfenye:true
    }),
    mounted() {



      var arr="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG8AAABvAQMAAADYCwwjAAAABlBMVEX///8AAABVwtN+AAABH0lE\r\nQVQ4jdXTO47EIAwGYKMU7sgFkLgGHVeauUAeFyBXouMaSFyA6ShQvM5Iu6stNqYdlCIfUhT/YAN8\r\n4pqJDrKvOBFlkRqmgPCMZYMB+rJHo2g62hA3zM9WBhkwL24aIvALbe63yBty3uAKPz/xb3jtRPPn\r\nMP/n3OyRunb2xCwz5QXyTKV6mSqVV6OKlppMjeY6H2dUApEq2qPZgGUfIGDnFMFTdVmkSpwUVurL\r\nAOeWVTQPMHMCkRqp+q7R7jGL5Jhry4vnI5LJ9VPkz/l3MsHxNXEf2ooyr9uP9nR0gswrBVjuQO1l\r\ncsduHtZYjijzml9nwGeNA7xGsj+QKA1xb/mBZm1DDByWWxEHyFX5UoEnAkS+59ee0NV3/Bt+3voC\r\n86v1HE83F88AAAAASUVORK5CYII=\r\n"
      console.log(arr.replace(/\r\n-/g,""))

      this.params.id=localStorage.getItem('aoid')

      this.params.account=localStorage.getItem('accountnum')
      this.getorderall(this.params)
    },
    methods: {
      // 组件内的功能函数

      //取消定时器以及弹窗
      quxiao(){
        const that=this
        this.payshow=false
        clearInterval(this.interval)
      },
      handleClose(){
        this.payshow=false
        clearInterval(this.interval)
      },
      //獲取所有待審核訂單
      getorderall(params) {
        console.log(999)
        this.$http.Orderall(params, msg => {
          this.listArr = msg.data.data;
          this.listTotal=msg.data.sum_data

        });
      },

      //跳转
      jumps(val){
        this.params.current_page=val;
        var start =new Date(this.searchDate.start.replace(/\-/g,"/"))
        this.params.start = start.getTime()/1000;
        var end =new Date(this.searchDate.end.replace(/\-/g,"/"))
        this.params.end = end.getTime()/1000;
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
            this.listTotal=msg.data.sum_data
            this.listArr=msg.data.data
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

      find(){
        const that =this
        if(this.params.current_page==1){
        const search={
          id:localStorage.getItem('aoid'),
          state:1,
          account:this.params.account,
          agent:this.$refs.agent.value,
          order_id:this.$refs.handleTypeRef.value,
        }
//
//        var start =new Date(this.searchDate.start.replace(/\-/g,"/"))
//
//        search.start = start.getTime()/1000;
//        var end =new Date(this.searchDate.end.replace(/\-/g,"/"))
//        search.end = end.getTime()/1000;
//        if(isNaN(  search.start)){
//          search.start=""
//        }
//        if(isNaN( search.end)){
//          search.end=""
//        }
//
//
//        if(search.start==""&&search.end!=""){
//          this.$message({
//            message: "请选择开始时间",
//            type: 'warning'
//          });
//          return false
//        }
//        if(search.end==""&&search.start!=""){
//          this.$message({
//            message: "请选择结束时间",
//            type: 'warning'
//          });
//          return false
//        }

          console.log(search)
          this.$http.Orderall(search,msg => {
            if(msg.errcode==400010){
              this.listArr=""
            }else if(msg.errmsg=="数据为空"){
              this.listArr=[]
              this.listTotal=0

            }else{
              this.listTotal=msg.data.sum_data
              this.listArr=msg.data.data
            }




            // that.showfenye=false
            return false


          });

        }else{
          this.pageNumber=1
        }

//      this.params.agent=this.$refs.agent.value
//      if(this.params.currentPage!=1){
//        this.params.currentPage=1
//      }else{
//        this.$http.getorder(search,msg => {
//
//
//          this.listArr=msg.data.data
////          this.listTotal=msg.data.sum_data
//
//          return false
//
//        });
//      }

      },
      //审核是否通过
//      pass(val){
//        this.obj.state=val
//
//        this.$http.audit(this.obj,msg => {
//          this.centerDialogVisible=false
//
//          return false
//
//        });
//      },
//      tableEditActive(item) {
//        this.obj.id=item.id
////        this.centerDialogVisible=true
//      },



      //支付
      topay(val){
        const that=this
        console.log(val)
        this.payobj.id=val.id;
        this.payobj.uid=val.uid;
        this.payobj.buy=val.buy;
        this.payobj.money=val.money
        this.$http.orderpay(this.payobj,msg => {
          this.payimg=msg.data.replace(/\r\n-/g,"");
          this.payshow=true
          this.interval= setInterval(function () {

            that.$http.polls({id:that.payobj.id},msg => {

              if(msg.errcode=="0"){

                clearInterval(that.interval)
                that.$message({
                  message: '支付成功',
                  type: 'success'
                });
                that.payshow=false
                that.jumps(that.params.current_page)
              }else{


              }


            })


          },1000)


        });
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
  .pay_img{
    width: 60%;
    /*height: 0%;*/
    display: block;
    margin: 0px auto;

  }
.el-dialog__body{
    padding: 0 !important;

  }
</style>


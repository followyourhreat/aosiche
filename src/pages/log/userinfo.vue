<template>
  <div class="push-record">
    <div class="dt-search-top">
      <!-- 登录时间 -->

      <dt-date-range title='操作时间' @startDateChange='startDateSearchChange' @endDateChange='endDateSearchChange'></dt-date-range>

      <!-- 服务单号 -->
        <!--操作人-->
      <dt-search-input ref="handlePersonRef" :input-width="$SearchInputConfig.handlePerson.width" :title="$SearchInputConfig.handlePerson.title" :placeholder="$SearchInputConfig.handlePerson.placeholder" :max-length="$SearchInputConfig.handlePerson.length" default-value=""></dt-search-input>
      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-search" @click="find">查 询</button>
      </div>
    </div>
    <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th>序号</th>
                    <!--<th>操作模块</th>-->
                    <!--<th>操作类型</th>-->
                    <th>操作帐号</th>
                    <th>操作人员</th>
                    <th>操作时间</th>
                    <th>登录Ip</th>
                    <th>登录地址</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <td>{{index+1}}</td>
                  <!--<td>{{item.fullname}}</td>-->
                  <!--<td>{{item.mobile}}</td>-->
                  <td>{{item.phone }}</td>
                  <td>{{item.account}}</td>
                  <td>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                  <td>{{item.ip}}</td>
                  <td>{{item.region}}</td>
                </tr>
              </tbody>
          </table>
          <div class="no-data-tip" v-if="!listArr.length">暂无数据</div>
        </div>
        <div class="dt-page-wrap" v-if="showfenye">
          <el-pagination background class="dt-page-reset" :page-size="12"    @current-change="jumps" :current-page="currentPage" layout="total, prev, pager, next, jumper" :total="listTotal">

          </el-pagination>
        </div>
      </div>
      <!-- 表格 end -->

  </div>
</template>

<script>
import { dtDateRange } from '../../global/searchComponents';
// import dateFormat from "../../utils/dateFormat";
import { topSearchActive, paginationChangeActive, dateSearchChange } from '../../global/mixin.js'
export default {
  mixins: [topSearchActive, paginationChangeActive, dateSearchChange],
  data() {
    return {
      currentPage: 1,
      pageNumber: 1,
      listArr: [],
      listTotal: 0,
      searchDate: {
        start: '',
        end: ''
      },
      showfenye:true
    }
  },
  mounted() {
    // this.getMainList(this.getUrlData());
    this.logall()
  },
  methods: {
    jumps(val,aa){
      this.currentPage=val

      var start =new Date(this.searchDate.start.replace(/\-/g,"/"))
      var startdate = start.getTime()/1000;

      var end =new Date(this.searchDate.end.replace(/\-/g,"/"))
      var enddate = end.getTime()/1000;
      if(isNaN(startdate)){
        startdate=""
      }
      if(isNaN(enddate)){
        enddate=""
      }
      const params={
        current_page:val,
        start:startdate,
        end:enddate,
        account:this.$refs.handlePersonRef.value
      }
      this.$http.logall(params,msg => {

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

    logall(){
      const params={
        current_page:this.currentPage
      }
      this.$http.logall(params,msg => {
        this.listArr=msg.data.data
        this.listTotal=msg.data.sum_data
        console.log( this.listArr)

      });
    },
    find(){
      if(this.currentPage!=1){
        this.currentPage=1
      }else{
        var start =new Date(this.searchDate.start.replace(/\-/g,"/"))
        var startdate = start.getTime()/1000;

        var end =new Date(this.searchDate.end.replace(/\-/g,"/"))
        var enddate = end.getTime()/1000;
        if(isNaN(startdate)){
          startdate=""
        }
        if(isNaN(enddate)){
          enddate=""
        }


        if(startdate==""&&enddate!=""){
          this.$message({
            message: "请选择开始时间",
            type: 'warning'
          });
          return false
        }
        if(enddate==""&&startdate!=""){
          this.$message({
            message: "请选择结束时间",
            type: 'warning'
          });
          return false
          }


        const params={
         current_page:this.currentPage, //正式要加这段
          start:startdate,
          end:enddate+86400,
          account:this.$refs.handlePersonRef.value
        }




      //正式功能
//        this.$http.logall(params,msg => {
//
//          this.listArr=msg.data.data
//          this.listTotal=msg.data.sum_data
//
//          return false
//
//        });
        //搜索功能


        this.$http.logall(params,msg => {

          // this.showfenye=false;
//          this.listTotal=msg.data.sum_data
          if(msg.errcode!=0){
            this.listArr="";
            this.$message({
              message: msg.errmsg,
              type: 'warning'
            });

          }else if(msg.errcode==400010){
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



      }

    },


    getMainList(params) {
      this.$http.LoginLogGetLoginLog(params, msg => {
        let _msg = msg.data;
        this.listArr = _msg.list;
        this.currentPage = this.pageNumber;
        this.listTotal = Number(_msg.total);
      });
    },
    // 组件内使用的功能函数
    getUrlData() {
      return {
        'page': this.pageNumber,
        'username': this.$refs.loginAccountRef.value,
        'endtime': this.searchDate.end,
        'starttime': this.searchDate.start
      }
    },

  },
  components: {
    dtDateRange
  }
}
</script>

<style lang="scss" scoped>
.dt-search-con .el-date-editor.el-input {
  width: 100%;
}
</style>


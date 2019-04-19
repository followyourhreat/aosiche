<template>
  <div class="push-record">
    <div class="dt-search-top">
    <!-- 代理商账号 -->
    <dt-search-input ref="userNameSearchRef" title="代理商账号" placeholder="请输入代理商账号"></dt-search-input>
    <!-- 设备mac -->
    <dt-search-input ref="userMacSearchRef" title="设备mac" placeholder="请输入设备mac"></dt-search-input>
    <!-- <div class="dt-search-top">
      <div class="dt-search-cell">
        <button type="button" class="dt-btn">查 询</button>
      </div>
    </div> -->

    <div class="dt-search-cell">
      <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive3" >查 询</button>
      <button type="button" class="dt-btn dt-btn-primary"style="margin-left: 10px">删除</button>
    </div>
      </div>
    <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <el-table
            ref="multipleTable"
            :data="listArr"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :row-class-name="tableRowClassName"
          >
            <el-table-column type="selection" width="157" ></el-table-column>
            <el-table-column label="设备ID" width="200" ><template slot-scope="scope">{{scope.row.id}}</template></el-table-column>
            <el-table-column label="设备状态" width="200" ><template slot-scope="scope">{{scope.row.state == 0 ? "删除" : "正常"}}</template></el-table-column>
            <el-table-column label="通知状态" width="220" ><template slot-scope="scope">{{scope.row.infrom ==0 ? '未通知': '已通知'}}</template></el-table-column>
            <el-table-column label="代理商" width="220" ><template slot-scope="scope">{{scope.row.agent}}</template></el-table-column>
            <el-table-column label="设备mac" width="220" ><template slot-scope="scope">{{scope.row.mac}}</template></el-table-column>
            <el-table-column label="剩余次数" width="220" ><template slot-scope="scope">{{scope.row.surplus}}</template></el-table-column>
            <el-table-column label="通知时间" width="220" ><template slot-scope="scope">{{scope.row.ctime*1000|DateFormat('yyyy-MM-dd')}}</template></el-table-column>
            <!--<el-table-column label="操作" width="190" >-->
            <!--<template slot-scope="scope">-->
            <!--<span  class="dt-btn dt-btn-modfy"  @click="itemClick(scope.row)">删 除</span>-->
            <!--&lt;!&ndash;<span  class="dt-btn dt-btn-modfy" style="margin-left: 5px">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button type="text" @click="editorStyle(scope.row)" >编辑</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;</span>&ndash;&gt;-->
            <!--</template>-->
            <!--</el-table-column>-->
          </el-table>
          <!--<table class="dt-table-same" cellspacing="0" cellpadding="0">-->

          <!--<thead>-->
          <!--<tr>-->
          <!--<th class="dt-table-check" :class="{'dt-table-checked': allItemChecked}" @click="checkAllItemActive(allItemChecked)"></th>-->
          <!--<th class>设备ID</th>-->
          <!--<th class>设备状态</th>-->
          <!--<th class>通知状态</th>-->
          <!--&lt;!&ndash; <th class>通知类型</th> &ndash;&gt;-->
          <!--<th class="tw-160">代理商</th>-->
          <!--<th class="tw-filter-status">所在省份</th>-->
          <!--<th class="tw-inform-status">所在城市</th>-->
          <!--<th class="tw-inform-type">所在地区</th>-->
          <!--<th class="tw-device-brand">用户姓名</th>-->
          <!--<th class="tw-device-series">手机号码</th>-->
          <!--&lt;!&ndash; <th class="tw-telephone">设备型号</th>-->
          <!--<th class="tw-device-type">设备型号</th>-->
          <!--<th class="tw-province">所在省份</th>-->
          <!--<th class="tw-city">所在城市</th>-->
          <!--<th class="tw-district">所在地区</th>-->
          <!--<th class="tw-user-name">用户姓名</th>-->
          <!--<th class="tw-telephone">手机号码</th>&ndash;&gt;-->
          <!--</tr>-->
          <!--</thead>-->
          <!--<tbody>-->
          <!--<tr v-for="(item,index) in listArr" :key="index">-->
          <!--<td class="dt-table-check" :class="{'dt-table-checked': item.checked}" @click="checkItemActive(item)"></td>-->
          <!--<td>{{item.id}}</td>-->
          <!--<td>{{item.state == 0 ? "离线" : "在线"}}</td>-->
          <!--<td>未通知</td>-->
          <!--&lt;!&ndash; <td>{{item.agent_fullname}}</td> &ndash;&gt;-->
          <!--<td>{{item.agent}}</td>-->
          <!--<td>{{item.province}}</td>-->
          <!--<td>{{item.city}}</td>-->
          <!--<td>{{item.district}}</td>-->
          <!--<td>{{item.brand_name}}</td>-->
          <!--<td>{{item.series_name}}</td>-->
          <!--&lt;!&ndash; <td>{{item.model_name}}</td> &ndash;&gt;-->
          <!--&lt;!&ndash; <td>{{item.model_id}}</td> &ndash;&gt;-->
          <!--&lt;!&ndash; <td>{{item.province}}</td>-->
          <!--<td>{{item.city}}</td>-->
          <!--<td>{{item.district}}</td>-->
          <!--<td>{{item.realname}}</td>-->
          <!--<td>{{item.contact}}</td>&ndash;&gt;-->
          <!--</tr>-->
          <!--</tbody>-->
          <!--</table>-->
          <!--<div class="no-data-tip" v-if="!listArr.length">暂无数据</div>-->
        </div>
        <div class="dt-page-wrap">
         <el-pagination class="dt-page-reset" :page-size="page"  @current-change=" handlePage" :current-page.sync="pageNumber" layout="total, prev, pager, next, jumper" :total="listTotal">
        </el-pagination>
        </div>
      </div>
      <!-- 表格 end -->

  </div>
</template>

<script>
import { paginationChangeActive } from "../../global/mixin.js";
export default {
  mixins: [paginationChangeActive],
  data() {
    return {
      currentPage: 1,
      pageNumber: 1,
      page:1,
      params: {
        id: "",
        account: "",
        agent: "",
        state: "",
        page: "",
        current_page: ""
      },
      listArr:[],
      listTotal: 0
    }
  },
  mounted() {
    // this.getMainList(this.getUrlData());
    let uid = localStorage.getItem("aoid");
    let account =localStorage.getItem('accountnum')
    this.params.id = uid;
    this.params.account = account;
    this.listTotal = this.listArr.length;
    this.getMainList({});
  },
  methods: {
    getMainList(type) {
      // this.params.current_page = this.pageNumber;
      this.$http.pushGetAll(type, msg => {
        console.log(msg);
        if(msg.data&&msg.data.data){
          this.listArr = msg.data.data;
          this.page= msg.data.page;
          this.listTotal =  msg.data.sum_data;
        }else{
          this.listArr=[];
          this.page=0;
          this.listTotal=0;
        }

      });
    },
    // getMainList(params) {
    //   this.$http.UserMsgGetMsgList(params.page, msg => {
    //     let _msg = msg.data;
    //     this.listArr = _msg.list;
    //     this.currentPage = this.pageNumber;
    //     this.listTotal = Number(_msg.total);
    //   });
    getUrlData() { // 获取列表方法
      return {
        'page': this.pageNumber
      }
    },
    handlePage(val){
      this.pageNumber =val;
      let params = {
        id: this.params.id,
        account: this.params.account,
        current_page: this.pageNumber,
        agent: this.$refs.userNameSearchRef.value,
        mac:this.$refs.userMacSearchRef.value
      };
      this.getMainList(params);
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex %2 != 0) {
        return 'warning-row';
      }
      return '';
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    //查询
    topSearchActive3(){
      if( this.pageNumber == 1){
        let params2 = {
          id: this.params.id,
          account: this.params.account,
          // current_page: this.pageNumber,
          agent: this.$refs.userNameSearchRef.value,
          mac:this.$refs.userMacSearchRef.value
        };
        this.$http.pushGetAll(params2, msg => {
          if(msg.data && msg.data.data){
            this.listArr = this.$projectUtils.ListAddChecked(msg.data.data);
            this.page= msg.data.page;
            this.listTotal =  msg.data.sum_data;
          }else{
            this.listArr=[];
            this.page=0;
            this.listTotal=0;
          }
        });
      }else{
        this.pageNumber = 1
      }

    }
    },
    // 组件内的功能函数

}
</script>

<style lang="scss" scoped>
.dt-search-con .el-date-editor.el-input {
  width: 100%;
}
</style>


<template>
  <div calss="push-remind-outer">
    <div class="dt-search-top">
      <!-- 代理商账号 -->
      <dt-search-input ref="userNameSearchRef" title="代理商账号" placeholder="请输入代理商账号"></dt-search-input>
      <!-- 设备mac -->
      <dt-search-input ref="userMacSearchRef" title="设备mac" placeholder="请输入设备mac"></dt-search-input>
      <!-- 代理商姓名 -->
      <!-- <dt-search-input ref="fullNameSearchRef" title="代理商姓名" placeholder="请输入代理商姓名"></dt-search-input> -->

      <!-- 通知状态 -->
      <!--<dt-select-option-->
        <!--ref="informStatusSearchRef"-->
        <!--:optiosTitle="$ElSelectName.informStatus.title"-->
        <!--:optionsName="$ElSelectName.informStatus.name"-->
        <!--:conWidth="$ElSelectName.informStatus.width"-->
      <!--&gt;</dt-select-option>-->

      <!-- 设备状态 -->
      <!--<dt-select-option-->
        <!--ref="filterStatusSearchRef"-->
        <!--:optiosTitle="$ElSelectName.filterStatus2.title"-->
        <!--:optionsName="$ElSelectName.filterStatus2.name"-->
        <!--:conWidth="$ElSelectName.filterStatus2.width"-->
      <!--&gt;</dt-select-option>-->

      <!-- 地区 -->
      <!--<dt-search-area-->
        <!--@areaUpdate="topAreaChange"-->
        <!--:defaultOptions="districts"-->
        <!--:optionsTitle="optionsTitle"-->

      <!--&gt;</dt-search-area>-->

      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive2">查 询</button>
        <button type="button" class="dt-btn dt-btn-primary" style="margin-left: 10px" @click="noticeMessage">一键通知</button>
        <button type="button" class="dt-btn dt-btn-primary"  @click="itemClick" style="margin-left: 10px">删除</button>
      </div>
    </div>
    <div class="dt-search-top">

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
        <el-pagination
          class="dt-page-reset"
          :page-size="page"
          @current-change="handlePage"
          :current-page.sync="pageNumber"
          layout="total, prev, pager, next, jumper"
          :total="listTotal"
        ></el-pagination>
      </div>
    </div>
    <!-- 表格 end -->
  </div>
</template>

<script>
import { dtSelectOptionDynamic } from "../../global/searchComponents";
import {
  topSearchActive,
  paginationChangeActive,
  checkAllItemActive,
  checkItemActive,
  topAreaChange
} from "../../global/mixin.js";
export default {
  mixins: [
    topSearchActive,
    paginationChangeActive,
    checkAllItemActive,
    checkItemActive,
    topAreaChange
  ],
  data: () => ({
    // currentPage: 1,
    page:1,
    pageNumber: 1,
    listArr: [],
    listTotal: 0,
    allItemChecked: false,
    searchAreaData: [0, 0, 0],
    templateDatault: [{ value: "", label: "" }],
    params: {
      id: "",
      account: "",
      agent: "",
      state: "",
      // province: "",
      // city: "",
      // district: "",
      page: "",
      current_page: ""
    },
    newArr: [],
    // optionsTitle: "省市区",
    // districts: ["0", "0", "0"],
    // districtsText: [],
    multipleSelection: [],
    callItems:[],
  }),
  mounted() {
    var uid = localStorage.getItem("aoid");
    var account =localStorage.getItem('accountnum')
    this.params.id = uid;
    this.params.account = account;
    this.getMainList({});
    this.getCall()
  },
  methods: {
    //获取剩余次数和报警提示次数
    getCall(){
   let params={
     id: localStorage.getItem('aoid'),
     account: localStorage.getItem('accountnum')
   };
        this.$http.deviceAll(params, msg => {
          this.callItems=msg.data.data;
          this .callItems.forEach(val=>{
            // console.log(val);
            if(val.surplus<=val.call_num){
              // console.log(1);
              let paramsCall={
                mac:val.mac,
                agent:val.agent,
                surplus:val.surplus
              };
              this.$http.pushDevice(paramsCall,msg=>{
                console.log(msg);
              })
            }
          })
        });

    },
    //删除到期提醒数据处理
    itemClick(){
      let idArr= this.multipleSelection;
      let _idArr=[];
      idArr.forEach(val =>{
        console.log(val);
        _idArr.push(val.id)
      });
      let macParams={
        'id[]': _idArr.join(',')
      };
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        if (_idArr.length) {
          this.$http.pushDelete(macParams, msg => {
            if(msg.errcode=='0'){
              this.$message({
                type: 'success',
                message: '数据删除成功!'
              });
              this.$refs.multipleTable.clearSelection();
              this.getMainList();
            }else{
              this.$message({
                type: 'error',
                message: '数据删除失败!'
              });
            }
          });

        } else {
          this.$message.warning('请选择需要删除的设备');
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
        this.$refs.multipleTable.clearSelection();
      });
    },
    getMainList(type) {
      // this.params.current_page = this.pageNumber;
      this.$http.pushGetAll(type, msg => {
        // console.log(msg);
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
    topSearchActive2() {
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

      },
    noticeMessage(){
      let idArr= this.multipleSelection;
      let _macArr=[];
      let _agentArr=[];
      let _surplusArr=[];
      let _idArr=[];
      idArr.forEach(val =>{
        console.log(val);
        _idArr.push(val.id)
      });
      let macParams={
        'id[]': _idArr.join(',')
      };
      idArr.forEach(val =>{
        // console.log(val);
        _macArr.push(val.mac);
        _agentArr.push(val.agent);
        _surplusArr.push(val.surplus);
      });
      let messageParams={
        'mac[]': _macArr.join(','),
        'agent[]': _agentArr.join(','),
        'surplus[]': _surplusArr.join(',')
      };
      this.$http.pushMessage(messageParams,msg=>{
        // console.log(msg);
        if(msg.errcode=='0'){
          this.$message({
            type: 'success',
            message: '一键通知成功!'
          });
          this.$http.pushDelete(macParams, msg => {
            if(msg.errcode=='0'){
              this.$message({
                type: 'success',
                message: '一键通知成功!'
              });
              this.$refs.multipleTable.clearSelection();
              this.getMainList();
            }else{
              this.$message({
                type: 'error',
                message: '一键通知失败!'
              });
            }
          });
          this.getMainList();
        }else{
          this.$message({
            type: 'error',
            message: '一键通知失败!'
          });
        }

      })
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
    getUrlData() {
      console.log(this.pageNumber);
      return {
        // id: this.uid,
        // account: this.account,
        // page: this.pageNumber,
        // agent: this.$refs.userNameSearchRef.value,
        // state: this.$refs.fullNameSearchRef.value,
        // province: this.searchAreaData[0],
        // city: this.searchAreaData[1],
        // district: this.searchAreaData[2]
      };

    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex %2 != 0) {
        return 'warning-row';
      }
      return '';
    },
    selectChanged(selection,row){
      console.log(selection);
      console.log(row);
    },

  },
  components: {
    dtSelectOptionDynamic
  }
};
</script>

<style lang="scss" scoped>
</style>


<template>
  <div class="push-record">
    <div class="dt-search-top">
      <!-- 登录时间 -->
      <dt-date-range
        title="操作时间"
        @startDateChange="startDateSearchChange"
        @endDateChange="endDateSearchChange"
      ></dt-date-range>

      <!-- 操作类型 -->
      <dt-search-input
        ref="handleTypeRef"
        :inputWidth="$SearchInputConfig.handleType.width"
        :title="$SearchInputConfig.handleType.title"
        :placeholder="$SearchInputConfig.handleType.placeholder"
        :maxLength="$SearchInputConfig.handleType.length"
        defaultValue
      ></dt-search-input>
      <!--操作人-->
      <dt-search-input
        ref="handlePersonRef"
        :input-width="$SearchInputConfig.handlePerson.width"
        :title="$SearchInputConfig.handlePerson.title"
        :placeholder="$SearchInputConfig.handlePerson.placeholder"
        :max-length="$SearchInputConfig.handlePerson.length"
        default-value
      ></dt-search-input>
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
              <th>序号</th>
              <th>操作模块</th>
              <th>操作类型</th>
              <th>操作帐号</th>
              <th>操作人员</th>
              <th>操作时间</th>
              <th>登录Ip</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in listArr" :key="index">
              <td>{{item.username}}</td>
              <td>{{item.fullname}}</td>
              <td>{{item.mobile}}</td>
              <td>{{item.province + item.city}}</td>
              <td>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
              <td>{{item.ip}}</td>
            </tr>
          </tbody>
        </table>
        <div class="no-data-tip" v-if="!listArr.length">暂无数据</div>
      </div>
      <div class="dt-page-wrap">
        <!-- <el-pagination
          class="dt-page-reset"
          :page-size="10"
          @current-change="paginationChangeActive"
          :current-page="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="listTotal"
        ></el-pagination>-->
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </div>
    <!-- 表格 end -->
  </div>
</template>

<script>
import { dtDateRange } from "../../global/searchComponents";
// import dateFormat from "../../utils/dateFormat";
import {
  topSearchActive,
  paginationChangeActive,
  dateSearchChange
} from "../../global/mixin.js";
export default {
  mixins: [topSearchActive, paginationChangeActive, dateSearchChange],
  data() {
    return {
      currentPage: 1,
      pageNumber: 1,
      listArr: [],
      listTotal: 0,
      searchDate: {
        start: "",
        end: ""
      }
    };
  },
  mounted() {
    // this.getMainList(this.getUrlData());
  },
  methods: {
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
        page: this.pageNumber,
        username: this.$refs.loginAccountRef.value,
        endtime: this.searchDate.end,
        starttime: this.searchDate.start
      };
    }
  },
  components: {
    dtDateRange
  }
};
</script>

<style lang="scss" scoped>
.dt-search-con .el-date-editor.el-input {
  width: 100%;
}
</style>


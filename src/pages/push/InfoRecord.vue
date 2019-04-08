<template>
  <div class="push-record">
    <!-- <div class="dt-search-top">
      <div class="dt-search-cell">
        <button type="button" class="dt-btn">查 询</button>
      </div>
    </div> -->

    <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th class="tw-info-title">信息标题</th>
                    <th class="tw-template-name">模板</th>
                    <th class="tw-info-type">信息类型</th>
                    <th class="tw-time-ss">推送时间</th>
                    <th class="tw-handle-account">操作账号</th>
                    <th class="tw-user-name">操作人</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <td>{{item.title}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.msg_type | FilterMsgTemplateType}}</td>
                  <td>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                  <td>{{item.account_id}}</td>
                  <td>{{item.account_name}}</td>
                </tr>
              </tbody>
          </table>
          <div class="no-data-tip" v-if="!listArr.length">暂无数据</div>
        </div>
        <div class="dt-page-wrap">
         <el-pagination class="dt-page-reset" :page-size="10"  @current-change="paginationChangeActive" :current-page.sync="currentPage" layout="total, prev, pager, next, jumper" :total="listTotal">
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
      listArr: [],
      listTotal: 0
    }
  },
  mounted() {
    // this.getMainList(this.getUrlData());
  },
  methods: {
    getMainList(params) {
      this.$http.UserMsgGetMsgList(params.page, msg => {
        let _msg = msg.data;
        this.listArr = _msg.list;
        this.currentPage = this.pageNumber;
        this.listTotal = Number(_msg.total);
      });
    },
    // 组件内的功能函数
    getUrlData() { // 获取列表方法
      return {
        'page': this.pageNumber
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dt-search-con .el-date-editor.el-input {
  width: 100%;
}
</style>


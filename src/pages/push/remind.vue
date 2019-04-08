<template>
  <div calss="push-remind-outer">
    <div class="dt-search-top">
       <!-- 代理商账号 -->
      <dt-search-input  ref="userNameSearchRef" title="代理商账号" placeholder ='请输入代理商账号'></dt-search-input>

      <!-- 代理商姓名 -->
      <dt-search-input  ref="fullNameSearchRef" title="代理商姓名" placeholder ='请输入代理商姓名'></dt-search-input>

      <!-- 通知状态 -->
      <dt-select-option ref='informStatusSearchRef' :optiosTitle='$ElSelectName.informStatus.title' :optionsName ='$ElSelectName.informStatus.name' :conWidth = '$ElSelectName.informStatus.width'></dt-select-option>

      <!-- 滤芯状态 -->
      <dt-select-option ref='filterStatusSearchRef' :optiosTitle='$ElSelectName.filterStatus.title' :optionsName ='$ElSelectName.filterStatus.name' :conWidth = '$ElSelectName.filterStatus.width'></dt-select-option>

      <!-- 地区 -->
      <dt-search-area @areaUpdate='topAreaChange'></dt-search-area>

      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive">查 询</button>
      </div>
    </div>
    <div class="dt-search-top">
      <!-- 模板选择 -->
      <!-- <dt-select-option-dynamic ref='templateSearchRef' :optiosTitle='$ElSelectName.choiceTemplate.title' :optionsData ='templateDatault' :conWidth = '$ElSelectName.choiceTemplate.width'></dt-select-option-dynamic> -->

      <!-- 滤芯自动推送 -->
      <!-- <div class="dt-search-cell">
        <button type="button" class="dt-btn" @click="toNotice">一键通知</button>
      </div> -->
    </div>

    <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <!-- <th class="dt-table-check" :class="{'dt-table-checked': allItemChecked}" @click="checkAllItemActive(allItemChecked)"></th> -->
                    <th class="tw-device-id">设备ID</th>
                    <th class="">MAC</th>
                    <th class="">代理商账号</th>
                    <th class="">代理商姓名</th>
                    <th class="tw-160">代理商手机号码</th>
                    <th class="tw-filter-status">滤芯状态</th>
                    <th class="tw-inform-status">通知状态</th>
                    <th class="tw-inform-type">最近通知</th>
                    <th class="tw-device-brand">设备品牌</th>
                    <th class="tw-device-series">设备系列</th>
                    <th class="tw-device-model">设备型号</th>
                    <!-- <th class="tw-device-type">设备型号</th> -->
                    <th class="tw-province">所在省份</th>
                    <th class="tw-city">所在城市</th>
                    <th class="tw-district">所在地区</th>
                    <th class="tw-user-name">用户姓名</th>
                    <th class="tw-telephone">手机号码</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <!-- <td class="dt-table-check" :class="{'dt-table-checked': item.checked}" @click="checkItemActive(item)"></td> -->
                  <td>{{item.device_id}}</td>
                  <td>{{item.mac}}</td>
                  <td>{{item.agent_username}}</td>
                  <td>{{item.agent_fullname}}</td>
                  <td>{{item.agent_mobile}}</td>
                  <td>{{item.filter_type|FilterFilterStatus}}</td>
                  <td>{{item.notice_type|FilterFilterNoticeStatus}}</td>
                  <td>{{item.notice_time*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                  <td>{{item.brand_name}}</td>
                  <td>{{item.series_name}}</td>
                  <td>{{item.model_name}}</td>
                  <!-- <td>{{item.model_id}}</td> -->
                  <td>{{item.province}}</td>
                  <td>{{item.city}}</td>
                  <td>{{item.district}}</td>
                  <td>{{item.realname}}</td>
                  <td>{{item.contact}}</td>
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
import { dtSelectOptionDynamic } from '../../global/searchComponents';
import { topSearchActive, paginationChangeActive, checkAllItemActive, checkItemActive, topAreaChange } from "../../global/mixin.js";
export default {
  mixins: [topSearchActive, paginationChangeActive, checkAllItemActive, checkItemActive, topAreaChange],
  data: () => ({
    currentPage: 1,
    prePage: 1,
    pageNumber: 1,
    listArr: [],
    listTotal: 0,
    allItemChecked: false,
    searchAreaData: [0, 0, 0],
    templateDatault: [{ value: '', label: '' }]
  }),
  mounted() {
    // this.getMainList(this.getUrlData());
    // this.getTemplateList();
  },
  methods: {
    // getMainList(params) {
    //   this.$http.FilterWarningGetUserDevice(params, msg => {
    //     let _msg = msg.data;
    //     this.listArr = this.$projectUtils.ListAddChecked(_msg.list);
    //     this.listTotal = Number(_msg.total);
    //   });
    // },
    // toNotice() {
    //   let _templateId = this.$refs.templateSearchRef.value;
    //   // let _idArr = this.$projectUtils.GetCheckedItemIds(this.listArr, 'device_id');
    //   let _idArr = [];
    //   this.listArr.forEach(val => {
    //     if (val.checked) { _idArr.push(val.device_id + '-' + val.uid) }
    //   });
    //   this.$http.FilterWarningSendMsgs(_templateId, _idArr, msg => {
    //     this.$refs.templateSearchRef.value = '';
    //   });
    // },
    // // 组件内的功能函数
    // getUrlData() { // 获取列表方法
    //   return {
    //     'page': this.pageNumber,
    //     'username': this.$refs.userNameSearchRef.value,
    //     'fullname': this.$refs.fullNameSearchRef.value,
    //     'notice_type': this.$refs.informStatusSearchRef.value,
    //     'filter_type': this.$refs.filterStatusSearchRef.value,
    //     'province_code': this.searchAreaData[0],
    //     'city_code': this.searchAreaData[1],
    //     'district_code': this.searchAreaData[2]
    //   }
    // },
    // getTemplateList() {
    //   this.$http.msgTemplateGetAll({}, msg => {
    //     let _list = msg.data;
    //     let _templateArr = [];
    //     _list.forEach(val => {
    //       _templateArr.push({ value: val.id, label: val.name })
    //     });
    //     this.templateDatault = _templateArr;
    //   })
    // }
  },
  components: {
    dtSelectOptionDynamic
  }
}
</script>

<style lang="scss" scoped>
</style>


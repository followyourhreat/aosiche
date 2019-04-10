<template>
  <div calss="push-remind-outer">
    <div class="dt-search-top">
      <!-- 代理商账号 -->
      <dt-search-input ref="userNameSearchRef" title="代理商账号" placeholder="请输入代理商账号"></dt-search-input>

      <!-- 代理商姓名 -->
      <dt-search-input ref="fullNameSearchRef" title="代理商姓名" placeholder="请输入代理商姓名"></dt-search-input>

      <!-- 通知状态 -->
      <dt-select-option
        ref="informStatusSearchRef"
        :optiosTitle="$ElSelectName.informStatus.title"
        :optionsName="$ElSelectName.informStatus.name"
        :conWidth="$ElSelectName.informStatus.width"
      ></dt-select-option>

      <!-- 设备状态 -->
      <dt-select-option
        ref="filterStatusSearchRef"
        :optiosTitle="$ElSelectName.filterStatus2.title"
        :optionsName="$ElSelectName.filterStatus2.name"
        :conWidth="$ElSelectName.filterStatus2.width"
      ></dt-select-option>

      <!-- 地区 -->
      <dt-search-area
        @areaUpdate="topAreaChange"
        :defaultOptions="districts"
        :optionsTitle="optionsTitle"
      ></dt-search-area>

      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive2">查 询</button>
        <button type="button" class="dt-btn dt-btn-primary">一键通知</button>
      </div>
    </div>
    <div class="dt-search-top">
      <!-- 模板选择 -->
      <!-- <dt-select-option-dynamic ref='templateSearchRef' :optiosTitle='$ElSelectName.choiceTemplate.title' :optionsData ='templateDatault' :conWidth = '$ElSelectName.choiceTemplate.width'></dt-select-option-dynamic> -->

      <!-- 滤芯自动推送 -->
      <!-- <div class="dt-search-cell">
        <button type="button" class="dt-btn" @click="toNotice">一键通知</button>
      </div>-->
    </div>

    <!-- 表格 start -->
    <div class="dt-table-outer">
      <div class="dt-table-true-wrap">
        <table class="dt-table-same" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <!-- <th class="dt-table-check" :class="{'dt-table-checked': allItemChecked}" @click="checkAllItemActive(allItemChecked)"></th> -->
              <th class>设备ID</th>
              <th class>设备状态</th>
              <th class>通知状态</th>
              <th class>通知类型</th>
              <th class="tw-160">代理商</th>
              <th class="tw-filter-status">所在省份</th>
              <th class="tw-inform-status">所在城市</th>
              <th class="tw-inform-type">所在地区</th>
              <th class="tw-device-brand">用户姓名</th>
              <th class="tw-device-series">手机号码</th>
              <!-- <th class="tw-telephone">设备型号</th>
              <th class="tw-device-type">设备型号</th>
              <th class="tw-province">所在省份</th>
              <th class="tw-city">所在城市</th>
              <th class="tw-district">所在地区</th>
              <th class="tw-user-name">用户姓名</th>
              <th class="tw-telephone">手机号码</th>-->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in newArr" :key="index">
              <!-- <td class="dt-table-check" :class="{'dt-table-checked': item.checked}" @click="checkItemActive(item)"></td> -->
              <td>{{item.id}}</td>
              <td>{{item.state == 0 ? "离线" : "在线"}}</td>
              <td>{{item.agent_username}}</td>
              <td>{{item.agent_fullname}}</td>
              <td>{{item.agent}}</td>
              <td>{{item.province}}</td>
              <td>{{item.city}}</td>
              <td>{{item.district}}</td>
              <td>{{item.brand_name}}</td>
              <td>{{item.series_name}}</td>
              <td>{{item.model_name}}</td>
              <!-- <td>{{item.model_id}}</td> -->
              <!-- <td>{{item.province}}</td>
              <td>{{item.city}}</td>
              <td>{{item.district}}</td>
              <td>{{item.realname}}</td>
              <td>{{item.contact}}</td>-->
            </tr>
          </tbody>
        </table>
        <div class="no-data-tip" v-if="!listArr.length">暂无数据</div>
      </div>
      <div class="dt-page-wrap">
        <el-pagination
          class="dt-page-reset"
          :page-size="10"
          @current-change="paginationChangeActive"
          :current-page.sync="currentPage"
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
    currentPage: 1,
    prePage: 1,
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
      province: "",
      city: "",
      district: "",
      page: "",
      currentPage: ""
    },
    newArr: [],
    optionsTitle: "",
    districts: ["0", "0", "0"],
    districtsText: []
  }),
  mounted() {
    var uid = localStorage.getItem("aoid");
    var account = localStorage.getItem("account");
    this.params.id = uid;
    this.params.account = account;
    this.getMainList();
  },
  methods: {
    getMainList(params) {
      this.params.currentPage = this.pageNumber;
      this.$http.deviceAll(this.params, msg => {
        let _msg = msg.data;
        this.listArr = _msg.data;
        this.newArr = [];
        for (var i = 0; i < this.listArr.length; i++) {
          if (
            parseInt(this.listArr[i].surplus) <=
            parseInt(this.listArr[i].call_num)
          ) {
            this.newArr.push(this.listArr[i]);
          }
        }
        this.listTotal = this.newArr.length;
        return this.newArr;
      });
    },
    topSearchActive2() {
      var params2 = {
        id: this.params.id,
        account: this.params.account,
        currentPage: this.pageNumber,
        agent: this.$refs.userNameSearchRef.value,
        state: this.$refs.fullNameSearchRef.value,
        province: this.searchAreaData[0],
        city: this.searchAreaData[1],
        district: this.searchAreaData[2]
      };
      if (this.currentPage !== this.pageNumber) {
        this.currentPage = this.pageNumber;
      } else {
        this.$http.deviceAll(params2, msg => {
          let _msg = msg.data;
          this.listArr = _msg.data;
          this.newArr = [];
          for (var i = 0; i < this.listArr.length; i++) {
            if (
              parseInt(this.listArr[i].surplus) <=
              parseInt(this.listArr[i].call_num)
            ) {
              this.newArr.push(this.listArr[i]);
            }
          }
          this.listTotal = this.newArr.length;
          return this.newArr;
        });
      }
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
    }
  },
  components: {
    dtSelectOptionDynamic
  }
};
</script>

<style lang="scss" scoped>
</style>


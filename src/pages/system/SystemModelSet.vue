<template>
  <div class="device-manage-outer">
    <!-- top Satrt -->
      <div class="dt-search-top">
        <dt-search-model-top :listShow="listShow" @selectValue="selectValueTop"></dt-search-model-top>
        <!-- selsetmodel -->
        <div class="dt-search-cell">
          
        </div>
      </div>
      <div class="dt-search-top">
        <div class="dt-search-cell">
          <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive">查 询</button>
          <button type="button" class="dt-btn dt-btn-add" @click="addActive">新 增</button>
        </div>
      </div>
      <!-- top end -->

      <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th class="tw-device-brand">型号名称</th>
                    <th class="tw-device-brand">型号编号</th>
                    <!-- <th class="tw-device-model">设备类型</th> -->
                    <th class="tw-device-model">租赁方式</th>
                    <th class="tw-device-series">滤芯类型</th>
                    <th class="tw-province">滤芯验证</th>
                    <th class="tw-handle-edit">操作</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <td>{{item.model_name}}</td>
                  <td>{{item.model_code}}</td>
                  <!-- <td>{{item.device_type}}</td> -->
                  <td>{{item.lease_type|FilterLeaseType}}</td>
                  <td>{{item.filter_type|FilterFilterType}}</td>
                  <td>{{item.filter_verify|FilterFilterVerify}}</td>
                  <td class="dt-table-edit"><b @click="tableEditActive(item)">编 辑</b></td>
                </tr>
              </tbody>
          </table>
        </div>
        <div class="dt-page-wrap">
          <el-pagination class="dt-page-reset"  :page-size="10"  @current-change="paginationChangeActive" :current-page="pageNumber" layout="total, prev, pager, next, jumper" :total="listTotal">
          </el-pagination>
        </div>
      </div>
      <!-- 表格 end -->

      <!-- 侧滑start -->
      <dt-slide-page :slideTitle='slideTitle' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul>
          <dt-search-model v-if="!isEditSlideFlag" :listShow="listShow" @selectValue="selectValue"></dt-search-model>
          <!-- 型号名称 -->
          <li>
            <dt-search-input  ref="modelNameRef" :inputWidth='SlidePageConfig.inputWidthA' title="型号名称" placeholder ='请输入型号名称' maxLength = '64' defaultValue = ''></dt-search-input>
          </li>
          <!-- 型号编号 -->
          <li>
            <dt-search-input  ref="modelCodeRef" :inputWidth='SlidePageConfig.inputWidthA' title="型号编号" placeholder ='请输入型号编号' maxLength = '32' defaultValue = ''></dt-search-input>
          </li>
          <!-- 产品ID -->
          <li v-show="false">
           <!--  <dt-select-option ref='deviceTypeRef' :conWidth = 'SlidePageConfig.inputWidthA' optiosTitle='产品ID' :optionsName ='$ElSelectName.communicte.name'></dt-select-option> -->
            <dt-search-input  ref="deviceTypeRef" :inputWidth='SlidePageConfig.inputWidthA' title="产品ID" placeholder ='请填写自助开发平台相应应用下产品ID' defaultValue = ''></dt-search-input>
          </li>
          <!-- 租赁方式 -->
          <li>
            <dt-select-option ref='leaseTypeRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.leaseType.title' :optionsName ='$ElSelectName.leaseType.name'></dt-select-option>
          </li>
          <!-- 滤芯类型 -->
          <li>
            <dt-select-option ref='filterTypeRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.filterType.title' :optionsName ='$ElSelectName.filterType.name'></dt-select-option>
          </li>
          <!-- 滤芯验证 -->
          <li>
            <dt-select-option ref='filterVerifyRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.filterVerify.title' :optionsName ='$ElSelectName.filterVerify.name'></dt-select-option>
          </li>
          <!-- 通讯方式 -->
          <li v-show="false">
            <dt-select-option ref='communicteRef' :conWidth = 'SlidePageConfig.inputWidthA' optiosTitle='通讯方式' :optionsName ='$ElSelectName.communicte.name'></dt-select-option>
          </li>
          <!-- 滤芯个数 -->
           <li>
            <dt-select-option @selectValueChange="selectValueChange" ref='filterNumberRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.filterNumber.title' :optionsName ='$ElSelectName.filterNumber.name'></dt-select-option>
          </li>
          <li v-for="(item ,index) in filterNumber" :key='index'>
            <dt-search-input ref="filterNumberTimeRef" inputWidth='350' :title="'滤芯'+parseFloat(index+1)" placeholder ='请输入滤芯寿命' maxLength = '64' defaultValue = ''></dt-search-input>
            <span class="slide-tip">小时</span>
          </li>
          <!-- <li class="filter-life-rule">
             <div class="rule-wrap">
              <i>寿命设置</i>
              <span class="listContent">
                <p>
                  <span>条数</span>
                  <span style="width: 120px"></span>
                  <span>流量</span>
                  <span style="width: 120px"></span>
                  <span>小时</span>
                </p>
                <p v-for="(item, index) in filterNumberList" :key='index'>
                  <span>{{index+1}}</span>
                  <dt-search-input ref="flowNum" :hasSearchTitle="false" inputWidth="120" title="" placeholder ="请输入数值" maxLength = "10" defaultValue = ""></dt-search-input>
                  <span>L</span>
                  <dt-search-input ref="timeNum" :hasSearchTitle="false" inputWidth="120" title="" placeholder ="请输入数值" maxLength = "10" defaultValue = ""></dt-search-input>
                  <span>小时</span>
                </p>
              </span>
            </div>
          </li> -->
        </ul>
        <div class="slide-btn-wrap">
          <button class="dt-btn" @click="handleSubmit">确定</button>
          <button class="dt-btn dt-btn-cancel" @click='slideShow = false'>取消</button>
        </div>
      </dt-slide-page>
      <!-- 侧滑 end -->
  </div>
</template>

<script>
import { dtSlidePage } from "../../global/searchComponents";
import { SlidePageConfig } from "../../global/constant.js";
import { topSearchActive, paginationChangeActive } from "../../global/mixin.js";
export default {
  components: {
    dtSlidePage
  },
  mixins: [topSearchActive, paginationChangeActive],
  data() {
    return {
      SlidePageConfig,
      listShow: {
        company: true,
        brand: true,
        series: true
      },
      pageNumber: 1,
      listTotal: 0,
      listArr: [],
      slideShow: false,
      isEditSlideFlag: false,
      slideSubmitId: "",
      objValueTop: {
        companyValue: "",
        brandValue: "",
        seriesValue: "",
        modelsetValue: ""
      },
      objValue: {
        companyValue: "",
        brandValue: "",
        seriesValue: "",
        modelsetValue: ""
      },
      // 滤芯个数
      filterNumber: 3
    };
  },
  watch: {},
  computed: {
    slideTitle() {
      return this.isEditSlideFlag ? "编辑型号" : "新增型号";
    }
  },
  mounted() {
    this.getMainList(this.getUrlData());
  },
  methods: {
    selectValueTop(val) {
      this.objValueTop = val;
    },
    selectValue(val) {
      this.objValue = val;
    },
    getUrlData() {
      return {
        page: this.pageNumber,
        series_id: this.objValueTop.seriesValue
      };
    },
    getMainList(params) {
      this.$http.SystemModelSetList(params, msg => {
        let _msg = msg.data;
        this.listArr = _msg.list;
        this.listTotal = Number(_msg.total);
      });
    },
    addActive() {
      this.slideShow = true;
      this.isEditSlideFlag = false;
      this.setRefsEmpty();
      this.objValue.seriesValue = "";
    },
    tableEditActive(item) {
      this.slideShow = true;
      this.isEditSlideFlag = true;
      // this.setRefsEmpty();
      this.slideSubmitId = item.id;
      this.objValue.seriesValue = item.series_id;
      this.$refs.modelNameRef.value = item.model_name;
      this.$refs.modelCodeRef.value = item.model_code;
      this.$refs.deviceTypeRef.value = item.device_type;
      this.$refs.leaseTypeRef.value = item.lease_type;
      this.$refs.filterTypeRef.value = item.filter_type;
      this.$refs.filterVerifyRef.value = item.filter_verify;
      this.$refs.communicteRef.value = item.connect_type;
      this.$refs.filterNumberRef.value = item.filter_num;
      this.filterNumber = parseFloat(item.filter_num);
      this.$nextTick(function() {
        var lifeTimeList = item.life_time.split(',');
        for (let i = 0; i < parseFloat(item.filter_num); i++) {
          this.$refs.filterNumberTimeRef[i].value = lifeTimeList[i];
        }
      })
    },
    setRefsEmpty() {
      this.$refs.modelNameRef.value = "";
      this.$refs.modelCodeRef.value = "";
      this.$refs.deviceTypeRef.value = "";
      this.$refs.leaseTypeRef.value = "2";
      this.$refs.filterTypeRef.value = "2";
      this.$refs.filterVerifyRef.value = "0";
      this.$refs.communicteRef.value = "1";
      this.$refs.filterNumberRef.value = '3';
      this.filterNumber = 3;
      for (let i = 0; i < this.filterNumber; i++) {
        this.$refs.filterNumberTimeRef[i].value = '';
      }
    },
    handleSubmit() {
      // 滤芯寿命数组
      let lifeTimeList = [];
      for (let i = 0; i < this.filterNumber; i++) {
        if (this.$refs.filterNumberTimeRef[i].value === '') {
          var j = i + 1;
          this.$message({
            message: '滤芯' + j + '寿命不能为空',
            type: 'warning'
          });
          return
        }
        lifeTimeList.push(this.$refs.filterNumberTimeRef[i].value);
      }
      if (this.isEditSlideFlag) {
        this.$http.SystemModelSetEdit(
          {
            id: this.slideSubmitId,
            series_id: this.objValue.seriesValue,
            model_name: this.$refs.modelNameRef.value,
            model_code: this.$refs.modelCodeRef.value,
            device_type: this.$refs.deviceTypeRef.value,
            lease_type: this.$refs.leaseTypeRef.value,
            filter_type: this.$refs.filterTypeRef.value,
            filter_verify: this.$refs.filterVerifyRef.value,
            connect_type: this.$refs.communicteRef.value,
            filter_num: this.$refs.filterNumberRef.value,
            life_time: lifeTimeList.join()
          },
          msg => {
            this.slideShow = false;
            this.getMainList(this.getUrlData());
          }
        );
      } else {
        this.$http.SystemModelSetAdd(
          {
            series_id: this.objValue.seriesValue,
            model_name: this.$refs.modelNameRef.value,
            model_code: this.$refs.modelCodeRef.value,
            device_type: this.$refs.deviceTypeRef.value,
            lease_type: this.$refs.leaseTypeRef.value,
            filter_type: this.$refs.filterTypeRef.value,
            filter_verify: this.$refs.filterVerifyRef.value,
            connect_type: this.$refs.communicteRef.value,
            filter_num: this.$refs.filterNumberRef.value,
            life_time: lifeTimeList.join()
          },
          msg => {
            this.slideShow = false;
            this.getMainList(this.getUrlData());
          }
        );
      }
    },
    selectValueChange() {
      this.filterNumber = parseFloat(this.$refs.filterNumberRef.value);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/constant.style.scss";
.filter-life-rule {
  .rule-wrap {
    display: flex;
    height: auto;
    i {
      display: inline-block;
      line-height: 30px;
    }
    .listContent {
      height: auto;
      width: 400px;
      span {
        width: 30px;
      }
      p {
        height: 30px;
        line-height: 30px;
        margin-bottom: 8px;
        display: flex;
        b:nth-of-type(1) {
          width: 60px;
          vertical-align: top;
          padding-left: 2px;
        }
        b:nth-of-type(2) {
          flex: 1;
          text-align: right;
          input {
            width: 260px;
            margin: 0 4px;
          }
        }
      }
    }
  }
}
</style>



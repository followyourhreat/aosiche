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
                    <th class="tw-device-id">系列名称</th>
                    <th class="tw-device-name">系列编号</th>
                    <th class="tw-handle-edit">操作</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <td>{{item.series_name}}</td>
                  <td>{{item.series_code}}</td>
                  <td class="dt-table-edit"><b @click="tableEditActive(item)">编 辑</b></td>
                </tr>
              </tbody>
          </table>
        </div>
        <div class="dt-page-wrap">
          <el-pagination class="dt-page-reset" :page-size="10"  @current-change="paginationChangeActive" :current-page="pageNumber" layout="total, prev, pager, next, jumper" :total="listTotal">
          </el-pagination>
        </div>
      </div>
      <!-- 表格 end -->

      <!-- 侧滑start -->
      <dt-slide-page :slideTitle='slideTitle' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul>
          <dt-search-model v-if="!isEditSlideFlag" :listShow="listShow" @selectValue="selectValue"></dt-search-model>
          <li>
            <dt-search-input ref="seriesNameRef" :inputWidth='SlidePageConfig.inputWidthA' title="系列名称" placeholder ='请输入系列名称' maxLength = '64' defaultValue = ''></dt-search-input>
          </li>
          <li>
            <dt-search-input  ref="seriesCodeRef" :inputWidth='SlidePageConfig.inputWidthA' title="系列编号" placeholder ='请输入系列编号' maxLength = '32' defaultValue = ''></dt-search-input>
          </li>
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
import { dtSlidePage } from '../../global/searchComponents';
import { SlidePageConfig } from "../../global/constant.js"
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
        brand: true
      },
      pageNumber: 1,
      listTotal: 0,
      listArr: [],
      slideShow: false,
      isEditSlideFlag: false,
      slideSubmitId: '',
      objValueTop: {
        companyValue: '',
        brandValue: '',
        seriesValue: '',
        modelsetValue: ''
      },
      objValue: {
        companyValue: '',
        brandValue: '',
        seriesValue: '',
        modelsetValue: ''
      }
    }
  },
  computed: {
    slideTitle() {
      return this.isEditSlideFlag ? '编辑系列' : '新增系列'
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
        'page': this.pageNumber,
        'brand_id': this.objValueTop.brandValue
      }
    },
    getMainList(params) {
      this.$http.SystemSeriesList(params, msg => {
        let _msg = msg.data;
        this.listArr = _msg.list;
        this.listTotal = Number(_msg.total);
      });
    },
    addActive() {
      this.slideShow = true;
      this.isEditSlideFlag = false;
      this.setRefsEmpty();
      this.objValue.brandValue = '';
    },
    tableEditActive(item) {
      this.slideShow = true;
      this.isEditSlideFlag = true;
      this.setRefsEmpty();
      this.slideSubmitId = item.id;
      this.objValue.brandValue = item.brand_id;
      this.$refs.seriesNameRef.value = item.series_name;
      this.$refs.seriesCodeRef.value = item.series_code;
    },
    setRefsEmpty() {
      this.$refs.seriesNameRef.value = '';
      this.$refs.seriesCodeRef.value = '';
    },
    handleSubmit() {
      if (this.isEditSlideFlag) {
        this.$http.SystemSeriesEdit({
          id: this.slideSubmitId,
          brand_id: this.objValue.brandValue,
          series_name: this.$refs.seriesNameRef.value,
          series_code: this.$refs.seriesCodeRef.value
        }, msg => {
          this.slideShow = false;
          this.getMainList(this.getUrlData());
        });
      } else {
        this.$http.SystemSeriesAdd({
          brand_id: this.objValue.brandValue,
          series_name: this.$refs.seriesNameRef.value,
          series_code: this.$refs.seriesCodeRef.value
        }, msg => {
          this.slideShow = false;
          this.getMainList(this.getUrlData());
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/constant.style.scss";
</style>



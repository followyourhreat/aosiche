<template>
  <div class="device-manage-outer">
    <!-- top Satrt -->
      <div class="dt-search-top" v-show="false">
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
                    <th class="tw-device-name">品牌名称</th>
                    <th class="tw-device-brand">品牌编号</th>
                    <th class="tw-handle-edit">操作</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <td>{{item.brand_name}}</td>
                  <td>{{item.brand_code}}</td>
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
            <dt-search-input ref="brandNameRef" :inputWidth='SlidePageConfig.inputWidthA' title="品牌名称" placeholder ='请输入品牌名称' maxLength = '64' defaultValue = ''></dt-search-input>
          </li>
          <li>
            <dt-search-input  ref="brandCodeRef" :inputWidth='SlidePageConfig.inputWidthA' title="品牌编号" placeholder ='请输入品牌编号' maxLength = '32' defaultValue = ''></dt-search-input>
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
        company: true
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
      return this.isEditSlideFlag ? '编辑品牌' : '新增品牌'
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
        'enterprise_id': this.objValueTop.companyValue
      }
    },
    getMainList(params) {
      this.$http.SystemBrandList(params, msg => {
        let _msg = msg.data;
        this.listArr = _msg.list;
        this.listTotal = Number(_msg.total);
      });
    },
    addActive() {
      this.slideShow = true;
      this.isEditSlideFlag = false;
      this.setRefsEmpty();
      this.objValue.companyValue = '';
    },
    tableEditActive(item) {
      this.slideShow = true;
      this.isEditSlideFlag = true;
      this.setRefsEmpty();
      this.slideSubmitId = item.id;
      this.objValue.companyValue = item.enterprise_id;
      this.$refs.brandNameRef.value = item.brand_name;
      this.$refs.brandCodeRef.value = item.brand_code;
    },
    setRefsEmpty() {
      this.$refs.brandNameRef.value = '';
      this.$refs.brandCodeRef.value = '';
    },
    handleSubmit() {
      if (this.isEditSlideFlag) {
        this.$http.SystemBrandEdit({
          id: this.slideSubmitId,
          enterprise_id: this.objValue.companyValue,
          brand_name: this.$refs.brandNameRef.value,
          brand_code: this.$refs.brandCodeRef.value
        }, msg => {
          this.slideShow = false;
          this.getMainList(this.getUrlData());
        });
      } else {
        this.$http.SystemBrandAdd({
          enterprise_id: this.objValue.companyValue,
          brand_name: this.$refs.brandNameRef.value,
          brand_code: this.$refs.brandCodeRef.value
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



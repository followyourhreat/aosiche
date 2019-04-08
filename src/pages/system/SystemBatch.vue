<template>
  <div class="device-manage-outer">
    <!-- top Satrt -->
      <div class="dt-search-top">
        <dt-search-model-top :listShow="listShow" @selectValue="selectValueTop"></dt-search-model-top>
        <!-- selsetmodel -->
        <div class="dt-search-cell">
          <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive">查 询</button>
        </div>
      </div>
       <div class="dt-search-top">
        <div class="dt-search-cell">
          <!-- <button type="button" class="dt-btn dt-btn-add" @click="addActive">新 增</button> -->
          <a href="/mac.xls"><button type="button" class="dt-btn dt-btn-modify">下载MAC模版</button></a>
          <button type="button" class="dt-btn dt-btn-modify" @click="importData">导入MAC新批次</button>
          <!-- <button type="button" class="dt-btn dt-btn-delete">删 除</button> -->
        </div>
      </div>
       <!-- top end -->


      <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th class="tw-device-brand">品牌</th>
                    <th class="tw-device-series">系列</th>
                    <th class="tw-device-model">型号</th>
                    <th class="tw-device-name">MAC地址</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <td>{{item.brand}}</td>
                  <td>{{item.series}}</td>
                  <td>{{item.model}}</td>
                  <td>{{item.mac}}</td>
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
      <dt-slide-page slideTitle='新增ID授权' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul>
           <!-- liceseID -->
          <li>
            <dt-search-input  ref="telNum" :inputWidth='SlidePageConfig.inputWidthA' title="对应liceseID" :placeholder ='$SearchInputConfig.liceseID.placeholder' :maxLength = '$SearchInputConfig.liceseID.length' defaultValue = ''></dt-search-input>
          </li>
          <!-- 起始号 -->
          <!-- <li>
            <dt-search-input  ref="telNum" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.startNumber.title" :placeholder ='$SearchInputConfig.startNumber.placeholder' :maxLength = '$SearchInputConfig.startNumber.length' defaultValue = ''></dt-search-input>
          </li> -->
          <!-- 截至号 -->
          <!-- <li>
            <dt-search-input  ref="telNum" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.endNumber.title" :placeholder ='$SearchInputConfig.endNumber.placeholder' :maxLength = '$SearchInputConfig.endNumber.length' defaultValue = ''></dt-search-input>
          </li> -->
          <li>
            <div class="dt-search-cell">
              <i class="dt-search-title" style="width: 95px;">已授权总量:</i>
              <span>1000个</span>
            </div>
          </li>
          <li>
            <div class="dt-search-cell">
              <i class="dt-search-title" style="width: 95px;">已使用授权量:</i>
              <span>1000个</span>
            </div>
          </li>
          <!-- 新增授权量 -->
          <li>
            <dt-search-input ref="telNum" :inputWidth='SlidePageConfig.inputWidthA' title="新增授权量" placeholder ='请输入数值' maxLength = '10' defaultValue = ''></dt-search-input>
          </li>
        </ul>
        <div class="slide-btn-wrap">
          <button class="dt-btn" @click="handleSubmit">确定</button>
          <button class="dt-btn dt-btn-cancel" @click='slideShow = false'>取消</button>
        </div>
      </dt-slide-page>
      <!-- 侧滑 end -->

      <!-- 侧滑start -->
      <dt-slide-page slideTitle='选择合适产品' :class="{'slide-page-show': slideShow2}" @hideSlidePage='slideShow2 = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul>
          <dt-search-model :listShow="listShow" @selectValue="selectValue"></dt-search-model>
          <li>
            <div class="dt-search-cell">
              <i class="dt-search-title">设备MAC:</i>
              <a href="javascript:;" class="dt-upload-file" @click.self="uploadFile">
                  <i id="filter-file1-name">{{fileName}}</i>
                  <span>浏览</span>
                  <input type="file" ref="input" name="myfile" id="filter-file1" accept=".xlsx, .xls" v-on:change = 'inputChangeActive'>
                </a>
            </div>
          </li>
        </ul>
        <div class="slide-btn-wrap">
          <button class="dt-btn" @click="handleSubmit2">确定</button>
          <button class="dt-btn dt-btn-cancel" @click='slideShow2 = false'>取消</button>
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
        brand: true,
        series: true,
        modelset: true
      },
      pageNumber: 1,
      listTotal: 0,
      listArr: [],
      telNum: '',
      slideShow: false,
      slideShow2: false,
      file: '',
      fileName: '请选择你要上传的文件',
      objValueTop: {},
      objValue: {}
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
        'model_id': this.objValueTop.modelsetValue
      }
    },
    getMainList(params) {
      this.$http.SystemBatchList(params, msg => {
        let _msg = msg.data;
        this.listArr = _msg.list;
        this.listTotal = Number(_msg.total);
      });
    },
    addActive() {
      this.slideShow = true;
    },
    handleSubmit() {
    },
    importData() {
      this.slideShow2 = true;
    },
    uploadFile() {
      this.$refs.input.click();
    },
    inputChangeActive(e) {
      this.fileName = e.target.files[0].name;
      this.$http.UploadifyUploadFile(e.target.files[0], msg => {
        this.file = msg.filename;
      })
      // this.$http.UploadifyUploadFile(e.target.files[0], msg => {
      //   this.$http.FilterImportFilter(msg.filename, msg1 => {
      //     this.pageNumber = 1;
      //     this.getMainList(this.getUrlData());
      //   });
      // })
    },
    handleSubmit2() {
      this.$http.SystemBatchImport({
        model_id: this.objValue.modelsetValue,
        myfile: this.file
      }, msg => {
        this.slideShow = false;
        this.getMainList(this.getUrlData());
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/constant.style.scss";
</style>



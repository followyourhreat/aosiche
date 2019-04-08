<template>
  <div calss="push-remind-outer">
    <div class="dt-search-top">
      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-add" @click="topAddActive">新 增</button>
      </div>
      <div class="dt-search-cell">
        <div class="export-wrap">
          <a href="javascript:;" class="dt-upload-file">
            <i id="filter_file1-name">{{fileName}}</i>
            <span>浏览</span>
            <input type="file" name="myfile" id="filterfile1" accept=".xlsx, .xls" v-on:change = 'inputChangeActive($event)'>
          </a>
          <a class="dt-download-file" href="/firmware_upgrade.xls">下载设备导入模板</a>
        </div>
      </div>
    </div>

    <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th>固件名称</th>
                    <th>固件版本</th>
                    <th class="tw-handle-edit2">操作</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <td>{{item.name}}</td>
                  <td>{{item.version}}</td>
                  <td class="dt-table-edit">
                    <!-- <b @click="tableEditActive(item)">编 辑</b> -->
                    <b @click="tableDeleteActive(item)" class="dt-table-detele">删 除</b>
                  </td>
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

      <!-- 侧滑start -->
      <dt-slide-page :slideTitle='slideTitle' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul>
          <!-- 固件名称 -->
          <li>
            <dt-search-input ref="nameSlideRef" :inputWidth='SlidePageConfig.inputWidthA' title="固件名称" placeholder ='请输入固件名称' :maxLength = '$SearchInputConfig.templateName.length'  defaultValue = ''></dt-search-input>
          </li>

          <!-- 固件版本 -->
          <li>
            <dt-search-input ref="versionSlideRef" :inputWidth='SlidePageConfig.inputWidthA' title="固件版本" placeholder ='请输入固件版本' :maxLength = '$SearchInputConfig.templateName.length'  defaultValue = ''></dt-search-input>
          </li>

          <!-- 文件 -->
          <li>
            <div class="export-wrap">
              <i class="dt-search-title">上传文件：</i>
              <a href="javascript:;" class="dt-upload-file">
                <i id="filter-file1-name">{{fileName2}}</i>
                <span>浏览</span>
                <input type="file" name="myfile" id="filter-file1" v-on:change = 'inputChangeActive2($event)'>
              </a>
            </div>
          </li>
        </ul>

        <div class="slide-btn-wrap">
          <button class="dt-btn" @click="slideSureActive">确定</button>
          <button class="dt-btn dt-btn-cancel" @click="slideCancelActive">取消</button>
        </div>
      </dt-slide-page>
      <!-- 侧滑 end -->

  </div>
</template>

<script>
import { dtSlidePage, dtSearchTextarea } from '../../global/searchComponents';
import { SlidePageConfig } from "../../global/constant.js";
import { paginationChangeActive } from "../../global/mixin.js";
export default {
  mixins: [paginationChangeActive],
  data() {
    return {
      SlidePageConfig,
      currentPage: 1,
      prePage: 1,
      isEditSlideFlag: false,
      slideShow: false,
      pageNumber: 1,
      listArr: [],
      listTotal: 0,
      slideSubmitId: 0,
      fileName: '请选择你要上传的文件',
      fileName2: '请选择你要上传的文件',
      file: ''
    }
  },
  computed: {
    slideTitle() {
      return this.isEditSlideFlag ? '新增固件' : '新增固件'
    }
  },
  mounted() {
    // this.getMainList(this.getUrlData())
  },
  methods: {
    getMainList(params) {
      this.$http.DeviceUpdateList(params, msg => {
        let _msg = msg.data;
        this.listArr = _msg.list;
        this.currentPage = this.pageNumber;
        this.listTotal = Number(_msg.total);
      });
    },
    topAddActive() {
      this.slideShow = true;
      this.slideSubmitId = 0;
      this.setRefsEmpty();
    },
    tableEditActive(item) {
      let _info = item;
      this.slideShow = true;
      this.slideSubmitId = _info.id;
      this.getItemDetail(this.slideSubmitId);
    },
    tableDeleteActive(info) {
      this.$projectUtils.ConfirmTip('确定删除', msg => {
        this.$http.DeviceUpdateDelete({firmware_id: info.firmware_id}, msg => {
          this.getMainList(this.getUrlData());
        })
      })
    },
    slideSureActive() {
      let _urlData = {
        'id': this.slideSubmitId,
        'name': this.$refs.nameSlideRef.value,
        'version': this.$refs.versionSlideRef.value,
        'file': this.file
      };
      if (this.slideSubmitId) {
        this.$http.DeviceUpdateEdit(_urlData, msg => {
          this.slideShow = false;
          this.pageNumber = 1;
          this.getMainList(this.getUrlData());
        });
      } else {
        this.$http.DeviceUpdateAdd(_urlData, msg => {
          this.slideShow = false;
          this.pageNumber = 1;
          this.getMainList(this.getUrlData());
        });
      }
    },
    slideCancelActive() {
      this.slideShow = false;
    },
    // 组件内工具函数
    getUrlData() { // 获取列表方法
      return {
        'page': this.pageNumber
      }
    },
    getItemDetail(id) {
      this.$http.msgTemplateGetDetail(id, msg => {
        this.editSlide(msg.data);
      });
    },
    setRefsEmpty() {
      this.$refs.nameSlideRef.value = '';
      this.$refs.versionSlideRef.value = '';
    },
    inputChangeActive(e) {
      this.fileName = e.target.files[0].name;
      this.$http.UploadifyUploadFile(e.target.files[0], msg => {
        this.$http.DeviceUpdateBatchUpgrade({
          myfile: msg.filename
        }, msg1 => {
          this.pageNumber = 1;
          this.getMainList(this.getUrlData());
        });
      })
    },
    inputChangeActive2(e) {
      this.fileName2 = e.target.files[0].name;
      this.$http.UploadifyUploadBin(e.target.files[0], msg => {
        this.file = msg.filename
      })
    },
    editSlide(msg) {
      let _msg = msg;
      // input 赋值
      this.$refs.nameSlideRef.value = _msg.name;
      this.$refs.versionSlideRef.value = _msg.title;
      this.$refs.msgTypeSlideRef.value = _msg.msg_type;
      this.$refs.msgConSlideRef.value = _msg.content;
      this.$refs.msgLinkSlideRef.value = _msg.url;
      this.triggerValue = {
        value1: '',
        value2: '',
        value3: ''
      }
      this.informTypeValue = Number(_msg.msg_type);
      if (Number(_msg.msg_type) === 1) {
        this.$refs.pushChannelSlideRef.value = _msg.channel;
        this.filterRuleActiveIndex = Number(_msg.trigger_type);
        this.triggerValue[`value${_msg.trigger_type}`] = Number(_msg.trigger_value);
      }
    }
  },
  components: {
    dtSearchTextarea,
    dtSlidePage
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
.tw-handle-edit2{
  width: 150px;
}
</style>


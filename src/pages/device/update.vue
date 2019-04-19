<template>
  <div calss="push-remind-outer">
    <div class="dt-search-top">
      <div class="dt-search-cell">
        <div class="export-wrap">
          <el-input
            size="small"
            placeholder="请输入固件名称"
            prefix-icon="el-icon-search"
            v-model="keyword"
            style="width: 220px;height: 26px;user-focus: none;float:left;margin-right:15px;"
          ></el-input>
          <button type="button" class="dt-btn dt-btn-search" @click="handleSearch">查 询</button>
        </div>
      </div>
      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-add" @click="topAddActive">新 增</button>
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
              <th>固件状态</th>
              <th>导入时间</th>
              <th class="tw-handle-edit2">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in listArr" :key="index">
              <td>{{item.firmware}}</td>
              <td>{{item.version}}</td>
              <td>{{state[item.state]}}</td>
              <td>{{item.ctime*1000|DateFormat('yyyy-MM-dd')}}</td>
              <td class="dt-table-edit">
                <!-- <b @click="tableEditActive(item)">编 辑</b> -->
                <b @click="tableDeleteActive(item)" class>删 除</b>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="no-data-tip" v-if="!listArr.length">暂无数据</div>
      </div>
      <div class="dt-page-wrap">
        <el-pagination
          class="dt-page-reset"
          :page-size=" Page"
          @current-change="paginationChangeActive"
          :current-page.sync="pageNumber"
          layout="total, prev, pager, next, jumper"
          :total="listTotal"
        ></el-pagination>
      </div>
    </div>
    <!-- 表格 end -->

    <!-- 侧滑start -->
    <!--<dt-slide-page :slideTitle='slideTitle' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthA'>-->

    <!--</dt-slide-page>-->

    <el-dialog title="提示" :visible.sync="slideShow" width="30%" :before-close="handleClose">
      <ul style="padding-left: 30px">
        <!-- 固件名称 -->
        <li>
          <dt-search-input
            ref="nameSlideRef"
            :inputWidth="300"
            title="名称"
            placeholder="请输入固件名称"
            :maxLength="$SearchInputConfig.templateName.length"
          ></dt-search-input>
        </li>

        <!-- 固件版本 -->
        <li>
          <dt-search-input
            ref="versionSlideRef"
            :inputWidth="300"
            title="固件版本"
            placeholder="请输入固件版本"
            :maxLength="$SearchInputConfig.templateName.length"
          ></dt-search-input>
        </li>

        <!-- 文件 -->
        <li>
          <div class="export-wrap" style="overflow: hidden;width: 100%">
            <i class="dt-search-title" style="float: left;margin-right: 6px">上传文件：</i>
            <a href="javascript:;" class="dt-upload-file">
              <i id="filter-file1-name">{{fileName2}}</i>
              <span>浏览</span>
              <input
                type="file"
                name="myfile"
                id="filter-file1"
                v-on:change="inputChangeActive2($event)"
              >
            </a>
          </div>
        </li>
      </ul>

      <div
        class="slide-btn-wrap"
        style="display: flex;justify-content: space-around;margin-top: 30px"
      >
        <button class="dt-btn" @click="slideSureActive" style="margin-right: 30px">确定</button>
        <button class="dt-btn dt-btn-cancel" @click="slideCancelActive">取消</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { dtSlidePage, dtSearchTextarea } from "../../global/searchComponents";
import { SlidePageConfig } from "../../global/constant.js";
import { paginationChangeActive, topSearchActive } from "../../global/mixin.js";
import axios from "axios";
export default {
  mixins: [paginationChangeActive, topSearchActive],
  data() {
    return {
      SlidePageConfig,
      keyword: "",
      Page: 1,
      isEditSlideFlag: false,
      slideShow: false,
      pageNumber: 1,
      listArr: [],
      listTotal: 0,
      slideSubmitId: 0,
      fileName: "请选择你要上传的文件",
      fileName2: "上传的文件格式支持bin ",
      state:{
        '0':'无效固件',
        '1':'正常'
      },
      file: "",
      userid:"",
      violence:""
    };
  },
  computed: {
    slideTitle() {
      return this.isEditSlideFlag ? "新增固件" : "新增固件";
    }
  },
  mounted() {
    this.getMainList(this.getUrlData());
      this.userid = localStorage.getItem("aoid");
      this.violence =  localStorage.getItem("violence");
  },
  methods: {
    handleClose() {
      this.slideShow = false;
    },

    getMainList(params) {
      this.$http.videoAll(params, msg => {
        if(msg.data){
          let _msg = msg.data;
          this.listArr = _msg.data;
          this.Page = _msg.page;
          this.listTotal = Number(_msg.sum_data);
        }else{
          this.listArr=[];
          this.Page=0;
          this.listTotal=0;
          this.pageNumber=1;
        }
      });
    },
    topAddActive() {
      let power = localStorage.getItem("power");
      if (power.indexOf(1) != -1 || power.indexOf(3) != -1) {
        this.slideShow = true;
        this.slideSubmitId = 0;

      } else {
        this.$message({
          message: "无效权限",
          type: "warning"
        });
      }
    },
    tableEditActive(item) {
      let _info = item;
      this.slideShow = true;
      this.slideSubmitId = _info.id;
      this.getItemDetail(this.slideSubmitId);
    },
    tableDeleteActive(info) {
      this.$projectUtils.ConfirmTip("确定删除", msg => {
        this.$http.videoFrost({ id: info.id }, msg => {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
          this.getMainList(this.getUrlData());
        });
      });
    },
    slideSureActive() {
      console.log(this.file);
      let _urlData = {
        // id: this.slideSubmitId,
        firmware: this.$refs.nameSlideRef.value,
        differentiate: 1,
        version: this.$refs.versionSlideRef.value,
        file: this.file,
        userid:this.userid,
        account:this.account,
        violence:this.violence
      };
      this.$http.videoUpload(_urlData, msg => {
        this.slideShow = false;
        this.pageNumber = 1;
        this.$message({
          showClose: true,
          message: "上传固件成功",
          type: "success"
        });
        this.getMainList(this.getUrlData());
        this.setRefsEmpty();
      });
    },
    slideCancelActive() {
      this.slideShow = false;
    },
    // 组件内工具函数
    getUrlData() {
      // 获取列表方法
      return {
        differentiate: 1,
        page: this.pageNumber,
        firmware:this.keyword,
        current_page:this.pageNumber,
      };
    },
    //查询
    handleSearch() {
      if(this.pageNumber==1){
        let params=this.getUrlData();
        this.$http.videoAll(params, msg => {
          if(msg.data && msg.data.data){
            this.listArr =msg.data.data;
            this.Page = msg.data.page;
            this.listTotal = Number(msg.data.sum_data);
          }else{
            this.listArr=[];
            this.Page=0;
            this.pageNumber=1;
            this.listTotal=0;
          }
        });
      }else{
        this.pageNumber=1
      }
    },
    getItemDetail(id) {
      this.$http.msgTemplateGetDetail(id, msg => {
        this.editSlide(msg.data);
      });
    },
    setRefsEmpty() {
      this.$refs.nameSlideRef.value = "";
      this.$refs.versionSlideRef.value = "";
    },
    inputChangeActive(e) {
      this.fileName = e.target.files[0].name;
      this.$http.UploadifyUploadFile(e.target.files[0], msg => {
        this.$http.DeviceUpdateBatchUpgrade(
          {
            myfile: msg.filename
          },
          msg1 => {
            this.pageNumber = 1;
            this.getMainList(this.getUrlData());
          }
        );
      });
    },
    inputChangeActive2(e) {
      this.fileName2 = e.target.files[0].name;
      this.file = e.target.files[0];
      console.log(e.target.files[0]);
      // this.$http.videoUpload(e.target.files[0], msg => {
      //   this.file = msg.filename;
      // });
      console.log(this.file);
      // this.$http.videoUpload({ file: { file: this.file.name } }, msg => {
      //   this.slideShow = false;
      //   this.pageNumber = 1;
      //   this.getMainList(this.getUrlData());
      // });
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
        value1: "",
        value2: "",
        value3: ""
      };
      this.informTypeValue = Number(_msg.msg_type);
      if (Number(_msg.msg_type) === 1) {
        this.$refs.pushChannelSlideRef.value = _msg.channel;
        this.filterRuleActiveIndex = Number(_msg.trigger_type);
        this.triggerValue[`value${_msg.trigger_type}`] = Number(
          _msg.trigger_value
        );
      }
    }
  },
  components: {
    dtSearchTextarea,
    dtSlidePage
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.tw-handle-edit2 {
  width: 150px;
}
.el-dialog__body {
  padding: 100px !important;
}
.dt-btn.dt-btn-add,
.dt-btn.dt-btn-search {
  padding: 0 20px !important;
  float: left;
}
.dt-btn.dt-btn-search {
  margin-left: 20px;
}
.dt-download-file {
  margin-left: 20px;
}
</style>


<template>
  <div class="device-manage-outer">
    <!-- top Satrt -->
      <!-- <div class="dt-search-top">
        <div class="export-wrap">
          <a href="javascript:;" class="dt-upload-file">
            <i id="filter-file1-name">{{fileName}}</i>
            <span>浏览</span>
            <input type="file" name="myfile" id="filter-file1" accept=".xlsx, .xls" v-on:change = 'inputChangeActive($event)'>
          </a>
          <a class="dt-download-file" href="/mac.xls">下载设备导入模板</a>
        </div>
      </div> -->
      <div class="dt-search-top">
        <!--<dt-search-model-top :listShow="listShow" @selectValue="selectValueTop"></dt-search-model-top>-->
        <!-- 设备mac -->
        <dt-search-input  ref="macSearchRef" :inputWidth='$SearchInputConfig.mac.width' :title="$SearchInputConfig.mac.title" :placeholder ='$SearchInputConfig.mac.placeholder' :maxLength = '$SearchInputConfig.mac.length' defaultValue = ''></dt-search-input>
        <!-- 代理商账号 -->
        <dt-search-input ref="usernameSearchRef" :inputWidth='$SearchInputConfig.default.width' title="代理商账号" placeholder ='代理商账号'></dt-search-input>
        <!-- 代理商姓名 -->
        <!--<dt-search-input ref="fullnameSearchRef" :inputWidth='$SearchInputConfig.default.width' title="代理商姓名" placeholder ='代理商姓名'></dt-search-input>-->
        <!-- 上一级代理商 -->
       <!--  <dt-search-input  ref="lastagentSearchRef" :inputWidth='$SearchInputConfig.default.width' title="上一级代理商" placeholder ='上一级代理商'></dt-search-input> -->
        <!-- 导入时间 -->
        <!--<dt-date-range title='时间选择' @startDateChange='startDateSearchChange' @endDateChange='endDateSearchChange'></dt-date-range>-->
        <!-- selsetmodel -->
        <div class="dt-search-cell">
          <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive">查 询</button>
        </div>
        <div class="dt-search-cell" style="margin: 0px 0px 10px 0px;">
          <i class="dt-search-title">代理商：</i>
          <span class="dt-search-con" style="{width:100px}">
            <el-select v-model="agentValue" placeholder="请选择代理商" filterable remote :remote-method="remoteMethod">
              <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </span>
        </div>
        <div class="dt-search-cell">
          <!-- <button type="button" class="dt-btn" @click="topAddActive">新增</button>
          <button type="button" class="dt-btn" @click="topDeleteActive">批量删除</button> -->
          <button type="button" class="dt-btn" @click="topSetActive">分配设备</button>
        </div>
        <div class="dt-search-cell" v-if="accountInfo.type != '2'">
          <div class="export-wrap">
            <a href="javascript:;" class="dt-upload-file">
              <i id="filter-file1-name">{{fileName}}</i>
              <span>浏览</span>
              <input type="file" name="myfile" id="filter-file1" accept=".xlsx, .xls" v-on:change = 'inputChangeActive($event)'>
            </a>
            <a class="dt-download-file" href="/mac_agent.xls">下载设备导入模板</a>
          </div>
        </div>
        <!--<div class="dt-search-cell">-->
          <!--&lt;!&ndash; <button type="button" class="dt-btn" @click="topAddActive">新增</button> &ndash;&gt;-->
          <!--<button type="button" class="dt-btn dt-btn-export" @click="topExportActive">导 出</button>-->
          <!--<button type="button" class="dt-btn" @click="topDeleteActive" v-if="accountInfo.type != '2'">批量删除</button>-->
        <!--</div>-->
      </div>
      <!-- <div class="dt-search-top">
        <div class="dt-search-cell">
          <i class="dt-search-title">代理商：</i>
          <span class="dt-search-con" style="{width:100px}">
            <el-select v-model="agentValue" placeholder="请选择代理商">
              <el-option v-for="item in options" :key="item.id" :label="item.username" :value="item.id">
              </el-option>
            </el-select>
          </span>
        </div>
        <div class="dt-search-cell">
          <button type="button" class="dt-btn" @click="topAddActive">新增</button>
          <button type="button" class="dt-btn" @click="topDeleteActive">批量删除</button>
          <button type="button" class="dt-btn" @click="topSetActive">分配设备</button>
        </div>
      </div> -->

      <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
            <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th class="dt-table-check" :class="{'dt-table-checked': allItemChecked}" @click="checkAllItemActive(allItemChecked)"></th>
                    <!-- <th class="tw-device-mac">ID</th> -->
                    <th class="tw-device-mac">设备MAC</th>
                    <!--<th class="tw-device-brand">品牌名称</th>-->
                    <!--<th class="tw-device-brand">系列名称</th>-->
                    <th class="tw-device-brand">型号</th>
                    <th class="tw-device-mac">代理商账号</th>
                    <th class="tw-device-mac">代理商姓名</th>
                    <th class="tw-device-mac">分配帐号</th>
                    <th class="tw-device-brand">导入时间</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <td class="dt-table-check" :class="{'dt-table-checked': item.checked}" @click="checkItemActive(item)"></td>
                  <!-- <td>{{item.id}}</td> -->
                  <td>{{item.mac}}</td>
                  <td>{{item.brand}}</td>
                  <td>{{item.series}}</td>
                  <td>{{item.model}}</td>
                  <td>{{item.agent_name}}</td>
                  <!--<td>{{item.agent_fullname }}</td>-->
                  <!--<td>{{item.mobile}}</td>-->
                  <td>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                </tr>
              </tbody>
          </table>
          <div class="no-data-tip" v-if="!listArr.length">暂无数据</div>
        </div>
        <div class="dt-page-wrap">
          <el-pagination class="dt-page-reset" :page-size="10"  @current-change="paginationChangeActive" :current-page.sync="pageNumber" layout="total, prev, pager, next, jumper" :total="listTotal">
          </el-pagination>
        </div>
      </div>
      <!-- 表格 end -->

      <!-- 侧滑start -->
      <dt-slide-page slideTitle='新增设备' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul>
          <!-- 账号 -->
          <li>
            <dt-search-textarea  ref="remarkSlideRef" inputHeight = '96' :inputWidth='SlidePageConfig.inputWidthA' title="设备MAC" placeholder ='请输入设备MAC,如果同时添加多个,MAC地址间请用英文逗号分隔'></dt-search-textarea>
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
import { mapGetters } from 'vuex'
import { dtSlidePage, dtSearchTextarea, dtDateRange } from '../../global/searchComponents';
import { SlidePageConfig } from "../../global/constant.js";
import { topSearchActive, paginationChangeActive, checkAllItemActive, checkItemActive, topAreaChange, dateSearchChange } from "../../global/mixin.js";
export default {
  mixins: [topSearchActive, paginationChangeActive, checkAllItemActive, checkItemActive, topAreaChange, dateSearchChange],
  data() {
    return {
      SlidePageConfig,
      listShow: {
        company: true,
        brand: true,
        series: true,
        modelset: true
      },
      fileName: '请选择你要上传的文件',
      pageNumber: 1,
      isEditSlideFlag: false,
      slideShow: false,
      listArr: [],
      listTotal: 0,
      slideSubmitId: 0,
      allItemChecked: false,
      searchDate: {
        start: '',
        end: ''
      },
      name: '',
      options: [],
      agentValue: '',
      objValueTop: {
        companyValue: "",
        brandValue: "",
        seriesValue: "",
        modelsetValue: ""
      }
    }
  },
  computed: {
    ...mapGetters(['accountInfo'])
  },
  mounted() {
    this.getMainList(this.getUrlData());
    this.getAgent()
  },
  methods: {
    getAgent() {
      this.$http.DeviceAllAgent({name: this.name}, msg => {
        let list = msg.data;
        list.forEach(item => {
          item.label = item.username + '/' + item.fullname;
        })
        this.options = list;
      });
    },
    remoteMethod(val) {
      console.log(val)
      this.name = val;
      this.getAgent();
    },
    selectValueTop(val) {
      this.objValueTop = val;
    },
    getMainList(params) {
      this.$http.DeviceImportList(params, msg => {
        let _msg = msg.data;
        this.listArr = this.$projectUtils.ListAddChecked(_msg.list);
        this.listTotal = Number(_msg.total);
      });
    },
    // 组件内使用的功能函数
    getUrlData() {
      return {
        'page': this.pageNumber,
        'brand': this.objValueTop.brandValue,
        'series': this.objValueTop.seriesValue,
        'model': this.objValueTop.modelsetValue,
        'mac': this.$refs.macSearchRef.value,
        'username': this.$refs.usernameSearchRef.value,
        'fullname': this.$refs.fullnameSearchRef.value,
        'start_time': this.searchDate.start,
        'end_time': this.searchDate.end
      }
    },
    setRefsEmpty() {
      this.$refs.remarkSlideRef.value = '';
    },
    topAddActive() {
      this.isEditSlideFlag = false;
      this.slideShow = true;
      this.setRefsEmpty();
    },
    slideSureActive() {
      let _addUrlData = {
        mac: this.$refs.remarkSlideRef.value
      };
      this.$http.DeviceImportAdd(_addUrlData, msg => {
        this.slideShow = false;
        this.getMainList(this.getUrlData());
      });
    },
    slideCancelActive() {
      this.slideShow = false;
    },
    inputChangeActive(e) {
      this.fileName = e.target.files[0].name;
      this.$http.UploadifyUploadFile(e.target.files[0], msg => {
        this.$http.DeviceImport({
          brand: this.objValueTop.brandValue,
          series: this.objValueTop.seriesValue,
          model: this.objValueTop.modelsetValue,
          myfile: msg.filename
        }, msg1 => {
          this.pageNumber = 1;
          this.getMainList(this.getUrlData());
        });
      })
    },
    topExportActive() {
      this.$projectUtils.ConfirmTip('确定导出？', msg => {
        this.$http.DeviceImportExport('', msg => {
          window.location.href = msg.file;
        })
      })
    },
    topDeleteActive() {
      let _idArr = this.$projectUtils.GetCheckedItemIds(this.listArr, 'id');
      if (!_idArr.length) {
        this.$message.warning('请选择需要删除的设备');
        return
      }
      this.$projectUtils.ConfirmTip('确定删除设备？', msg => {
        this.$http.DeviceImportDelete({data_id: _idArr.join(',')}, msg => {
          console.log(msg)
          this.getMainList(this.getUrlData());
        })
      })
    },
    topSetActive() {
      if (this.agentValue === '') {
        this.$message.warning('请选择代理商');
        return
      }
      let _idArr = this.$projectUtils.GetCheckedItemIds(this.listArr, 'id');
      let _agentArr = this.$projectUtils.GetCheckedItemIds(this.listArr, 'agent_id');
      let _macArr = this.$projectUtils.GetCheckedItemIds(this.listArr, 'mac');
      if (!_idArr.length) {
        this.$message.warning('请选择需要分配的设备');
        return
      }
      const arrs = _idArr.map((item, index) => {
        return {id: item, agentid: _agentArr[index], mac: _macArr[index]}
      })
      this.$projectUtils.ConfirmTip('确定分配设备？', msg => {
        this.$http.DeviceSetAgent({
          agentid: this.agentValue,
          deviceid: arrs
        }, msg => {
          this.getMainList(this.getUrlData());
        })
      })
    }
  },
  components: {
    dtSearchTextarea,
    dtDateRange,
    dtSlidePage
  }
}
</script>

<style lang="scss" scoped>
// .export-wrap {
//   height: 36px;
//   margin-bottom: 20px;
// }

// .export-wrap .dt-download-file {
//   float: right;
//   height: 36px;
//   line-height: 36px;
// }

// .export-wrap .dt-upload-file {
//   height: 36px;
//   line-height: 36px;
// }
</style>



<template>
  <div calss="serve-waiting-outer">

    <!-- top Satrt -->
      <div class="dt-search-top">
        <!-- 姓名 -->
        <dt-search-input  ref="nameSearchRef" :inputWidth='$SearchInputConfig.moblie.width' title="姓名" placeholder ='请输入姓名' defaultValue = ''></dt-search-input>
       
        <!-- 电话号码 -->
        <dt-search-input  ref="mobileSearchRef" :inputWidth='$SearchInputConfig.moblie.width' title="电话号码" placeholder ='请输入电话号码' defaultValue = ''></dt-search-input>
    
        <div class="dt-search-cell">
          <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive">查 询</button>
        </div>
      </div>

      <div class="dt-search-top">
        <div class="dt-search-cell">
          <button type="button" class="dt-btn dt-btn-add"  @click="topAddActive">新 增</button>
        </div>
      </div>
       <!-- top end -->

    <!-- 表格 start -->
    <div class="dt-table-outer">
      <div class="dt-table-true-wrap">
        <table class="dt-table-same" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th class="">编号</th>
                  <th class="">姓名</th>
                  <th class="">手机号码</th>
                  <th class="">负责区域</th>
                  <th class="">添加人</th>
                  <th class="">添加时间</th>
                  <th class="tw-handle-edit">操作</th>
                </tr>
              </thead>
            <tbody>
              <tr v-for="(item,index) in listArr" :key="index">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.mobile}}</td>
                <td>{{item.province}}{{item.city}}{{item.district}}</td>
                <td>{{item.create_person }}</td>
                <td>{{item.ctime}}</td>
                <td class="dt-table-edit">
                  <b @click="handleEdit(item)">编辑</b>
                  <b class="dt-table-detele" @click="handleDelete(item)">删除</b>
                </td>
              </tr>
            </tbody>
        </table>
        <div class="no-data-tip" v-if="!listArr.length">暂无数据</div>
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
          <!-- 用户姓名 -->
          <li>
            <dt-search-input  ref="nameSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.userName.title" :placeholder ='$SearchInputConfig.userName.placeholder' :maxLength = '$SearchInputConfig.userName.length' defaultValue = ''></dt-search-input>
          </li>

          <!-- 手机号码 -->
          <li>
            <dt-search-input  ref="mobileSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.moblie.title" :placeholder ='$SearchInputConfig.moblie.placeholder' :maxLength = '$SearchInputConfig.moblie.length' defaultValue = ''></dt-search-input>
          </li>

          <!-- 服务地区 -->
          <li>
            <dt-search-area :needAll= '1' :defaultOptions ='areaSlideDefault'  :inputWidth='SlidePageConfig.inputWidthA' optionsTitle='服务地区' @areaUpdate='areaChange'></dt-search-area>
          </li>

        </ul>
        <div class="slide-btn-wrap">
          <button class="dt-btn" @click="slideSureActive">确定</button>
          <button class="dt-btn dt-btn-cancel" @click="slideShow = false">取消</button>
        </div>
      </dt-slide-page>
      <!-- 侧滑 end -->

  </div>
</template>

<script>
import { dtSearchTextarea, dtSlidePage } from '../../global/searchComponents';
import { SlidePageConfig } from "../../global/constant.js";
import { paginationChangeActive, topSearchActive } from "../../global/mixin";
export default {
  components: {
    dtSlidePage,
    dtSearchTextarea
  },
  mixins: [paginationChangeActive, topSearchActive],
  data() {
    return {
      SlidePageConfig,
      pageNumber: 1,
      listArr: [],
      listTotal: 0,
      isEditSlideFlag: false,
      slideShow: false,
      formItem: {},
      areaSlideDefault: [],
      areaChoiceData: {
        code: ['', '', '']
      }
    }
  },
  computed: {
    slideTitle() {
      return this.isEditSlideFlag ? '编辑服务人员账号' : '新增服务人员账号'
    }
  },
  mounted() {
    this.getMainList(this.getUrlData());
  },
  methods: {
    getUrlData() {
      return {
        'page': this.pageNumber,
        'name': this.$refs.nameSearchRef.value,
        'mobile': this.$refs.mobileSearchRef.value
      }
    },
    getMainList(params) {
      this.$http.serviceAccountFrontList(params, msg => {
        let _msg = msg.data;
        this.listArr = _msg.list;
        this.listTotal = Number(_msg.total);
      })
    },
    topAddActive() {
      this.isEditSlideFlag = false;
      this.slideShow = true;
      this.setRefsEmpty();
    },
    setRefsEmpty() {
      this.$refs.nameSlideRef.value = '';
      this.$refs.mobileSlideRef.value = '';
      this.areaChoiceData.code = ['', '', ''];
    },
    handleEdit(item) {
      this.isEditSlideFlag = true;
      this.slideShow = true;
      this.formItem = JSON.parse(JSON.stringify(item));
      this.setRefsValue();
    },
    setRefsValue() {
      this.$refs.nameSlideRef.value = this.formItem.name;
      this.$refs.mobileSlideRef.value = this.formItem.mobile;
      this.areaSlideDefault = [this.formItem.province_code, this.formItem.city_code, this.formItem.district_code];
      this.areaChoiceData.code = [this.formItem.province_code, this.formItem.city_code, this.formItem.district_code];
    },
    areaChange(value) {
      this.areaChoiceData = value;
    },
    slideSureActive() {
      console.log(this.areaChoiceData)
      var params = {
        name: this.$refs.nameSlideRef.value,
        mobile: this.$refs.mobileSlideRef.value,
        province_code: this.areaChoiceData.code[0],
        city_code: this.areaChoiceData.code[1],
        district_code: this.areaChoiceData.code[2]
      }
      if (this.isEditSlideFlag) {
        let _editUrlData = Object.assign({}, params, {id: this.formItem.id});
        this.$http.serviceAccountFrontEdit(_editUrlData, msg => {
          this.slideShow = false;
          this.getMainList(this.getUrlData());
        });
      } else {
        let _addUrlData = Object.assign({}, params);
        this.$http.serviceAccountFrontAdd(_addUrlData, msg => {
          this.slideShow = false;
          this.getMainList(this.getUrlData());
        });
      }
    },
    handleDelete(item) {
      this.$projectUtils.ConfirmTip('确定删除？', msg => {
        this.$http.serviceAccountFrontDelete({id: item.id}, msg => {
          this.getMainList(this.getUrlData());
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/constant.style.scss';
.order-ul{
  width: 500px;
  .order-li-info{
    display: flex;
    line-height: 20px;
    font-size: $size-three;
    &.order-li-title{
      margin-bottom:0px; 
      label{
        color: #B3B3B3;
        font-size: $size-two;
      }
    }
    label:nth-of-type(1){
      width: 110px;
    }

    label:nth-of-type(2){
      width: 180px;
    }

    label:nth-of-type(3){
      flex: 1;
    }
    &.info-two{
      label:nth-of-type(1){
        width: 230px;
      }
      label:nth-of-type(2){
        flex: 1;
      }
    }
  }
}
.order-show-li{
  .order-show-wrap{
    min-height: 170px;
    border: 1px solid #DDDDDD;
    h6{
      padding-left: 16px;
      height: 40px;
      line-height: 40px; 
    }
    .od-con{
      padding: 8px 16px;
      border-top: 1px solid #DDDDDD;
      min-height: 130px;
      max-height: 200px;
      line-height: 20px;
      overflow-y: auto;
    }
    .od-con-record p{
      min-height: 50px;
      display: flex;
      span:nth-of-type(1){
        flex: 1;
        b{
          display: block;
          line-height: 20px;
          height: auto;
        }
        b:nth-of-type(1){
          margin-top: 5px;
        }
        b:nth-of-type(2){
          font-size: $size-one;
          color: #999;
        }
      }
      span:nth-of-type(2){
        width: 80px;
        line-height: 50px;
        text-align: center;
      }
    }
  }
}

</style>


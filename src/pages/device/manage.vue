<template>
  <div class="device-manage-outer">
    <div class="dt-search-top">
      <!-- 网络状态  -->
      <dt-select-option ref='networkSearchRef' :optiosTitle='$ElSelectName.network.title' :optionsName ='$ElSelectName.network.name' :conWidth = '$ElSelectName.network.width'></dt-select-option>
      <!-- 地区 -->
      <dt-search-area @areaUpdate='topAreaChange' v-show="true"  ></dt-search-area>
      <!-- 设备mac -->
      <dt-search-input  ref="macSearchRef" :inputWidth='$SearchInputConfig.mac.width' :title="$SearchInputConfig.mac.title" :placeholder ='$SearchInputConfig.mac.placeholder' :maxLength = '$SearchInputConfig.mac.length' defaultValue = ''></dt-search-input>
      <!-- 固件版本 -->
      <dt-search-input  ref="firmwareSearchRef" :inputWidth='$SearchInputConfig.deviceModel.width' title="固件版本" placeholder ='请输入固件版本' defaultValue = ''></dt-search-input>
      <!-- 代理商 -->
      <dt-search-input ref="agentNameSearchRef" :inputWidth='$SearchInputConfig.default.width' title="代理商" placeholder ='请输入代理商'></dt-search-input>
      <!-- 剩余次数 -->
      <dt-search-input  ref="modelSearchRef" :inputWidth='$SearchInputConfig.deviceModel.width' title="小于等于剩余次数" placeholder ='请输入次数' defaultValue = ''></dt-search-input>

      <!-- selsetmodel -->

    </div>
    <div class="dt-search-top">
      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn2-search" @click="SearchActive" style="margin-left: 10px">查 询</button>
        <button type="text" @click="dialogFormVisible = true" class="dt-btn dt-btn-Add" style="margin-left: 10px">新增</button>
        <button type="button" class="dt-btn dt-btn-export" @click="topExportActive" style="margin-left: 10px">导 出</button>
        <button type="text" class="dt-btn dt-gjup-add" @click="gjDeviceStyle" style="margin-left: 10px">固件升级</button>
        <button class="dt-download-file" @click="buttonClick">下载设备导入模板</button>
      </div>
    </div>
    <!-- 表格 start -->
    <div class="dt-table-outer">
      <div class="dt-table-true-wrap" >
        <el-table
          ref="multipleTable"
          :data="listArr"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :row-class-name="tableRowClassName"
          >
          <el-table-column type="selection" width="40" ></el-table-column>
          <el-table-column label="序号" width="80" type="index" ></el-table-column>
          <el-table-column label="设备ID" width="85" ><template slot-scope="scope">{{scope.row.id}}</template></el-table-column>
          <el-table-column label="设备MAC" width="100" ><template slot-scope="scope">{{scope.row.mac}}</template></el-table-column>
          <el-table-column label="剩余次数" width="100"><template slot-scope="scope">
            <span style="color: red" v-if="Number(scope.row.surplus)<=Number(scope.row.call_num)">{{scope.row.surplus}}</span>
            <span  v-if="Number(scope.row.surplus)>Number(scope.row.call_num)">{{scope.row.surplus}}</span>
          </template></el-table-column>
          <el-table-column label="提示次数" width="80" ><template slot-scope="scope">{{scope.row.call_num}}</template></el-table-column>
          <el-table-column label="增加次数" width="80" ><template slot-scope="scope">{{scope.row.add_num}}</template></el-table-column>
          <el-table-column label="所在省份" width="80" ><template slot-scope="scope">{{scope.row.province}}</template></el-table-column>
          <el-table-column label="所在城市" width="100" ><template slot-scope="scope">{{scope.row.city}}</template></el-table-column>
          <el-table-column label="所在地区" width="100" ><template slot-scope="scope">{{scope.row.district}}</template></el-table-column>
          <el-table-column label="激活日期" width="100" ><template slot-scope="scope">{{scope.row.activate_time*1000|DateFormat('yyyy-MM-dd')}}</template></el-table-column>
          <el-table-column label="设备状态" width="100" ><template slot-scope="scope">{{scrapType[scope.row.scrap]}}</template></el-table-column>
          <el-table-column label="网络状态" width="100" ><template slot-scope="scope">{{stateType[scope.row.state]}}</template></el-table-column>
          <el-table-column label="代理商" width="100" ><template slot-scope="scope">{{scope.row.agent}}</template></el-table-column>
          <el-table-column label="设备地址" width="100" ><template slot-scope="scope">{{scope.row.site}}</template></el-table-column>
          <el-table-column label="固件版本" width="100" ><template slot-scope="scope">{{scope.row.version}}</template></el-table-column>
          <el-table-column label="操作" width="212" >
            <template slot-scope="scope">
              <span  class="dt-btn dt-btn-modfy"  @click="deleteDeviceStyle(scope.row)">删 除</span>
              <span  class="dt-btn dt-btn-modfy" style="margin-left: 5px">
                <el-button type="text" @click="editorStyle(scope.row)" ><span>编辑</span></el-button>
                </span>
              <span  class="dt-btn dt-btn-modfy" style="margin-left: 5px">
                <el-button type="text" @click="detailStyle(scope.row)" ><span>详情</span></el-button>
                </span>
            </template>
          </el-table-column>
        </el-table>
        <!--<table class="dt-table-same" cellspacing="0" cellpadding="0">-->
        <!--<thead>-->
        <!--<tr >-->
        <!--<th class="dt-table-check" :class="{'dt-table-checked': allItemChecked}" @click="checkAllItemActive(allItemChecked)"></th>-->
        <!--<th class="tw-xuhao-id">序号</th>-->
        <!--<th class="tw-devices-id">设备ID</th>-->
        <!--<th class="tw-device-mac">设备MAC</th>-->
        <!--<th class="tw-device-model">剩余次数</th>-->
        <!--<th class="tw-device-model">提示次数</th>-->
        <!--<th class="tw-province">所在省份</th>-->
        <!--<th class="tw-city">所在城市</th>-->
        <!--<th class="tw-district">所在地区</th>-->
        <!--<th class="tw-time-date">激活日期</th>-->
        <!--<th class="tw-device-status">设备状态</th>-->
        <!--<th class="tw-network-status">网络状态</th>-->
        <!--<th class="tw-user-name">代理商</th>-->
        <!--<th class="tw-address">设备地址</th>-->
        <!--<th class="tw-address">固件版本</th>-->
        <!--<th class="tw-communicate-type">操作</th>-->
        <!--</tr>-->
        <!--</thead>-->
        <!--<tbody>-->
        <!--<tr v-for="(item,index) in listArr" :key="index" >-->
        <!--<td class="dt-table-check" :class="{'dt-table-checked': item.checked}" @click="checkItemActive(item)"></td>-->
        <!--<td>{{deviceParams.id}}</td>-->
        <!--<td>{{item.id}}</td>-->
        <!--<td>{{item.mac}}</td>-->
        <!--<td :class="{isSurplus:Number(item.surplus)<=Number(item.call_num)}">{{item.surplus}}</td>-->
        <!--<td>{{item.call_num}}</td>-->
        <!--<td>{{item.province}}</td>-->
        <!--<td>{{item.city}}</td>-->
        <!--<td>{{item.district}}</td>-->
        <!--<td>{{item.activate_time*1000|DateFormat('yyyy-MM-dd')}}</td>-->
        <!--<td>{{ scrapType[item.scrap]}}</td>-->
        <!--<td>{{stateType[item.state]}}</td>-->
        <!--<td>{{item.agent}}</td>-->
        <!--<td>{{item.site}}</td>-->
        <!--<td>{{item.version}}</td>-->
        <!--<td >-->
        <!--<span  class="dt-btn dt-btn-modfy" @click="deleteDeviceStyle(index)">删 除</span>-->
        <!--&lt;!&ndash;<span  class="dt-btn dt-btn-modfy" style="margin-right: 3px" @click="gjDeviceStyle(item)">固件升级</span>&ndash;&gt;-->
        <!--</td>-->
        <!--</tr>-->
        <!--</tbody>-->
        <!--</table>-->
        <!--<div class="no-data-tip" v-if="!listArr.length">暂无数据</div>-->
      </div>
      <div class="dt-page-wrap">
        <el-pagination   :page-size="page" :current-page="pageNumber" @current-change="paginationChangeActive" layout="total, prev, pager, next, jumper"   :total="listTotal">
        </el-pagination>
        <!--<el-pagination background class="dt-page-reset" :page-size="12"    @current-change="jumps" :current-page="currentPage" layout="total, prev, pager, next, jumper" :total="listTotal">-->

        <!--</el-pagination>-->
      </div>
    </div>
    <!-- 表格 end -->
    <!--新增弹框-->
    <el-dialog title="智能设备管理新增" :visible.sync="dialogFormVisible" >
      <el-form :model="form">
        <el-form-item label="代理商" :label-width="formLabelWidth">
          <el-input v-model="form.agent" ></el-input>
        </el-form-item>
        <el-form-item label="设备MAC" :label-width="formLabelWidth">
          <el-input v-model="form.mac" ></el-input>
        </el-form-item>
        <el-form-item label="固件版本" :label-width="formLabelWidth">
          <el-input v-model="form.version" ></el-input>
        </el-form-item>
        <el-form-item label="设置报警次数" :label-width="formLabelWidth">
          <el-input v-model="form.call_num" ></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureActive">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑弹框-->
    <el-dialog title="智能设备普通管理员编辑" :visible.sync="editoraVisible" >
      <el-form :model="editora" >
        <el-form-item label="设备ID" :label-width="formLabelWidth">
          <el-input v-model="editora.id" ></el-input>
        </el-form-item>
        <el-form-item label="省市区" :label-width="formLabelWidth">
          <dt-search-area
            @areaUpdate="topAreaChange"
            :defaultOptions="districts"
            :optionsTitle="optionsTitle"
            class="backend-area"
          ></dt-search-area>
        </el-form-item>
        <!--<el-form-item label="所在省" :label-width="formLabelWidth">-->
          <!--<el-input v-model="editora.province_code" ></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="所在市" :label-width="formLabelWidth">-->
          <!--<el-input v-model="editora.city_code"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="所在区" :label-width="formLabelWidth">-->
          <!--<el-input v-model="editora.district_code" ></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="editora.site" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editorCancleStyle">取 消</el-button>
        <el-button type="primary" @click="editorSureStyle">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="智能设备超级管理员编辑" :visible.sync="editorbVisible" >
      <el-form :model="editorb">
        <el-form-item label="设备ID" :label-width="formLabelWidth">
          <el-input v-model="editorb.id" ></el-input>
        </el-form-item>
        <el-form-item label="原代理商账号" :label-width="formLabelWidth">
          <el-input v-model="editorb.place" placeholder="请输入登录账号"></el-input>
        </el-form-item>
        <el-form-item label="现代理商账号" :label-width="formLabelWidth">
          <el-input v-model="editorb.agent" placeholder="请输入对应设备的代理商账号"></el-input>
        </el-form-item>
        <el-form-item label="设置提示次数" :label-width="formLabelWidth">
          <el-input v-model="editorb.call_num" ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editorCancleStyle">取 消</el-button>
        <el-button type="primary" @click="editorSureStyle">确 定</el-button>
      </div>
    </el-dialog>
    <!--设备详情-->

    <el-dialog
      title="设备详情"
      :visible.sync="detailVisible"
      width="50%"

      >
     <div >
       <ul v-for="(item ,index) in detailwatchList" :key="index" class="ul-style">
         <li style="color: black">主键id:{{item.id}}</li>
         <li>设备mac:{{item.mac}}</li>
         <li>
           <span class="left-style">皮肤1阻值:&nbsp{{item.price_o}}</span>
           <span class="right-style">皮肤1故障值:&nbsp{{item.fault_o}}</span>
         </li>
         <li>
           <span class="left-style">皮肤2阻值:&nbsp{{item.price_t}}</span>
           <span class="right-style">皮肤2故障值:&nbsp{{item.fault_t}}</span>
         </li>
         <li>
           <span class="left-style">皮肤3阻值:&nbsp{{item.price_s}}</span>
           <span class="right-style">皮肤3故障值:&nbsp{{item.fault_s}}</span>
         </li>
         <li>
           <span class="left-style">皮肤4阻值:&nbsp{{item.price_fo}}</span>
           <span class="right-style">皮肤4故障值:&nbsp{{item.fault_fo}}</span>
         </li>
         <li>
           <span class="left-style">皮肤5阻值:&nbsp{{item.price_fi}}</span>
           <span class="right-style">皮肤5故障值:&nbsp{{item.fault_fi}}</span>
         </li>
         <li>
           <span class="left-style">皮肤6阻值:&nbsp{{item.price_si}}</span>
           <span class="right-style">皮肤6故障值:&nbsp{{item.fault_si}}</span>
         </li>
         <li>
           <span class="left-style">皮肤7阻值:&nbsp{{item.price_se}}</span>
           <span class="right-style">皮肤7故障值:&nbsp{{item.fault_se}}</span>
         </li>
         <li>
           <span class="left-style">皮肤7阻值:&nbsp{{item.price_e}}</span>
           <span class="right-style">皮肤7故障值:&nbsp{{item.fault_e}}</span>
         </li>
         <li class="lastListStyle">
           <span>版本：{{item.version}}</span>
         </li>
       </ul>
     </div>
      <span slot="footer" class="dialog-footer">

  </span>
    </el-dialog>
  </div>
</template>

<script>
  import { dtSlidePage, dtSearchTextarea, dtDateRange } from '../../global/searchComponents';
  import { SlidePageConfig } from "../../global/constant.js";
  import {   checkItemActive, topAreaChange} from "../../global/mixin.js";
  // import dtPagination from '../../components/pagination/dtPagination';
  export default {
    mixins: [checkItemActive, topAreaChange],
      data() {
      return {
        //llx
        deviceParams:{
          id: localStorage.getItem('aoid'),
          account: localStorage.getItem('accountnum')
        },
        optionsTitle:'',
        useName:'',
        listArr: [],
        detailList: [],
        pageNumber:1,
        listTotal: 0,
        stateType:{
          '0':'离线',
          '1': '在线'
        },
        scrapType:{
          '0': '报废',
          '1' : '正常'
        },
        dialogFormVisible: false,
        editoraVisible:false,
        editorbVisible:false,
        detailVisible:false,
        form: {
          agent:'',
          mac: '',
          call_num: '',
          version: '',
        },
        detailwatchList:[],
        paramsB:{},
        editora: {
          id: '',
          province_code: '',
          city_code: '',
          district_code: '',
          province: '',
          city: '',
          district: '',
          site: '',
        },
        editorb: {
          id: '',
          place: this.useName,
          agent: '',
          call_num: '',
        },
        typeAgent:'',
        formLabelWidth: '120px',
        page:1,
        multipleSelection: [],
        searchAreaData: [0, 0, 0],
        districts: [],
        districtsText: [],
        SlidePageConfig,
      }
    },
    mounted() {


      //llx
      this.useName=localStorage.getItem('accountnum');
      this.getDeviceAll({id: this.deviceParams.id,account: this.deviceParams.account});
      // this.getDeviceAll({id: 1,account: 'admin'});
      // console.log(this.getUrlData());

    },
    methods: {

      //llx
      getDeviceAll(params){
        this.$http.deviceAll(params, msg => {
          if(msg.data){
            let _msg=msg.data;
            this.listArr = this.$projectUtils.ListAddChecked(_msg.data);
            this.listTotal =_msg.sum_data;
            this.page=_msg.page;
            // this.pageNumber=_msg.sum_page;
          }else{
            this.listArr=[];
            this.listTotal =0;
            this.page=0;
          }
        });

      },
      topAreaChange(val) {
        // console.log(val);
        this.districts = val.code;
        this.districtsText = val.text;
        this.searchAreaData=val.code;
        // console.log(this.districts);
        // console.log(this.districtsText);
      },
      //设备导入
      buttonClick(){
        let power=localStorage.getItem('power');
        if(power[0]==1||power[2]=='2'){
          window.location.href="http://testfiles.ourslinks.com/CSV/csvAosc/stencil.csv"
        }else{
          this.$message({
            message: "无效权限",
            type: 'warning'
          });
        }
      },
      //分页器点击改变
      paginationChangeActive(val) {
        this.pageNumber =val;
        // this.paramsB.current_page=val
        this.getDeviceAll({
          id: this.deviceParams.id,
          account: this.deviceParams.account,
          current_page:this.pageNumber,
          state: this.$refs.networkSearchRef.value,
          province_code: this.searchAreaData[0] == 0 ? "" :this.searchAreaData[0],
          city_code: this.searchAreaData[1]== 0 ? "" :this.searchAreaData[1],
          district_code: this.searchAreaData[2]== 0 ? "" :this.searchAreaData[2],
          mac: this.$refs.macSearchRef.value,
          version: this.$refs.firmwareSearchRef.value,
          surplus: this.$refs.modelSearchRef.value,
          agent: this.$refs.agentNameSearchRef.value,
        })
      },

      //新增
      sureActive(){
        let refsValue=this.form;
        // alert(refsValue)
        this.$http.addDevice( refsValue, msg =>{
        this.$message({
              showClose: true,
              message: "设备新增成功",
              type: "success"
            });
          this.getDeviceAll({id: this.deviceParams.id,account: this.deviceParams.account})

        });
        this.dialogFormVisible = false;
        this.form={};

      },
      // 编辑
      editorStyle(type){
        console.log(type);
        let editorA=localStorage.getItem('accountnum');
        this.typeAgent=type.agent;
        if(editorA=='admin'){
          this.editorbVisible=true;
          this.editorb.id=type.id;
          this.editorb.place=editorA;
          this.editorb.agent=type.agent;
        }else{
          this.editoraVisible=true;
          this.editora.id=type.id;
        }
      },
      //详情
      detailStyle(type){
        let mac=type.mac;
        // console.log(mac);
        this.$http.detailDevice({mac},msg =>{
          this.detailwatchList=msg.data;
          // console.log(this.detailwatchList);
          // this.detailwatchList=this.$projectUtils.ListAddChecked(msg.data);
          console.log(this.detailwatchList);
          if(this.detailwatchList){
            this.detailVisible=true;
          }else {
            this.$message({
              message: "该设备暂无数据",
              type: 'warning'
            });
          }
        });

      },
      //编辑内取消
      editorCancleStyle(){
        this.editoraVisible=false;
        this.editorbVisible=false;
        this.editora={};
        this.editorb={};
      },
      //编辑内确定点击
      editorSureStyle(){
        let editorbValue=this.editorb;
        if(this.editora.id){
          if (this.districtsText[0] == "全国") {
            this.editora.province = this.districtsText[0];
            this.editora.city = "全部";
            this.editora.district = "全部";
            this.editora.province_code = this.districts[0];
            this.editora.city_code = 0;
            this.editora.district_code = 0;
          }
          else if
          (this.districtsText[1] == "") {
            this.editora.province = this.districtsText[0];
            this.editora.city = "全部";
            this.editora.district = "全部";
            this.editora.province_code = this.districts[0];
            this.editora.city_code = "all";
            this.editora.district_code = "all";
          }
          else if
          (this.districtsText[2] == "") {
            this.editora.province = this.districtsText[0];
            this.editora.city = this.districtsText[1];
            this.editora.district = "全部";
            this.editora.province_code = this.districts[0];
            this.editora.city_code = this.districts[1];
            this.editora.district_code = "all";
          }
          console.log(this.districtsText);
          console.log(this.districts);
          this.editora.province =this.districtsText[0];

          this.editora.city = this.districtsText[1];
          this.editora.district = this.districtsText[2];
          this.editora.province_code = this.districts[0];
          this.editora.city_code = this.districts[1];
          this.editora.district_code = this.districts[2];
          this.$http.editorDevice(this.editora, msg =>{
            this.$message({
                showClose: true,
                message: "设备编辑成功",
                type: "success"
              });
            this.getDeviceAll({id: this.deviceParams.id,account: this.deviceParams.account})
          });
        }else if(editorbValue.id){
          this.$http.editorDevice(editorbValue, msg =>{
            this.$message({
                showClose: true,
                message: "设备编辑成功",
                type: "success"
              });
            this.getDeviceAll({id: this.deviceParams.id,account: this.deviceParams.account})
          });
          this.editorb={};
        }

        this.editoraVisible=false;
        this.editorbVisible=false;
      },
      //删除
      deleteDeviceStyle(type){
        // alert(type);
        let deleteList=type;
        // console.log(deleteList);
        let deleteParams={
          'id': deleteList.id,
          'agent': deleteList.agent,
          'scrap': deleteList.scrap,
          'mac':deleteList.mac
        };
        this.$projectUtils.ConfirmTip('确定删除？',msg =>{
          // debugger
          this.$http.frost(deleteParams,msg =>{
            // debugger
            this.$message({
              message: "设备删除成功",
              type: "success"
            });
            this.getDeviceAll({id: this.deviceParams.id,account: this.deviceParams.account})
          })
        })
      },

      //点击选择
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      //固件升级
      gjDeviceStyle(){
        // console.log(this.multipleSelection);
        let arr= this.multipleSelection;
        let _macArr=[];
        arr.forEach(val =>{
          _macArr.push(val.mac)
        });
        let macParams={
          'mac[]': _macArr.join(',')
        };
        let power=localStorage.getItem('power');
        if(power.indexOf(1)!=-1||power.indexOf(3)!=-1){
          this.$confirm('确定固件升级?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (_macArr.length) {
              this.$http.Upgrade(macParams, msg => {

                if(msg.errcode=='400010'){
                  this.$message({
                    type: 'error',
                    message: '数据修改失败!'
                  });
                }else if(msg.errcode=='0'){
                  this.$message({
                    type: 'success',
                    message: '数据修改成功!'
                  });
                  this.getDeviceAll({id: this.deviceParams.id,account: this.deviceParams.account})
                }
              });
              this.$refs.multipleTable.clearSelection();

            } else {
              this.$message.warning('请选择需要升级的设备');
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
            this.$refs.multipleTable.clearSelection();
          });
        }else{
          this.$message({
            message: '无效权限',
            type: 'warning'
          });
          this.$refs.multipleTable.clearSelection();
        }
      },
      //导出设备
      topExportActive() {
        this.$projectUtils.ConfirmTip('确定导出设备？', msg => {
          window.location.href = 'http://testfiles.ourslinks.com/aosiche/device/export_device';
        })
      },
      //搜索查询
      SearchActive(){
        if(  this.pageNumber == 1){
          this.paramsB=this.getUrlData();
          if(this.paramsB.province_code==0 && this.paramsB.city_code==0 && this.paramsB.district_code==0){
            delete this.paramsB.province_code ;
            delete this.paramsB.city_code ;
            delete this.paramsB.district_code
          }
          // console.log(params);
          // this.SearchActive(this.getUrlData());;
          //
          this.$http.deviceAll(this.paramsB,msg =>{
            if(msg.data&&msg.data.data){
              this.listArr = this.$projectUtils.ListAddChecked(msg.data.data);
              this.listTotal =msg.data.sum_data;
              this.page=msg.data.page;
            }else{
              this.pageNumber=1;
              this.listArr=[];
              this.listTotal=0;
              this.page=0;
            }
          },)
        }else{
          this.pageNumber = 1
        }


      },

      getUrlData() {
        return {
          'id': localStorage.getItem('aoid'),
          'account': localStorage.getItem('accountnum'),
          // 'agent':localStorage.getItem('accountnum'),
          'state': this.$refs.networkSearchRef.value,
          'province_code': this.searchAreaData[0],
          'city_code': this.searchAreaData[1],
          'district_code': this.searchAreaData[2],
          'mac': this.$refs.macSearchRef.value,
          'version': this.$refs.firmwareSearchRef.value,
          'surplus': this.$refs.modelSearchRef.value,
          'agent': this.$refs.agentNameSearchRef.value,
        }
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex %2 != 0) {
          return 'warning-row';
        }
        return '';
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
  @import "../../scss/constant.style.scss";
  //llx
  .ul-style li{
    width: 80%;
    height:40px;
    border-left:1px solid #cccccc ;
    border-right: 1px solid #cccccc;
    border-top: 1px solid #cccccc;
    padding-left: 10px;
    display: flex;
    line-height: 40px;
  }
  .ul-style li .left-style{
    flex: 1;
    border-right: 1px solid #cccccc;
  }
  .ul-style li .right-style{
    flex: 1;
    padding-left: 10px;
  }
  .lastListStyle{
    border-bottom:1px solid #cccccc;
  }
  .isSurplus{
    color: red;
  }
  .order-ul{
    width: 500px;
    .order-li-info{
      display: flex;
      line-height: 20px;
      font-size: $size-two;
      &.order-li-title{
        margin-bottom:0px;
        label{
          color: #B3B3B3;
          font-size: $size-one;
        }
      }
      label:nth-of-type(1){
        width: 130px;
      }

      label:nth-of-type(2){
        width: 150px;
      }

      label:nth-of-type(3){
        flex: 1;
      }
    }
  }
  .order-show-li{
    .order-show-wrap{
      height: 170px;
      border: 1px solid #DDDDDD;
      h6{
        padding-left: 16px;
        height: 40px;
        line-height: 40px;
      }
      .od-con{
        padding: 8px 16px;
        border-top: 1px solid #DDDDDD;
        height: 130px;
        line-height: 20px;
        overflow-y: auto;
      }
      .od-con-filter p{
        height: 50px;
        line-height: 50px;
        display: flex;
        padding: 0 20px;
        span:nth-of-type(1){
          width: 50px;
        }
        span:nth-of-type(2){
          flex: 1;
          position: relative;
          label{
            position: absolute;
            left: 0;
            top: 50%;
            width: 100%;
            height: 4px;
            background: #F9ECFF;
            transform: translateY(-50%);
            border-radius: 20px;
            .filter-line{
              height: 100%;
              width: 0%;
              background: #CF6EFD;
              &.filter-alarm{
                background: #70DA66;
              }
            }
          }
        }
        span:nth-of-type(3){
          width: 50px;
          text-align: right;
        }
      }
      .od-con-record p{
        height: 50px;
        line-height: 50px;
        display: flex;
        span:nth-of-type(1){
          flex: 1;
          b{
            display: block;
            line-height: 20px;
            height: 20px;
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
          text-align: center;
        }
      }
    }
  }
</style>



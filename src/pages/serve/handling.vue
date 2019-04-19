<template>
<div>
  <div class="content_in">
    <div class="title">
      请输入单价:
    </div><el-input v-model="price" placeholder="请输入单价" class="w90" type="number"></el-input>
  </div>
  <div class="content_in">
    <div class="title">
      请输入数量:
    </div><el-input v-model="num" placeholder="请输入数量" class="w90" type="number"></el-input>
  </div>
  <el-button type="primary"  size="medium" class="append_to" @click="append_to">发起订单</el-button>


</div>


</template>

<script>
import { dtSearchTextarea, dtSlidePage, dtSelectOptionDynamic } from '../../global/searchComponents';
import { SlidePageConfig } from "../../global/constant.js"
import dateForm from '../../utils/dateFormat';
import { topSearchActive, paginationChangeActive, topAreaChange } from "../../global/mixin.js";
export default {
  mixins: [topSearchActive, paginationChangeActive, topAreaChange],
  data: () => ({
    num:"",
    price:"",
    total:"",
    id:"",
    agent:"",


  }),
  mounted() {
    this.uid=  localStorage.getItem('aoid');
    this.agent= localStorage.getItem('accountnum');

  },
  methods: {
    append_to(){

      this.total=this.num*this.price
      if(this.price==""){
        this.$message.warning('请输入单价');
        return false
      }
      if(this.num==""){
        this.$message.warning('请输入数量');
        return false
      }
      const params={
        uid:this.uid,
        agent:this.agent,
        price:this.price,
        buy:this.num,
        money:this.total
      }
      this.$http.addorder(params,msg => {
        if(msg.errcode==0){

          this.$message({
            showClose: true,
            message: "提交成功",
            type: "success"
          });
        }

        return false

      });

    }


  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/constant.style.scss';
.title{
  width: 15%;
  float: left;
  line-height: 40px;
  font-size: 16px;
  color: #666666
}
  .w90{
    width:85%
  }
  .content_in{
    width: 80%;
    height: 40px;
    /*margin-top: 20px;*/
    margin: 10px auto;
    overflow: hidden;
  }
  .append_to{
    display: block;
    margin: 20px auto;
  }
</style>


<template>
  <div class="device-manage-outer">

        <div class="dt-search-cell" >
          <div class="export-wrap">

            <button class="dt-download-file" @click="buttonClick">下载设备导入模板</button>
            <!--<a class="dt-download-file" href="http://testfiles.ourslinks.com/CSV/csvAosc/stencil.csv">下载设备导入模板</a>-->
        </div>
      </div>

    </div>

</template>

<script>

export default {

data() {
  return {}
},
computed: {

},
mounted() {

},
methods: {
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
  }
},

}
</script>

<style lang="scss" scoped>
.export-wrap {
 margin-top: 5px;
}

</style>



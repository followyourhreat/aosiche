<template>
  <div>
    <!-- 选择产品 => 品牌、系列、型号 -->
    <div class="dt-search-cell">
      <i class="dt-search-title">选择产品：</i>
      <span class="dt-search-con" style="width:120px;">
        <el-select v-model="value1" placeholder="请选择" @change="valueChange1">
          <el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </span>
    </div>
    <div class="dt-search-cell">
      <span class="dt-search-con" style="width:120px;">
        <el-select v-model="value2" placeholder="请选择" @change="valueChange2">
          <el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </span>
    </div>
    <div class="dt-search-cell">
      <span class="dt-search-con" style="width:120px;">
        <el-select v-model="value3" placeholder="请选择" @change="valueChange3">
          <el-option v-for="item in options3" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dtBrandComponent',
  data() {
    return {
      value1: '',
      options1: [],
      value2: '',
      options2: [],
      value3: '',
      options3: []
    }
  },
  mounted() {
    this.$http.deviceModelMenu({}, msg => {
      this.options1 = msg.data;
    })
  },
  methods: {
    valueChange1(val) {
      this.options2 = [];
      this.value2 = '';
      this.options3 = [];
      this.value3 = '';
      this.options1.forEach(item => {
        if (val === item.id) {
          this.options2 = item.data;
        }
      })
      this.emitSelectValue();
    },
    valueChange2(val) {
      this.options3 = [];
      this.value3 = '';
      this.options2.forEach(item => {
        if (val === item.id) {
          this.options3 = item.data;
        }
      })
      this.emitSelectValue();
    },
    valueChange3(val) {
      this.emitSelectValue();
    },
    emitSelectValue() {
      var selectValue = {
        brandValue: this.value1,
        seriesValue: this.value2,
        modelValue: this.value3
      }
      this.$emit('brandChoose', selectValue);
    },
    setValue(val1, val2, val3) {
      this.value1 = val1;
      this.value2 = val2;
      this.value3 = val3;
      this.options1.forEach(item => {
        if (val1 === item.id) {
          this.options2 = item.data;
        }
      })
      this.options2.forEach(item => {
        if (val2 === item.id) {
          this.options3 = item.data;
        }
      })
    }
  },
  watch: {
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>

</style>



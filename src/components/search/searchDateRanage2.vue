<!-- 时间选择器,开始时间不能大于结束时间,都必须大于当前时间 -->
<template>
  <div class="dt-search-cell">
    <i class="dt-search-title">{{titleCon}}：</i>
    <span class="dt-search-con" style="width:160px">
      <el-date-picker :editable=false @change="change1" v-model="value1" type="date" placeholder="选择开始日期" :picker-options="pickerOptions0" id="date-pick-1">
      </el-date-picker>
    </span>
    <b>-</b>
    <span class="dt-search-con" style="width:160px">
      <el-date-picker :editable=false @change="change2" v-model="value2" type="date" placeholder="选择结束日期" :picker-options="pickerOptions1" id="date-pick-2">
      </el-date-picker>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      titleCon: this.title
    }
  },
  methods: {
    change1(date1) {
      this.$emit("startDateChange", date1);
    },
    change2(date2) {
      this.$emit("endDateChange", date2);
    }
  },
  props: {
    title: {
      type: String
    }
  },
  computed: {
    pickerOptions0: function() {
      let _value2 = this.value2;
      return {
        disabledDate(time) {
          // return time.getTime() > Date.now() - 8.64e7; 今天不能选
          if (_value2) {
            return (
              time.getTime() > Date.parse(new Date(_value2))
            );
          }
        }
      };
    },
    pickerOptions1: function() {
      let _value1 = this.value1;
      return {
        disabledDate(time) {
          // return time.getTime() > Date.now() - 8.64e7; 今天不能选
          if (_value1) {
            return (
              time.getTime() < Date.parse(new Date(_value1))
            );
          }
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.dt-search-cell {
  .dt-search-con .el-date-editor.el-input {
    width: 100%;
  }
  .el-input__icon {
    line-height: 30px;
  }
}
</style>


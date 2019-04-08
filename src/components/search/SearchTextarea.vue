<template>
  <div class="dt-search-cell dt-search-text-special" :style="{'height':conHeight+'px'}">
    <i class="dt-search-title">{{titleValue}}：</i>
    <span class="dt-search-con" :style="{'width':conWidth+'px'}">
      <textarea type="text" :placeholder="placeholderValue" v-bind:maxlength="inputLength" v-model="value" class="dt-textarea" v-on:input="inputChange"></textarea>
    </span>
  </div>
</template>

<script>
// import { inputMaxLength } from '../../global/constant';
export default {
  data() {
    return {
      value: this.defaultValue,
      placeholderValue: this.placeholder,
      titleValue: this.title,
      inputLength: this.maxLength,
      conHeight: this.inputHeight,
      conWidth: this.inputWidth
    }
  },
  props: {
    defaultValue: {
      type: [String, Number],
      default: ""
    },
    placeholder: {
      type: [String, Number],
      default: "请输入值"
    },
    title: {
      type: String,
      required: true
    },
    maxLength: {
      type: [String, Number]
    },
    inputWidth: {
      type: [String, Number],
      default: 120
    },
    inputHeight: {
      type: [String, Number],
      default: 90
    }
  },
  watch: {
    defaultValue(newVal, oldVal) {
      this.value = newVal;
    }
  },
  methods: {
    inputChange() {
      // this.$emit('update:telNum', this.tel)
    }
  }
}
</script>

<style lang="scss" scoped>
.dt-search-text-special{
  .dt-search-title{
    vertical-align: top;
  }
  .dt-textarea{
    height: 100%;
    width: 100%;
  }
  .dt-textarea:focus{
    border-color: #409EFF;
  }
}

</style>



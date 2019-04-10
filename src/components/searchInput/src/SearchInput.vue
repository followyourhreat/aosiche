<template>
  <div class="dt-search-cell">
    <i v-if="hasSearchTitle" class="dt-search-title">{{titleValue}}：</i>
    <span class="dt-search-con" :style="{'width':conWidth+'px'}">
      <input
        :type="inputType"
        :disabled="disableValue"
        :placeholder="placeholderValue"
        v-bind:maxlength="inputLength"
        v-model="value"
        class="dt-input"
        v-on:input="inputChange"
      >
    </span>
  </div>
</template>

<script>
// import { inputMaxLength } from '../../global/constant';
export default {
  name: "dtSearchInput",
  data() {
    return {
      value: this.defaultValue,
      placeholderValue: this.placeholder,
      titleValue: this.title,
      disableValue: this.disabled,
      inputLength: this.maxLength,
      conWidth: this.inputWidth
    };
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
    inputType: {
      type: String,
      default: "text"
    },
    hasSearchTitle: {
      type: Boolean,
      default: true
    },
    maxLength: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inputWidth: {
      type: [String, Number],
      default: 120
    }
  },
  watch: {
    defaultValue(newVal, oldVal) {
      this.value = newVal;
    },
    disabled(newVal, oldVal) {
      this.disableValue = newVal;
    },
    value(newVal, oldVal) {
      this.value = newVal;
    }
  },
  methods: {
    inputChange(value) {
      this.$emit("inputChange", value.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.dt-search-con {
  input:focus {
    border-color: #409eff;
  }
}
</style>



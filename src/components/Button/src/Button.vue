<template>
  <button @click="handleClick" class="dt-button" :class="['dt-button--'+size,'dt-button--'+type,{
                              'is-disabled':disabled,
                              'is-plain':isPlain
                            }]" :disabled="disabled" type="button">
    <label class="dt-button-text">
      <slot></slot>
    </label>
  </button>
</template>

<script>
export default {
  name: "dt-button",
  data() {
    return {};
  },
  counted() {},
  methods: {
    handleClick(evt) {
      this.$emit("clcik", evt);
    },
    reftest() {}
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    plain: {
      type: [Boolean, Number, String],
      default: 0
    },
    size: {
      type: [String],
      default: "small"
    },
    type: {
      type: [String],
      default: "default"
    }
  },
  computed: {
    isPlain() {
      return Number(this.plain);
    }
  }
};
</script>

<style lang="scss" scoped>
.dt-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 4px;
  border: 0;
  box-sizing: border-box;
  color: #fff;
  display: block;
  font-size: 14px;
  height: 40px;
  outline: 0;
  overflow: hidden;
  position: relative;
  text-align: center;
  background: #f65f36;
  &:after {
    background-color: red;
    content: " ";
    opacity: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
  }
  &:not(.is-disabled):active:after {
    opacity: 0.4;
  }
  &--default {
    background: #f65f36;
  }
  &--danger {
    background: #f6c048;
  }
  &--small {
    display: inline-block;
    padding: 0 12px;
  }
  &--large {
    display: block;
    width: 100%;
  }
  &.is-plain {
    background-color: transparent;
    background-color: transparent;
    box-shadow: none;
    border: 1px solid #979797;
    color: inherit;
  }
  &.is-disabled {
    opacity: 0.6;
  }
}
</style>

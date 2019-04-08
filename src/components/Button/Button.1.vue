<template>
  <button @click="handleClick" class="dt-button" :class="['dt-button--'+size,'dt-button--'+type,{
                                'is-disabled':disabled,
                                'is-plain':plain
                              }]" :disabled="disabled" type="button">
    <label class="dt-button-text">
      <slot></slot>
    </label>
  </button>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('clcik', evt)
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    size: {
      type: [String],
      default: 'small'
    },
    type: {
      type: [String],
      default: 'default'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/px2rem.scss';
.dt-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 4px;
  border: 0;
  box-sizing: border-box;
  color: #FFF;
  display: block;
  font-size: 14px;
  height: px2rem(110);
  outline: 0;
  overflow: hidden;
  position: relative;
  text-align: center;
  background: #F65F36;
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
    opacity: .4;
  }
  &--default {
    background: #F65F36;
  }
  &--danger {
    background: #F6C048
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
    color: inherit
  }
  &.is-disabled {
    opacity: .6;
  }
}
</style>

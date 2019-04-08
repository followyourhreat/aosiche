<template>
    <div id="Side">
      <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "Side"
  }
</script>

<style  scoped>
  #Side{
    background-color: #3186DC;
    height: auto;
    position: fixed;
    z-index: 8;
    top: 60px;
    left: 0;
    bottom: 0;
    width: 10%;
    overflow-x: hidden;
    overflow-y: auto;
    box-shadow: 2px 0 10px 0 rgba(160,160,160,0.20);
  }
</style>

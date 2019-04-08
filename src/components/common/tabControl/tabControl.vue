<template>
  <div class="tabControl">
    <div
      v-for="(item,index) in title"
      class="item-style"
      :class="{active:index==currentIndex}"
      @click="itemClick(index)"
      :key="item.id"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tab-control",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    title: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    }
  }
};
</script>

<style scoped>
.tabControl {
  display: flex;
  flex-direction: row;
  height: 64px;
  line-height: 64px;
}
.item-style {
  flex: 1;
  text-align: center;
  font-size: 16px;
}
.active {
  color: #3186dc;
}
.active span {
  border-bottom: 4px solid #3186dc;
  padding-bottom: 5px;
  border-radius: 2px;
}
</style>

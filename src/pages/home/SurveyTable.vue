<template>
  <div class="dt-table-true-wrap">
    <table class="dt-table-same" cellspacing="0" cellpadding="0">
        <thead>
            <tr>
              <th class="tw-device-id" v-for="(item, index) in tableHeadKeysArr" :key="index">{{item.name}}</th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="(bItem,bIndex) in tableBody" :key="bIndex">
            <td  v-for="(kItem, kIndex) in tableHeadKeysArr" :key="kIndex">{{bItem[kItem.key]}}</td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeadKeysArr: this.tableHeadKeys,
      tableBodyArr: this.tableBody
    }
  },
  props: {
    tableHeadKeys: {
      type: Array,
      default: function () {
        return []
      }
    },
    tableBody: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  watch: {
    tableHeadKeys(newVal) {
      return newVal
    },
    tableBody(newVal) {
      return newVal
    }
  }
}
</script>


<style lang="scss" scoped>
.dt-table-true-wrap{
    min-height: 390px;
    .dt-table-same tbody td{
      height: 36px;
      font-size: 12px;
    }
    .dt-table-same thead th{
      height: 32px;
      font-size: 12px;
    }
  }
</style>


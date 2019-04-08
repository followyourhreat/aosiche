<template>
  <div class="dt-pagition">
    <div class="dt-pagintion-left">
      <button :disabled='inputShow==1' type="button" @click='setPage(1)'>
        <i class="iconfont icon-CombinedShape"></i>
      </button>
      <button :disabled='inputShow==1' type="button" @click="setPage(current-1)">
        <i class="iconfont icon-iconzhankaicopy"></i>
      </button>
      <span class="dt-pag_line"></span>
      <span>第</span>
      <span class="dt-pagition_input">
        <input type="text" placeholder="页数" @keyup.enter="setEnter" v-model="inputShow">
      </span>
      <span>页</span>
      <span class="dt-pag_line"></span>
      <span>，共{{totalPage}}页</span>
      <button :disabled='inputShow>=totalPage' type="button" @click="setPage(current+1)">
        <i class="iconfont icon-fanyeqiyoujiantou"></i>
      </button>
      <button :disabled='inputShow>=totalPage' type="button" @click="setPage(total)">
        <i class="iconfont icon-combined_shape"></i>
      </button>
      <span class="dt-pag_line"></span>
      <button type="button" @click='handRefresh '>
        <i class="iconfont icon-shuaxin1"></i>
      </button>
    </div>

    <div class="dt-pagintion-right" v-show="showRight">
      <span>显示</span>
      <span>{{size*(current-1)+1}}-{{size*current}}</span>
      <span>条</span>
      <span>，共{{this.total}}条</span>
    </div>
  </div>
</template>

<script>
/**
 * @description dtPagination 页面显示会在请求后重新赋值  成功显示inputSHow 失败inputShow设值未current
 * @prop pageTotal {Number} 一共有多少条数据  默认值 0
 * @prop pageSize   {Number} 一页显示多少条   默认12条
 * @prop currentPage {Number} 当前显示的页数   默认第1页
 * @prop showRight    {Boolean} 是否显示右边详情  默认显示
 */
export default {
  data() {
    return {
      total: this.pageTotal,
      current: null,
      size: this.pageSize,
      inputShow: null
    }
  },
  mounted() {
    this.inputShow = this.isCurrentPage;
    this.current = this.isCurrentPage
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.size)
    },
    isCurrentPage() {
      if (this.currentPage > this.totalPage) {
        return this.totalPage
      } else if (this.currentPage < 1) {
        return 1
      } else {
        return this.currentPage;
      }
    }
  },
  props: {
    pageTotal: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    showRight: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    currentPage(c) {
      console.log(89, this.inputShow);
      console.log(90, this.current);
      if (c === 0) {
        this.inputShow = this.current;
      } else {
        this.current = Number(this.inputShow);
      }
    }
  },
  methods: {
    isPositiveInteger(num) {
      let reg = /^[0-9]+$/;
      return reg.test(num);
    },
    setPage(page) {
      let _page = page;
      if (_page <= 0) {
        this.inputShow = 1;
      } else if (_page >= this.totalPage) {
        this.inputShow = this.totalPage;
      } else {
        this.inputShow = _page;
      }
      this.$emit('currentChange', this.inputShow)
    },
    setEnter() {
      let _inputShow = Number(this.inputShow);
      let _totoalPage = this.totalPage;
      console.log(_inputShow)
      if (_inputShow === this.current) {
        return
      }
      if (!this.isPositiveInteger(_inputShow) || (_inputShow <= 0)) {
        // this.current = 1;
        this.inputShow = 1;
      } else if (_inputShow > _totoalPage) {
        // this.current = _totoalPage;
        this.inputShow = _totoalPage;
      }
      // else {
      //   this.current = _inputShow;
      // }
      this.$emit('currentChange', this.inputShow)
    },
    handRefresh() {
      if (this.current !== this.inputShow) {
        this.inputShow = this.current
      }
      this.$emit('currentChange', this.inputShow);
    }
  }
}
</script>

<style lang="scss" scoped>
@import './font/iconfont.css';
.dt-pagition {
  white-space: nowrap;
  color: #48576a;
  height: 32px;
  line-height: 32px;
  .dt-pagintion-left {
    float: left;
    height: 32px;
    line-height: 32px;
  }
  .dt-pagintion-right {
    float: right;
    height: 32px;
    line-height: 32px;
  }
}

.dt-pagintion-left {
  button[type='button'] {
    background: #FFF;
    /*box-shadow: 0 4px 6px 0 rgba(0,213,195,0.25);*/
    border-radius: 4px;
    border: 0;
    height: 32px;
    width: 32px;
    line-height: 32px;
    font-size: 16px;
    color: #FFF;
    border: none;
    outline: none; // min-width: 80px;
    cursor: pointer;
    vertical-align: top;
    margin-right: 8px;
    .iconfont {
      color: #919191;
      &.icon-shuaxin1 {
        font-size: 18px;
      }
    }
  }
  button[type='button'][disabled] {
    cursor: Default;
    .iconfont {
      color: #CBCBCB;
    }
  }
  span {
    display: inline-block;
    line-height: 32px;
    vertical-align: top;
    height: 32px;
    margin-right: 8px;
  }
  .dt-pag_line {
    height: 24px;
    width: 1px;
    background: #e7e6ea;
    margin: 4px 6px 0 6px;
  }
  .dt-pagition_input {
    width: 40px;

    input {
      width: 100%;
      height: 30px;
      border: 1px solid #e7e6ea;
      text-align: center;
      padding: 0 6px;
      outline: none
    }
  }
}
</style>

<template>
  <div class="tabControl">
    <div v-for="(item,index) in title"
         class="item-style"
         :class="{active:index==currentIndex}"
         @click="itemClick(index)" >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tab-control",
    data(){
      return{
        currentIndex:this.currentEndex,

      }
    },
    props:{
      title:{
        type:Array,
        default(){
          return []
        }
      },
      currentEndex:{
        type:Number,
        default:0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex=index;
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tabControl{
    display: flex;
    flex-direction: row;
    height: 64px;
    line-height: 64px;
  }
  .item-style{
    cursor: pointer;
    flex: 1;
    text-align: center;
    font-size: 16px;
  }
  .active{
    color: #3186DC;
  }
  .active span{
    border-bottom: 4px solid #3186DC;
    padding-bottom: 5px;
    border-radius: 2px;
  }

</style>

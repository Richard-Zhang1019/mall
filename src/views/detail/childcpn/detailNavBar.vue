<template>
  <nav-bar>
    <template v-slot:left>
      <div class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
    </template>
    <template v-slot:center>
      <div class="title">
        <div class="title-item" 
             :class="{active:index === currentIndex}" 
             v-for="(item,index) in titles" 
             :key="index"
             @click="titleClick(index)">{{item}}</div>
      </div>
    </template>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name:'detailNavBar',
    components:{
      NavBar
    },
    data(){
      return{
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    methods:{
      titleClick(index){
        this.currentIndex = index
        this.$emit('titleClick',index)
      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="less">
  .title{
    display: flex;
    font-size: 14px;
    .title-item{
      flex: 1;
    }
    .active{
      color: var(--color-high-text);
    }
  }
  .back img{
    height: 20px;
    margin-top: 12px;
    margin-right: 15px;
  }
</style>
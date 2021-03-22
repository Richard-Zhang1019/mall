<template>
  <div id="app">
    <tab-bar>
      <tab-bar-item path="/home" activeColor="rgb(212,35,122)">
        <template v-slot:item-icon>
          <img src="~assets/img/tabbar/home.png" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img src="~assets/img/tabbar/home-active.png" alt="">
        </template>
        <template #item-text>
          <div>首页</div>
        </template>
      </tab-bar-item>

      <tab-bar-item path="/category" activeColor="rgb(212,35,122)">
        <template v-slot:item-icon>
          <img  src="~assets/img/tabbar/category.png" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img  src="~assets/img/tabbar/category-active.png" alt="">
        </template>
        <template #item-text>
          <div>分类</div>
        </template>
      </tab-bar-item>

      <tab-bar-item path="/car" activeColor="rgb(212,35,122)">
        <template v-slot:item-icon>
          <img  src="~assets/img/tabbar/car.png" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img  src="~assets/img/tabbar/car-active.png" alt="">
        </template>
        <template #item-text>
          <div>购物车</div>
        </template>
      </tab-bar-item>

      <tab-bar-item path="/profile" activeColor="rgb(212,35,122)">
        <template v-slot:item-icon>
          <img  src="~assets/img/tabbar/user.png" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img  src="~assets/img/tabbar/user-active.png" alt="">
        </template>
        <template #item-text>
          <div>我的</div>
        </template>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'

export default {
  name: 'App',
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style>
@import '~assets/css/base.css';

.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 13px;
}
.tab-bar-item img{
  width: 22px;
  height: 22px;
  margin-top: 5px;
  vertical-align: middle;
  margin-bottom: 1px;
}
</style>

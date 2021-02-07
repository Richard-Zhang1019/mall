<template>
  <div class="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div><em>SuperMall</em></div>
      </template>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabclick="tabclick"></tab-control>
    <goods-list :goods="showgoods"></goods-list>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childcpn/HomeSwiper'
import RecommendView from './childcpn/ReconmendView'
import FeatureView from './childcpn/FeatureView'

import TabControl from 'components/content/TabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import {getHomeMultidata,getHomeGoods} from 'network/home'

export default {
  name:'Home',
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList
  },
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType: 'pop',
    }
  },
  computed:{
    showgoods(){
      return this.goods[this.currentType].list
    }
  },
  created(){
    //请求多个数据
    this.getHomeMultidata()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods:{
    tabclick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },

    getHomeMultidata(){
      getHomeMultidata().then(res => {
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        console.log(res);
        this.goods[type].list.push(...res.data.data.list) 
        this.goods[type].page += 1
      })
    }
  }
}
</script>

<style scoped>
.home{
  padding-top: 44px;
}

.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
}
.tab-control{
  position: sticky;
  top: 44px;
  z-index: 100;
}
</style>
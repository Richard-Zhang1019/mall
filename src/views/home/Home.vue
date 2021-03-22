<template>
  <div class="home">

    <nav-bar class="home-nav" >
      <template v-slot:center>
        <div><em>SuperMall</em></div>
      </template>
    </nav-bar>

    <tab-control v-show="isTabFixed" 
                 class="fixed" 
                 ref="tabControl1"
                 @tabclick="tabclick" 
                 :titles="['流行', '新款', '精选']"></tab-control>

    <scroll class="content" ref="scroll" 
            @scroll="contentScroll" 
            :probe-type="3" 
            :pull-up-load="true" 
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" 
                    @tabclick="tabclick"
                    ref="tabControl2"></tab-control>
      <goods-list :goods="showgoods"></goods-list>
    </scroll>

    <back-top @click.native="backTopClick" v-show="isShow" class="backtop"></back-top>
    <!-- 组件不能监听点击事件 要加修饰符 .native -->

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childcpn/HomeSwiper'
  import RecommendView from './childcpn/ReconmendView'
  import FeatureView from './childcpn/FeatureView'

  import TabControl from 'components/content/TabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backtop/BackTop.vue'
  import Scroll from 'components/common/scroll/Scroll'

  import {getHomeMultidata,getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils'

export default {
  name:'Home',
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BackTop,
    Scroll
  },

  data(){
    return{
      backtop:{},
      isShow: false,
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType: 'pop',
      isTabFixed: false,
      tabOffsetTop: 0,
      saveY:0,
      itemImgListener:{}
    }
  },

  computed:{
    //通过点击改变的currentType值来切换商品展示列表的内容
    showgoods(){
      return this.goods[this.currentType].list
    }
  },

  //获取离开首页时的高度
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY*1,0)
    this.$refs.scroll.refresh()
  },

  deactivated(){
    //保存离开首页时的高度
    this.saveY = this.$refs.scroll.getScrollY()

    //取消全局事件监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },

  created(){
    //请求多个数据
    this.getHomeMultidata()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },

  mounted(){

    //监听item的图片加载完成 事件总线 防抖
    const refresh =  debounce(this.$refs.scroll.refresh,100)
  
    //对监听的事件进行保存
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)

  },

  methods:{

    //通过点击获取当前展示的列表
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
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    
    contentScroll(position) {
      // 1.决定tabFixed是否显示
      this.isTabFixed = (-position.y) > this.tabOffsetTop

      // 2.决定backTop是否显示
      this.isShow = (-position.y) > 540
    },

    //点击返回顶部
    backTopClick(){
      this.$refs.scroll.scrollTo(0,0)
    },

    //上拉加载更多功能
    loadMore(){
      console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)
    },
   
    swiperImgLoad(){

      //获取tabControl的tabOffsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    //获取到banner和recommend数据
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list;
      })
    },

    //获取商品展示列表数据
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.data.list) 
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped lang="less">
  .home{
    position: relative;
    height: 100vh;
  }

  .home-nav{
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;

    // position: fixed;
    // left: 0;
    // right: 0;
    // top: 0;
    // z-index: 100;
  }

  .fixed{
    position: relative;
    z-index: 9;
    // top: 44px;
    // left: 0;
    // right: 0;
  }

  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
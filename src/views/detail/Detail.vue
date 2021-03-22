<template>
  <div class="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <div>{{$store.state.cartList.length}}</div>
      <detail-swiper ref="base" :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from './childcpn/detailNavBar'
  import DetailSwiper from './childcpn/detailSwiper'
  import DetailBaseInfo from './childcpn/DetailBaseInfo'
  import DetailShopInfo from './childcpn/DetailShopInfo'
  import DetailGoodsInfo from './childcpn/DetailGoodsInfo'
  import DetailParamInfo from './childcpn/DetailParamInfo'
  import DetailCommentInfo from './childcpn/DetailCommentInfo'
  import DetailBottomBar from './childcpn/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
  import {debounce} from 'common/utils'
  import {itemImgListenerMixin} from 'common/mixin'

  export default {
    name:'Detail',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      Scroll
    },
    mixins: [itemImgListenerMixin],
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        itemImgListener:{},
        themeTopYs:[],
        currentIndex:0
      }
    },

    created(){
      //保存传入的iid
      this.iid = this.$route.params.iid

      //根据传来的iid请求数据
      getDetail(this.iid).then(res => {
        const data = res.data.result
        //获取顶部轮播图片
        this.topImages = data.itemInfo.topImages

        //获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //获取店铺信息
        this.shop = new Shop(data.shopInfo)

        //保存商品的详情数据
        this.detailInfo = data.detailInfo

        //获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }

        // this.$nextTick(() => {
        //   //DOM已被渲染完 但图片还没完  获取的高度不对
        //   this.themeTopYs = []
        //   this.themeTopYs.push(this.$refs.base.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop -44)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop -44)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop -44)
          
        //   console.log(this.themeTopYs);
        // })

      }),

      //请求推荐商品的数据
      getRecommend().then((res) => {
        this.recommends = res.data.data.list
      })

      this.getOffsetTop = debounce(() => {

          this.themeTopYs = []

          this.themeTopYs.push(this.$refs.base.$el.offsetTop)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop -44)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop -44)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop -44)
          this.themeTopYs.push(Number.MAX_VALUE)
          
          console.log(this.themeTopYs);

        },100)

    },

    methods:{
      addToCart(){
        //获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.detailInfo.title
        product.desc = this.detailInfo.desc
        product.price = this.detailInfo.newPrice
        product.iid = this.iid

        //将商品添加到购物车
        this.$store.commit('addCart',product)
      },

      //监听图片加载
      imageLoad(){
        // console.log('123');
        // this.refresh()
        this.getOffsetTop()
      },

      //监听详情页标题的点击
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },

      //监听滚动
      contentScroll(position){
        //获取Y值
        const Y = -position.y
        //将Y值和数组themeTopYs中的值进行比较 判断当前index
        let length =  this.themeTopYs.length
        // for(let i = 0;i < length;i++){
        //   if(this.currentIndex !== i && ((i < length - 1 && Y > this.themeTopYs[i] && Y < this.themeTopYs[i+1] )||(i === length - 1 && Y > this.themeTopYs[i]))){
        //     this.currentIndex = i
        //     // console.log(this.currentIndex);
        //     this.$refs.nav.currentIndex = this.currentIndex
        //   }
        // }
        for(let i = 0;i < length - 1;i++){
          if(this.currentIndex !== i && (Y >= this.themeTopYs[i] && Y < this.themeTopYs[i+1] )){
            this.currentIndex = i
            // console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      }
    },
    
    mounted(){
      const refresh =  debounce(this.$refs.scroll.refresh,100)

      this.itemImgListener = () => {
        refresh()
      }

      this.$bus.$on('itemImgLoad',this.itemImgListener)
      
    },
    
    destroyed(){
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    }
  }
</script>

<style scoped lang="less">
  .detail{
    
    background-color: #fff;
    position: relative;
    z-index: 9999;
    height: 100vh;
    .content{
      height: calc(100% - 99px);
      overflow: hidden;
    }
  }
  
</style>
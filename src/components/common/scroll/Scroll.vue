<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name:'Scroll',
  props:{
    probeType: {
      type: Number,
      default: 0
    },
    PullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      scroll:{}
    }
  },
  mounted(){

    // 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType: this.probeType,
      PullUpLoad:this.PullUpLoad
    })

    // 监听滚动的位置
    if(this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll',(position) => {
        this.$emit('scroll',position)
      })
    }

    // 监听滚动到底部
    if(this.PullUpLoad){
      this.scroll.on('pullingUp',() => {
        console.log('监听到滚动到底部');
        this.$emit('pullingUp')
      })
    }

  },
  methods:{
    scrollTo(x,y,time = 300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      // console.log('123');
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>

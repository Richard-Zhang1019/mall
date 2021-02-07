<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'RecommendView',
  props: {
    recommends: {
      type: Array,
      default: []
    }
  },
}
</script>

<style scoped>
.recommend{
  display: flex;
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 10px solid #eee;
}
.recommend-item{
  flex: 1;
  font-size: 14px;
}
.recommend-item img{
  width: 75px;
  height: 75px;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
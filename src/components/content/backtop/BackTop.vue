<template>
  <div class="backtop">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name:'BackTop'
}
</script>

<style scoped>
  .backtop{
    position: fixed;
    right: 15px;
    bottom: 55px;
  }
  .backtop img{
    width: 43px;
    height: 43px;
  }
</style>
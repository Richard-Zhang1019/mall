import Vue from 'vue'
import Vuex from 'vuex'

//安装vuex插件
Vue.use(Vuex)

//创建store对象
const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    addCart(state,payload){
      state.cartList.push(payload)
    }
  },
})

//挂载到vue实例上
export default store
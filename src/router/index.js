//配置路由信息
import VueRouter from 'vue-router'
import Vue from 'vue'

//懒加载
const Home = () =>import('../views/home/Home')
const Category = () =>import('../views/category/Category')
const Car = () =>import('../views/car/Car')
const Profile = () =>import('../views/profile/Profile')

//1.通过Vue.use(插件) 安装插件
Vue.use(VueRouter)

//2.创建VueRouter对象
const routes = [
  {
    path:'',
    redirect:'/home' //重定向
  },
  {
    path:'/home',
    name:'Home',
    component:Home
  },
  {
    path:'/category',
    name:'Category',
    component:Category
  },
  {
    path:'/car',
    name:'Car',
    component:Car
  },
  {
    path:'/profile',
    name:'Profile',
    component:Profile
  }
]

const router = new VueRouter({
  //配置路由和组件之间的映射关系
  routes,
  mode: "history"
})

//3.将router对象传入到Vue实例
export default router 


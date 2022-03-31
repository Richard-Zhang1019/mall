import axios from 'axios'

export function request(config){
  
    //创建axios实例
    const instance = axios.create({
      baseURL:'',
      timeout:5000
    })

    //axios的拦截器
    axios.interceptors.request.use(config => {
      return config
    },err => {
      // console.log(err);
    })
    //响应拦截
    axios.interceptors.response.use(res => {
      return res.data
    },err => {
      console.log(err);
    })

    //发送真正的网络请求
    return instance(config)
}
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//创建实例
Vue.prototype.$bus = new Vue()


new Vue({
  el:'#app',
  router,
  store,
  render:h => h(App)
})  



// const arr = [{code: 111, value: val1}, {code: 112, value: val2}, {code:111,value: 3}, {code: 113, value: 4}]

// function test(arr){
//   const k = 0 
//   for (let  i= 0;  i< arr.length; i++) {
//     for(let j = i+1; j< arr.length; j++)
//       if(arr[i].code == arr[j].code){
//         arr.splice(j,1)
//         j--
//       } 
//   }
//   return arr
// }

// console.log(test(arr));



// function HashMap(){
//   var size = 0;// Map大小
//   var entry = new Object();// 对象

//   // Map的存put方法
//   this.put = function(key, value) {
//     if (!this.containsKey(key)) {
//       size++;
//       entry[key] = value;
//     }
//   }

//   // Map取get方法
//   this.get = function(key) {
//     return this.containsKey(key) ? entry[key] : null;
//   }

//   // Map删除remove
//   this.remove = function(key) {
//     if (this.containsKey(key) && (delete entry[key])) {
//       size--;
//     }
//   }

//   // 是否包含Key
//   this.containsKey = function(key) {
//     return (key in entry);
//   }
//   // 是否包含Value
//   this.containsValue = function(value) {
//     for ( var prop in entry) {
//       if (isObjectValueEqual(entry[prop], value)) {
//         return true;
//       }
//     }
//     return false;
//   }

//   // 所有的Value
//   this.values = function() {
//     var values = new Array();
//     for ( var prop in entry) {
//       values.push(entry[prop]);
//     }
//     return values;
//   }

//   // 所有的 Key
//   this.keys = function() {
//     var keys = new Array();
//     for ( var prop in entry) {
//       keys.push(prop);
//     }
//     return keys;
//   }

//   // Map size
//   this.size = function() {
//     return size;
//   }

//   // 清空Map
//   this.clear = function() {
//     size = 0;
//     entry = new Object();
//   }
// }

// const arr = [1,2,5,9,5,9,5,5,5]

// function test(arr){
//   let result = -1
//   arr.sort()
//   for(let i=0; i<arr.length; i++){
//     let k = 1
//     for(let j=i+1;j<arr.length; j++){
//       if(arr[i] == arr[j]){
//         k++
//       }
//     }
//     if(k>(arr.length/2)){
//       result = arr[i]
//     }
//   }
//   return result
// }
// console.log(test(arr));
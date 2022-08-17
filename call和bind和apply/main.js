// call：个人理解：是运行调用call的函数（friend） 在当前传入指定this（obj）的作用域下
function friend (a, b, c, d) {
  console.log(this.name, a, b, c, d)
  return {name:this.name, a, b, c, d}
}

let obj = {
  name: 'zhang'
}
// const name =  'haohao'

Function.prototype.newCall = function (obj) {
  // var obj = obj || 'window';
  obj.aa = this;
  const arguArr = [];
  for( let i = 1; i < arguments.length; i++){
    arguArr.push('arguments['+i+']')
  }
  let res =  eval('obj.aa(' + arguArr + ')' )
  delete  obj.aa;
  return res
}
// friend.bind()
// console.log(friend.newCall(obj, 'a', 'b', 'c', 'd'))
// call的使用
// let a ={
//   name : "Cherry",
//   fn : function (a,b) {
//     console.log( a + b,this)
//   }
// }
//
// let b = a.fn;
// b.call(a,1,2)       // 3

// apply
// apply 和 call 非常相似， apply 只是把后面的参数作为一个数组，放在第二个参数了

// call
Function.prototype.newBind = function (obj) {
  console.log(arguments, 'wai') // 外层
  let that = this;
  let arr = Array.prototype.slice.call(arguments, 1)
  return function (){
    console.log(arguments, 'nei') // 内层
    let arr2 = Array.prototype.slice.call( arguments )
    let arrSum = Array.prototype.concat(arr, arr2)
    that.apply(obj, arrSum);
  }
}
friend.bind(obj, 'zhang', 'hao')('is a cool boy', '!!!!')

// bind 的new操作
const cc = friend.bind( obj, 'zhang', 'hao' )
const dd = new cc('new Function')

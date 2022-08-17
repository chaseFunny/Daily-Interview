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
console.log(friend.newCall(obj, 'a', 'b', 'c', 'd'))
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

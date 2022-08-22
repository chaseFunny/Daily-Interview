var aa = 'bb';
function fn (){
  var aa = 'vv';
};
const obj ={}
obj.prototype.assign()
fn()
console.log(aa)

// 1. 在全局定义变量，变量是属于window的；
// 2. this实在函数出现而出现的；
// 3. this永远指向调用它的那个对象；
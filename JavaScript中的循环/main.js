// for in
const arr = ['a', 'b']
// 手动给 arr数组添加一个属性
arr.name = 'qiqingfu'

// for in 循环可以遍历出 name 这个键名
for (let i in arr) {
  console.log(i)
  // a
  // b
  // name
}

// 如果不想遍历原型方法和属性的话 （for in）
var arr = [1,2,3]
Array.prototype.a = 123

for (let index in arr) {
  let res = arr[index]
  console.log(res)
}
//1 2 3 123

for(let index in arr) {
  if(arr.hasOwnProperty(index)){
    let res = arr[index]
    console.log(res)
  }
}
// 1 2 3

// for of
const array1 = ['a', 'b', 'c']

for (const val of array1) {
  console.log(val)
}
// a b c

// for of 实现遍历对象
var myObject={
  a:1,
  b:2,
  c:3
}
for (var key of Object.keys(myObject)) {
  console.log(key + ": " + myObject[key]);
}
//a:1 b:2 c:3

// for 循环
for (var num =1; num<=10; num++) {
  console.log(num); //1 2 3 4 5 6 7 8 9 10
}

// while 和 do while
var num = 1;//1、声明循环变量

while (num<=10){//2、判断循环条件;
  document.write(num+"<br />");//3、执行循环体操作；
  num++;//4、更新循环变量；
}

var num = 10;

do{
  console.log(num);//10 9 8 7 6 5 4 3 2 1 0
  num--;
}while(num>=0);
console.log(num);//-1



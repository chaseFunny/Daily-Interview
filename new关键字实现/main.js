// 使用new
function Car (brand, color, isNew) {
  this.brand = brand;
  this.color = color;
  console.log(this, isNew)
  return color
}

// class Phone {
//   constructor(a, b) {
//     this.brand = a;
//     this.price = b;
//   }
//   listen () {
//     console.log('listen music');
//   }
// }
//
// const c1 = new Car('BMW', 'white', true)
// const c2 = Car('audi', 'black', false)
// const p1 = new Phone('xiaomi', 4000)
// console.log(c1, '===c1');
// console.log(c2, '===c2');
// console.log(p1, '===p1');

// 实现一个 new

function new_object() {
  // 创建一个空的对象
  let obj = new Object()
  // 获得构造函数
  let Con = [].shift.call(arguments)
  // 链接到原型 （不推荐使用）
  obj.__proto__ = Con.prototype
  // 绑定 this，执行构造函数
  let result = Con.apply(obj, arguments)
  // 确保 new 出来的是个对象
  return typeof result === 'object' ? result : obj
}

// 更优解
function create() {
  // 1、获得构造函数，同时删除 arguments 中第一个参数
  Con = [].shift.call(arguments);
  // 2、创建一个空的对象并链接到原型，obj 可以访问构造函数原型中的属性
  let obj = Object.create(Con.prototype);
  // 3、绑定 this 实现继承，obj 可以访问到构造函数中的属性
  let ret = Con.apply(obj, arguments);
  // 4、优先返回构造函数返回的对象
  return ret instanceof Object ? ret : obj;
};

// 使用
const myNew1 = new_object( Car,'BMW', 'white', true);
const myNew2 = create( Car,'BMW', 'clearwhite', true)
console.log(myNew2)
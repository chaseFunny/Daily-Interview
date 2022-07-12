// new一个WeakMap 
const wp = new WeakMap()
const obj1 = {foo:1}
wp.set(obj1, 'this is value')
console.log(wp.get(obj1));

// WeakMap 也可以接受一个数组，
// 作为构造函数的参数
const k1 = [1, 2, 3];
const k2 = [4, 5, 6];
const wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']]);
console.log(wm2.get(k2)); // "bar"

// WeakMap 必须接受对象作为key
// wp.set(1,2) // TypeError: Invalid value used as weak map key

// WeakMap 的键名所指向的对象，不计入垃圾回收机制， 这是为了解决内存泄露问题


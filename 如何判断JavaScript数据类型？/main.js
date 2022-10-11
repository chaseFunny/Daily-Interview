// typeof 使用
console.log(typeof undefined) // undefind
console.log(typeof null)      // object
console.log(typeof true)      // boolean
console.log(typeof 43)        // number
console.log(typeof '21')      // string
console.log(typeof {a:1})     // object
console.log(typeof Symbol())  // symbol
console.log(typeof 123n)      // bigint
function a() {}
console.log(typeof a)         // function
var date = new Date()
var error = new Error()
console.log(typeof date)      // object
console.log(typeof error)     // object

// instanceof
console.log(12 instanceof Number)  // false
console.log('22' instanceof String)  // false
console.log(true instanceof Boolean) // false
console.log(null instanceof Object) // false
console.log(undefined instanceof Object) // false

console.log([] instanceof Array)   // true
console.log({a: 1} instanceof Object) // true
console.log(json instanceof Object) // true
function a() {}
console.log(a instanceof Function)  // true
console.log(new Date() instanceof Date)  //true
console.log(reg instanceof RegExp) //true
console.log(error instanceof Error) // true

// Object.prototype.toString.call()
console.log(Object.prototype.toString.call(1))          // [object Number]
console.log(Object.prototype.toString.call(1n))         // [object BigInt]
console.log(Object.prototype.toString.call('123'))      // [object String]
console.log(Object.prototype.toString.call(true))       // [object Boolean]
console.log(Object.prototype.toString.call(undefined))  // [object Undefined]
console.log(Object.prototype.toString.call(null))       // [object Null]
console.log(Object.prototype.toString.call({}))         // [object Object]
console.log(Object.prototype.toString.call([]))         // [object Array]
console.log(Object.prototype.toString.call(function a() {}))  // [object Function]
console.log(Object.prototype.toString.call(Symbol()))         // [object Symbol]
console.log(Object.prototype.toString.call(Math))             // [object Math]
console.log(Object.prototype.toString.call(JSON))             // [object JSON]
console.log(Object.prototype.toString.call(new Date()))       // [object Date]
console.log(Object.prototype.toString.call(new RegExp()))     // [object RegExp]
console.log(Object.prototype.toString.call(new Error))        // [object Error]
console.log(Object.prototype.toString.call(window),           // [object Window]
console.log(Object.prototype.toString.call(document),          // [object HTMLDocument]
// 使用该方法我们可以封装一个isType方法来对类型进行判断
let isType = (type, obj) => {
  return Object.prototype.toString.call(obj) === `[object ${type}]`
}
console.log(isType('Number', 12))   // true
console.log(isType('Number', '12')) // false

// 或者
let type = function(o) {
  let s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};
console.log(type(12)) // number
console.log(type('12')) // string
console.log(type({})) // object
console.log(type([])) // array

// constructor
console.log('22'.constructor === String)             // true
console.log(true.constructor === Boolean)            // true
console.log([].constructor === Array)                // true
console.log(document.constructor === HTMLDocument)   // true
console.log(window.constructor === Window)           // true
console.log(new Number(22).constructor === Number)   // true
console.log(new Function().constructor === Function) // true
console.log((new Date()).constructor === Date)       // true
console.log(new RegExp().constructor === RegExp)     // true
console.log(new Error().constructor === Error)       // true

//判断变量数据类型
function myTypeof(data) {
  const type = typeof data
  if (data === null) {
    return 'null'
  }
  if (type !== 'object') {
    return type
  }
  if (data instanceof Array) {
    return 'array'
  }
  return 'object'
}
myTypeof([1,2]) // array
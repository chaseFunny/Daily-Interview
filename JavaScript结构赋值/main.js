// 交换变量值，也可以多个变量进行交换，写好对应位置即可，这里有一个细节，就是a b都是已经声明的变量，我就不需要再声明 我仅仅是修改值而已

let a = 'cool';
let b = 'show';
[a, b] = [b, a]
console.log(a, b)

// 可以把数组当做对象来处理
let arr = ['java', 'c++', 'python', 'JavaScript', 'go', 'yaml']
const {2: py, 5: ya} = arr;
console.log(py, ya)

// ... 来获取不确定的元素
const [arr1, arr2, ...arrOther] = arr
console.log(arr1, arr2, arrOther)// expect result : java c++ [ 'python', 'JavaScript', 'go', 'yaml' ]

// 嵌套数组结构
const arr11 = ['aaa', 'bbb', arr]
const [,,[java, c11]] = arr11
console.log(java, c11)

// 数组 && 对象都可 给默认值

const obj = {
  aa:'aa',
  bb:'bb',
}
const {aa='cc', bb, cc='dd'} = obj
console.log(aa, cc)

// 对象别名
const carObj = {
  waiguan: 'haokan',
  guanlun: null,
  brand: 'linkeo1',
  isLike: 'sure',
  price: 'so expensive'
}

let isLike = 'do not like';
({isLike} = carObj);
const {guanlun= 'ccTV'} = carObj

const arrcc = ['guanlun', 'isLike']
const { [arrcc[0]]: sha, [arrcc[1]]:shaye} = carObj

console.log(sha, shaye, guanlun)

// 对象的嵌套解构赋值

const nestObj = {
  name: 'vue',
  computed:{
    isOpen: true,
    simple: false
  },
  methods: {
    logFn: (name)=> console.log('heiheihei' + name)
  }
}
const {methods : {logFn}} = nestObj
logFn('kuailenanhai')
const str = '快乐最重要';
const [str1, str2, str3, str4] = str;
console.log(str1, str4)


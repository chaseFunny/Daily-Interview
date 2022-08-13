class Vue {
  constructor(obj_instance) {
    // 传入data，监听data
    this.$data = obj_instance.data;
    Observer(this.$data)
  }
}

/**
 * 数据劫持 -- 监听传入的数据
 * @param obj_instance
 * @constructor
 */
function Observer(obj_instance) {
  // 遍历对象中的每一个属性 ,
  for( let props in obj_instance ) {
    console.log(props, 'props')
  }
  // 使用Object.keys，仅能返回第一次的属性，属性中的属性怎么返回呢？
  console.log(Object.keys(obj_instance),'keys')
  Object.keys(obj_instance).forEach(key =>{
    // 对每一个key实现数据监听，需要用到 Object.defineProperties(obj, props,{}) obj:操作对象，props：操作的属性,{}：实现数据监听
    // enumerable: true => 属性可以枚举；
    // configurable: true => 属性描述符可以被改变
    // 设置getter函数，get(){} 该属性被访问时候触发
    // 设置setter函数，set(){} 该属性被修改时候触发 ，所以get,set就是数据监听的核心
    // 这个方法：直接在一个对象上定义新的属性或修改现有属性，并返回该对象

  })
}
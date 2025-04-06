class Vue {
  constructor(obj_instance) {
    // 传入 data，监听 data
    this.$data = obj_instance.data;
    Observer(this.$data); // data 监听
    Compile(obj_instance.el, this); // 模板解析
  }
}

/**
 * 数据劫持 -- 监听传入的数据
 * @param data_instance
 * @constructor
 */
function Observer(data_instance) {
  // 遍历对象中的每一个属性 ,
  // for( let props in obj_instance ) {
  //   console.log(props, 'props')
  // }
  // 使用 Object.keys，仅能返回第一次的属性，属性中的属性怎么返回呢？
  // 递归出口，条件：没有子属性，没有检测到对象 (这里只讲劫持对象的方式)
  if (!data_instance || typeof data_instance !== "object") return;
  // 创建发布者实例
  const dependency = new Dependency();
  Object.keys(data_instance).forEach((key) => {
    // 对每一个 key 实现数据监听，需要用到 Object.defineProperties(obj, props,{}) obj:操作对象，props：操作的属性，{}：实现数据监听
    // enumerable: true => 属性可以枚举；
    // configurable: true => 属性描述符可以被改变
    // 设置 getter 函数，get(){} 该属性被访问时候触发
    // 设置 setter 函数，set(){} 该属性被修改时候触发，所以 get,set 就是数据监听的核心
    // 这个方法：直接在一个对象上定义新的属性或修改现有属性，并返回该对象
    // 先把属性对应值存起来，用于 get 函数，返回
    let values = data_instance[key];
    Observer(values); // 递归 - 子属性数据劫持
    Object.defineProperty(data_instance, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 不能直接返回属性值，因为这样返回的就是 undefined 了，当使用 Object.defineProperty 之后，值就会改变
        // console.log(Dependency.temp, 'getter')
        // 当有订阅者发起订阅。发布者就需要更新订阅者名单，因为会多次触发 getter 函数，需要做过滤
        Dependency.temp && dependency.addSub(Dependency.temp);
        return values;
      },
      set(newValue) {
        values = newValue;
        // 设置为一个对象或者一个新的属性，时候需要重新监听
        Observer(newValue);
        dependency.notify();
      },
    });
  });
}

/**
 * HTML 模板解析 -替换 DOM
 * @param element vue 实例挂载的元素
 * @param vm vue 实例
 * @constructor
 */
function Compile(element, vm) {
  //document.getElementById() 会增加操作难度？
  vm.$el = document.querySelector(element);
  // 放入临时内存;把当前 element 下的所有子节点加到 fragment 中
  const fragment = document.createDocumentFragment();
  let children;
  // 每当我执行一次 fragment.append(children)，当前这个 children 就会从 vm.$el.children 数组中删除，直到最后一个被 append，下一次判断条件就会为 false，循环结束
  while ((children = vm.$el.firstChild)) {
    fragment.append(children);
  }
  // console.log(fragment, fragment.childNodes)
  fragment_compile(fragment); // 得到内容被修改的文档碎片
  /**
   * 替换文档碎片内容
   * @param node 要修改内容的节点
   */
  function fragment_compile(node) {
    // 先用正则表达式匹配 拿到插值表达式的值，注意 用户可能在{{}}中加空格，
    const pattern = /\{\{\s*(\S+)\s*\}\}/;
    // 文本节点处理
    if (node.nodeType === 3) {
      const xxx = node.nodeValue;
      const result_regex = pattern.exec(xxx);
      if (result_regex) {
        // 兼容当前 data 为对象类型
        // console.log('---------')
        // console.log(xxx, result_regex)
        // console.log('---------')
        const arr = result_regex[1].split(".");
        // 拿到当前节点对应的最新的值（兼容深层嵌套），这样就可以把 value 更新到对应的 node
        const value = arr.reduce((total, current) => {
          // console.log(total, current, total[current])
          return total[current];
        }, vm.$data);
        node.nodeValue = xxx.replace(pattern, value);
        // 为了在数据更新后订阅者知道更新自己
        new Watcher(vm, result_regex[1], (newValue) => {
          node.nodeValue = xxx.replace(pattern, newValue);
        });
        // console.log(xxx )
      }
      return;
    }
    // 输入节点处理 - input
    if (node.nodeType === 1 && node.nodeName === "INPUT") {
      const attr = Array.from(node.attributes);
      console.log(attr, "attr");
      attr.forEach((i) => {
        if (i.nodeName === "v-model") {
          // console.log(i.nodeValue)
          const value = i.nodeValue.split(".").reduce((total, curr) => total[curr], vm.$data);
          // console.log(value, 'value')
          node.value = value;
          // 用于通知数据更新
          new Watcher(vm, i.nodeValue, (newValue) => (node.value = newValue));
          node.addEventListener("input", (e) => {
            // name or album.val
            const arr1 = i.nodeValue.split(".");
            const arr2 = arr1.slice(0, arr1.length - 1);
            const final = arr2.reduce((total, curr) => total[curr], vm.$data);
            console.log(arr1, arr2, final, "final");
            final[arr1[arr1.length - 1]] = e.target.value;
          });
        }
      });
    }
    // 当传入节点非文本节点，并有子节点
    node.childNodes.forEach((child) => fragment_compile(child));
  }
  vm.$el.appendChild(fragment);
}

/**
 * 依赖 - 收集和通知订阅者
 */
class Dependency {
  constructor() {
    this.subscribers = [];
  }
  /**
   * 添加订阅者
   */
  addSub(sub) {
    this.subscribers.push(sub);
  }
  /**
   * 发送订阅
   */
  notify() {
    // 调用订阅者自己的更新方法
    this.subscribers.forEach((sub) => sub.update());
  }
}

/**
 * 订阅者
 */
class Watcher {
  // vm: vue 实例，key：实例对应的属性，callback：记录如何更新文本内容
  constructor(vm, key, callback) {
    this.vm = vm;
    this.key = key;
    this.callback = callback;
    // 临时属性 - 触发 getter，根据作用域的功能，可以最大限度访问这个临时属性
    Dependency.temp = this;
    // 为了能够正确的触发对应属性的 getter
    key.split(".").reduce((total, current) => total[current], vm.$data);
    // 触发 getter 以后，需要把临时属性清空
    Dependency.temp = null;
  }
  update() {
    const value = this.key.split(".").reduce((total, current) => total[current], this.vm.$data);
    this.callback(value);
  }
}

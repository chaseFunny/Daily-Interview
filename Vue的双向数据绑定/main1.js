class Vue {
  constructor(obj_instance) {
    this.$data = obj_instance.data;
    Observer(this.$data) 
    Compile(obj_instance.el, this)  
  }
}

function Observer(data_instance) {
  if( !data_instance || typeof  data_instance !== 'object') return
  const dependency = new Dependency();
  Object.keys(data_instance).forEach(key =>{
    let values = data_instance[key]
    Observer(values)// 递归 - 子属性数据劫持
    Object.defineProperty(data_instance,key,{
      enumerable: true,
      configurable: true,
      get(){
        Dependency.temp && dependency.addSub(Dependency.temp)
        return values
      },
      set(newValue){
        values = newValue
        Observer(newValue)
        dependency.notify()
      },
    })
  })
}

function Compile (element, vm) {
  vm.$el = document.querySelector(element)
  const fragment = document.createDocumentFragment()
  let children
  while (children = vm.$el.firstChild) {
    fragment.append(children)
  }
  fragment_compile(fragment)

  function fragment_compile(node) {
    const pattern =  /\{\{\s*(\S+)\s*\}\}/;
    if(node.nodeType === 3) {
      const xxx = node.nodeValue
      const result_regex = pattern.exec(xxx)
      if(result_regex) {
        const arr = result_regex[1].split('.')
        const value = arr.reduce((total, current)=>{
          return total[current]
        },vm.$data)
        node.nodeValue = xxx.replace(pattern, value)
        new Watcher(vm, result_regex[1],(newValue)=>{
          node.nodeValue =  xxx.replace(pattern, newValue)
        })
      }
      return
    }

    if(node.nodeType === 1 && node.nodeName === 'INPUT') {
      const attr = Array.from(node.attributes)
      attr.forEach(i => {
        if(i.nodeName === 'v-model') {
          const value = i.nodeValue.split('.').reduce((total,curr)=>total[curr], vm.$data)
          node.value = value
          new Watcher(vm, i.nodeValue, newValue => node.value = newValue)
          node.addEventListener('input',e=>{
            const arr1 = i.nodeValue.split('.')
            const arr2 = arr1.slice(0, arr1.length-1 )
            const final = arr2.reduce((total,curr)=> total[curr], vm.$data)
            final[arr1[arr1.length -1]] = e.target.value;
          })
        }
      })
    }
    node.childNodes.forEach(child => fragment_compile(child))
  }
  vm.$el.appendChild(fragment)
}

class Dependency {
  constructor() {
    this.subscribers = []
  }
  addSub (sub){
    this.subscribers.push(sub)
  }
  notify() {
    this.subscribers.forEach(sub => sub.update())
  }
}

class Watcher {
  constructor(vm, key, callback) {
    this.vm = vm;
    this.key = key;
    this.callback = callback
    Dependency.temp = this
    key.split('.').reduce((total, current) => total[current], vm.$data)
    Dependency.temp =null;
  }
  update() {
    const value = this.key.split('.').reduce((total, current) => total[current], this.vm.$data)
    this.callback(value)
  }
}
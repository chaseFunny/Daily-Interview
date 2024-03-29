### Vue.js 数据双向绑定的原理及实现
![pic](../image/vue%E5%8F%8C%E5%90%91%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A.png)
#### 先引入Vue源码实现
1. 创建HTML，创建两个span，使用插值表达式来引入Vue中的数据，同时input标签也使用v-model绑定数据
2. 接下来script标签中，创建Vue实例vm，并且把数据挂载到div标签上，并在控制台打印实例
3. 先使用Vue源码，测试是能够实现双向数据绑定的
4. 接下来就是我们自己来实现这个引入的vue.js文件，来实现数据的双向绑定
#### 自己手动实现
1. 用class创建一个Vue实例，在constructor接受实例传来的值，并存到this.$data
2. 创建一个Observer函数，用来监听$data中的每一个属性，使用Object.defineProperties()实现
3. 为每个属性设置getter 和 setter属性，我们在刚开始定义属性时候并没有设置它 
4. 这里set函数不需要返回，只需要把最新的值赋值给values即可，修改values后，getter触发也会访问最新的values
5. 现在我们只能遍历最外层的属性，如果属性中还有属性就会监听不到
6. 我们需要递归来实现数据深层的监听
7. 现在数据已经劫持到了，并且能够更新，接下来，需要把数据同步更新到view层
8. 获取页面元素  - 应用vue数据 - 渲染页面，这里需要加一个，把所有数据都更新后再渲染页面，而不是获取一个元素渲染一次页面，减少DOM操作
9. 获取页面元素 - 放入临时内存区域 - 应用vue数据 - 渲染页面
10. 创建HTML模板解析函数，接受vue实例挂在的元素和vue实例，这样就可以把vue实例上的数据解析到页面上
11. 我们在构造的时候就调用这个解析器Compile函数
12. 当我们把vue实例绑定元素的值循环存到fragment中，这个时候页面#app下就没有内容了，因为内容现在都存到了临时碎片中
13. 直接把我们要修改的内容应用到应用到文档碎片里面，应用后在重新渲染页面即可
14. 打印fragment.childNodes,我们可以看到这里有很多类型子节点，我们是修改数据，所以我们只需要关心数组中的text节点，文本节点类型是3
15. 创建一个专门修改内容的函数, 函数做的事情是：接受节点，匹配到包含插值表达式的变量，并拿到真正的数据替换掉
16. 现在我们实现了，数据的劫持和显示但是数据变更，还是不能及时更新
17. 使用**发布-订阅者模式** 实现数据双向绑定，这里发布者就是vue实例，订阅者就是
18. 创建 发布者类 和订阅者类，接下来，发布者通知订阅者，订阅者就可以调用自己接受的回调函数来响应更新
19. 那什么时候创建这个订阅者实例呢？ 那么就需要看看我们是什么时候修改文档内容的，也就是在模板解析的时候 也就是节点值替换内容的时候，我们应该告诉订阅者如何更新自己，
也就是替换文档碎片内容的时候告诉订阅者如何更新，之后回调订阅者就知道如何更新自己了
20. 我们还要把订阅者存储到Dependency实例数组中，方法是：我们在创建Watcher实例的时候保存实例到订阅者数组中
21. 接下来就要把这个新的订阅者，添加到订阅者数组中,但是这个时候订阅者实例是不存在的，我们需要创建这个Dependency实例
22. 接下来当数据发生更新，就要在setter中；通知订阅者来更新内容 
23. 现在我们完成了文本的绑定，接下来绑定输入框，vue的v-model可以用来绑定，
    1. 知道那个节点有v-model，元素节点的节点类型nodeType === 1,也可以用nodeName来匹配INPUT元素
    2. 我们可以在compile函数判断文本下进行判断，找到v-model的元素
    3. 把data中的数据传给input的value


#### 知识点
1. Object.keys用于遍历对象，获取对象的属性，并返回一个属性数组
2. Object.defineProperty用于在一个对象上定义新的属性，或者修改现有属性，返回改对象
3. document.createDocumentFragment() 创建一个空白文档片段
4. RegExp.prototype.exec()；在一个指定字符串中执行一个搜索匹配，返回结果数组或者null
5. Array.prototype.reduce() https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
#### 注意
1. 在自己通过**Object.defineProperties**实现双向数据绑定的时候，只对对象类型进行劫持，没有对数组进行劫持
2. vue3.0之前使用的是**Object.defineProperties**，3.0之后使用的是**Proxy**


#### 问题？
1. 如果修改data的时候把一个初始化字符串类型的赋值一个对象类型，这个时候监听就会失效，怎么办？
在监听函数Observer的setter函数中调用自身，来实现对输入的val进行Observer()
2. 如果给$data 添加新的属性并且赋值新的对象，这个时候也会监听不到怎么办？ 
3. 创建一个Observer函数，用来监听$data中的每一个属性

#### 本内容参考视频
技术蛋老师：https://www.bilibili.com/video/BV1934y1a7MN?spm_id_from=333.999.0.0&vd_source=ce628a5bd43df277d141676215ef5ff3
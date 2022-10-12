## 如何判断JavaScript数据类型？

想要回答这个问题，就需要先知道JavaScript有哪些数据类型？
这里引用MDN的，JavaScript 语言中类型集合由**原始值**和**对象**组成。
**原始值**
1. 布尔类型（Boolean), 有`true` 和 `false`
2. Null类型，Null 类型只有一个值：`null`，
3. Undefined类型，一个没有被赋值的变量会有个默认值 undefined，
4. 数字类型（Number），ECMAScript 标准定义了两种内建数值类型：Number（数字类型）和 BigInt
5. BigInt类型，BigInt 类型是 JavaScript 中的一个基础的数值类型，可以表示任意精度的整数。使用 BigInt，您可以安全地存储和操作大整数，甚至可以超过数字类型的安全整数限制。
6. 字符串类型（String）
7. 符号类型（Symbol）符号（Symbols）类型是唯一且不可修改的原始值，并且可以用来作为对象的键 (key)（如下），在某些语言当中也有与之相似的类型（原子类型，atoms）。
**对象**
> 在计算机科学中，对象（object）是指内存中的可以被标识符引用的一块区域。对象拥有两种属性：数据属性和访问器属性。
1. 数组
2. 对象
3. 函数

关于为什么数组和函数也是对象？
它们其实是一种特殊的对象，
参考文章：
1. https://juejin.cn/post/7120886010770096164
2. https://zhuanlan.zhihu.com/p/420209262

知道JavaScript有哪些数据类型后，我们还知道JavaScript是弱类型语言，一个变量的类型是不确定的，我们如何判断变量的数据类型呢？
#### 判断方式
1. `typeof`
typeof是一个操作符而不是函数，其右侧跟一个一元表达式，并返回这个表达式的数据类型。返回的结果用该类型的字符串(全小写字母)形式表示，包括以下 8种：
- number、
- boolean、
- symbol、
- string、
- object、
- undefined、
- function 、
- bigInt

typeof原理是不同的对象在底层都表示为二进制，在Javascript中二进制前（低）三位存储其类型信息。
- 000: 对象
- 010: 浮点数
- 100：字符串
- 110：布尔
- 1：整数

##### 2. `instanceof`
`instanceof` 是用来判断 A 是否为 B 的实例，表达式为：`A instanceof B`，如果 A 是 B 的实例，则返回 true,否则返回 false。 
在这里需要特别注意的是：`instanceof` 检测的是原型
通俗一些讲，`instanceof` 用来比较一个对象是否为某一个构造函数的实例。注意，`instanceof`可以准确的判断复杂数据类型，但是不能正确判断基本数据类型

##### 3. `Object.prototype.toString.call()`
toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 `[[Class]]` 。这是一个内部属性，其格式为` [object Xxx]` ，其中 Xxx 就是对象的类型。
对于 Object 对象，直接调用 toString() 就能返回 [object Object] 。而对于其他对象，则需要通过 call / apply 来调用才能返回正确的类型信息。

##### 4. `constructor`
`constructor`属性，可以得知某个实例对象，到底是哪一个构造函数产生的。
`constructor`属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改`constructor`属性，防止引用的时候出错。所以，修改原型对象时，一般要同时修改`constructor`属性的指向。
###### 注意：
1. `null` 和 `undefined` 是无效的对象，因此是不会有 `constructor` 存在的，这两种类型的数据需要通过其他方式来判断。
2. 函数的 `constructor` 是不稳定的，这个主要体现在自定义对象上，当开发者重写 `prototype` 后，原有的 `constructor` 引用会丢失，`constructor` 会默认为 `Object`

#### 总结
- 可以看见`typeof` 无法判断变量是数组还是对象
- 我通常会使用`typeof`来判断未知类型变量是否为`object`，如果为`object`，我再使用`instanceof`判断变量是否为数组，这样就能准确知道变量类型
- 还可以通过`Object.prototype.toString.call()`
- 其中如何判断变量为数组，可阅读第三篇参考链接
参考链接：
- https://juejin.cn/post/6844904197498880014
- https://juejin.cn/post/7000300249235357709
- https://segmentfault.com/a/1190000004479306



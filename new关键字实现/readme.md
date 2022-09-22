## new关键字使用，及其原生实现

### MDN解释
new运算符：创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。
#### 描述
> new关键字会进行如下操作
1. 创建一个空的，简单的JavaScript对象，也就是 **{}** ，或者是`new Object()`
2. 为新创建的对象添加属性 **_proto_**,将该属性链接至构造函数的原型对象；
3. 将新创建的对象作为this上下文
4. 如果函数没有返回对象，则返回 this

### new 使用
![new关键字使用](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1012/new02.png)
可以看到使用`new` 关键字，和不使用的区别，也可以看到类（class）其实就是构造函数，是其的语法糖；

### 实现一个new
![new实现](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1012/new03.png)
可以看到这里打印的和使用new一样，
注意：
改变一个对象的 [[Prototype]] 属性, 这种行为在每一个JavaScript引擎和浏览器中都是一个非常慢且影响性能的操作
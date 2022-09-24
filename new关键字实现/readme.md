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
可以看到使用`new` 关键字，和不使用的区别，也可以看到类（class）其实就是构造函数的另一种写法，是其的语法糖；
class 的写法其实只是让对象原型的写法更加清晰、更像面向对象编程的语法而已

### 实现一个new
![new实现](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1012/new03.png)
可以看到这里打印的和使用new一样，
我们实现一个new，其实也就是做new关键字所做的事情，
其实构造函数是一个不太友好的设计，我觉得，因为一个函数，还能作为生成对象模板的函数，实在感到困惑
所以我看见 使用new 来操作一个函数，我就将其函数看作为一个 class 类；这样会好理解一点；下文中我也不说构造函数，而是将其称为class
这里我说一些我理解的`new_object` 四步
1. 第一步没啥好说的，就是新建一个空对象，我们叫obj吧
2. 第二步，我们拿到我们的 class 类；我们就叫`Constructor`
3. 第三步；将新对象的内部属性__proto__指向构造函数的原型，这样obj就可以访问原型(`Constructor`)中的属性和方法;
4. 第四步：拿到构造函数的返回值，判断返回值是对象吗？因为有点函数没有返回值，没有返回值，我们就把obj作为返回值，return出去；
注意：
1. 改变一个对象的 [[Prototype]] 属性, 这种行为在每一个JavaScript引擎和浏览器中都是一个非常慢且影响性能的操作，所以更优解就是解决这个问题的；
2. 有一个我当时看了很久的地方，就是第三步，我们第三步做到事情，其实调用一个传入的 class 类（构造函数），并且将其赋值给我们的ret，这样我们的ret就是 class的返回值

### 参考文档：
1. https://juejin.cn/post/6844904112857825293
2. https://github.com/sisterAn/JavaScript-Algorithms/issues/71
3. https://github.com/mqyqingfeng/Blog/issues/13

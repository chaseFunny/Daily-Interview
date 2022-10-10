## JavaScript事件机制

### 前置知识
`JavaScript`采用异步事件驱动编程模型，与`HTML`的交互是通过事件实现的；
通俗的讲，JavaScript事件机制描述的是事件在`DOM`里面的传递顺序，以及我们可以对这些事件做出如何的相应，

### JavaScript事件触发的三个阶段
1. `CAPTURING_PHASE`: 捕获阶段；
2. `AT_TARGET`: 目标阶段；
3. `BUBBLING_PHASE`: 冒泡阶段；
> 我们可以通过事件对象的`eventPhase`属性，得知事件处于哪个阶段，`eventPhase`是一个正整数，其定义可在`Event interface`查阅

```js
const unsigned short CAPTURING_PHASE = 1;
const unsigned short AT_TARGET       = 2;
const unsigned short BUBBLING_PHASE  = 3;
```
`DOM` 的事件在传播时，会从根节点开始往下传递到 `target` ，若注册了事件监听器，则监听器处于捕获阶段。。

`target` 就是触发事件的具体对象，这时注册在 `target` 上的事件监听器处于目标阶段。

最后，事件再往上从 `target` 一路逆向传递到根节点，若注册了事件监听器，则监听器处于冒泡阶段。

### target 和 currentTarget
- `target` : 是触发事件的某个具体对象，只会出现在事件机制的目标阶段，即，谁触发了事件，谁就是`target`
- `currentTarget` : 绑定事件的对象

#### addEventListener() 和 removeEventListener()
MDN: https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
分别是：添加 和 删除 事件的函数
**注意**
1. 三个参数分别是：事件名称（string），要触发的事件处理函数（Function），指定事件处理函数执行的时期或阶段（Boolean），
2. 第三个参数为`true`,代表捕获阶段执行函数，`false`代表冒泡阶段执行函数，默认为false

### 结论（conclusion）
1. 先捕获，再冒泡
2. 在`target`上注册的监听器，不分捕获和冒泡
3. 我们可以通过`e.stopPropagation`中断事件，向下或向上传递，但是不能阻止同一节点的其他`listener`的执行
4. 我们可以通过`e.preventDefault()`来取消默认行为
5. 我们可以在子节点的父节点，绑定事件，实现事件代理
## 参考文档
[JavaScript事件机制](https://cloud.tencent.com/developer/article/1405729#:~:text=%E9%80%9A%E4%BF%97%E5%9C%B0%E6%9D%A5%E8%AF%B4%EF%BC%8C%20JavaScript%20%E4%BA%8B%E4%BB%B6%E6%9C%BA%E5%88%B6%E6%8F%8F%E8%BF%B0%E7%9A%84%E6%98%AF%E4%BA%8B%E4%BB%B6%E5%9C%A8%20DOM%20%E9%87%8C%E9%9D%A2%E7%9A%84%E4%BC%A0%E9%80%92%E9%A1%BA%E5%BA%8F%EF%BC%8C%E4%BB%A5%E5%8F%8A%E6%88%91%E4%BB%AC%E5%8F%AF%E4%BB%A5%E5%AF%B9%E8%BF%99%E4%BA%9B%E4%BA%8B%E4%BB%B6%E5%81%9A%E5%87%BA%E5%A6%82%E4%BD%95%E7%9A%84%E5%93%8D%E5%BA%94%E3%80%82%20%E5%81%87%E8%AE%BE%E6%88%91%E4%BB%AC%E5%85%B7%E6%9C%89%E4%B8%80%E4%B8%AA%20ul%20%E5%85%83%E7%B4%A0%EF%BC%8C%E5%85%B6%E5%8C%85%E6%8B%AC%E5%BE%88%E5%A4%9A,li%20%E6%97%B6%EF%BC%8C%E5%85%B6%E5%AE%9E%E6%88%91%E4%BB%AC%E4%B9%9F%E7%82%B9%E5%87%BB%E4%BA%86%20ul%20%EF%BC%8C%E5%9B%A0%E4%B8%BA%20ul%20%E6%8A%8A%E6%89%80%E6%9C%89%E7%9A%84%20li%20%E5%85%83%E7%B4%A0%E7%BB%99%E2%80%9C%E5%8C%85%E8%A3%85%E2%80%9D%E4%BA%86%E3%80%82)
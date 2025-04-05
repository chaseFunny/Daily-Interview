## 事件循环

我们都知道 JavaScript 是单线程的，也就是只有一个调用栈，调用栈是按照先入后出的顺序进行事件执行，

调用栈先执行同步任务，再执行异步任务，调用栈在发现异步任务时候，先把异步任务放到队列中，这里异步任务，又分为 **宏任务队列** 和 **微任务队列** ，队列都是按照先入先出规则，宏任务是耗时更久的，微任务是相对耗时短一点的

**宏任务：**

1. 新程序或者子程序被直接执行，例如：`<script>`元素里面运行的代码，是程序被执行
2. 事件的回调函数，例如：鼠标点击事件；
3. setTimeout() 和 setInterval()
4. ajax
5. 还有 I/0 操作，setImmediate，UI rendering 等等

**微任务：**

1. `promise.then().catch().finally()`
2. Mutation Observer API
3. Object.observe
4. Node.js 的 process.nextTick()

宏任务和微任务的运行顺序，需要依靠`Event Loop` **事件循环**，它是一个不断进行的循环机制。它不断的去寻找可以执行的任务来执行，

1. 在执行完同步任务以后，它首先会执行微任务队列的任务，
2. 将微任务队列清空后，才会去执行宏任务
3. 在进行下一步宏任务之前，游览器可能会发生渲染，在渲染以后再去执行宏任务

#### 注意：

1. 在执行任何宏任务之前，都会先查看微任务队列是否清空（是否有任务需要执行），也就是必须保证微任务队列为空，如果不是空，那么久优先执行微任务队列中的任务
2. 一段代码，首选应该执行的是宏任务，因为一个新程序执行就是一个宏任务
3. 每执行完一个宏任务，就会先去执行微任务，直到微任务队列为空，再去执行下一个宏任务
4. 当微任务队列执行完后，可能会游览器进行渲染，渲染后再执行宏任务
5. 我们不要忘记了不管是宏任务还是微任务他们都是异步，同步任务是最先执行的

### 参考资料

1. [JavaScript 宏任务与微任务 - Web 前端工程师面试题讲解\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1eQ4y1d7mE/?spm_id_from=333.337.search-card.all.click&vd_source=ce628a5bd43df277d141676215ef5ff3)

#### 深入文档

1. [浏览器与 Node 的事件循环 (Event Loop) 有何区别？](https://juejin.cn/post/6844903761949753352#heading-12)
2. [一文带你了解 requestAnimationFrame](https://juejin.cn/post/7082366494348148744)
3. MDN 解释：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop

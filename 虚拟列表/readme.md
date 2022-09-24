## 如何实现一个虚拟列表？

> 想要实现一个虚拟列表，那就需要先了解它，虚拟列表是为了解决网页中一次渲染大量列表项（DOM）卡顿，让页面更加流畅而产生的

实现虚拟列表的核心思想： 当用户滚动屏幕时候，我们修改可视范围内的内容
![虚拟列表](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/1012/虚拟列表.png)
### 知识点
1. clientHeight、offsetHeight、scrollHeight、offsetTop、scrollTop的区别
   1. `Element.clientHeight`：https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientHeight
   2. `HTMLElement.offsetHeight`：https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetHeight
   3. `Element.scrollHeight`：https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollHeight
   4. `offsetTop`：https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetTop
   5. `scrollTop`：https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTop

实现步骤：
1. 计算可见区域起始数据的索引值`startIndex`，和可见区域结束的索引值`endIndex`
2. 根据首位索引取相应范围的数据，渲染到可视区域
3. 计算上滚动空白区域；下滚动空白区域，这两个偏移量的作用用来撑开元素内容，从而起到缓冲的作用，使得滚动条保持平滑滚动和让滚动条处于正确的位置


### 参考文档
1. 虚拟列表实现：https://juejin.cn/post/6844903982742110216#heading-4
2. 虚拟列表实现：https://juejin.cn/post/7085941958228574215
3. 虚拟列表实现：https://zhuanlan.zhihu.com/p/34585166
4. 窗口参数：https://juejin.cn/post/6844903586204221447
5. 窗口参数：https://juejin.cn/post/6844903488124633096
6. 窗口参数：https://blog.csdn.net/qq_29695701/article/details/73734047
### 参考代码
1. **vue:** https://codesandbox.io/s/virtuallist2-1bqk6
2. **React:** https://codesandbox.io/s/a-v-list-has-dynamic-inner-height-modal-demo-forked-jlfswi
## 动画

我觉得动画是前端很有魅力的一部分，下面就学习一些动画吧！
分享一下我了解的 css 实现动画的方式
最近喜欢先去看 MDN；那就看看**MDN 怎么说**

### css 动画使用

`css animations`使得可以将从**一个 css 样式配置**转换到**另一个 css 样式配置**，动画包含两部分：

1. 描述动画的样式规则
2. 用于指定动画开始，结束以及中间样式的关键帧
   **相比于传统使用脚本实现动画，css 实现动画主要有三个优势：**
3. 能够非常容易创建简单的动画，甚至不需要使用 JavaScript
4. 动画运行效果良好，甚至在低性能的系统上。渲染引擎会使用跳帧或者其他技术以保证动画表现尽可能的流畅。而使用 JavaScript 实现的动画通常表现不佳（除非经过很好的设计）。
5. 让浏览器控制动画序列，允许浏览器优化性能和效果，如降低位于隐藏选项卡中的动画更新频率。

### 动画实现的属性

1. 创建动画序列需要使用`animation`属性或其子属性，该属性允许配置动画时间，时长及其其他动画细节，蛋该属性不能配置动画的实际表现，
2. 动画实际表现由`@keyframes`规则实现，
   `animation`的子属性有：
3. `animation-delay`:设置延时，即从元素加载完成之后到动画序列开始执行的这段时间
4. `animation-direction`: 设置动画在每次运行完后，是反向运行还是重新回到开始位置重复运行
5. `animationn-duration`: 设置动画一个周期时长，
6. `animation-iteration-count`:设置动画重复次数，值为`infinite`即无线重复动画
7. `animation-name`:动画名称，指定由`@keyframes`描述的关键帧名称，
8. `animation-play-state`:允许暂停和恢复动画
9. `animation-timing-function`:设置动画速度，即通过建立加速度曲线，设置动画在关键帧之间是如何变化
10. `animation-fill-mode`指定动画执行前后，如何为目标元素应用样式

### 动画的原理

定义：由许多静止的画面（帧），以一定的速度（如每秒 30 张）连续播放时，因为肉眼视觉残像产生错觉，而误以为是活动的画面
帧（概念）：每一个静止画面都叫做帧
播放速度：每秒 24 帧（影视）或者 25 帧（动画）或者 30 帧（游戏）

### CSS 动画的两种方法

- `transition` 过渡
- `animation` 动画

我们再看看过渡相关的知识
MDN:**transition** CSS 属性是 `transition-property`，`transition-duration`，`transition-timing-function` 和 `transition-delay` 的一个简写属性。

- transition-property 指定应用过渡属性的名称
- transition-duration 属性以秒或毫秒为单位指定过渡动画所需的时间。默认值为 0s，表示不出现过渡动画。
- transition-timing-function 变化速度曲线
- transition-delay 规定了在过渡效果开始作用之前需要等待的时间

#### 注意

不是所有的属性都可以 transition，例如：display: none =>block，就不可以
一般改成 visibility:hidden ==> visibile (没有为什么，我也不知道)

### 参考文档

知乎：https://zhuanlan.zhihu.com/p/125136866
掘金：https://juejin.cn/post/7069945906518294536

## 对于 string、number 等基础类型，== 和 === 是有区别的

a）不同类型间比较，== 之比较 "转化成同一类型后的值" 看 "值" 是否相等，=== 如果类型不同，其结果就是不等。
b）同类型比较，直接进行 "值" 比较，两者结果一样。
2、对于 Array,Object 等高级类型，== 和 === 是没有区别的 会进行 "指针地址" 比较
3、基础类型与高级类型，== 和 === 是有区别的
a）对于 ==，将高级转化为基础类型，进行 "值" 比较
b）因为类型不同，=== 结果为 false
4、!= 为 == 的非运算，!== 为 === 的非运算
参考文章：https://www.runoob.com/note/12388
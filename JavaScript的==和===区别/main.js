var num = 1;

var str = '1';

var test = 1;

test == num   //true　相同类型　相同值

test === num  //true　相同类型　相同值

test !== num  //false test与num类型相同，其值也相同,　非运算肯定是false


num == str   //true 　把str转换为数字，检查其是否相等。

num != str   //false  == 的 非运算

num === str  //false  类型不同，直接返回false

num !== str  //true   num 与 str类型不同 意味着其两者不等　非运算自然是true啦

// 结果是什么？
[1] == 1;
1 === [1] ;
// 1 == {1}不合法 ===也是

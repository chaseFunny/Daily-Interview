// 问题代码
setTimeout(() => {
  console.log(1);
});
requestAnimationFrame(() => {
  console.log(2);
});
setTimeout(() => {
  console.log(4);
});
Promise.resolve(3).then((res) => {
  console.log(res);
});
// expect result : 3 -> 1 -> 2 -> 4; 3 -> 2 ->1 -> 4;3 -> 1 -> 4 -> 2
// reason: 因为setTimeout是宏任务，Promise.then()是微任务，requestAnimationFrame是页面重新渲染执行，页面什么时候重新渲染是不确定的

// 再看下面这个例子
async function async1 () {
  console.log('async1 start')
  await async2();
  console.log('async1 end')
}

async function async2 () {
  console.log('async2')
}

console.log('script start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

async1();

new Promise (function (resolve) {
  console.log('promise1')
  resolve();
}).then (function () {
  console.log('promise2')
})

console.log('script end')

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout

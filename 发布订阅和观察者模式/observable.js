// 观察者模式
function observable(value) {
  const subscribers = new Set();
  return {
    get value() {
      return value;
    },
    set value(newValue) {
      value = newValue;
      this.notify(newValue);
    },
    subscribe: (subscriber) => {
      subscribers.add(subscriber);
    },
    notify: (data) => {
      subscribers.forEach((subscriber) => subscriber(data));
    },
    unsubscribe: (subscriber) => {
      subscribers.delete(subscriber);
    },
    getSubscribers: () => {
      return subscribers;
    },
  };
}

function fn(A) {
  console.log(this, A, "this");
}

fn.call({ bb: "cc" }, 1);

// const count = observable.apply({ a: 1 }, [32]);

// 使用示例
const count = observable(32);
count.subscribe((data) => {
  console.log("data", data);
});
count.value = 2;
module.exports = observable;

class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  // 订阅
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
  }
  // 发布
  emit(event, ...args) {
    if (!this.events.has(event)) {
      return;
    }
    this.events.get(event).forEach((callback) => callback(...args));
  }
  // 取消订阅
  off(event, callback) {
    if (!this.events.has(event)) {
      return;
    }
    this.events.get(event).filter((cb) => cb !== callback);
  }
  // 订阅一次
  once(event, callback) {
    const onceCallback = (...args) => {
      callback(...args);
      this.off(event, onceCallback);
    };
    this.on(event, onceCallback);
  }
  // 取消所有订阅
  removeAllListeners(event) {
    if (!this.events.has(event)) {
      return;
    }
    this.events.delete(event);
  }
  // 获取订阅者数量
  listenerCount(event) {
    return this.events.has(event) ? this.events.get(event).length : 0;
  }
  // 获取所有事件
  getEvents() {
    return Array.from(this.events.keys());
  }
}

// 使用示例
const emitter = new EventEmitter();

emitter.on("event", (data) => {
  console.log("event", data);
});

emitter.emit("event", "hello");
module.exports = EventEmitter;

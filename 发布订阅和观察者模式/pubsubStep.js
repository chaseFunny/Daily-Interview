// 第一步 创建发布订阅类

class PubSub {
  constructor() {
    // 存储主题和订阅者
    this.topics = new Map();
    this.subUid = -1; // 订阅 id
  }
  /**
   * 订阅者
   * @param {*} topic 订阅主题
   * @param {*} callback 执行响应
   * @returns 订阅 token，用于取消订阅
   */
  subscribe(topic, callback) {
    // 如果还没有该主题
    if (!this.topics.has(topic)) {
      this.topics.set(topic, []);
    }
    // 生成唯一订阅 id
    const token = (++this.subUid).toString();
    // 存储订阅者
    this.topics.get(topic).push({
      token,
      callback,
    });
    return token;
  }
  /**
   * 发布者
   * @param {*} topic 主题
   * @param {*} data 数据
   * @returns 是否成功发布
   */
  publish(topic, data) {
    // 如果主题不存在，什么都不做
    if (!this.topics.has(topic)) {
      return false;
    }
    const subscribes = this.topics.get(topic);
    subscribes.forEach((subscriber) => {
      subscriber.callback(data, topic);
    });
    return true;
  }
}

// 使用示例
const pubSub = new PubSub();
pubSub.subscribe("sayHei", () => {
  console.log("hi");
});

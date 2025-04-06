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
   * @param {*} option
   * @returns 订阅 token，用于取消订阅
   */
  subscribe(topic, callback, option = {}) {
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
      once: !!option.once,
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
  /**
   * 取消订阅
   * @param {string} token 订阅令牌
   * @param {string} [topic] 可选的主题参数，如果提供则只在该主题中查找令牌
   * @returns {boolean} 是否成功取消订阅
   */
  unsubscribe(token, topic) {
    // 如果提供了主题参数，只在该主题中查找
    if (topic) {
      if (!this.topics.has(topic)) {
        return false;
      }

      const subscribers = this.topics.get(topic);
      const index = subscribers.findIndex((subscriber) => subscriber.token === token);

      if (index !== -1) {
        subscribers.splice(index, 1);
        return true;
      }

      return false;
    }

    // 如果没有提供主题，在所有主题中查找
    for (const [topicName, subscribers] of this.topics.entries()) {
      const index = subscribers.findIndex((subscriber) => subscriber.token === token);

      if (index !== -1) {
        subscribers.splice(index, 1);
        return true;
      }
    }

    return false;
  }
}

// 使用示例
const pubSub = new PubSub();
pubSub.subscribe("sayHei", () => {
  console.log("hi");
});

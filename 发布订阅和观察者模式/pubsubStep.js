// 第一步 创建发布订阅类

class PubSub {
  constructor() {
    // 存储主题和订阅者
    this.topics = new Map();
    this.subUid = -1; // 订阅 id
  }
}

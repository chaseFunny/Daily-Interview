/**
 * PubSub - A simple publish-subscribe implementation
 *
 * This implementation provides:
 * - Topic-based subscription
 * - Synchronous and asynchronous event publishing
 * - One-time subscriptions
 * - Subscription to multiple topics at once using wildcards
 * - Subscription priority levels
 * - Subscription filtering
 */
class PubSub {
  constructor() {
    // Storage for topics and their subscribers
    this.topics = {};
    // For generating unique subscription IDs
    this.subUid = -1;
  }

  /**
   * Subscribe to events of a particular topic
   * @param {String} topic - The topic to subscribe to
   * @param {Function} callback - The function to call when a matching topic is published
   * @param {Object} options - Additional options for the subscription
   * @returns {String} A subscription token that can be used to unsubscribe
   */
  subscribe(topic, callback, options = {}) {
    // Create the topic if it doesn't exist
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }

    // Generate a unique token for this subscription
    const token = (++this.subUid).toString();

    // Add subscriber to topic with its options
    this.topics[topic].push({
      token,
      callback,
      priority: options.priority || 0,
      once: !!options.once,
      filter: options.filter || null,
    });

    // Sort subscribers by priority (higher numbers have higher priority)
    this.topics[topic].sort((a, b) => b.priority - a.priority);

    return token;
  }

  /**
   * Subscribe once to a topic, then automatically unsubscribe after first event
   * @param {String} topic - The topic to subscribe to
   * @param {Function} callback - Function to call when a matching topic is published
   * @returns {String} A subscription token that can be used to unsubscribe
   */
  subscribeOnce(topic, callback) {
    return this.subscribe(topic, callback, { once: true });
  }

  /**
   * Subscribe to multiple topics using a wildcard pattern
   * @param {String} pattern - Pattern with * as wildcard (e.g., "user.*")
   * @param {Function} callback - Function to call when matching topics are published
   * @returns {Array} Array of subscription tokens
   */
  subscribeToPattern(pattern, callback) {
    const tokens = [];
    const regex = new RegExp("^" + pattern.replace("*", ".*") + "$");

    // Subscribe callback to all existing topics that match the pattern
    Object.keys(this.topics).forEach((topic) => {
      if (regex.test(topic)) {
        tokens.push(this.subscribe(topic, callback));
      }
    });

    // Special pattern topic to handle future topic matches
    tokens.push(
      this.subscribe("__pattern__", (data, topic) => {
        if (regex.test(topic)) {
          callback(data, topic);
        }
      })
    );

    return tokens;
  }

  /**
   * Publish synchronously to a topic
   * @param {String} topic - The topic to publish to
   * @param {Any} data - The data to pass to subscribers
   * @returns {Boolean} True if topic existed and event was published
   */
  publish(topic, data) {
    // If the topic doesn't exist or has no subscribers, return false
    if (!this.topics[topic] || this.topics[topic].length === 0) {
      // But first, notify pattern subscribers
      if (Object.keys(this.topics).includes("__pattern__")) {
        this.publish("__pattern__", data, topic);
      }
      return false;
    }

    // Get subscribers
    const subscribers = this.topics[topic].slice();
    const tokensToRemove = [];

    // Call each subscriber
    subscribers.forEach((subscriber) => {
      // Check if there's a filter and if data passes the filter
      if (subscriber.filter && !subscriber.filter(data)) {
        return; // Skip this subscriber if data doesn't pass filter
      }

      // Call the subscriber with data and topic
      subscriber.callback(data, topic);

      // If this was a one-time subscription, mark it for removal
      if (subscriber.once) {
        tokensToRemove.push(subscriber.token);
      }
    });

    // Remove one-time subscribers
    tokensToRemove.forEach((token) => this.unsubscribe(token));

    return true;
  }

  /**
   * Publish asynchronously to a topic
   * @param {String} topic - The topic to publish to
   * @param {Any} data - The data to pass to subscribers
   * @returns {Promise} Resolves when all subscribers have been called
   */
  publishAsync(topic, data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.publish(topic, data);
        resolve();
      }, 0);
    });
  }

  /**
   * Unsubscribe from a specific subscription
   * @param {String} token - The subscription token
   * @returns {Boolean} True if successfully unsubscribed
   */
  unsubscribe(token) {
    // Iterate through all topics
    for (const topic in this.topics) {
      const subscribers = this.topics[topic];

      // Find the subscription with the given token
      const index = subscribers.findIndex((subscriber) => subscriber.token === token);

      // Remove the subscription if found
      if (index !== -1) {
        subscribers.splice(index, 1);
        return true;
      }
    }

    return false;
  }

  /**
   * Clear all subscriptions for a topic
   * @param {String} topic - The topic to clear
   * @returns {Boolean} True if the topic existed and was cleared
   */
  clearTopic(topic) {
    if (this.topics[topic]) {
      delete this.topics[topic];
      return true;
    }
    return false;
  }

  /**
   * Clear all subscriptions
   */
  clearAll() {
    this.topics = {};
    this.subUid = -1;
  }

  /**
   * Get all active topics
   * @returns {Array} List of active topics
   */
  getTopics() {
    return Object.keys(this.topics);
  }

  /**
   * Count subscribers for a topic
   * @param {String} topic - The topic to count subscribers for
   * @returns {Number} Number of subscribers
   */
  countSubscribers(topic) {
    return this.topics[topic] ? this.topics[topic].length : 0;
  }
}

// commonjs export
module.exports = PubSub;

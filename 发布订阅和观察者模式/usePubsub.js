// Import the PubSub class
const PubSub = require("./pubsub.js");

// Example 1: Basic Usage
function basicExample() {
  console.log("=== Basic PubSub Example ===");

  // Create a new PubSub instance
  const pubsub = new PubSub();

  // Subscribe to a topic
  const token = pubsub.subscribe("user.login", (data) => {
    console.log(`User logged in: ${data.username}`);
  });

  // Publish an event
  pubsub.publish("user.login", { username: "john_doe", timestamp: Date.now() });

  // Unsubscribe
  pubsub.unsubscribe(token);

  // This won't trigger any callbacks since we unsubscribed
  pubsub.publish("user.login", { username: "jane_doe", timestamp: Date.now() });
}

// Example 2: One-time subscription
function oneTimeSubscriptionExample() {
  console.log("\n=== One-time Subscription Example ===");

  const pubsub = new PubSub();

  // Subscribe once
  pubsub.subscribeOnce("notification", (data) => {
    console.log(`Received one-time notification: ${data.message}`);
  });

  // This will trigger the callback
  pubsub.publish("notification", { message: "First notification" });

  // This won't trigger anything as the subscription was removed after first event
  pubsub.publish("notification", { message: "Second notification" });
}

// Example 3: Wildcard/Pattern subscriptions
function patternSubscriptionExample() {
  console.log("\n=== Pattern Subscription Example ===");

  const pubsub = new PubSub();

  // Subscribe to all user events
  const tokens = pubsub.subscribeToPattern("user.*", (data, topic) => {
    console.log(`${topic} event:`, data);
  });

  // These will all trigger the pattern subscription
  pubsub.publish("user.login", { username: "john_doe" });
  pubsub.publish("user.logout", { username: "john_doe" });
  pubsub.publish("user.profile.update", { username: "john_doe", field: "email" });

  // This won't trigger as it doesn't match the pattern
  pubsub.publish("system.error", { code: 500, message: "Internal error" });
}

// Example 4: Priority-based subscriptions
function priorityBasedExample() {
  console.log("\n=== Priority-based Subscription Example ===");

  const pubsub = new PubSub();

  // Subscribe with different priorities
  pubsub.subscribe(
    "message",
    (data) => {
      console.log(`Low priority handler: ${data.text}`);
    },
    { priority: 1 }
  );

  pubsub.subscribe(
    "message",
    (data) => {
      console.log(`High priority handler: ${data.text}`);
    },
    { priority: 10 }
  );

  pubsub.subscribe(
    "message",
    (data) => {
      console.log(`Medium priority handler: ${data.text}`);
    },
    { priority: 5 }
  );

  // The callbacks will be executed in order of priority (high to low)
  pubsub.publish("message", { text: "Hello World" });
}

// Example 5: Filtered subscriptions
function filteredSubscriptionExample() {
  console.log("\n=== Filtered Subscription Example ===");

  const pubsub = new PubSub();

  // Subscribe with a filter
  pubsub.subscribe(
    "log",
    (data) => {
      console.log(`ERROR: ${data.message}`);
    },
    {
      filter: (data) => data.level === "error",
    }
  );

  // This will be filtered out
  pubsub.publish("log", { level: "info", message: "System started" });

  // This will pass the filter and trigger the callback
  pubsub.publish("log", { level: "error", message: "Connection failed" });
}

// Example 6: Async publishing
async function asyncPublishExample() {
  console.log("\n=== Async Publishing Example ===");

  const pubsub = new PubSub();

  pubsub.subscribe("async-event", (data) => {
    console.log(`Received async event: ${data.message}`);
  });

  console.log("Before publishing async event");

  // Publish asynchronously
  await pubsub.publishAsync("async-event", { message: "This is asynchronous" });

  console.log("After publishing async event");
}

// Example 7: Real-world application - Chat system
function chatSystemExample() {
  console.log("\n=== Chat System Example ===");

  const pubsub = new PubSub();

  // Simulate users
  const users = {
    alice: { name: "Alice", rooms: ["general", "tech"] },
    bob: { name: "Bob", rooms: ["general", "random"] },
    charlie: { name: "Charlie", rooms: ["tech"] },
  };

  // Each user subscribes to their rooms
  Object.entries(users).forEach(([userId, user]) => {
    user.rooms.forEach((room) => {
      pubsub.subscribe(`chat.room.${room}`, (message) => {
        if (message.from !== userId) {
          // Don't show own messages
          console.log(`[${user.name}'s view | ${room}] ${message.from}: ${message.text}`);
        }
      });
    });
  });

  // Send some messages
  function sendMessage(from, room, text) {
    console.log(`${users[from].name} sends to ${room}: ${text}`);
    pubsub.publish(`chat.room.${room}`, { from, text, timestamp: Date.now() });
  }

  sendMessage("alice", "general", "Hello everyone!");
  sendMessage("bob", "general", "Hi Alice!");
  sendMessage("alice", "tech", "Anyone know how to use the PubSub pattern?");
  sendMessage("charlie", "tech", "I do! It's a messaging pattern for decoupled communication.");
  sendMessage("bob", "random", "Is anyone here?");
}

// Run all examples
(async function runAllExamples() {
  basicExample();
  oneTimeSubscriptionExample();
  patternSubscriptionExample();
  priorityBasedExample();
  filteredSubscriptionExample();
  await asyncPublishExample();
  chatSystemExample();
})();

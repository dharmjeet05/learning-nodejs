const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.on('greet', (username) => {
  console.log("hello and welcome to event in nodejs " + username)
});

eventEmitter.once('pushnotify', () => {
  console.log("This event is running only once")
})

// Emit the event
eventEmitter.emit('greet', 'dharmjeet')
eventEmitter.emit('pushnotify')
eventEmitter.emit('pushnotify')
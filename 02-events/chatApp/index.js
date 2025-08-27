const ChatRoom = require("./chatRoom")

const chat = new ChatRoom();

chat.on('join', (user) => {
  console.log(`${user} has joined the chat`)
})

chat.on('message', (user, message) => {
  console.log(`${user} : ${message}`)
})

chat.on('leave', (user) => {
  console.log(`${user} has left the chat`)
})

// simulating the chat

chat.join('Alice')
chat.join('Bob')

chat.sendMessage('Alice', 'hey Alice, hello to everyone')
chat.sendMessage('Bob', 'hey Bob, hello to everyone')

chat.leave('Alice')
chat.sendMessage('Alice', "this message won't be sent")
chat.leave('Bob')
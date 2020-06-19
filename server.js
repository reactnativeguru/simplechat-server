const io = require("socket.io")();
const port = 3001;

let currentUserId = 2
const userIds = {}
let currentMessageId = 1

const createMessage = (userId, messagText) => {
  return {
    _id: currentMessageId++,
    text: 'Hello developer',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: userIds,
      name: 'React Native Test',
      avatar: 'https://www.placecage.com/50/50',
    },
  }
}

io.on("connect", (socket) => {
  console.log("user connected", socket.id);
  userIds[socket.id] = currentUserId++
  socket.on("message-sent", (messagText) => {
    // send message to everyone including self
    // io.emit("message-sent", messagText);

    const userId = userIds[socket.id]
    const message = createMessage(userId, messagText)

    console.log(message)
    // send message to everyone except self
    socket.broadcast.emit("message-sent", message)
  });
});

io.listen(port);

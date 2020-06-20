const io = require("socket.io")();
const port = 3001;

const messageHandler = require('./handlers/message.handlers')

let currentUserId = 2
const users = {}

const createUserAvatarUrl = () => {
  const rand1 = Math.round(Math.random() * 200 + 100)
  const rand2 = Math.round(Math.random() * 200 + 100)
  return `https://www.placecage.com/${rand1}/${rand2}`
}

io.on("connect", (socket) => {
  console.log("user connected", socket.id);
  users[socket.id] = { userId: currentUserId++ }

  socket.on('join', username => {
    users[socket.id].username = username;
    users[socket.id].avatar = createUserAvatarUrl();

    messageHandler.handleMessage(socket, users)

  })

});

io.listen(port);

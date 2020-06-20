let currentMessageId = 1
var date = new Date();
const now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
    date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

const createMessage = (user, messagText) => {
    return {
        _id: currentMessageId++,
        text: messagText,
        createdAt: new Date(now_utc),
        user: {
            _id: user.userId,
            name: user.username,
            avatar: user.avatar,
        },
    }
}


const handleMessage = (socket, users) => {
    socket.on("message", (messagText) => {
        // send message to everyone including self
        // io.emit("message-sent", messagText);

        const user = users[socket.id]
        const message = createMessage(user, messagText)

        console.log(message)
        // send message to everyone except self
        socket.broadcast.emit("message", message)
    });
}

module.exports = { handleMessage }
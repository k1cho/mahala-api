module.exports = function (io, User, _) {
    const user = new User()

    io.on('connection', (socket) => {
        socket.on('refresh', () => {
            io.emit('refreshPage', {})
        })

        socket.on('online', (data) => {
            socket.join(data.room)
            user.enterRoom(socket.id, data.user, data.room)
            const list = user.getList(data.room)
            io.emit('usersOnline', _.uniq(list))
        })
    })
}
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

        socket.on('disconnect', () => {
            const userData = user.removeUser(socket.id)
            if (userData) {
                const userArray = user.getList(userData.room)
                const arr = _.uniq(userArray)
                _.remove(arr, n => n === userData.name)
                io.emit('usersOnline', arr)
            }
        })
    })
}
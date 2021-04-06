const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const port = process.env.PORT || 4000

app.use(express.static(path.resolve('public')))

let onlineUsers = 0

io.on('connection', (socket) => {
  socket.on('joinChat', user => {
    onlineUsers++
    io.emit('message', { username: 'Chatbot', message: `${user} has joined the room` })
    io.emit('joinChat', onlineUsers)
  })
  console.log('user connected');

  socket.on('message', (message) => {
    console.log(message)
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    onlineUsers--
    io.emit('leaveChat', onlineUsers)
  })
})

http.listen(port, () => console.log(`listening on ${port}`))
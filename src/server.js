const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const port = process.env.PORT || 4000
const api = require('./modules/api.js')

app.use(express.static(path.resolve('src/public')))

let onlineUsers = 0

io.on('connection', (socket) => {
  socket.on('joinChat', user => {
    onlineUsers++
    io.emit('message', { username: 'Chatbot', message: `${user} has joined the room` })
    io.emit('joinChat', onlineUsers)
  })

  socket.on('message', (message) => {
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    onlineUsers--
    io.emit('leaveChat', onlineUsers)
  })
})

// CALL OF DUTY API
api.login();
console.log('test')
http.listen(port, () => console.log(`listening on ${port}`))
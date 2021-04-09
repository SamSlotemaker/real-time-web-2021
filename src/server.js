const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const port = process.env.PORT || 4000
const api = require('./modules/api.js')

app.use(express.static(path.resolve('src/public')))
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views/pages'))

// login to COD API
api.login();

// DATABASE CONNECTION
let collection = null;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://samslotemaker:samslotemaker@cluster.alfy7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  collection = client.db("chat").collection("messages");
  console.log('database connection succesful');
  http.listen(port, () => console.log(`listening on ${port}`))
});




//render login on root
app.get('/', (req, res) => {
  res.render('login.ejs', { error: false })
})
app.get('/chat', async (req, res) => {
  const oldMessages = await collection.find().toArray()
  console.log(oldMessages);
  res.render('chat.ejs', { oldMessages })
})

//handle login form
app.post('/login', (req, res) => {
  // try if user exists
  api.getDetailsWZ(req.body.tag, req.body.platform).then(response => {
    if (!response) {
      console.log('invalid user');
      res.render('login.ejs', { error: true })
    }
    else {
      console.log('valid user');
      res.redirect(`/chat?user=${req.body.tag}&platform=${req.body.platform}`)
    }
  })

})

let onlineUsers = 0

//make io connection
io.on('connection', (socket) => {
  socket.on('joinChat', user => {
    onlineUsers++
    io.emit('message', { username: 'Chatbot', message: `${user} has joined the room` })
    io.emit('joinChat', onlineUsers)
  })

  //subscribe to message
  socket.on('message', (message) => {


    //get warzone stats from the logedin user
    api.getDetailsWZ(message.username).then(response => {
      const BR_PROPERTIES = response.lifetime.mode.br_all.properties

      //create a response object with the warzone stats
      let newMessage = {
        id: message.id,
        username: message.username,
        message: message.message,
        wins: BR_PROPERTIES.wins,
        kd: BR_PROPERTIES.kdRatio.toFixed(2)
      }

      collection.insertOne(newMessage)
      io.emit('message', newMessage)
    })
  })

  socket.on('disconnect', () => {
    onlineUsers--
    io.emit('leaveChat', onlineUsers)
  })
})


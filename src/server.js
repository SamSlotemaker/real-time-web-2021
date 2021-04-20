const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const port = process.env.PORT || 4000
const api = require('./modules/api.js')
const createTeams = require('./modules/socket/teams.js')
require('dotenv').config()

app.use(express.static(path.resolve('src/public')))
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views/pages'))

// login to COD API
api.login()

// DATABASE CONNECTION
let messagesCollection = null
let teamsCollection = null
let usersCollection = null
const uri = 'mongodb+srv://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@cluster.alfy7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

databaseConnection(uri)

//render login on root
app.get('/', (req, res) => {
  res.render('login.ejs', { error: false })
})
//handle login form
app.post('/login', login)

//render chat page
app.get('/chat', chat)

//make io connection
io.on('connection', handleSocketConnections)

//handle socket connections on connect
function handleSocketConnections(socket) {
  socket.on('joinChat', joinChat)
  socket.on('addTeamMember', addTeamMember)
  socket.on('removeTeamMember', removeTeamMember)
  socket.on('message', handleMessage)
  socket.on('disconnect', handleDisconnect)


  //handles a user that joins the page/chat
  function joinChat(user) {
    let time = new Date()

    //send chatbot message
    io.emit('message', { username: 'Chatbot', message: `${user.user} has joined the room`, time: time.toLocaleString('en-GB') })

    // collect userdata to create teams
    api.getDetailsWZ(user.user, user.platform).then(async data => {
      io.emit('testObject', data)
      const BR_PROPERTIES = data.lifetime.mode.br.properties
      let userData = {
        id: socket.id,
        username: data.username,
        platform: data.platform,
        wins: BR_PROPERTIES.wins,
        kd: BR_PROPERTIES.kdRatio.toFixed(2)

      }

      // add user to userscollection when online
      await usersCollection.insertOne(userData)
      // add player to team database
      let allUsers = await usersCollection.find().toArray()
      let teams = createTeams(allUsers)

      //delete existing team
      await teamsCollection.deleteOne()
      //insert new team
      await teamsCollection.insertOne({ teams: teams })
      //get new teams
      const allTeams = await teamsCollection.findOne()
      //all online users
      let onlineUsers = allUsers.length

      io.emit('joinChat', onlineUsers)
      io.emit('teamChange', allTeams)
    })
  }

  //when a users disconnects it needs to be removed from teams and the chat
  async function handleDisconnect() {
    const user = await usersCollection.findOne({ id: socket.id })
    let time = new Date()
    if (user) {
      //delete users from team and online
      await usersCollection.deleteOne({ id: socket.id })
      await customTeamCollection.deleteOne({ id: socket.id })

      //emit new custom team without the removed member
      const users = await customTeamCollection.find().toArray()
      io.emit('changeCustomTeam', users)

      let allUsers = await usersCollection.find().toArray()
      let teams = createTeams(allUsers)
      //delete existing team
      await teamsCollection.deleteOne()
      //insert new team
      await teamsCollection.insertOne({ teams: teams })
      const allTeams = await teamsCollection.findOne()
      io.emit('message', { username: 'Chatbot', message: `${user.username} has left.`, time: time.toLocaleString('en-GB') })

      io.emit('teamChange', allTeams)
      io.emit('removeTeamMember')

      let onlineUsers = allUsers.length
      io.emit('leaveChat', onlineUsers)
    }
  }

  //when a user sends a message it will be formatted here and send back to the clients
  function handleMessage(message) {
    console.log('dit werkt nu MESSAGE')

    //get warzone stats from the logedin user
    api.getDetailsWZ(message.username, message.platform).then(async response => {
      const BR_PROPERTIES = response.lifetime.mode.br.properties

      //create a response object with the warzone stats
      let newMessage = {
        id: message.id,
        time: message.time,
        username: message.username,
        message: message.message,
        wins: BR_PROPERTIES.wins,
        kd: BR_PROPERTIES.kdRatio.toFixed(2)
      }
      //save message to db
      messagesCollection.insertOne(newMessage)
      //send formatted message to clients
      io.emit('message', newMessage)
    })
  }

  //when a user joins a custom team
  async function addTeamMember(userObject) {
    console.log('dit werkt nu TEAM')
    let user = await usersCollection.findOne({ id: userObject.id })
    console.log(user)
    await customTeamCollection.insertOne(user)
    const users = await customTeamCollection.find().toArray()
    io.emit('changeCustomTeam', users)
  }
  //when a user leaves a custom team
  async function removeTeamMember(userObject) {
    await customTeamCollection.deleteOne({ id: userObject.id })
    const users = await customTeamCollection.find().toArray()
    io.emit('changeCustomTeam', users)
  }
}

//login route
function login(req, res) {
  // try if user exists
  api.getDetailsWZ(req.body.tag, req.body.platform).then(response => {
    if (!response) {
      console.log('invalid user')
      res.render('login.ejs', { error: true })
    }
    else {
      console.log('valid user')
      res.redirect(`/chat?user=${req.body.tag}&platform=${req.body.platform}`)
    }
  })
}
//chatpage route
async function chat(req, res) {
  const oldMessages = await messagesCollection.find().toArray()
  let createdTeams = await teamsCollection.findOne()
  if (!createdTeams) {
    createdTeams = { teams: [] }
  }
  const customTeam = await customTeamCollection.find().toArray()
  res.render('chat.ejs', { oldMessages, createdTeams, customTeam })
}

function databaseConnection(uri) {
  const MongoClient = require('mongodb').MongoClient
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  client.connect(async (err) => {
    console.log(err)
    messagesCollection = client.db('chat').collection('messages')
    teamsCollection = client.db('chat').collection('teams')
    customTeamCollection = client.db('chat').collection('custom-team')
    usersCollection = client.db('chat').collection('users')
    await teamsCollection.deleteMany()
    await customTeamCollection.deleteMany()
    await usersCollection.deleteMany()
    console.log('database connection succesful')
  })
}


http.listen(port, () => console.log(`listening on ${port}`))

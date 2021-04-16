const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const port = process.env.PORT || 4000
const api = require('./modules/api.js')
require('dotenv').config()

app.use(express.static(path.resolve('src/public')))
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views/pages'))

// login to COD API
api.login();

// DATABASE CONNECTION
let messagesCollection = null;
let teamsCollection = null
let usersCollection = null

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@cluster.alfy7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async (err) => {
  messagesCollection = client.db("chat").collection("messages");
  teamsCollection = client.db("chat").collection("teams");
  usersCollection = client.db("chat").collection("users");
  await teamsCollection.deleteMany()
  await usersCollection.deleteMany()
  console.log('database connection succesful');
  http.listen(port, () => console.log(`listening on ${port}`))
});

//render login on root
app.get('/', (req, res) => {
  res.render('login.ejs', { error: false })
})
app.get('/chat', async (req, res) => {
  const oldMessages = await messagesCollection.find().toArray()
  let createdTeams = await teamsCollection.findOne()
  console.log(createdTeams)
  if (!createdTeams) {
    createdTeams = { teams: [] }
  }
  res.render('chat.ejs', { oldMessages, createdTeams })
})

//handle login form
app.post('/login', (req, res) => {
  // try if user exists
  api.getDetailsWZ(req.body.tag, req.body.platform).then(response => {
    console.log(req.body.tag, req.body.platform)
    console.log(response)
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


//make io connection
io.on('connection', (socket) => {
  socket.on('joinChat', user => {

    io.emit('message', { username: 'Chatbot', message: `${user.user} has joined the room` })

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

      const allTeams = await teamsCollection.findOne()
      let onlineUsers = allUsers.length
      io.emit('joinChat', onlineUsers)
      io.emit('teamChange', allTeams)
    })
  })

  //subscribe to message
  socket.on('message', (message) => {

    //get warzone stats from the logedin user
    api.getDetailsWZ(message.username, message.platform).then(async response => {
      const BR_PROPERTIES = response.lifetime.mode.br.properties

      //create a response object with the warzone stats
      let newMessage = {
        id: message.id,
        username: message.username,
        message: message.message,
        wins: BR_PROPERTIES.wins,
        kd: BR_PROPERTIES.kdRatio.toFixed(2)
      }

      messagesCollection.insertOne(newMessage)
      io.emit('message', newMessage)
    })
  })

  socket.on('disconnect', async () => {
    const user = await usersCollection.findOne({ id: socket.id })


    if (user) {
      //delete users from team and online
      await usersCollection.deleteOne({ id: socket.id })

      let allUsers = await usersCollection.find().toArray()
      let teams = createTeams(allUsers)

      //delete existing team
      await teamsCollection.deleteOne()
      //insert new team
      await teamsCollection.insertOne({ teams: teams })

      const allTeams = await teamsCollection.findOne()
      io.emit('message', { username: 'Chatbot', message: `${user.username} has left.` })

      // const teamAverage = await getTeamAverage(team)
      io.emit('teamChange', allTeams)

      let onlineUsers = allUsers.length
      io.emit('leaveChat', onlineUsers)
    }
  })
})

//returns teams of 4 players from given users
function createTeams(users) {
  let maxTeams = Math.ceil(users.length / 4)
  let teams = []
  //create a team for the amount of teams possible
  for (let i = 0; i < maxTeams; i++) {
    teams.push([])
  }
  let teamNumber = 0;
  users.forEach((user) => {
    teams[teamNumber].push(user)
    if (teams[teamNumber].length === 4) {
      teamNumber++
    }
  })
  return teams
}
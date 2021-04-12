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

// initial team number
let teamNumber = 1

// DATABASE CONNECTION
let messagesCollection = null;
let teamsCollection = null
let usersCollection = null

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@cluster.alfy7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  messagesCollection = client.db("chat").collection("messages");
  teamsCollection = client.db("chat").collection("teams");
  usersCollection = client.db("chat").collection("users");
  console.log('database connection succesful');
  http.listen(port, () => console.log(`listening on ${port}`))
});

//render login on root
app.get('/', (req, res) => {
  res.render('login.ejs', { error: false })
})
app.get('/chat', async (req, res) => {
  const oldMessages = await messagesCollection.find().toArray()
  const createdTeams = await teamsCollection.find().toArray()
  console.log('teams are: ' + createdTeams)

  res.render('chat.ejs', { oldMessages, createdTeams })
})

//handle login form
app.post('/login', (req, res) => {
  // try if user exists
  api.getDetailsWZ(req.body.tag, req.body.platform).then(response => {
    console.log(req.body.tag, req.body.platform)
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
    io.emit('message', { username: 'Chatbot', message: `${user.user} has joined the room` })
    io.emit('joinChat', onlineUsers)

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
      let oldTeam = await teamsCollection.findOne({ team: 'team' + teamNumber })

      if (oldTeam) {
        if (oldTeam.members.length > 3) {
          teamNumber++
        }
        oldTeam.members.push(userData)
      } else {
        oldTeam = {
          team: 'team' + teamNumber,
          members: [userData]
        }
      }
      await teamsCollection.updateOne({ team: 'team' + teamNumber }, { $set: oldTeam }, { upsert: true })

      const teams = await teamsCollection.find().toArray()
      console.log(teams)

      // const teamAverage = await getTeamAverage(team)
      io.emit('teamChange', teams)
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
      let oldTeam = await teamsCollection.findOne({ team: 'team' + teamNumber })

      if (oldTeam) {
        let index = oldTeam.members.findIndex(member => member.id === socket.id)
        console.log(index)
        if (index !== -1) {
          console.log('remove member');
          oldTeam.members.splice(index, 1)
        }
      }

      await teamsCollection.updateOne({ team: 'team' + teamNumber }, { $set: oldTeam }, { upsert: true })


      await usersCollection.deleteOne({ id: socket.id })
      const team = await teamsCollection.find().toArray()
      console.log(team)
      io.emit('message', { username: 'Chatbot', message: `${user.username} has left.` })

      // const teamAverage = await getTeamAverage(team)
      io.emit('teamChange', team)
    }


    onlineUsers--
    io.emit('leaveChat', onlineUsers)
  })
})

async function getTeamAverage(array) {
  const averageTeamKd = array.reduce((acc, cur) => {
    return acc + Number(cur.kd)
  }, 0) / array.length
  return averageTeamKd
}
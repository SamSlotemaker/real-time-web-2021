const chatForm = document.getElementById('chat-form')
const teamForm = document.querySelector('.new-team-form')
const removeMemberForm = document.querySelector('.remove-member-form')
const ownTeam = document.querySelector('.own-team')
const customTeam = document.querySelector('.own-team .team')
let messages = document.querySelector('.messages')
let input = document.querySelector('#chat-form input')
let memeButton = document.querySelector('.meme-button')
let onlineCount = document.querySelector('#online-count')
let averageKD = document.querySelector('.average-kd')
let suggestedTeams = document.querySelector('.suggested-teams')
const socket = io()

//GET username from URL
const splittedUrl = location.href.split('?')
let { user, platform } = Qs.parse(splittedUrl[1], {
    ignoreQueryPrefix: true
})

if (!user) {
    user = 'Guest'
}

// join chat
socket.emit('joinChat', { user, platform })
//update onlinecounts
socket.on('joinChat', res => {
    onlineCount.textContent = res
})
socket.on('leaveChat', res => {
    onlineCount.textContent = res
})

//update changed teams
socket.on('teamChange', data => {
    console.log(data)
    console.log('team change')
    suggestedTeams.innerHTML = '<h2>Suggested teams</h2>'

    data.teams.forEach((team, index) => {
        let teamListItems = ''
        team.forEach(teamMember => {
            teamListItems +=
                `
            <li>
                 <strong>${teamMember.username}</strong>
                 <ul class="stats">
                     <li>Wins: ${teamMember.wins}</li>
                     <li>KD: ${teamMember.kd}</li>
                 </ul>
             </li>
            `})

        suggestedTeams.insertAdjacentHTML('beforeend',
            `   <article>
                <h3>team ${index + 1}</h3>
                <strong class="average-kd"></strong>
                <ul class="team">
                ${teamListItems}
                </ul>
            </article>
        `)
    })
})

//create own team
teamForm.addEventListener('submit', (e) => {
    e.preventDefault()
    socket.emit('addTeamMember', { id: socket.id })
    ownTeam.classList.toggle('joined')
})
removeMemberForm.addEventListener('submit', (e) => {
    e.preventDefault()
    socket.emit('removeTeamMember', { id: socket.id })
    ownTeam.classList.toggle('joined')
})

//update cutom team
socket.on('changeCustomTeam', users => {
    customTeam.innerHTML = ''
    users.forEach(user => {
        customTeam.insertAdjacentHTML('beforeend',
            `   <li>
                <strong>${user.username}</strong>
                <ul class="stats">
                    <li>Wins: ${user.wins}</li>
                    <li>KD: ${user.kd}</li>
                </ul>
            </li>
        `)
    })
})


//all meme images
let memes = [
    'meme1',
    'meme2'
]

//on submit chatmessage
chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (input.value) {
        const d = new Date()
        socket.emit('message', { id: socket.id, username: user, platform: platform, message: input.value, time: d.toLocaleString('en-GB') })
        input.value = ''
        input.focus()
    }
})

//add message
socket.on('message', function (message) {
    //check if the message is yours
    let messageClass = ''
    let userElement = null
    if (message.id === socket.id) {
        messageClass = 'your-message'
    }
    else if (message.username === 'Chatbot') {
        messageClass = 'chatbot-message'
        userElement = `<strong>${message.username}:</strong>
    `
    }
    if (message.username !== 'Chatbot') {
        userElement = `<strong>${message.username}:</strong>
        <ul class="stats">
        <li>Wins: ${message.wins}</li>
        <li>KD: ${message.kd}</li>
    </ul>
        `
    }
    //escape html tags
    let strippedMesssage = message.message.replace(/(<([^>]+)>)/gi, '')
    let element = null

    //when the user adds the meme command
    if (strippedMesssage.includes('!meme')) {
        console.log('meme send')
        //pick random meme
        let randomNumber = Math.floor(Math.random() * memes.length)
        let meme = memes[randomNumber]

        //remove command from message to create meme text
        let memeMessage = strippedMesssage.split('!meme ')[1]
        //create the list element for the meme
        element = `
        <li class="${messageClass}">
            ${userElement}
            <div class="meme-container">
            <time>${message.time}</time>
                <img class="meme ${meme}" src="css/images/${meme}.jpg" alt="">
                <p class="meme-text text-${meme}">${memeMessage}</p>    
            </div>
        </li>
    `

    } else {
        //print the plain message when there is no command existing
        element = `  
        <li class="${messageClass}">
            ${userElement}
            <p><time>${message.time}</time>${strippedMesssage}</p>
        </li>
        `
    }

    //insert the element into the html
    messages.insertAdjacentHTML('beforeend', element)
    messages.scrollTop = messages.scrollHeight
})

// handle memebutton 
memeButton.addEventListener('click', () => {
    input.value = '!meme ' + input.value
    input.focus()
})


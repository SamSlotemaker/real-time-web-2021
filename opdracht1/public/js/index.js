const form = document.getElementById('chat-form')
let messages = document.querySelector('.messages')
let input = document.querySelector('#chat-form input')
let memeButton = document.querySelector('.meme-button')
const socket = io()

//GET username from URL
let { user } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})
if (!user) {
    user = 'Guest'
}

// join chat
socket.emit('joinChat', user)


console.log(input);
//all meme images
let memes = [
    'meme1',
    'meme2'
]

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (input.value) {
        socket.emit('message', { id: socket.id, username: user, message: input.value })

        input.value = ''
        input.focus()
    }
})

socket.on('message', function (message) {
    console.log(message)
    //check if the message is yours
    let messageClass = ''
    if (message.id === socket.id) {
        messageClass = 'your-message'
    }
    else if (message.username === 'Chatbot') {
        messageClass = 'chatbot-message'
    }
    let strippedMesssage = message.message.replace(/(<([^>]+)>)/gi, "");
    let element = null;
    let userElement = `<strong>${message.username}:</strong>`
    //when the user adds the meme command
    if (strippedMesssage.includes('!meme')) {
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
                <img class="meme ${meme}" src="css/images/${meme}.jpg" alt="">
                <p class="meme-text text-${meme}">${memeMessage}</p>    
            </div>
        </li>
    `
        //print the plain message when there is no command existing
    } else {
        element = `  
        <li class="${messageClass}">
            ${userElement}
            <p>${strippedMesssage}</p>
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
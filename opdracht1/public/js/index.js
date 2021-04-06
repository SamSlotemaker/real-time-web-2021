const socket = io()
const form = document.getElementById('chat-form')
let messages = document.querySelector('.messages')
let input = document.querySelector('input')
let memes = [
    'meme1',
    'meme2'
]

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('submitted')

    if (input.value) {
        socket.emit('message', input.value)
        input.value = ''
        input.focus()
    }
})

socket.on('message', function (message) {
    console.log(message);
    let randomNumber = Math.floor(Math.random() * memes.length)
    let meme = memes[randomNumber]
    let element = `
    <li>
        <img class="meme ${meme}" src="css/images/${meme}.jpg" alt="">
       <p class="meme-text text-${meme}">${message}</p>    
    </li>
    `
    messages.insertAdjacentHTML('beforeend', element)
    messages.scrollTop = messages.scrollHeight
})
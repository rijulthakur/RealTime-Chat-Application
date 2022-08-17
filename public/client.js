const socket= io()
let hello;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do{
    hello=prompt('Please enter your name: ')
} while(!hello)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: hello,
        message: message.trim()
    }

    appendMessage(msg, 'outgoing')

    //sending to server
    socket.emit('message', msg)


    textarea.value = ''
    scrollToBottom()

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)
}


socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop= messageArea.scrollHeight
}

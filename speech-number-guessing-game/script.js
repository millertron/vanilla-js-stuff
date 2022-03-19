const msg = document.getElementById('msg')

const randomNumber = Math.floor(Math.random() * 100)

window.speechRecognition = window.speechRecognition || window.webkitSpeechRecognition

let recognition = new window.speechRecognition()

console.log(randomNumber)
console.log(recognition)

const checkMessageNumber = (message) => {
    const num = +message
    if (Number.isNaN(num)) {
        msg.innerHTML = '<div>That is not a valid number...</div>'
    } else if (num >  100 || num < 1) {
        msg.innerHTML = '<div>Number must be between 1 and 100</div>'
    } else if (num > randomNum) {
        msg.innerHTML += '<div>GO LOWER</div>'
    } else if (num < randomNum) {
        msg.innerHTML += '<div>GO HIGHER</div>'
    } else {
        document.body.innerHTML = `
            <h2>Congrats! You have guessed the number!<br/><br/>It was ${num}</h2>
            <button class="play-again" id="play-again">Play Again</button>
        `
    }
}

const onSpeak = (e) => {
    const message = e.results[0][0].transcript.trim()
    msg.innerHTML = `
        <div>You said: </div>
        <span class="box">${message}</span>
    `
    checkMessageNumber(message)
}

recognition.addEventListener('result', onSpeak)

recognition.addEventListener('end', () => recognition.start())

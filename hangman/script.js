const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrongLetters')
const playButton = document.getElementById('playButton')
const modal = document.getElementById('modalContainer')
const notificationContainer = document.getElementById('notificationContainer')
const finalMessage = document.getElementById('finalMessage')
let endgame = false

const figureBodyParts = document.querySelectorAll('.figure-bodypart')

const generateWord = () => {
    const words = ['application', 'programming', 'interface', 'wizard']
    return words[Math.floor(Math.random() * words.length)]
}

let selectedWord = generateWord()
const correctLetters = []
const wrongLetters = []

const displayWord = () => {
    word.innerHTML = `
        ${selectedWord.split('').map(letter => `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`).join('')}
    `

    const innerWord = wordEl.innerText.replace(/\n/g, '')
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won!'
        modal.style.display = 'flex'
        endgame = true
    }
}

const showNotification = () => {
    notificationContainer.classList.add('show')
    setTimeout(() => {
        notificationContainer.classList.remove('show')
    }, 2000)
}

const updateWrong = () => {
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`).join(', ')}
    `

    const errors = wrongLetters.length
    figureBodyParts.forEach((part, index) => {    
        if (index < errors) {
            part.style.display = 'block'
        } else {
            part.style.display = 'none'
        }
    })

    if (errors === figureBodyParts.length) {
        endgame = true
        finalMessage.innerText = 'You lost. Better luck next time...'
        modal.style.display = 'flex'
    }
}

window.addEventListener('keyup', e => {
    const pressedKey = e.key
    if (!endgame && pressedKey.length === 1 && pressedKey.match(/[a-zA-Z]/)) {
        if (selectedWord.includes(pressedKey)) {
            if (!correctLetters.includes(pressedKey)) {
                correctLetters.push(pressedKey)
                displayWord()
            } else {
                showNotification()
            }
        } else {
            if (!wrongLetters.includes(pressedKey)) {
                wrongLetters.push(pressedKey)
                updateWrong()
            }
        }
    }
})

playButton.addEventListener('click', () => {
    correctLetters.splice(0)
    wrongLetters.splice(0)

    selectedWord = generateWord()
    endgame = false
    displayWord()
    updateWrong()
    modal.style.display = 'none'
})

displayWord();

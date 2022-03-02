const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrongLetters')
const playButton = document.getElementById('playButton')
const modal = document.getElementById('modal')
const notification = document.getElementById('notification')
const finalMessage = document.getElementById('finalMessage')

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
        modal.style.display = 'flex'
    }
}

displayWord();

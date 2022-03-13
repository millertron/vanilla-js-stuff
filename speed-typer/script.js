const word = document.getElementById('word')
const text = document.getElementById('text')
const score = document.getElementById('score')
const time = document.getElementById('time')
const endGameContainer = document.getElementById('endGameContainer')
const settingsButton = document.getElementById('settingsButton')
const settings = document.getElementById('settings')
const settingsForm = document.getElementById('settingsForm')
const difficulty = document.getElementById('difficulty')

const wordList = [
    'sigh',
    'tense',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'pies',
    'potatoes'
]

let randomWord
let scoreValue = 0
let timeLeft = 10

const getRandomWord = () => {
    return wordList[Math.floor(Math.random() * wordList.length)]
}

const addWordToDOM = () => {
    randomWord = getRandomWord()
    word.innerHTML = randomWord
}

const updateScore = () => {
    scoreValue++
    score.innerHTML = scoreValue
}

text.addEventListener('input', e => {
    if (text.value === randomWord) {
        updateScore()
        addWordToDOM()
        text.value = ''
    }
})

addWordToDOM()



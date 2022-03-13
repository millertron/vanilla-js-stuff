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
let timeBonus = 2
let scoreBonus = 2
let currentDifficulty = localStorage.getItem('difficulty') || 2

const configure = () => {
    switch (+currentDifficulty) {
        case 1:
            timeBonus = 5, scoreBonus = 1
            break;
        case 2:
            timeBonus = 3, scoreBonus = 2
            break;
        case 3:
            timeBonus = 1, scoreBonus = 5
            break;
    }
}

const getRandomWord = () => {
    return wordList[Math.floor(Math.random() * wordList.length)]
}

const addWordToDOM = () => {
    randomWord = getRandomWord()
    word.innerHTML = randomWord
}

const gameOver = () => {
    endGameContainer.innerHTML = `
        <h1>Time's up!</h1>
        <p>Final Score: ${scoreValue}</p>
        <button onclick="location.reload()">Retry</button>
    `
    endGameContainer.style.display = 'flex'
}

const updateTime = () => {
    timeLeft--;
    time.innerHTML = timeLeft + 's'

    if (timeLeft <= 0) {
        clearInterval(timeInterval)
        gameOver()
    } 
}

const updateScore = () => {
    scoreValue += scoreBonus
    score.innerHTML = scoreValue
}

text.addEventListener('input', e => {
    if (text.value === randomWord) {
        updateScore()
        addWordToDOM()
        text.value = ''
        timeLeft += timeBonus
    }
})

settingsButton.addEventListener('click', () => settings.classList.toggle('hide'))
settingsForm.addEventListener('change', () => {
    localStorage.setItem('difficulty', difficulty.value)
    location.reload()
})

difficulty.value = currentDifficulty
configure()
addWordToDOM()
text.focus()
const timeInterval = setInterval(updateTime, 1000)

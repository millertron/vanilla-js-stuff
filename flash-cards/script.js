const cardsContainer = document.getElementById('cardsContainer')
const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const currentEl = document.getElementById('current')
const showButton = document.getElementById('show')
const hideButton = document.getElementById('hide')
const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answer')
const addCardButton = document.getElementById('addCard')
const clear = document.getElementById('clear')
const addContainer = document.getElementById('addContainer')

let currentActiveCard = 0

const cards = []

const cardsData = [
    {
        question: 'What must a variable begin with?',
        answer: 'A letter, $ or _'
    },
    {
        question: 'What is a variable?',
        answer: 'Container for a piece of data'
    },
    {
        question: 'Example of Case Sensitive Variable',
        answer: 'thisIsAvariable'
    }
]

const updateCurrentText = () => {
    currentEl.innerText = `${ currentActiveCard + 1 } / ${ cards.length }`
}

const createCard = (data, index) => {
    const card = document.createElement('div')
    card.classList.add('card')
    if (index === 0) {
        card.classList.add('active')
    }
    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>${data.question}</p>
            </div>
            <div class="inner-card-back">
                <p>${data.answer}</p>
            </div>
        </div>
    `

    card.addEventListener('click', () => card.classList.toggle('show-answer'))
    cards.push(card)
    cardsContainer.appendChild(card)

    updateCurrentText()
}

const createCards = () => cardsData.forEach((data, index) => createCard(data, index))

createCards()

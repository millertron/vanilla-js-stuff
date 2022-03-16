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

const getCardsData = () => {
    const cardsInStorage = JSON.parse(localStorage.getItem('cards'))
    return cardsInStorage || []
}

const cardsData = getCardsData()

const updateCurrentText = () => {
    currentEl.innerText = cards.length > 0 ? `${ currentActiveCard + 1 } / ${ cards.length }` : ''
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

nextButton.addEventListener('click', () => {
    cards[currentActiveCard].className = 'card left'
    currentActiveCard++
    if (currentActiveCard > cards.length - 1) {
        currentActiveCard = cards.length - 1
    }
    cards[currentActiveCard].className = 'card active'
    updateCurrentText()
})

prevButton.addEventListener('click', () => {
    cards[currentActiveCard].className = 'card right'
    currentActiveCard--
    if (currentActiveCard < 0) {
        currentActiveCard = 0
    }
    cards[currentActiveCard].className = 'card active'
    updateCurrentText()
})

const updateCardsInStore = () => {
    localStorage.setItem('cards', JSON.stringify(cardsData))
}

showButton.addEventListener('click', () => addContainer.classList.add('show'))
hideButton.addEventListener('click', () => addContainer.classList.remove('show'))
addCardButton.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;
    if (question.trim() && answer.trim()) {
        const cardData = {
            question,
            answer
        }
        createCard(cardData)
        cardsData.push(cardData)
        updateCardsInStore()
        questionEl.value = ''
        answerEl.value = ''
        addContainer.classList.remove('show')
        cards[currentActiveCard].className = 'card active'
    }
})
clear.addEventListener('click', () => {
    localStorage.clear()
    cardsContainer.innerHTML = ''
    cards.length = 0
    cardsData.length = 0
    currentActiveCard = 0
    updateCurrentText()
})

createCards()

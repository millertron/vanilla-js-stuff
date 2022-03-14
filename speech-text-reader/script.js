const main = document.querySelector('main')
const voiceSelect = document.getElementById('voices')
const textArea = document.getElementById('text')
const readButton = document.getElementById('read')
const toggleButton = document.getElementById('toggle')
const closeButton = document.getElementById('close')
const textBox = document.getElementById('textBox')
const message = new SpeechSynthesisUtterance()

const data = [
    {
        image: `./img/drink.jpg`,
        text: "I'm thirsty"
    },
    {
        image: `./img/food.jpg`,
        text: "I'm hungry"
    },
    {
        image: `./img/tired.jpg`,
        text: "I'm tired"
    },
    {
        image: `./img/hurt.jpg`,
        text: "I'm hurt"
    },
    {
        image: `./img/happy.jpg`,
        text: "I'm happy"
    },
    {
        image: `./img/angry.jpg`,
        text: "I'm angry"
    },
    {
        image: `./img/sad.jpg`,
        text: "I'm sad"
    },
    {
        image: `./img/scared.jpg`,
        text: "I'm scared"
    },
    {
        image: `./img/outside.jpg`,
        text: "I want to go outside"
    },
    {
        image: `./img/home.jpg`,
        text: "I want to go home"
    },
    {
        image: './img/school.jpg',
        text: 'I want to go to school'
    },
    {
        image: `./img/grandma.jpg`,
        text: "I want to go to grandma's"
    }
]

let voices = []

const getVoices = () => {
    voices = speechSynthesis.getVoices()
    voices.forEach(voice => {
        const option = document.createElement('option')
        option.value = voice.name
        option.innerText = `${voice.name} (${voice.lang})`
        voiceSelect.appendChild(option)
    })
}

const setTextMessage = (text) => message.text = text
const speakText = () => speechSynthesis.speak(message)

const createBox = (item) => {
    const box = document.createElement('div')
    const { image, text } = item
    box.classList.add('box')
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p>
    `
    box.addEventListener('click', () => {
        setTextMessage(text)
        speakText()
        box.classList.add('active')
        setTimeout(() => box.classList.remove('active'), 800)
    })
    main.appendChild(box)
}

const setVoice = () => {
    message.voice = voices.find(voice => voice.name === voiceSelect.value)
}

toggleButton.addEventListener('click', () => textBox.classList.toggle('show'))
closeButton.addEventListener('click', () => textBox.classList.remove('show'))
voiceSelect.addEventListener('change', setVoice)
readButton.addEventListener('click', () => {
    setTextMessage(textArea.value)
    speakText()
})

speechSynthesis.addEventListener('voiceschanged', getVoices)

getVoices()
data.forEach(createBox)

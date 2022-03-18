const rulesButton = document.getElementById('rulesButton')
const closeButton = document.getElementById('closeButton')
const rulesSection = document.getElementById('rules')

rulesButton.addEventListener('click', () => rules.classList.add('show'))
closeButton.addEventListener('click', () => rules.classList.remove('show'))


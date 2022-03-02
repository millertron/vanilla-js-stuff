const toggleButton = document.getElementById('toggle')
const closeButton = document.getElementById('close')
const openButton = document.getElementById('open')
const modalContainer = document.getElementById('modalContainer')

toggleButton.addEventListener('click', () => document.body.classList.toggle('show-nav'))

openButton.addEventListener('click', () => modalContainer.classList.add('showmodal'))
closeButton.addEventListener('click', () => modalContainer.classList.remove('showmodal'))

window.addEventListener('click', e => e.target.id === modalContainer.id ? modalContainer.classList.remove('showmodal') : false)


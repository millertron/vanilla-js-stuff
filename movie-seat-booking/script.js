const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

let ticketPrice = +movieSelect.value

const updateSelectedCount = () => {
    const selectedSeatsCount = document.querySelectorAll('.row .seat.selected').length

    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}

container.addEventListener('click', (e) => {
    const target = e.target
    if (target.classList.contains('seat') && !target.classList.contains('occupied')) {
        target.classList.toggle('selected')
        updateSelectedCount()
    }
})

movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value
    updateSelectedCount()
})

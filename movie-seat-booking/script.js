const lsSelectedSeatsKey = 'MSB_selectedSeats'
const lsSelectedMovieKey = 'MSB_selectedMovie'

const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

let ticketPrice = +movieSelect.value

const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem(lsSelectedMovieKey, movieIndex)
}

const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    const seatIndexes = [...selectedSeats].map((seat) => [...seats].indexOf(seat))

    localStorage.setItem('MSB_selectedSeats', JSON.stringify(seatIndexes))

    const selectedSeatsCount = selectedSeats.length

    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}

const loadData = () => {
    const selectedSeats = JSON.parse(localStorage.getItem(lsSelectedSeatsKey))
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovie = localStorage.getItem(lsSelectedMovieKey)
    if (selectedMovie !== null) {
        movieSelect.selectedIndex = selectedMovie
        ticketPrice = +movieSelect.value
    }
    updateSelectedCount();
}

container.addEventListener('click', (e) => {
    const target = e.target
    if (target.classList.contains('seat') && !target.classList.contains('occupied')) {
        target.classList.toggle('selected')
        updateSelectedCount()
    }
})

movieSelect.addEventListener('change', (e) => {
    const target = e.target
    ticketPrice = +target.value

    setMovieData(target.selectedIndex, target.value)
    updateSelectedCount()
})

loadData()

const year = document.getElementById('year')
const days = document.getElementById('days')
const hours = document.getElementById('hours')
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')
const countdown = document.getElementById('countdown')
const loading = document.getElementById('loading')

const currentYear = new Date().getFullYear()
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`)

const updateCountdown = () => {
    const currentTime = new Date()
    const diffInSeconds = Math.floor((newYearTime - currentTime) / 1000)

    const daysLeft = Math.floor(diffInSeconds / 60 / 60 / 24)
    const hoursLeft = Math.floor(diffInSeconds / 60 / 60) % 24
    const minutesLeft = Math.floor(diffInSeconds / 60) % 60
    const secondsLeft = Math.floor(diffInSeconds) % 60

    days.innerText = daysLeft
    hours.innerText = hoursLeft < 10 ? '0' + hoursLeft : hoursLeft
    minutes.innerText = minutesLeft < 10 ? '0' + minutesLeft : minutesLeft
    seconds.innerText = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft
}

setTimeout(() => {
    loading.remove()
    countdown.style.display = 'flex'
}, 1000)

year.innerText = currentYear + 1
setInterval(updateCountdown, 1000)

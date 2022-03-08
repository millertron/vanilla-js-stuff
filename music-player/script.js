const musicContainer = document.getElementById('musicContainer')
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const audio = document.getElementById('audio')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progressContainer')
const title = document.getElementById('title')
const cover = document.getElementById('cover')
const icon = playBtn.querySelector('i.fas')


const songs = ['hey', 'summer', 'ukulele']

let songIndex = 2

const loadSong = (song) => {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

const pauseSong = () => {
    musicContainer.classList.remove('play')
    icon.classList.remove('fa-pause')
    icon.classList.add('fa-play')
}

const playSong = () => {
    musicContainer.classList.add('play')
    icon.classList.remove('fa-play')
    icon.classList.add('fa-pause')
}

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')
    isPlaying ? pauseSong() : playSong()
})

loadSong(songs[songIndex])

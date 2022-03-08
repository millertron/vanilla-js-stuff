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
    audio.pause()
}

const playSong = () => {
    musicContainer.classList.add('play')
    icon.classList.remove('fa-play')
    icon.classList.add('fa-pause')
    audio.play()
}

const prevSong = () => {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length -1
    }
    loadSong(songs[songIndex])
}

const nextSong = () => {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
}

const updateProgress = (e) => {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')
    isPlaying ? pauseSong() : playSong()
})

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgress)

loadSong(songs[songIndex])

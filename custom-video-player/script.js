const video = document.getElementById('video');
const playButton = document.getElementById('play');
const stopButton = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

const toggleVideoStatus = () => {
    video.paused ? video.play() : video.pause();
}

const updatePlayIcon = () => {
    const innerClass = video.paused ? 'fa-play' : 'fa-pause'
    playButton.innerHTML = `<i class="fa ${innerClass} fa-2x"></i>`
}

const updateProgress = () => {
    progress.value = (video.currentTime / video.duration) * 100
    const currentProgress = Math.floor(+video.currentTime)
    let minutes = Math.floor(currentProgress / 60)
    let seconds = Math.floor(currentProgress % 60)

    if (minutes < 10) {
        minutes = '0' + String(minutes);
    }
    if (seconds < 10) {
        seconds = '0' + String(seconds);
    }
    timestamp.innerText = `${minutes}:${seconds}`
}

const stopVideo = () => {
    video.currentTime = 0
    video.pause()
}

const setVideoProgress = () => {
    video.currentTime = (+progress.value * video.duration) / 100
}


video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

playButton.addEventListener('click', toggleVideoStatus)
stopButton.addEventListener('click', stopVideo)

progress.addEventListener('change', setVideoProgress)

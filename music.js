const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const shuffleButton = document.getElementById('shuffle')
const repeatButton = document.getElementById('repeat')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playlistButton = document.getElementById('playlist')
const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')
const progressBar = document.getElementById('progress-bar')
const playlistContainer = document.getElementById('playlist-container')
const closeButton = document.getElementById('close-button')
const playlistSongs = document.getElementById('playlist-songs')
const currentProgress = document.getElementById('current-progress')

let index

let loop = true

const songsList = [
    {
        name: "Falling In Love",
        artist: "Elvis Presley",
        link: 'songs/Elvis.mp3',
        image: 'img/download-3.jpg',
    },
    {
        name: 'the night we met',
        artist: 'Lord huron',
        link: 'songs/TheNightWeMet.mp3',
        image: 'img/3.jpg',
    },
    {
        name: 'A 1000 Times',
        artist: 'Hamilton Leithauser',
        link: 'songs/A1000Times.mp3',
        image: 'img/2.jpg',
    },
    {
        name: 'Titanium',
        artist: 'David Guetta',
        link: 'songs/Titanium.mp3',
        image: 'img/4.jpg',
    },
    {
        name: 'One Kiss',
        artist: 'Dua Lipa',
        link: 'songs/OneKiss.mp3',
        image: 'img/5.jpg'
    },
    {
        name: 'Heat Waves',
        artist: 'Glass Animals',
        link: 'songs/HeatWaves.mp3',
        image: 'img/6.jpg',
    },
    {
        name: 'My Heart Will Go On',
        artist: 'Celine Dion',
        link: 'songs/MyHeartWillGoOn.mp3',
        image: 'img/7.jpg',
    },
    {
        name: 'Unstoppable',
        artist: 'Sia',
        link: 'songs/Unstoppable.mp3',
        image: 'img/8.jpg',
    },
]

const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput/60);
    minute = (minute < 10) ? "0" + minute : minute;
    let second = Math.floor(timeInput%60);
    second = second < 10 ? "0" + second : second; 
    return minute + ':' + second; 
}
console.log(timeFormatter(400))
var time = timeFormatter(500)
console.log(time)
const setSong = (arrayIndex) => {
    let { name,artist,link,image } = songsList[arrayIndex]
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image
    
    audio.onloadedmetadata = () => {
        maxDuration.innerText = timeFormatter(audio.duration)
    }
}
const playAudio = ()=>{
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide') 
}
const pauseAudio = () => {
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}

repeatButton.addEventListener('click', ()=>{
    if (repeatButton.classList.contains('active')) {
        repeatButton.classList.remove('active')
        audio.loop = false
        console.log('repeat off')
    }
    else {
        repeatButton.classList.add('active')
        audio.loop = true
        console.log('repeat on')
    }
})

const nextSong = () => {
    if(loop) {
        if (index == songsList.length-1) {
            index = 0
        }
        else {
            index += 1
        } 
    setSong(index)
    playAudio()
    }
    else {
        let randIndex = Math.floor(Math.random()*songsList.length)
        console.log(randIndex)
        setSong(randIndex)
        playAudio()
    }
}

const prevSong = ()=>{
    if (loop) {
        if (index == 0) {
            index = songsList.length - 1
        } else {
            index -=1
        }
        setSong(index)
        playAudio()
    }
    else {
        let randIndex2 = Math.floor(Math.random()*songsList.length)
        setSong(randIndex2)
        playAudio()
    }
}

const randomSong = () => {
    if(loop) {
        loop = false
        shuffleButton.classList.add('active')
    } else {
        loop = true
        shuffleButton.classList.remove('active')
    }
}
audio.onended = () => {
    nextSong()
}
progressBar.addEventListener('click', (event) => {
    let coordStart = progressBar.getBoundingClientRect().left
    let coordEnd = event.clientX
    let progress = (coordEnd - coordStart) / progressBar.offsetWidth

    currentProgress.style.width = progress * 100 + "%"

    audio.currentTime = progress * audio.duration

    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")
})
setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    currentProgress.style.width = (audio.currentTime/audio.duration.toFixed(3))*100+"%"
})
const initializePlaylist = () => {
    for(let i in songsList) {
        playlistSongs.innerHTML += 
        `<li class="playlistSong" onclick="setSong(${i});playAudio();">
            <div class="playlist-image-container">
              <img src="${songsList[i].image}"/>
            </div>
            <div class="playlist-song-details">
              <span id="playlist-song-name">
                ${songsList[i].name}
              </span>
              <span id="playlist-song-artist">
                ${songsList[i].artist}
              </span>
            </div>
        </li>`
    }
}
playlistButton.addEventListener("click", () => {
    playlistContainer.classList.remove("hide")
})
closeButton.addEventListener("click", () => {
    playlistContainer.classList.add("hide")
})

prevButton.addEventListener('click', prevSong)
shuffleButton.addEventListener('click', randomSong)
nextButton.addEventListener('click', nextSong)
playButton.addEventListener('click', playAudio)
pauseButton.addEventListener('click', pauseAudio)

 window.onload = ()=>{
    index=0
    setSong(index)
    initializePlaylist()
 }

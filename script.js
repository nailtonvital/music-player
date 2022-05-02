const musicContainer = document.querySelector('.music-container')
const prevBtn = document.querySelector('#prev')
const playBtn = document.querySelector('#play')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const cover = document.querySelector('#cover')
const title = document.querySelector('.title')
const artist = document.querySelector('.artist')
const progressBar = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const dur = document.querySelector('#duration')
const current = document.querySelector('#current')

const songs = [{ "title": "Sahara", "artist": "Hensonn", "img": "img/sahara.jfif", "song": "music/Hensonn-Sahara.mp3" },
    { "title": "4.00 AM", "artist": "Taeko Onuki", "img": "img/4.00-am.jfif", "song": "music/4_00-A.M.mp3" },
    { "title": "After Dark", "artist": "Mr.Kitty", "img": "img/after-dark.jfif", "song": "music/Mr.Kitty - After Dark.mp3"},
    { "title": "Midnight Pretenders", "artist": "Tomoko Aran", "img": "img/midnight-pretenders.jfif", "song": "music/Midnight Pretenders (2022 Restored Version).mp3" },
    { "title": "Suprise of Summer", "artist": "Anri", "img": "img/suprise-of-summer.jfif", "song": "music/杏里 - Surprise of Summer.mp3" },
    { "title": "In The Name of Love", "artist": "Martin Garrix, Bebe Rexha", "img": "img/in-the-name-of-love.jfif", "song": "music/Martin Garrix & Bebe Rexha - In The Name Of Love.mp3" },
]

let songIndex = 5

loadSong(songs[songIndex])


function loadSong(song){
    title.innerHTML = song.title
    artist.innerHTML = song.artist
    cover.src = `${song.img}`
    audio.src = `${song.song}`
}

const pauseSong = () =>{
    musicContainer.classList.remove('pause') 
    playBtn.querySelector('i.bi').classList.remove('bi-pause-circle-fill')
    playBtn.querySelector('i.bi').classList.add('bi-play-circle-fill')
    audio.pause()
}
const playSong = () => {
    musicContainer.classList.add('pause')
    playBtn.querySelector('i.bi').classList.remove('bi-play-circle-fill')
    playBtn.querySelector('i.bi').classList.add('bi-pause-circle-fill')
    audio.play()
}

function prevSong() {
     songIndex--

     if(songIndex<0){
         songIndex = songs.length - 1
     }

     loadSong(songs[songIndex])
     playSong()
}

function nextSong() {
    songIndex = songIndex + 1

    if (songIndex > songs.length -1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    current.innerHTML = (currentTime/60).toFixed(2)
    dur.innerHTML = (duration/60).toFixed(2)
    if(!duration){
        dur.innerHTML ="0.00"
    }
    const progressPorcent = (currentTime / duration) * 100
    progressBar.style.width = `${progressPorcent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX/ width) * duration
}

//events

//play
playBtn.addEventListener('click', ()=>{
    const isPlaying = musicContainer.classList.contains('pause')

    if (!isPlaying){
        playSong()
    } else{
        pauseSong()
    }
})

//change
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)





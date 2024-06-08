console.log("Welcome to Spotify Web Player");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Chicken Burger", filePath: "songs/1.mp3", coverPath: "cover1.webp"},
    {songName: "Nikes", filePath: "songs/2.mp3", coverPath: "2.jpg"},
    {songName: "Hothon Se Choo Loo Tum", filePath: "songs/3.mp3", coverPath: "3.jpg"},
    {songName: "Count Me Out", filePath: "songs/4.mp3", coverPath: "4.jpg"},
    {songName: "Here Comes Your Man", filePath: "songs/5.mp3", coverPath: "5.jpg"},
    {songName: "Ode To The Mets", filePath: "songs/6.mp3", coverPath: "6.jpg"}
]

songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songListplay')).forEach((element) => {
        element.getElementsByTagName('img')[0].src = 'play.png';
    })
}

const playSong = () => {
    audioElement.play();
    masterPlay.src = 'pause.png';
    gif.style.opacity = 1;
    document.getElementsByClassName('songListplay')[songIndex].getElementsByTagName('img')[0].src = 'pause.png';
}

const pauseSong = () => {
    audioElement.pause();
    masterPlay.src = 'play.png';
    gif.style.opacity = 0;
    document.getElementsByClassName('songListplay')[songIndex].getElementsByTagName('img')[0].src = 'play.png';
}

const togglePlayPause = () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        pauseSong();
    }
}

masterPlay.addEventListener('click', togglePlayPause);

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault(); 
        togglePlayPause();
    }
})

audioElement.addEventListener('timeupdate', () => { 
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    progressBar.value = progress;
})

progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
})

Array.from(document.getElementsByClassName('songListplay')).forEach((element, i) => {
    element.addEventListener('click', () => { 
        if (songIndex === i) {
            togglePlayPause();
        } else {
            makeAllPlays();
            songIndex = i;
            element.getElementsByTagName('img')[0].src = 'pause.png';
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            playSong();
        }
    })
})

document.getElementById('next').addEventListener('click', () => {
   document.getElementsByClassName('songListplay')[songIndex].getElementsByTagName('img')[0].src = 'play.png';
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    playSong();
})

document.getElementById('prev').addEventListener('click', () => {
   document.getElementsByClassName('songListplay')[songIndex].getElementsByTagName('img')[0].src = 'play.png';
    songIndex = (songIndex <= 0) ? songs.length - 1 : songIndex - 1;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    playSong();
})

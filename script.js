const songs = [
  {
    title: "Song One",
    artist: "Artist One",
    src: "songs/song1.mp3"
  },
  {
    title: "Song Two",
    artist: "Artist Two",
    src: "songs/song2.mp3"
  },
  {
    title: "Song Three",
    artist: "Artist Three",
    src: "songs/song3.mp3"
  }
];

let currentSong = 0;
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const songList = document.getElementById('song-list');

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  playBtn.textContent = '⏸️';
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = '▶️';
}

playBtn.addEventListener('click', () => {
  audio.paused ? playSong() : pauseSong();
});

prevBtn.addEventListener('click', () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
});

nextBtn.addEventListener('click', () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
});

audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = t => Math.floor(t / 60) + ":" + String(Math.floor(t % 60)).padStart(2, '0');
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration || 0);
});

progressBar.addEventListener('click', (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

// Load playlist
songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener('click', () => {
    currentSong = index;
    loadSong(songs[currentSong]);
    playSong();
  });
  songList.appendChild(li);
});

// Autoplay next
audio.addEventListener('ended', () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
});

// Init
loadSong(songs[currentSong]);

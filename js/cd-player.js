let player;
const cdBackground = document.querySelector(".cd-background");
const playPauseBtn = document.getElementById("playPauseBtn");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");
const progressRing = document.querySelector(".progress-ring");
let isPlaying = true;

// YouTube API 스크립트 로드
function loadYouTubeAPI() {
  const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
  if (!existingScript) {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  } else if (typeof YT !== "undefined" && YT && typeof YT.Player === "function") {
    // API가 이미 로드되었을 경우, 바로 초기화 함수 호출
    onYouTubeIframeAPIReady();
  }
}

function setThumbnail() {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  cdBackground.style.backgroundImage = `url(${thumbnailUrl})`;
}

function updateProgressRing() {
  const currentTime = player.getCurrentTime();
  const duration = player.getDuration();
  const progressPercent = (currentTime / duration) * 100;
  progressRing.style.background = `conic-gradient(white ${progressPercent}%, transparent ${progressPercent}%)`;
}

// YouTube IFrame API 준비
function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player', {
    videoId: videoId,
    playerVars: {
      'autoplay': 0,
      'controls': 0,
      'loop': 1,
      'playlist': videoId,
      'mute': 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
  setThumbnail();
  cdBackground.style.animationPlayState = "running";
  setInterval(updateProgressRing, 1000); // 1초마다 진행 바 업데이트
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
  } else if (event.data === YT.PlayerState.PAUSED) {
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  }
}

playPauseBtn.addEventListener("click", function () {
  if (isPlaying) {
    player.pauseVideo();
    cdBackground.style.animationPlayState = "paused";
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  } else {
    player.playVideo();
    cdBackground.style.animationPlayState = "running";
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
  }
  isPlaying = !isPlaying;
});

// API 로드 시작
loadYouTubeAPI();

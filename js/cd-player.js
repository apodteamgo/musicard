let player;
const cdBackground = document.querySelector(".cd-background");
const playPauseBtn = document.getElementById("playPauseBtn");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");
const progressRing = document.querySelector(".progress-ring");
let isPlaying = false; // 초기 상태는 멈춤

// YouTube API 스크립트 로드
function loadYouTubeAPI() {
  const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
  if (!existingScript) {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  } else if (typeof YT !== "undefined" && YT && typeof YT.Player === "function") {
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
      'autoplay': 0, // 자동 재생 비활성화
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

function onPlayerReady() {
  setThumbnail();
  cdBackground.style.animationPlayState = "paused"; // 초기 상태는 멈춤
  playIcon.style.display = "block";
  pauseIcon.style.display = "none";
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
    cdBackground.style.animationPlayState = "running";
  } else if (event.data === YT.PlayerState.PAUSED) {
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
    cdBackground.style.animationPlayState = "paused";
  }
}

playPauseBtn.addEventListener("click", function () {
  if (!player) {
    console.warn("Player is not initialized yet.");
    return;
  }

  if (isPlaying) {
    player.pauseVideo();
    cdBackground.style.animationPlayState = "paused";
  } else {
    player.playVideo();
    cdBackground.style.animationPlayState = "running";
  }
  isPlaying = !isPlaying;
});

// API 로드 시작
loadYouTubeAPI();

// 초기 로드 시 CD 애니메이션 상태 설정
cdBackground.style.animationPlayState = "paused"; // 초기 애니메이션 멈춤

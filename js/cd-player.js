document.addEventListener("DOMContentLoaded", function () {
  let player = null;
  let isPlaying = false;
  let isInitialized = false;

  const cdBackground = document.querySelector(".cd-background");
  const playIcon = document.getElementById("playIcon");
  const pauseIcon = document.getElementById("pauseIcon");

  const loadYouTubeAPI = () => {
    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (!existingScript) {
      const scriptTag = document.createElement("script");
      scriptTag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(scriptTag);
    }
  };

  const initializePlayer = () => {
    if (player) return; // Prevent multiple initializations

    player = new YT.Player("youtube-player", {
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        loop: 1,
        playlist: videoId,
      },
      events: {
        onReady: () => {
          isInitialized = true;
          const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
          cdBackground.style.backgroundImage = `url(${thumbnailUrl})`;
        },
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.PLAYING) {
            isPlaying = true;
            cdBackground.style.animationPlayState = "running";
            playIcon.style.display = "none";
            pauseIcon.style.display = "block";
          } else if (event.data === YT.PlayerState.PAUSED) {
            isPlaying = false;
            cdBackground.style.animationPlayState = "paused";
            playIcon.style.display = "block";
            pauseIcon.style.display = "none";
          }
        },
      },
    });
  };

  const togglePlayPause = () => {
    if (!isInitialized || !player) {
      console.warn("Player is not initialized yet.");
      return;
    }

    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  document.getElementById("playPauseBtn").addEventListener("click", togglePlayPause);

  if (window.YT && typeof window.YT.Player === "function") {
    initializePlayer();
  } else {
    loadYouTubeAPI();
    window.onYouTubeIframeAPIReady = initializePlayer;
  }
});


let updateInterval;

function updateProgressRing() {
  if (player && isInitialized) {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    const progressPercent = (currentTime / duration) * 100;
    progressRing.style.background = `conic-gradient(white ${progressPercent}%, transparent ${progressPercent}%)`;
  }
}

function onPlayerReady(event) {
  event.target.playVideo();
  setThumbnail();
  cdBackground.style.animationPlayState = "running";
  updateInterval = setInterval(updateProgressRing, 1000); // 진행 바 업데이트 시작
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED || event.data === YT.PlayerState.PAUSED) {
    clearInterval(updateInterval); // 일시 정지 또는 종료 시 업데이트 중지
  }
}

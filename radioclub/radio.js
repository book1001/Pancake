function playAudio(url, stationName) {
  var audioPlayer = document.getElementById('audioPlayer');
  audioPlayer.src = url;
  audioPlayer.play();

  var playingNowText = document.getElementById('playingNowText');
  playingNowText.textContent = "Playing Now: " + stationName;

  if (stationName !== "Select Down") {
    playingNowText.classList.add("active");
  } else {
    playingNowText.classList.remove("active");
  }
}
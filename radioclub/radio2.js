const radioList = [
  { url: 'http://curiosity.shoutca.st:9073/stream', station: 'FM1' },
  { url: 'http://gr02.cdnstream.com:8290', station: 'FM2' },
];

function radioPlay() {
  var radioPlayer = document.getElementById('radioPlayer');
  const radioMath = Math.floor(Math.random() * radioList.length);
  const radioRandom = radioList[radioMath];

  radioPlayer.pause();
  radioPlayer.src = radioRandom.url;
  radioPlayer.load();
  radioPlayer.play();

  var radioStationText = document.getElementById('radioStationText');
  radioStationText.textContent = radioRandom.station;

  if (radioRandom.station !== "Select Down") {
    radioStationText.classList.add("active");
  } else {
    radioStationText.classList.remove("active");
  }
}




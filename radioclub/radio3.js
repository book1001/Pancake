
const radioList = [
  { url: 'http://curiosity.shoutca.st:9073/stream', station: 'FM1' },
  { url: 'http://gr02.cdnstream.com:8290', station: 'FM2' },
  { url: 'http://curiosity.shoutca.st:9073/stream', station: 'FM3' },
];

const videoList = [
  "resource/dance1.mp4",
  "resource/dance2.mp4",
  "resource/dance3.mp4",
];

let radioLast = -1;
let videoLast = -1;

function radioPlay() {
  var radioPlayer = document.getElementById('radioPlayer');
  const radioRandom = getRandomItem(radioLast, radioList.length);
  radioLast = radioRandom;
  const radioSelected = radioList[radioRandom];

  radioPlayer.pause();
  radioPlayer.src = radioSelected.url;
  radioPlayer.load();
  radioPlayer.play();

  var radioStationText = document.getElementById('radioStationText');
  radioStationText.textContent = radioSelected.station;

  if (radioSelected.station !== "Select Down") {
    radioStationText.classList.add("active");
  } else {
    radioStationText.classList.remove("active");
  }

  var videoPlayer = document.getElementById('videoPlayer');
  var videoRandom = getRandomItem(videoLast, videoList.length);
  videoLast = videoRandom;
  var videoSelected = videoList[videoRandom];
  videoPlayer.src = videoSelected;
  console.log(videoSelected);
}

// 중복 선택을 방지하기 위한 함수
function getRandomItem(itemLast, listLength) {
  let itemRandom;
  do {
    itemRandom = Math.floor(Math.random() * listLength);
  } while (itemRandom === itemLast);

  return itemRandom;
}


// let lastRadioIndex = -1;
// let lastVideoIndex = -1;

// function radioPlay() {
//   var radioPlayer = document.getElementById('radioPlayer');
//   const radioRandom = Math.floor(Math.random() * radioList.length);
//   const radioSelected = radioList[radioRandom];

//   radioPlayer.pause();
//   radioPlayer.src = radioSelected.url;
//   radioPlayer.load();
//   radioPlayer.play();

//   var radioStationText = document.getElementById('radioStationText');
//   radioStationText.textContent = radioSelected.station;

//   if (radioSelected.station !== "Select Down") {
//     radioStationText.classList.add("active");
//   } else {
//     radioStationText.classList.remove("active");
//   }

//   var videoPlayer = document.getElementById('videoPlayer');
//   var videoRandom = Math.floor(Math.random() * videoList.length);
//   var videoSelected = videoList[videoRandom];
//   videoPlayer.src = videoSelected;
//   console.log(videoSelected);
// }




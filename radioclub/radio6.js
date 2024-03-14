let previousRow = null;
let currentPlayer = null;

const radioRandomBtnImg = document.getElementById('radioRandomBtnImg');

const radioPlayerElements = document.querySelectorAll('[id^="radioPlayer"]');
const radioPlayers = Array.from(radioPlayerElements);

const buttonElements = document.querySelectorAll('[id^="row"]');
const buttons = Array.from(buttonElements);


var button = document.getElementById("playStop");

const videoList = [
  "resource_gif/bird2_1.gif",
  "resource_gif/bird2_2.gif",
  "resource_gif/dance1_1.gif",
  "resource_gif/dance2_1.gif",
  "resource_gif/dance2_2.gif",
  "resource_gif/dance2_3.gif",
  "resource_gif/dance5_1.gif",
  "resource_gif/walk1_1.gif",
  "resource_gif/walk2_1.gif",
  "resource_gif/walk2_2.gif",
];

let videoLast = -1;

var videoPlayer = document.getElementById('videoPlayer');
var videoRandom = getRandomItem(videoLast, videoList.length);
videoLast = videoRandom;
var videoSelected = videoList[videoRandom];
videoPlayer.src = videoSelected;



function onAudioLoading(currentRow) {
  buttons.forEach(row => {
    row.style.color = 'white';
    row.classList.remove('blinking');
  });
  currentRow.style.color = 'gray';
  currentRow.classList.add('blinking');
  document.getElementById("radioStationText").style.color = 'gray';
  document.getElementById("radioStationText").classList.add('blinking');
  button.innerText = "⎯";
  radioRandomBtnImg.classList.add('radioRandomBtnLoading');
}

function onAudioPlaying(currentRow) {
  buttons.forEach(row => {
    row.style.color = 'white';
    row.classList.remove('blinking');
  });
  currentRow.style.color = 'yellow';
  currentRow.classList.remove('blinking');
  document.getElementById("radioStationText").style.color = 'yellow';
  document.getElementById("radioStationText").classList.remove('blinking');
  button.innerText = "◼︎";
  radioRandomBtnImg.classList.remove('radioRandomBtnLoading');
}

function radioPlay(index, text, url) {
  const currentRow = buttons[index];

  if (currentRow && currentRow !== previousRow) {

    radioPlayers.forEach(player => player.pause());
    currentPlayer = radioPlayers[index];
    currentPlayer.src = url;
    currentPlayer.load();
    currentPlayer.play();

    currentPlayer.addEventListener('loadstart', () => onAudioLoading(currentRow));
    currentPlayer.addEventListener('playing', () => onAudioPlaying(currentRow));

    previousRow = currentRow;
  } else {
    if (currentPlayer) {
      if (currentPlayer.paused) {
        currentPlayer.load();
        currentPlayer.play(); // Resume playback if paused
        currentPlayer.addEventListener('loadstart', () => onAudioLoading(currentRow));
        currentPlayer.addEventListener('playing', () => onAudioPlaying(currentRow));
        
      } else {
        currentPlayer.pause(); // Pause playback if playing
        currentRow.style.color = 'white';
        currentRow.classList.remove('blinking');
        radioRandomBtnImg.classList.remove('radioRandomBtnLoading');
      }
    }
  }

  var videoPlayer = document.getElementById('videoPlayer');
  var videoRandom = getRandomItem(videoLast, videoList.length);
  videoLast = videoRandom;
  var videoSelected = videoList[videoRandom];
  videoPlayer.src = videoSelected;


  
  document.getElementById("radioStationText").innerText = text;

  // var dropdown = document.getElementById("dropdownStation");
  // dropdown.style.display = "none";


  randomVideo = random(videos);
  randomVideo.size(gridSize, gridSize/2);
  colorMode(HSB, 100);
  randomVideo.volume(0);
  randomVideo.loop();
  randomC1 = random(colors);
  randomC2 = random(colors);
  randomC3 = random(colors);

  redraw();
}






// const radioList = [
//   { buttonId: 'row0', station: 'Jazz', url: 'https://ice7.securenetsystems.net/KCSM2' },
//   { buttonId: 'row1', station: 'Indie', url: 'https://live.radioart.com/fIndie.mp3' },
//   { buttonId: 'row2', station: 'Dance', url: 'https://myhouseradiofm.out.airtime.pro:8000/myhouseradiofm_a' },
//   { buttonId: 'row3', station: 'Musical', url: 'https://das-edge09-live365-dal03.cdnstream.com/a99840?listenerId=esTrackblock0368254&aw_0_1st.playerid=esPlayer&aw_0_1st.skey=1710206896' },
//   { buttonId: 'row4', station: 'Jukebox', url: 'https://eagle.streemlion.com/proxy/psychedelicj?mp=/stream' },
//   { buttonId: 'row5', station: 'pop', url: 'http://gr02.cdnstream.com:8290' },
//   { buttonId: 'row6', station: 'WorldWide FM', url: 'https://worldwidefm.out.airtime.pro/worldwidefm_a?src=muso.fm' },
// ];

function radioRandomPlay() {
  // Get a random index within the range of available radio stations
  var randomIndex = Math.floor(Math.random() * buttons.length);
  // Get the button corresponding to the random index and trigger its click event
  buttons[randomIndex].click();

  var videoPlayer = document.getElementById('videoPlayer');
  var videoRandom = getRandomItem(videoLast, videoList.length);
  videoLast = videoRandom;
  var videoSelected = videoList[videoRandom];
  videoPlayer.src = videoSelected;
}


// let radioLast = -1;

// function radioRandomPlay() {
//   var radioPlayerR = document.getElementById('radioPlayerR');
//   const radioRandom = getRandomItem(radioLast, radioList.length);
//   // const radioRandom = getRandomItem(radioLast, radioPlayers.length);
//   radioLast = radioRandom;
//   const radioSelected = radioList[radioRandom];
//   const buttonId = radioSelected.buttonId;

//   var radioStationText = document.getElementById('radioStationText');
//   radioStationText.textContent = radioSelected.station;

//   if (radioSelected.station !== "Select Down") {
//     radioStationText.classList.add("active");
//   } else {
//     radioStationText.classList.remove("active");
//   }

//   function onAudioLoading() {
//     buttons.forEach(row => {
//       row.style.color = 'white';
//       row.classList.remove('blinking');
//     });
//     radioRandomBtnImg.classList.add('radioRandomBtnLoading');
//   }

//   function onAudioPlaying() {
//     buttons.forEach(row => {
//       row.style.color = 'white';
//       row.classList.remove('blinking');
//     });
//     document.getElementById(buttonId).style.color = 'yellow';
//     document.getElementById(buttonId).classList.remove('blinking');
//     radioRandomBtnImg.classList.remove('radioRandomBtnLoading');
//   }

//   radioPlayers.forEach(player => player.pause());
//   radioPlayerR.src = radioSelected.url;
//   radioPlayerR.load();
//   radioPlayerR.play();
//   radioPlayerR.addEventListener('loadstart', onAudioLoading);
//   radioPlayerR.addEventListener('playing', onAudioPlaying);

//   var videoPlayer = document.getElementById('videoPlayer');
//   var videoRandom = getRandomItem(videoLast, videoList.length);
//   videoLast = videoRandom;
//   var videoSelected = videoList[videoRandom];
//   videoPlayer.src = videoSelected;


//   randomVideo = random(videos);
//   randomVideo.size(gridSize, gridSize/2);
//   colorMode(HSB, 100);
//   randomVideo.volume(0);
//   randomVideo.loop();
//   randomC1 = random(colors);
//   randomC2 = random(colors);
//   randomC3 = random(colors);

//   redraw();

// }

// 중복 선택을 방지하기 위한 함수
function getRandomItem(itemLast, listLength) {
  let itemRandom;
  do {
    itemRandom = Math.floor(Math.random() * listLength);
  } while (itemRandom === itemLast);

  return itemRandom;
}



function openDropdown(){
  var dropdown = document.getElementById("dropdownStation");
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
  }
}




function playStop() {

  if (currentPlayer === null) {
    currentPlayer = radioPlayers[0];
    currentPlayer.src = 'https://ice7.securenetsystems.net/KCSM2';
    currentPlayer.load();
    currentPlayer.play();
    button.innerText = "◼︎";
  } else {
    // If currentPlayer is playing (not paused), pause it
    if (!currentPlayer.paused && !currentPlayer.ended) {
      currentPlayer.pause();
      button.innerText = "▶︎";
    } else {
      // If currentPlayer is paused or ended, resume playback
      currentPlayer.load();
      currentPlayer.play();
      button.innerText = "◼︎";
    }
  }
}



// function playStop() {
//   var button = document.getElementById("playStop");
//   // var audioElements = document.querySelectorAll("audio");

//   if (button.innerText === "▶︎") {
//     button.innerText = "◼︎";
//     currentPlayer.pause();
//     // audioElements.forEach(function(audio) {
//     //   audio.pause();
//     // });
//   } else {
//     button.innerText = "▶︎";
//     // radioPlay(index, text, url);
//     currentPlayer.load();
//     currentPlayer.play();
//     // radioRandomPlay();
  
//   }
// }
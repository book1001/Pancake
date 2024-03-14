let previousRow = null;
let currentPlayer = null;

const radioRandomBtnImg = document.getElementById('radioRandomBtnImg');

const radioPlayerElements = document.querySelectorAll('[id^="radioPlayer"]');
const radioPlayers = Array.from(radioPlayerElements);

const buttonElements = document.querySelectorAll('[id^="row"]');
const buttons = Array.from(buttonElements);

var dropdown = document.getElementById("dropdownStation");
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
  // document.getElementById("radioStationText").classList.add('blinking');
  button.innerText = "⎯";
  radioRandomBtnImg.classList.add('radioRandomBtnLoading');
}

function onAudioPlaying(currentRow) {
  buttons.forEach(row => {
    row.style.color = 'white';
    row.classList.remove('blinking');
  });
  // setTimeout(function() {
  //   dropdown.style.display = "none";
  // }, 300);
  if (window.innerWidth <= 600) {
    dropdown.style.display = "none";
  }
  currentRow.style.color = 'yellow';
  currentRow.classList.remove('blinking');
  document.getElementById("radioStationText").style.color = 'yellow';
  document.getElementById("radioStationText").classList.remove('blinking');
  button.innerText = "■";
  radioRandomBtnImg.classList.remove('radioRandomBtnLoading');
  
  var videoPlayer = document.getElementById('videoPlayer');
  var videoRandom = getRandomItem(videoLast, videoList.length);
  videoLast = videoRandom;
  var videoSelected = videoList[videoRandom];
  videoPlayer.src = videoSelected;

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




function radioRandomPlay() {
  // Get a random index within the range of available radio stations
  var randomIndex = Math.floor(Math.random() * buttons.length);
  // Get the button corresponding to the random index and trigger its click event
  buttons[randomIndex].click();
}


// 중복 선택을 방지하기 위한 함수
function getRandomItem(itemLast, listLength) {
  let itemRandom;
  do {
    itemRandom = Math.floor(Math.random() * listLength);
  } while (itemRandom === itemLast);

  return itemRandom;
}



function openDropdown(){
  
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
    button.innerText = "■";
  } else {
    // If currentPlayer is playing (not paused), pause it
    if (!currentPlayer.paused && !currentPlayer.ended) {
      currentPlayer.pause();
      button.innerText = "▶";
    } else {
      // If currentPlayer is paused or ended, resume playback
      currentPlayer.load();
      currentPlayer.play();
      button.innerText = "■";
    }
  }
}




// Responsive ------------------------------------------------

function responsive() {
  var tabletStyle = window.matchMedia("(max-width: 600px)");
  if (tabletStyle.matches) { // ~ Tablet: 600px
    responsive_Tablet()
  } else { // PC: 601px ~
    responsive_PC()
  }
}

function responsive_Tablet() {
  document.getElementById("playStop").style.display = "inline-block";
  document.getElementById("radioStationText").style.display = "inline-block";
  document.getElementById("dropdownStation").style.display = "none";
}

function responsive_PC() {
  document.getElementById("playStop").style.display = "none";
  document.getElementById("radioStationText").style.display = "none";
  document.getElementById("dropdownStation").style.display = "block";
}


// Responsive: Window Resize ------------------------------------------------

window.onresize = function(event) {
  responsive();
};




// let radioLast = -1;

// function radioRandomPlay() {
//   var radioPlayer = document.getElementById('radioPlayer');
//   const radioRandom = getRandomItem(radioLast, radioList.length);
//   radioLast = radioRandom;
//   const radioSelected = radioList[radioRandom];

//   function onAudioLoading() {
//     // playButton.style.color = 'gray';
//     // playButton.classList.add('blinking');
//     radioSelected.url;
//     radioRandomBtnImg.classList.add('radioRandomBtnLoading');
//   }

//   function onAudioPlaying() {
//     // playButton.style.color = 'yellow';
//     // playButton.classList.remove('blinking');
//     radioRandomBtnImg.classList.remove('radioRandomBtnLoading');
//   }

//   radioPlayer.addEventListener('loadstart', onAudioLoading);
//   radioPlayer.addEventListener('playing', onAudioPlaying);

//   // 현재 오디오가 재생 중인지 확인
//   if (radioPlayer.paused) {
//     // 일시 중지된 상태일 경우, 새로운 URL을 설정하고 재생
//     radioPlayer.src = radioSelected.url;
//     radioPlayer.load();
//     radioPlayer.play();
//   } else {
//     // 재생 중인 상태일 경우, 일시 중지
//     radioPlayer.pause();
//   }


// }

// // 중복 선택을 방지하기 위한 함수
// function getRandomItem(itemLast, listLength) {
//   let itemRandom;
//   do {
//     itemRandom = Math.floor(Math.random() * listLength);
//   } while (itemRandom === itemLast);

//   return itemRandom;
// }




let previousRow = null;
let currentPlayer = null;

const radioRandomBtnImg = document.getElementById('radioRandomBtnImg');

const radioPlayerElements = document.querySelectorAll('[id^="radioPlayer"]');
const radioPlayers = Array.from(radioPlayerElements);

const buttonElements = document.querySelectorAll('[id^="row"]');
const buttons = Array.from(buttonElements);


function onAudioLoading(currentRow) {
  buttons.forEach(row => {
    row.style.color = 'white';
    row.classList.remove('blinking');
  });
  currentRow.style.color = 'gray';
  currentRow.classList.add('blinking');
  radioRandomBtnImg.classList.add('radioRandomBtnLoading');
}

function onAudioPlaying(currentRow) {
  buttons.forEach(row => {
    row.style.color = 'white';
    row.classList.remove('blinking');
  });
  currentRow.style.color = 'yellow';
  currentRow.classList.remove('blinking');
  radioRandomBtnImg.classList.remove('radioRandomBtnLoading');
}

function radioPlay(index, url) {
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






const radioList = [
  { station: 'row0', url: 'https://ice7.securenetsystems.net/KCSM2' },
  { station: 'row1', url: 'https://live.radioart.com/fIndie.mp3' },
  { station: 'row2', url: 'https://myhouseradiofm.out.airtime.pro:8000/myhouseradiofm_a' },
  { station: 'row3', url: 'https://das-edge09-live365-dal03.cdnstream.com/a99840?listenerId=esTrackblock0368254&aw_0_1st.playerid=esPlayer&aw_0_1st.skey=1710206896' },
  { station: 'row4', url: 'https://eagle.streemlion.com/proxy/psychedelicj?mp=/stream' },
  { station: 'row5', url: 'http://gr02.cdnstream.com:8290' },
  { station: 'row6', url: 'https://worldwidefm.out.airtime.pro/worldwidefm_a?src=muso.fm' },
];


let radioLast = -1;

function radioRandomPlay() {
  var radioPlayerR = document.getElementById('radioPlayerR');
  const radioRandom = getRandomItem(radioLast, radioList.length);
  // const radioRandom = getRandomItem(radioLast, radioPlayers.length);
  radioLast = radioRandom;
  const radioSelected = radioList[radioRandom];

  const buttonId = radioSelected.station;

  // console.log("radioRandom:" + radioRandom);
  // console.log("radioLast:" + radioLast);
  // console.log("radioSelected:" + radioSelected);
  // console.log("buttonId:" + buttonId);

  function onAudioLoading() {
    // playButton.style.color = 'gray';
    // playButton.classList.add('blinking');
    // radioSelected.url;
    buttons.forEach(row => {
      row.style.color = 'white';
      row.classList.remove('blinking');
    });
    // document.getElementById(buttonId).style.color = 'gray';
    // document.getElementById(buttonId).classList.add('blinking');
    radioRandomBtnImg.classList.add('radioRandomBtnLoading');
  }

  function onAudioPlaying() {
    // playButton.style.color = 'yellow';
    // playButton.classList.remove('blinking');
    buttons.forEach(row => {
      row.style.color = 'white';
      row.classList.remove('blinking');
    });
    document.getElementById(buttonId).style.color = 'yellow';
    document.getElementById(buttonId).classList.remove('blinking');
    radioRandomBtnImg.classList.remove('radioRandomBtnLoading');
  }

  // radioPlayerR.addEventListener('loadstart', onAudioLoading);
  // radioPlayerR.addEventListener('playing', onAudioPlaying);


  radioPlayers.forEach(player => player.pause());
  radioPlayerR.src = radioSelected.url;
  radioPlayerR.load();
  radioPlayerR.play();
  radioPlayerR.addEventListener('loadstart', onAudioLoading);
  radioPlayerR.addEventListener('playing', onAudioPlaying);

  // // 현재 오디오가 재생 중인지 확인
  // if (radioPlayerR.paused) {
  //   // 일시 중지된 상태일 경우, 새로운 URL을 설정하고 재생
  //   radioPlayers.forEach(player => player.pause());
  //   buttons.forEach(row => {
  //     row.style.color = 'white';
  //     row.classList.remove('blinking');
  //   });
  //   radioPlayerR.src = radioSelected.url;
  //   radioPlayerR.load();
  //   radioPlayerR.play();
  //   radioPlayerR.addEventListener('loadstart', onAudioLoading);
  //   radioPlayerR.addEventListener('playing', onAudioPlaying);
  // } else {
  //   // 재생 중인 상태일 경우, 일시 중지
  //   radioPlayerR.pause();
  //   buttons.forEach(row => {
  //     row.style.color = 'white';
  //     row.classList.remove('blinking');
  //   });
  //   radioRandomBtnImg.classList.remove('radioRandomBtnLoading');
  // }


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

// 중복 선택을 방지하기 위한 함수
function getRandomItem(itemLast, listLength) {
  let itemRandom;
  do {
    itemRandom = Math.floor(Math.random() * listLength);
  } while (itemRandom === itemLast);

  return itemRandom;
}



// let radioLast = -1;

// function radioRandomPlay() {
//   var radioPlayer = document.getElementById('radioPlayer');
//   const radioRandom = getRandomItem(radioLast, radioList.length);
//   radioLast = radioRandom;
//   const radioSelected = radioList[radioRandom];

//   function onAudioLoading() {
//     // playButton.style.color = 'gray';
//     // playButton.classList.add('blinking');
//     radioSelected.url;
//     radioRandomBtnImg.classList.add('radioRandomBtnLoading');
//   }

//   function onAudioPlaying() {
//     // playButton.style.color = 'yellow';
//     // playButton.classList.remove('blinking');
//     radioRandomBtnImg.classList.remove('radioRandomBtnLoading');
//   }

//   radioPlayer.addEventListener('loadstart', onAudioLoading);
//   radioPlayer.addEventListener('playing', onAudioPlaying);

//   // 현재 오디오가 재생 중인지 확인
//   if (radioPlayer.paused) {
//     // 일시 중지된 상태일 경우, 새로운 URL을 설정하고 재생
//     radioPlayer.src = radioSelected.url;
//     radioPlayer.load();
//     radioPlayer.play();
//   } else {
//     // 재생 중인 상태일 경우, 일시 중지
//     radioPlayer.pause();
//   }


// }

// // 중복 선택을 방지하기 위한 함수
// function getRandomItem(itemLast, listLength) {
//   let itemRandom;
//   do {
//     itemRandom = Math.floor(Math.random() * listLength);
//   } while (itemRandom === itemLast);

//   return itemRandom;
// }
const radioList = [
  { url: 'https://ice7.securenetsystems.net/KCSM2', station: 'Jazz' },
  { url: 'http://gr02.cdnstream.com:8290', station: 'FM2' },
  { url: 'http://curiosity.shoutca.st:9073/stream', station: 'FM3' },
];

let radioLast = -1;

function radioRandomPlay() {
  var radioPlayer = document.getElementById('radioPlayer');
  const radioRandom = getRandomItem(radioLast, radioList.length);
  radioLast = radioRandom;
  const radioSelected = radioList[radioRandom];

  // radioPlayer.pause();
  // radioPlayer.src = radioSelected.url;
  // radioPlayer.load();
  // radioPlayer.play();

  function onAudioLoading() {
    playButton.style.color = 'gray';
    playButton.classList.add('blinking');
    radioRandomBtnImg.classList.add('radioRandomBtnLoading');
  }

  function onAudioPlaying() {
    playButton.style.color = 'yellow';
    playButton.classList.remove('blinking');
    radioRandomBtnImg.classList.remove('radioRandomBtnLoading');
  }

  radioPlayer.addEventListener('loadstart', onAudioLoading);
  radioPlayer.addEventListener('playing', onAudioPlaying);

  // 현재 오디오가 재생 중인지 확인
  if (radioPlayer.paused) {
    // 일시 중지된 상태일 경우, 새로운 URL을 설정하고 재생
    radioPlayer.src = radioSelected.url;
    radioPlayer.load();
    radioPlayer.play();
  } else {
    // 재생 중인 상태일 경우, 일시 중지
    radioPlayer.pause();
    playButton.style.color = 'white';
  }


}

// 중복 선택을 방지하기 위한 함수
function getRandomItem(itemLast, listLength) {
  let itemRandom;
  do {
    itemRandom = Math.floor(Math.random() * listLength);
  } while (itemRandom === itemLast);

  return itemRandom;
}







$('.menu-btn#row1').addClass('blinking');

$(".menu-btn").click(function (e) {
    e.preventDefault();

    $('[class^=row]').not($('.'+this.id)).hide();

    var btns = $(".menu-btn");
    for(var i=0; i<btns.length; i++) {
      var btn = btns.eq(i);
      if(btn[0] !== $(this)[0]) {
        btn.removeClass("blinking");
        // $('.row1').addClass('show');
      }
    }

    if($(this).hasClass("blinking")) {
      $(this).removeClass("blinking");
      // $('.row1').removeClass('show');
    }
    else {
      $(this).addClass("blinking");
      // $('.row1').removeClass('show');
    }

    $('.'+this.id).slideToggle(0);
});


function menuProjects() {
  document.getElementById("main")[0].style.display = "none";
}




function radioPlay(url) {
  var radioRandomBtnImg = document.getElementById('radioRandomBtnImg');
  var radioPlayer = document.getElementById('radioPlayer');
  var playButton = document.getElementById('playButton'); // 이 부분에 실제 버튼의 ID를 사용하세요

  // 오디오 로딩 중에 호출될 함수
  function onAudioLoading() {
    // 로딩 중일 때 버튼 텍스트 컬러를 빨강색으로 변경
    // button.style.color = 'gray';
    // playButton.innerText = 'Loading';
    // button.classList.add('blinking');
    radioRandomBtnImg.classList.add('radioRandomBtnLoading');
  }

  // 오디오 로딩 완료 후 호출될 함수
  // function onAudioLoaded() {
  //   // 로딩이 완료되면 버튼 텍스트 컬러를 기본값으로 변경 (예: 검은색)
  //   playButton.style.color = 'blue';
  //   playButton.classList.remove('blinking');
  // }

  // 오디오가 재생 중일 때 호출될 함수
  function onAudioPlaying() {
    // 재생 중일 때 버튼 텍스트 컬러를 기본값으로 변경 (예: 검은색)
    // button.style.color = 'yellow';
    // button.classList.remove('blinking');
    radioRandomBtnImg.classList.remove('radioRandomBtnLoading');
  }

  // 이벤트 리스너 등록
  radioPlayer.addEventListener('loadstart', onAudioLoading);
  radioPlayer.addEventListener('playing', onAudioPlaying);
  // radioPlayer.addEventListener('loadeddata', onAudioLoaded);

  // 현재 오디오가 재생 중인지 확인
  if (radioPlayer.paused) {
    // 일시 중지된 상태일 경우, 새로운 URL을 설정하고 재생
    radioPlayer.src = url;
    radioPlayer.load();
    radioPlayer.play();
  } else {
    // 재생 중인 상태일 경우, 일시 중지
    radioPlayer.pause();
    playButton.style.color = 'white';
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


// function radioPlay(url, stationName) {
//   var radioPlayer = document.getElementById('radioPlayer');

//   // 현재 오디오가 재생 중인지 확인
//   if (radioPlayer.paused) {
//     // 일시 중지된 상태일 경우, 새로운 URL을 설정하고 재생
//     radioPlayer.src = url;
//     radioPlayer.load();
//     radioPlayer.play();
//   } else {
//     // 재생 중인 상태일 경우, 일시 중지
//     radioPlayer.pause();
//   }


//   var playingNowText = document.getElementById('playingNowText');
//   playingNowText.textContent = "Playing Now: " + stationName;

//   if (stationName !== "Select Down") {
//     playingNowText.classList.add("active");
//   } else {
//     playingNowText.classList.remove("active");
//   }
// }


// function radioPlay(url, stationName) {
//   var radioPlayer = document.getElementById('radioPlayer');
//   radioPlayer.pause();
//   radioPlayer.src = url;
//   radioPlayer.load();
//   radioPlayer.play();
// }
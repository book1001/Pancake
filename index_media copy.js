function updateLocationText() {
  const width = window.innerWidth; // 현재 창의 가로 크기 측정
  const locationElement = document.getElementById('location');

  if (width >= 1780) {
    locationElement.innerText = 'Halim bakes pancakes...';
  } else if (width >= 1600) {
    locationElement.innerText = 'Halim bakes pancakes..';
  } else if (width >= 1500) {
    locationElement.innerText = 'Halim bakes pancakes.';
  } else if (width >= 1400) {
    locationElement.innerText = 'Halim bakes pancakes';
  } else if (width >= 1300) {
    locationElement.innerText = 'Halim bakes pancakes';
  } else if (width >= 1200) {
    locationElement.innerText = 'Halim bakes pancakes.';
  } else if (width >= 1100) {
    locationElement.innerText = 'Halim bakes pancakes..';
  } else if (width >= 1000) {
    locationElement.innerText = 'Halim bakes pancakes...';
  } else if (width >= 900) {
    locationElement.innerText = 'Halim bakes pancakes..';
  } else if (width >= 800) {
    locationElement.innerText = 'Halim bakes pancakes.';
  } else if (width >= 700) {
    locationElement.innerText = 'Halim bakes pancakes';
  } else if (width >= 600) {
    locationElement.innerText = 'Halim bakes pancakes.';
  } else if (width >= 500) {
    locationElement.innerText = 'Halim bakes pancakes..';
  } else {
    locationElement.innerText = 'Halim bakes pancakes...';
  }
}

// 창 크기가 변경될 때마다 실행
window.addEventListener('resize', updateLocationText);

// 페이지 로드 시 한 번 실행하여 초기 텍스트 설정
updateLocationText();
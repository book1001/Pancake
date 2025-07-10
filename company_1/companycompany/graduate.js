  // 랜덤 텍스트 배열
  const texts = [
    "I became a good orange person", 
    "I became a perfect lemon person", 
    "I became an awesome pear person"
  ];

  // 랜덤 텍스트 선택
  const randomText = texts[Math.floor(Math.random() * texts.length)];

  // 텍스트 요소에 랜덤 텍스트 표시
  document.getElementById('text').innerText = randomText;

  // 텍스트에 따라 이미지 경로 설정
  let imagePath = '';
  let background = '';

  switch (randomText) {
    case 'I became a good orange person':
      imagePath = '../img/p-orange.gif';
      background = 'linear-gradient(180deg, rgba(255,254,246,1) 75%, rgba(255,134,78,1) 100%)';
      break;
    case 'I became a perfect lemon person':
      imagePath = '../img/p-lemon.gif';
      background = 'linear-gradient(180deg, rgba(255,254,246,1) 75%, rgba(251,255,116,1) 100%)';
      break;
    case 'I became a awesome pear person':
      imagePath = '../img/p-pear.gif';
      background = 'linear-gradient(180deg, rgba(255,254,246,1) 75%, rgba(154,219,76,1) 100%';
      break;
    default:
      // 기본값 설정
      imagePath = '../img/p-pear.gif';
      background = 'linear-gradient(180deg, rgba(255,254,246,1) 75%, rgba(154,219,76,1) 100%';
  }

  // 이미지 업데이트
  document.getElementById('image').src = imagePath;
  document.body.style.background = background;
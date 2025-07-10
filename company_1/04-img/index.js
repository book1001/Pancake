

function showRandomImage() {
    // 이미지 파일 또는 URL 목록
    var imageList = ['20.jpg','21.jpg'];
    var imagePosition = ['100px','200px'];
  
    // 랜덤한 숫자 생성 (0부터 이미지 목록 길이까지)
    var randomIndex = Math.floor(Math.random() * imageList.length);
    var randomIndex2 = Math.floor(Math.random() * imagePosition.length);
  
    // 선택된 이미지의 파일 이름 또는 URL
    var selectedImage = imageList[randomIndex];
    var selectedPosition = imagePosition[randomIndex2];

    

    // 이미지를 화면에 표시
    var imgElement = document.getElementById('randomImage');
    imgElement.style.left = selectedPosition;
    imgElement.src = selectedImage;
  }
  
  // 함수 호출
showRandomImage();
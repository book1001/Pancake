// function handleKeyPress(event) {
//     if (event.key === 'n' && !event.shiftKey) {
//       window.open('3rd_floor.html', '_blank');
//     }
//   }

//   document.addEventListener('keydown', handleKeyPress);


  function handleKeyPress(event) {
    if (event.key === 'n' && !event.shiftKey) {
      const width = 1792;
      const height = 1032;
  
      // 화면 중앙에 배치하기 위해 top과 left 값 계산
      const left = (window.screen.width - width) / 2;
      const top = (window.screen.height - height) / 2;
  
      window.open(
        '3rd_floor.html',
        '_blank',
        `width=${width},height=${height},top=${top},left=${left},scrollbars=no,toolbar=no`
      );
    }
  }
  
  document.addEventListener('keydown', handleKeyPress);
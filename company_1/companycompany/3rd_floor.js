function handleKeyPress(event) {
  if (event.key === 'e' && !event.shiftKey) {
    const width = 1000;
    const height = 950;

    // 화면 중앙에 배치하기 위해 top과 left 값 계산
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    window.open(
      'graduate.html',
      '_blank',
      `width=${width},height=${height},top=${top},left=${left},scrollbars=no,toolbar=no`
    );
  }
}

document.addEventListener('keydown', handleKeyPress);
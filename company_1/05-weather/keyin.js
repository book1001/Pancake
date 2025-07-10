function handleKeyPress(event) {
    if (event.key === 'n' && !event.shiftKey) {
      window.open('3rd_floor.html', '_blank');
    }
  }

  document.addEventListener('keydown', handleKeyPress);
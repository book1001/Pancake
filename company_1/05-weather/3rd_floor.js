function handleKeyPress(event) {
  if (event.key === 'e' && !event.shiftKey) {
    window.open('graduate.html', '_blank');
  }
}

document.addEventListener('keydown', handleKeyPress);
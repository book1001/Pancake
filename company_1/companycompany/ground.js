function getRandomizedPositions() {
  const positions = [0, 150, 300, 450, 600, 750, 900, 1050, 1200, 1350];
  // Shuffle positions array to get random order
  for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  return positions;
}

function setPosition(elementId, xPosition) {
  const element = document.getElementById(elementId);
  
  element.style.left = `${xPosition}px`;
  element.style.bottom = `-17px`;
}

const randomizedPositions = getRandomizedPositions();

// Set positions for each element
setPosition('city1', randomizedPositions[0]);
setPosition('city2', randomizedPositions[1]);
setPosition('city3', randomizedPositions[2]);
setPosition('city4', randomizedPositions[3]);
setPosition('city5', randomizedPositions[4]);
setPosition('tree1', randomizedPositions[5]);
setPosition('tree2', randomizedPositions[6]);
setPosition('shortcuts-text', randomizedPositions[7]);
setPosition('shortcuts-text2', randomizedPositions[8]);
setPosition('shortcuts-text3', randomizedPositions[9]);
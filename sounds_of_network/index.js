function scaleIframe() {
  var iframe = document.getElementById('iframeScale');
  var containerWidth = window.innerWidth; 
  var containerHeight = window.innerHeight; 
  var scaleWidth = containerWidth / 1100; 
  var scaleHeight = containerHeight / 730; 
  var scale = Math.min(scaleWidth, scaleHeight); 

  // Not smaller than scale 1
  if (scale < 1) {
    scale = 1;
  }

  iframe.style.transform = `scale(${scale})`;
  // iframe.style.width = `${1100 * scale}px`;
  // iframe.style.height = `${730 * scale}px`;
}

window.addEventListener('resize', scaleIframe); 
window.addEventListener('load', scaleIframe); 
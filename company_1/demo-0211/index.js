var w=window.innerWidth;
var h=window.innerHeight;

var svg1;
svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg1.setAttribute("width",h);
svg1.setAttribute("height",h);
svg1.setAttribute("id","svgOutput");

var gridSize = 50;
var cellSize = h/gridSize;

function pixel(x,y,size,color) {
  var rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect1.setAttributeNS(null,'x',x);
  rect1.setAttributeNS(null,'y',y);
  rect1.setAttributeNS(null,'height',size);
  rect1.setAttributeNS(null,'width',size);
  rect1.setAttributeNS(null,'fill',color);
  svg1.prepend(rect1);
}

noise.seed(Math.random());
console.log(noise)

var scaleX=Math.random()*500;
var scaleY=50;

for(x=0; x<gridSize; x++){
  for(y=0; y<gridSize; y++){
    var value = noise.simplex2(x/scaleX, y/scaleY);
    console.log(value)
    pixel(x*cellSize,y*cellSize,cellSize*value+5,"green")
  }
}


// for(x=0; x<gridSize; x++){
//   for(y=0; y<gridSize; y++){
//     pixel(x*cellSize,0,cellSize,"green")
//   }
// }

document.body.appendChild(svg1)

let videos = []; 
let randomVideo;
let playing = true;

var gridSize = 150; 
var cellSize;

let colors = [];
let randomC1;
let randomC2;
let randomC3;

function loadVideo() {
  dance1 = createVideo("resource/dance1.mp4");
  dance2 = createVideo("resource/dance2.mp4");
  dance3 = createVideo("resource/dance3.mp4");
  dance4 = createVideo("resource/dance4.mp4");
  dance5 = createVideo("resource/dance5.mp4");

  walk1 = createVideo("resource/walk1.mp4");
  walk2 = createVideo("resource/walk2.mp4");

  ride1 = createVideo("resource/ride1.mp4");
  guitar1 = createVideo("resource/guitar1.mp4");

  bird1 = createVideo("resource/bird1.mp4");
  bird2 = createVideo("resource/bird2.mp4");
  bird3 = createVideo("resource/bird3.mp4");
  bird4 = createVideo("resource/bird4.mp4");
  bird5 = createVideo("resource/bird5.mp4");
  bird6 = createVideo("resource/bird6.mp4");
  bird7 = createVideo("resource/bird7.mp4");

  cat1 = createVideo("resource/cat1.mp4");
  cat2 = createVideo("resource/cat2.mp4");
  cat3 = createVideo("resource/cat3.mp4");

  deer1 = createVideo("resource/deer1.mp4");
  deer2 = createVideo("resource/deer2.mp4");
  crab1 = createVideo("resource/crab1.mp4");
  crab2 = createVideo("resource/crab2.mp4");

  animal1 = createVideo("resource/animal1.mp4");
  camel1 = createVideo("resource/camel1.mp4");
  dinosaur1 = createVideo("resource/dinosaur1.mp4");
  dragon1 = createVideo("resource/dragon1.mp4");  
  elephant1 = createVideo("resource/elephant1.mp4");
  mouse1 = createVideo("resource/mouse1.mp4");
  turtle1 = createVideo("resource/turtle1.mp4");
  lion1 = createVideo("resource/lion1.mp4");
  fish1 = createVideo("resource/fish1.mp4");
  
  
  videos = [
    dance1, dance2, dance3, dance4, dance5, 
    walk1, walk2, 
    ride1, guitar1, 
    bird1, bird2, bird3, bird4, bird5, bird6, bird7,
    cat1, cat2, cat3,
    deer1, deer2, 
    crab1, crab2, 
    animal1, camel1, dinosaur1, dragon1, elephant1, mouse1, turtle1, lion1, fish1, 
  ]; 
  randomVideo = random(videos);

  colors = ["red", "green", "yellow"];
  randomC1 = random(colors);
  randomC2 = random(colors);
  randomC3 = random(colors);
}

function preload() {
  loadVideo();
  dance1.hide(); dance2.hide(); dance3.hide(); dance4.hide(); dance5.hide();
  walk1.hide(); walk2.hide();
  ride1.hide(); guitar1.hide();
  bird1.hide(); bird2.hide(); bird3.hide(); bird4.hide(); bird5.hide(); bird6.hide(); bird7.hide();
  cat1.hide(); cat2.hide(); cat3.hide();
  deer1.hide(); deer2.hide();
  crab1.hide();
  crab2.hide();
  animal1.hide();
  camel1.hide();
  dinosaur1.hide();
  dragon1.hide();
  elephant1.hide();
  mouse1.hide();
  turtle1.hide();
  lion1.hide();
  fish1.hide();
}

function setup() {
  var size = Math.floor(windowHeight / gridSize) * gridSize;
  // createCanvas(windowWidth, size);
  cellSize = size / gridSize; // Calculate cell size based on canvas size
  createCanvas(size - (cellSize/2), (size/2) - (cellSize/2));
  // noLoop(); 
  // noCanvas();

  let chatBox = createDiv();
  chatBox.style('background', randomC2);
  chatBox.style('position', 'fixed');
  chatBox.style('top', '0');
  chatBox.style('right', '0');
  chatBox.style('margin', '10px');
  chatBox.style('width', '25%');
  chatBox.style('height', '100%');
  chatBox.style('z-index', '-1');

  //       fill(randomC3);
  //       for(let y = 10; y < 100; y += cellSize){
  //         for(let x = 10; x < 140; x += cellSize){
  //           circle(x, y, cellSize);
  //           let chatBox2 = createDiv();
  //           chatBox2.style('background', randomC3);
  //           chatBox2.style('position', 'fixed');
  // chatBox2.style('top', '0');
  // chatBox2.style('left', '0');
  // chatBox2.style('margin', '10px');
  // chatBox2.style('width', '25%');
  // chatBox2.style('height', '100%');
  //         }
  //       }

  randomVideo.size(gridSize, gridSize/2);
  colorMode(HSB, 100);
  randomVideo.volume(0);
  randomVideo.loop();
  // randomVideo.position(0.0);
}

function draw() {
  // background(255);
  noStroke();
  let img = randomVideo.get();
  // for (var y = 0; y < windowHeight; y++) {
  //   for (var x = 0; x < windowWidth; x++) {
  //     fill("red");
  //     ellipse((x * cellSize)+(cellSize/2), (y * cellSize)+(cellSize/2), cellSize, cellSize);
  //   }
  // }

  // Loop over each grid cell
  for (var y = 0; y < gridSize; y++) {
    for (var x = 0; x < gridSize; x++) {
      // Get the color of the corresponding pixel in the image
      var pixelColor = img.get(x, y);
      let b = brightness(pixelColor); // Get brightness, scale of 0 to 100
      // console.log(b)

      // Assuming you want to keep the dithering effect but base it on the image's pixel colors
      // Here we simply fill each cell with the color from the image
      //   if(b < 50){
      //     fill("black");
      //     rect(x * cellSize, y * cellSize, cellSize, cellSize);
      //  }
      //  else{
      //     fill("red");
      //     ellipse(x * cellSize, y * cellSize, cellSize, cellSize);
      //  }
      // if(80 <= b < 90){
      //   fill("black");
      //   rect((x * cellSize)+(cellSize/2), (y * cellSize)+(cellSize/2), cellSize, cellSize);
      // }
      // if(b < 79){
      //   fill("green");
      //   rect((x * cellSize)+(cellSize/2), (y * cellSize)+(cellSize/2), cellSize, cellSize);
      // }
      // else{
      //   fill("red");
      //   ellipse((x * cellSize)+(cellSize/2), (y * cellSize)+(cellSize/2), cellSize, cellSize);
      // }

      if(80 <= b < 90){

        fill("white");
        rect((x * cellSize)+(cellSize), (y * cellSize)+(cellSize), cellSize, cellSize);
      }
      if(b < 79){
        fill("black");
        rect((x * cellSize), (y * cellSize), cellSize, cellSize);
        fill(randomC2);
        rect((x * cellSize)+(cellSize), (y * cellSize)+(cellSize), cellSize, cellSize);
      }
      else{
        // fill(randomC3);
        // ellipse((x * cellSize)+(cellSize), (y * cellSize)+(cellSize), cellSize, cellSize);
      }
        
      // if(b < 50){
      //   fill("black");
      //   rect((x * cellSize)+(cellSize/2), (y * cellSize)+(cellSize/2), cellSize, cellSize);
      // }
      // else{
      //   fill(randomC2);
      //   rect((x * cellSize)+(cellSize/2), (y * cellSize)+(cellSize/2), cellSize, cellSize);
      //   fill(randomC3);
      //   ellipse((x * cellSize)+(cellSize/2), (y * cellSize)+(cellSize/2), cellSize, cellSize);
      // }
    }
  }


  // image(img, 0, 0); 
}


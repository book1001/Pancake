function setup() {
  createCanvas(400, 400);
  background(220);
  noLoop(); // optional, prevents draw() from continuously executing
}

function draw() {
  // Your p5.js drawing code here
  ellipse(200, 200, 100, 100);
  rect(150, 150, 100, 100);
}

function mousePressed() {
  save("mySketch.svg"); // Save the canvas as an SVG file when the mouse is pressed
}



// function setup() {
//     createCanvas(100, 100, SVG);
//     background(0);
//     fill(150);
//     stroke(150);
//   }
  
//   function draw() {
//     var r = frameCount % 200 * Math.sqrt(2);
//     background(255);
//     ellipse(0, 0, r, r);
//   }

//   function keyPressed() {
//     if (value === 0) {
//     save("mySVG.svg"); // give file name
//     print("saved svg");
//     } 
//   }


// var gridSize = 50; // Number of cells in each row and column
// var cellSize; // Size of each cell in the grid
// var scaleX, scaleY;
// var colors = ["orangered", "green", "blue"]

// function setup() {
//     var size = Math.floor(windowHeight / gridSize) * gridSize;
//     createCanvas(size, size, SVG);
//     cellSize = size / gridSize; // Calculate cell size based on canvas size

//     // No loop needed unless you want to animate or interact
//     noLoop();
//     shuffle(colors, true);
// }

// function draw() {
//     background(255); // Set background to white
//     noStroke();

//     // Draw loop for our grid
//     for (var y = 0; y < gridSize; y++) {
//         for (var x = 0; x < gridSize; x++) {

//             //set a condition based on randomness
//             if(Math.random() > .5){
//             fill(colors[0]); // Set fill color
//             // Draw the rectangle for this grid cell
//             rect(x * cellSize, y * cellSize, cellSize, cellSize);
//             }
//             else{
//             fill(colors[1]); // Set fill color
//             // Draw the circle for this grid cell
//             circle(x * cellSize + (cellSize/2), y * cellSize + (cellSize/2), cellSize * random(.5,1));
//             }
//         }
//     }
// }

// function keyPressed() {
//     if (value === 0) {
//     save("mySVG.svg"); // give file name
//     // print("saved svg");
//     } 
//   }
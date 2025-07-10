var gridSize = 50; // Number of cells in each row and column
var cellSize; // Size of each cell in the grid
var scaleX, scaleY;
var rStart 

function setup() {
    var size = Math.floor(windowHeight / gridSize) * gridSize;
    createCanvas(size, size);
    cellSize = size / gridSize; // Calculate cell size based on canvas size
    rStart = random(0,1000)
    // No loop needed unless you want to animate or interact
    noLoop();
}
    var t = 0;
function draw() {
    background(255); // Set background to white
    noStroke();

    // Draw loop for our grid
            t += .02 + rStart

    for (var y = 0; y < gridSize; y++) {
        for (var x = 0; x < gridSize; x++) {
            var sin =  Math.sin(t+x / 20) * cellSize
            var cos =  Math.cos(t+y / 20) * cellSize

            console.log(sin)
            fill("black"); // Set fill color
            // Draw the rectangle for this grid cell
            rect(x * cellSize, y * cellSize, sin, cos);

        }
    }
}
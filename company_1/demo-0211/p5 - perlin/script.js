var gridSize = 50; // Number of cells in each row and column
var cellSize; // Size of each cell in the grid
var scaleX, scaleY;
var t = 0;
var colors = ["orangered", "green", "blue", "tan", "teal", "magenta"]

function setup() {
    var size = Math.floor(windowHeight / gridSize) * gridSize;
    createCanvas(size, size);
    cellSize = size / gridSize; // Calculate cell size based on canvas size

    // Seed the noise function
    noiseSeed(Math.random());

    // Random scale factors for noise
    scaleX = Math.random() * 50;
    scaleY = Math.random() * 50;
    shuffle(colors, true)
    // No loop needed unless you want to animate or interact
    noLoop();
}

function draw() {
    background(255); // Set background to white
    noStroke();
    t+=.01;
    // Draw loop for our grid
    for (var y = 0; y < gridSize; y++) {
        for (var x = 0; x < gridSize; x++) {
            // Generate Perlin noise value for this cell
            var noiseVal = noise(x / scaleX + t, y / scaleY + t);

            // Map noise value to grayscale color
            var colorValue = Math.floor((noiseVal + 1) * 128);
            //console.log(noiseVal)

            if (noiseVal > 0 && noiseVal <= .4) {
                fill(colors[0]); // Set fill color
            }
            if (noiseVal > .4 && noiseVal <= .5) {
                fill(colors[1]); // Set fill color
            }
            if (noiseVal > .5 && noiseVal <= 1) {
                fill(colors[2]); // Set fill color
            }
            // Draw the rectangle for this grid cell
            rect(x * cellSize, y * cellSize, cellSize, cellSize);
            //circle(x * cellSize, y * cellSize, cellSize*1.5);

        }
    }
}
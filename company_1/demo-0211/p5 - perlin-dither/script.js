var gridSize = 200; // Number of cells in each row and column
var cellSize; // Size of each cell in the grid
var scaleX, scaleY;
var t = 0;
function setup() {
    var size = Math.floor(windowHeight / gridSize) * gridSize;
    createCanvas(size, size);
    cellSize = size / gridSize; // Calculate cell size based on canvas size

    noiseSeed(Math.random());
    scaleX =random(10,gridSize);
    scaleY = random(10,gridSize);

    noLoop(); // Static image, no need to loop
}

function draw() {
    background(255);
    noStroke();
    t+=.005
    // Pre-generate noise values for the entire grid
    var noiseGrid = [];
    for (var y = 0; y < gridSize; y++) {
        noiseGrid[y] = [];
        for (var x = 0; x < gridSize; x++) {
            noiseGrid[y][x] = noise(x / scaleX + t, y / scaleY) * 255;
        }
    }

    // Apply Floyd-Steinberg dithering across the grid
    for (var y = 0; y < gridSize; y++) {
        for (var x = 0; x < gridSize; x++) {
            var oldPixel = noiseGrid[y][x];
            var newPixel;

              if(oldPixel > 0 && oldPixel < 150) {
                newPixel = 0;
                fill("green");

              }
              if(oldPixel > 150 && oldPixel < 200) {
                newPixel = 150;
                fill("orangered");
              }
              if(oldPixel > 200 && oldPixel < 255) {
                newPixel = 200;
                fill("magenta");
              }


            rect(x * cellSize, y * cellSize, cellSize, cellSize);

            var quantError = oldPixel - newPixel;
            if (x + 1 < gridSize) noiseGrid[y][x + 1] += quantError * 7 / 16;
            if (y + 1 < gridSize) {
                if (x > 0) noiseGrid[y + 1][x - 1] += quantError * 3 / 16;
                noiseGrid[y + 1][x] += quantError * 5 / 16;
                if (x + 1 < gridSize) noiseGrid[y + 1][x + 1] += quantError * 1 / 16;
            }
        }
    }
}


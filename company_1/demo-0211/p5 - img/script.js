let img; // Variable to store the image
var gridSize = 200; // Number of cells in each row and column
var cellSize; // Size of each cell in the grid

function preload() {
    // Load your image here
    img = loadImage('test.png');
}

function setup() {
    var size = Math.floor(windowHeight / gridSize) * gridSize;
    createCanvas(size, size);
    cellSize = size / gridSize; // Calculate cell size based on canvas size
    noLoop(); // Static image, no need to loop

    // Resize image to match gridSize for simplicity
    img.resize(gridSize, gridSize);
    colorMode(HSB, 100); // Temporarily switch to HSB mode

}

function draw() {
    background(255);
    noStroke();

    // Loop over each grid cell
    for (var y = 0; y < gridSize; y++) {
        for (var x = 0; x < gridSize; x++) {
            // Get the color of the corresponding pixel in the image
            var pixelColor = img.get(x, y);
            let b = brightness(pixelColor); // Get brightness, scale of 0 to 100
            console.log(b)

            // Assuming you want to keep the dithering effect but base it on the image's pixel colors
            // Here we simply fill each cell with the color from the image
            if(b < 50){
               fill("black");
            }
            else{
               fill("white");
            }
            rect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}
function setup() {
    createCanvas(windowHeight, windowHeight); // Create a canvas to draw on
    // No loop needed for static display
    noLoop();
}

function draw() {

    background(200); // Set a light gray background

    // Set colors for fill and stroke
    fill(0, 0, 0); // Light blue fill
    noStroke(); // No stroke


    //---p5 shape functions

    // Rectangle
    rect(20, 20, 60, 40);

    // Square
    square(100, 20, 60);

    // Circle
    circle(200, 40, 50);

    // Ellipse
    ellipse(280, 40, 60, 40);

    // Line

    // Triangle
    triangle(310, 60, 350, 20, 390, 60);

    // Quadrilateral
    quad(420, 20, 460, 40, 420, 60, 380, 40);

    // Arc
    arc(480, 40, 50, 50, 0, PI / 2);

    //Line
    stroke(0, 0, 0); // Light blue fill
    line(580, 20, 640, 60);
    noStroke();

    //Text
    textSize(50)
    text('hi', 530, 60);



    //---p5 algo functions
    console.log(random(50, 500))
    console.log(int(random(50, 500)))
    console.log(noise(500))

    var colors = ["red", "green", "blue"]
    shuffle(colors, true);
    console.log(colors)


    //--for loops
    for (i = 0; i < 10; i++) {
        shuffle(colors, true);
        fill(colors[0])
        text(i, random(0, windowHeight), random(0, windowHeight));
    }

    //--conditions
    var boolean = true
    var randomNumber = random(0,1)

    if(boolean === true){
    	fill("black")
        text("true",  windowHeight/2 - 50, windowHeight/2);
    }
    else{
    	fill("red")
        text("false",  windowHeight/2 - 50, windowHeight/2);
    }

    if(randomNumber > .5){
        text("over .5",  windowHeight/2 - 50, windowHeight/2 + 50);

    }
    else{
        text("under .5",  windowHeight/2 - 50, windowHeight/2 + 50);
    }


}
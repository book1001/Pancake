// Define an array of words related to medieval characters
var words = ["knight", "monk", "king", "queen", "jester", "sage"];

// Generate a random index based on the length of the words array
var randomIndex = Math.floor(Math.random() * words.length);

// Select a random word from the words array using the random index
var randomWord = words[randomIndex];

// Construct a sentence by concatenating "The ", the random word, and " journeyed forward."
var sentence = "The " + randomWord + " journeyed forward.";

// Output the sentence to the console
console.log(sentence);

// Display the sentence on the webpage by setting the innerHTML of the element with id "sentenceOutput"
document.getElementById("sentenceOutput").innerHTML = sentence;

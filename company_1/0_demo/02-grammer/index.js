//use an object to set up grammer
var rules = {
    "sentance": ["The noun verb"],
    "noun": ["knight", "monk", "king", "queen", "jester", "sage"],
    "verb": ["attacked.", "prays.", "assists.", "blesses.", "jokes.", "ascends.", "defends.", "demands.", "rests."]
};

//set up a function to parse grammers
function generate(symbol) {
    // Check if the symbol exists in the rules variable
    if (!rules[symbol]) {
        // If not, return the symbol as is (base case for recursion)
        return symbol;
    }
    // Retrieve the array of possible expansions for the given symbol from the rules
    var expansions = rules[symbol];
    // Select a random index from the expansions array
    var randomIndex = Math.floor(Math.random() * expansions.length);
    // Choose an expansion using the randomly selected index
    var expansion = expansions[randomIndex];
    
    // Split the chosen expansion into individual words (symbols)
    var expansionWords = expansion.split(" ");
    // Initialize an array to hold the results of generating each word
    var result = [];
    // Iterate over each word in the chosen expansion
    for (var i = 0; i < expansionWords.length; i++) {
        // Recursively generate the string for each word and add it to the result array
        result.push(generate(expansionWords[i]));
    }
    // Join the array of generated strings into a single string with spaces and return it
    return result.join(" ");
}

// Example usage
var sentence = generate("sentance");
console.log(sentence);
document.getElementById("sentenceOutput").innerHTML = sentence;

// Function to select a random element from an array
function selectRandom(array) {
    // Return a random element from the array
    return array[Math.floor(Math.random() * array.length)];
}

// Function to generate a random sentence
function generateSentence() {
    // Array of possible subjects for the sentence
    let subjects = ["knight", "monk", "king", "queen", "jester", "sage", "artist"];
    // Array of possible verbs for the sentence
    let verbs = ["saw", "met", "is considering", "likes", "dislikes", "honored", "dishonered"];
    // Array of possible objects for the sentence
    let objects = ["idea", "challenge", "opportunity", "quest"];
    // Array of possible adjectives for the sentence
    let adjectives = ["an interesting", " a boring", "an exciting", "a difficult", "an easy"];
    // Array of possible adverbs for the sentence
    let adverbs = ["quickly", "slowly", "carefully", "happily", "sadly"];

    // Select a random subject from the subjects array
    let subject = selectRandom(subjects);
    // Select a random verb from the verbs array
    let verb = selectRandom(verbs);
    // Select a random object from the objects array
    let object = selectRandom(objects);
    // Select a random adjective from the adjectives array
    let adjective = selectRandom(adjectives);
    // Select a random adverb from the adverbs array
    let adverb = selectRandom(adverbs);

    // Return the generated sentence by joining the random words with spaces
    return "a " + subject + " " + verb + " " + adjective + " " + object + " " + adverb + ". ";
}

// Loop to generate and display five example sentences
for (let i = 0; i < 5; i++) {
    // Append each generated sentence to the innerHTML of the element with id "sentenceOutput"
    document.getElementById("sentenceOutput").innerHTML += generateSentence();
}
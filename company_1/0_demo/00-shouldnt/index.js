// Initialize a fixed phrase to start the sentence
var one = "You shouldn't";

// Define an array of verbs/options that could follow the initial phrase
var twoOptions = ["deny", "dis", "allow", "forget", "hold", "ignore", "keep", "neglect", "refuse", "reject", "halt", "stop", "exclude", "kill", "lack", "need", "want"];

// Initialize another fixed phrase to use in the sentence
var three = "your own";

// Define an array of nouns/concepts that could end the sentence
var fourOptions = ["belief", "concept", "conclusion", "design", "feeling", "form", "intention", "interpretation", "meaning", "notion", "objective", "opinion", "perception", "plan", "scheme", "sense", "solution", "suggestion", "theory", "thought", "understanding", "view", "aim", "approximation", "genius", "cleverness", "conception", "conviction", "doctrine", "end", "estimate", "essence", "guess", "hint", "hypothesis", "importance", "impression", "idea", "indication", "judgment", "object", "pattern", "purpose", "reason", "significance", "suspicion", "teaching", "point", "life"];

// Randomly select a verb/option from the twoOptions array
var two = twoOptions[Math.floor(Math.random() * twoOptions.length)];

// Randomly select a noun/concept from the fourOptions array
var four = fourOptions[Math.floor(Math.random() * fourOptions.length)];

// Construct the sentence by concatenating the selected phrases and words with spaces, ending with a line break
var text = " " + one + " " + two + " " + three + " " + four + ".<br>";

// Create a new Date object to get the current time
var d = new Date();

// Convert the current time to a localized string
var t = d.toLocaleTimeString();

// Display the time followed by the generated sentence in the HTML element with id "sentenceOutput"
document.getElementById("sentenceOutput").innerHTML = t + text;

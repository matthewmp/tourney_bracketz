// Generate 3-word string from dictionary
module.exports = function() {
    // Import models (we need models.Tournament)
    const models = require('../models');

    // Import Dictionary
    const dictionary = require('./dictionary');

    // Get string combination 
    var tempString = createURLString();

    // Check if this combination is already in use
    // Create the *Tournament* from the form
    models.Tournament.findOne({
        where: {
            publicURL: tempString
        }
    }).then(data => {
        if (data == null) {
            console.log("tempString " + tempString + " is not in use. Returning...")
            return tempString;
        } else {       
            console.log(tempString + ": string already in use.");
            //Recursively call the function to generate a new string
        }
    })

    function createURLString() {
        // The length of the array is 1000 and not changing.
        var dictionarylength = 1000;

        // Select three words randomly. 
        var firstWord = dictionary[Math.floor(Math.random() * dictionarylength)];
        var secondWord = dictionary[Math.floor(Math.random() * dictionarylength)];
        var thirdWord = dictionary[Math.floor(Math.random() * dictionarylength)];

        // Return the resulting string
        return firstWord + "-" + secondWord + "-" + thirdWord;
    }
}

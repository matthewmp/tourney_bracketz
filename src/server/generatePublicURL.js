// Generate 3-word string from dictionary
module.exports = function() {
    var dictionary = require('./dictionary');

    // Select three words randomly. The length of the array is 1000 and not changing
    var firstWord = dictionary[Math.floor(Math.random() * 1000)];
    var secondWord = dictionary[Math.floor(Math.random() * 1000)];
    var thirdWord = dictionary[Math.floor(Math.random() * 1000)];

    // Return the resulting string
    return firstWord + "-" + secondWord + "-" + thirdWord;
}
const expect = require('chai').expect;

// This test is an integration test putting together all of the functions to generate the initial tournament brackets
// The imports are simply all of the functions from the 'brackets.js' file so that they can be tested inside this file

import { ranSeeding, bracketGenerator, bracketArr, getByes, matchParticipants } from '../js/brackets';

// The initial list that will come from the users form when the enter the participants in order of seeding.
// Assume the below list is in the correct order/seeding

let participants = ['Tom', 'Brandon', 'Dean', 'Matt', 'Jose'];

// Above the 'bracketArr' was imported which is simply an array of the available number of brackets that can be used.
// As we discussed the other day this will only go up to 64
// So the imported 'bracketArr' above is literally the following array: [2,4,8,16,32,64] (which is at the top of the 'brackets.js' file)


// 1.
// First we need to calculate the # of brackets needed using the bracketGenerator function.
// To do so call bracketGenerator function and pass in the bracketArr (list of available brackets) and number of participants

let numOfBrackets = bracketGenerator(bracketArr, participants.length);
console.log('NUMBER OF BRACKETS: ', numOfBrackets);

// 2.
// Next create a variable to store the # of Byes we will need using the getByes function
// Call function with number of participants and # of brackets (which we have stored above in numOfBrackets)
let numOfByes = getByes(participants.length, numOfBrackets)
console.log('NUMBER OF Byes: ', numOfByes);

// 3.
// Now we need to create the actual brackets with top seeded using up all the Byes and the rest 
// to match up accordingly [NextTopSeed, LowestSeed], [NextTopSeed, NextLowestSeed] as far as I know.
// Call the matchParticipants function with array of participants and the # of Byes.
let brackets = matchParticipants(participants, numOfByes);
console.log('BRACKET: ', brackets);

// From my understanding, if we use the participants array above inside the function the returned 2D array should return
// the following bracket:

// [ ['Tom', 'Buy'], ['Brandon', 'Buy'], ['Dean', 'Buy'], ['Matt', 'Jose'] ]


// Run the following command at the command line:
// npm run test-client
// It should log all of the previous console.log calls

it('should generate the correct brackets and match ups', () => {
	expect(brackets).to.deep.equal([ ['Tom', 'Buy'], ['Brandon', 'Buy'], ['Dean', 'Buy'], ['Matt', 'Jose'] ])
});
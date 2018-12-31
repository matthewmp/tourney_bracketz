
// Execute all functions below and return ordered array for Tourney Brackets
export const createCompetitorPairs = (participantsArr, randomSeeding) => {
	let participants = randomSeeding === true ? ranSeeding(participantsArr) : participantsArr;
	
	let numOfBrackets = bracketGenerator(bracketArr, participants.length);

	let numOfByes = getByes(participants.length, numOfBrackets);

	let brackets = matchParticipants(participants, numOfByes);

	return brackets;
}

// Array of available brackets
export const bracketArr = [2,4,8,16,32,64];

// Function to find correct bracket
// Call function with bracketArr (arr) and number of participants (participants)
// Utilizing a binary search algorithm (of sorts)

// Generate random seeding
export const ranSeeding = (arr) => {
	let ranArray = [];
	let ranIndex = 0;
	let len = arr.length;

	while(len > 0){
		ranIndex = Math.floor(Math.random() * arr.length);
		ranArray.push(arr.splice(ranIndex,1)[0]);
		len = arr.length;
	}
	return ranArray;
}

// Calculates # of brackets needed.  Call this function with the bracketArr above and with the array length of participants ie.
// participants = ['Tom', 'Matt', 'Brandon', 'Dean'];
// bracketGenerator(bracketArr, participants.length); => 
export const bracketGenerator = (arr, participants, start=0, end=arr.length) => {
	if(participants <= 2){
		throw new Error('Must Enter More Than 2 Competitors');
	}

	// Find middle of bracketArr

	const index = Math.floor((start + end) / 2);

	// Get/store value from the center of the array

	const bracketNum = arr[index];

	// Check if the match and return

	if(bracketNum === participants){
		return bracketNum;
	}

	// If that middle value is higher than # of participants and prev value is lower
	// than that is the correct bracket #

	else if(bracketNum > participants && bracketArr[index - 1] < participants){
		return bracketNum;
	} 

	// If the value is too high then recursivley call the function with 
	// recalculated starting/ending points of the array

	else if(bracketNum > participants && bracketArr[index - 1] >= participants){
		return bracketGenerator(arr, participants, start, index-1);
	}

	// If the value is too low then recursivley call the function with 
	// recalculated starting/ending points of the array

	else if(bracketNum < participants){
		return bracketGenerator(arr, participants, index+1, end);
	}
}

// Calculate # of byes needed for tournament
// Call getbyes with number of participants and number of brackets (which should come from the bracketGenerator function) ie.
// participants = ['Tom', 'Matt', 'Brandon', 'Dean', 'Jose'];
// getbyes(participants.length, 8)
export const getByes = (numParticipants, numBrackets) => {
	return numBrackets - numParticipants;
}

// Matches the participants with correct buy or other participant.  This will return a 2D array with pairs inside each inner array.
// Call function with the array of participants and # of byes (which should come from getbyes function) ie.
// participants = ['Tom', 'Matt', 'Brandon', 'Dean', 'Jose'];
// matchParticipants(participants, 3);
export const matchParticipants = (participants, numOfbyes) => {
	// 2D Array to hold pairs of opponents
	let brackets = [];

	// Usurp all byes on top seeded participants and push into brackets array
	for(let i = 0; i < numOfbyes; i++){
		let matchUp = participants.splice(0,1);
		matchUp.push('Bye');
		brackets.push(matchUp);
	}

	// Match up rest of participants against each other
	//for(let i = 0; i < participants.length + 2; i++){
	while(participants.length > 0){
		let matchUp2 = participants.splice(0,1);
		let last = participants.splice(participants.length - 1)[0]
		
		matchUp2.push(last);
		brackets.push(matchUp2);
	}
	
	// Reorder brackets
	let orderedBrackets = [];

	orderedBrackets.push(brackets.splice(0,1));
	orderedBrackets.push(brackets.splice(brackets.length - 1, 1))

	while(brackets.length > 0){

		let mid = Math.ceil((brackets.length / 2));
		let index = mid === 0 ? 0 : (mid - 1)
		orderedBrackets.push(brackets.splice(index,1));
	}
	return orderedBrackets;
}






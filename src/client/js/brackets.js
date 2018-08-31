
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

export const bracketGenerator = (arr, participants, start=0, end=arr.length) => {

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

// Calculate # of buys needed for tournament
export const getBuys = (numParticipants, numBrackets) => {
	return numBrackets - numParticipants;
}

// Matches the participants with correct buy or other participant
export const matchParticipants = (participants, numOfBuys) => {
	// 2D Array to hold pairs of opponents
	let brackets = [];

	// Usurp all buys on top seeded participants and push into brackets array
	for(let i = 0; i < numOfBuys; i++){
		let matchUp = participants.splice(0,1);
		matchUp.push('Buy');
		brackets.push(matchUp);
	}
	

	// Match up rest of participants against each other
	for(let i = 0; i < participants.length + 1; i++){

		console.log('PARTICIPANTS: ', participants);
		let matchUp = participants.splice(0,1);
		let last = participants.splice(participants.length - 1)[0]

		matchUp.push(last);
		brackets.push(matchUp);
	}
	console.log('\n\nBracket: ', brackets);
	return brackets;
}









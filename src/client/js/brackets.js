// Array of available brackets
// export const bracketArr = [2,4,8,16,32,64];

// Execute all functions below and return ordered array for Tourney Brackets
export const createMatchups = (participantsObj) => {
	
	let tournamentSize = getTournamentSize(participantsObj.length);
	
	let numOfByes = tournamentSize - participantsObj.length;

	// Insert bye object(s) into participantsObj
	for (let i=0; i < numOfByes; i++) {
		let temp = {
			playername: "Bye",
			seed: tournamentSize - numOfByes + i + 1, // This gives the bye the correct "seed" for later computations
			wins: 0
		}
		participantsObj.push(temp);
	}

	let brackets = matchParticipants(participantsObj);

	return brackets;
}

// Function to find correct bracket
// Call function with bracketArr (arr) and number of participants (participants)
// Utilizing a binary search algorithm (of sorts)

export const getTournamentSize = (numOfParticipants) => {
	if (numOfParticipants < 2) {
		throw new Error('Must Enter More Than 2 Competitors');
	} else if (numOfParticipants < 5) {
		return 4;
	} else if (numOfParticipants < 9) {
		return 8;
	} else if (numOfParticipants < 17) {
		return 16;
	} else if (numOfParticipants < 33) {
		return 32;
	} else if (numOfParticipants < 65) {
		return 64;
	} else {
		throw new Error('There is a maximum of 64 Competitors allowed.');
	}
}

// Matches the participants with correctcompetitor. This will return a 2D array with pairs inside each inner array.
export const matchParticipants = (participants) => {
	// 2D Array to hold pairs of opponents
	let brackets = [];

	// Match up participants against each other
	while (participants.length > 0){
		// Identify the highest seed
		let highSeed = participants.splice(0,1);

		//Identify the lowest seed as the competitor
		let lowSeed = participants.splice(participants.length - 1)[0]
		
		highSeed.push(lowSeed);
		brackets.push(highSeed);
	}
	
	// Reorder brackets for proper distribution of the higher seeds
	let orderedBrackets = [];

	orderedBrackets.push(brackets.splice(0,1));
	orderedBrackets.push(brackets.splice(brackets.length - 1, 1))

	while (brackets.length > 0){
		let mid = Math.ceil(brackets.length / 2);
		let index = mid === 0 ? 0 : (mid - 1)
		orderedBrackets.push(brackets.splice(index,1));
	}
	return orderedBrackets;
}






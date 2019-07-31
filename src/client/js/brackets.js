// Function to find correct bracket
// Call function with bracketArr (arr) and number of participants (participants)
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

// Matches the participants with correct competitor. This will return a 2D array with pairs inside each inner array.
export const matchParticipants = (participants) => {
	// Array to hold pairs of opponents
	let brackets = [];

	// Create array to store the number of wins per player. This will be stored backwords!
	let userWinsArray = [];

	// This element will exist only on the public page, not during tournament creation
	const userWinsDefined = document.getElementById('userWins');
	
	// If User Wins provided (public page) populate the array
	if (userWinsDefined) {
		userWinsArray = userWinsDefined.value.split('\n')

		// Pad the array to account for byes
		while (userWinsArray.length < participants.length) {
			userWinsArray.push(0);
		}
	// Else Tourney is being created, populate wins opposite Bye's
	} else {
		for (let i =0; i < participants.length; i++) {
			if ( participants[i].playername == "Bye") {
				userWinsArray[i] = 1;
			} else {
				userWinsArray[i] = 0;
			}
		}

		// Reverse the array. We assinged the wins to the Byes, and they need to go to the opponents.
		userWinsArray.reverse();
	}

	// Match up participants against each other
	while (participants.length > 0){

		//Identify the lowest seed (last in array)
		let lowSeed = participants.splice(participants.length - 1)

		// Set the number of wins for the low seed
		lowSeed[0].wins = userWinsArray[userWinsArray.length - 1];

		// Identify the highest seed (first in array)
		let highSeed = participants.splice(0,1);

		// Set the number of wins for the high seed
		highSeed[0].wins = userWinsArray[0];

		// Delete the assigned values from userWinsArray
		userWinsArray.splice(userWinsArray.length - 1, 1)
		userWinsArray.splice(0, 1)

		// Combine elements & push to array of matchups
		highSeed.push(lowSeed[0]);
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

export const paintRoundOneToDom = (pairedBrackets) => {
	// Create the parent container to hold the tournament layout
	let tContainer = document.createElement('div');
	tContainer.id = 'tournament-container';

	// Create a DIV element to hold the round one elements
	let roundOneDOM = document.createElement('div');
	roundOneDOM.classList = `round-1-container total-matchups-${pairedBrackets.length}`;

	// Append each matchup to round One DOM element
	for (let i=0; i < pairedBrackets.length; i++) {
		roundOneDOM.appendChild(pairedBrackets[i]);
	}
	
	// Append round one to the tournament container
	tContainer.appendChild(roundOneDOM);
	
	// Append the entire container to the DOM
	document.body.appendChild(tContainer);
}




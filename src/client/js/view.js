import * as brackets from './brackets';

// Track if the user has entered duplicate names
export let duplicateNames = false;

// Key is the tournamentSize, value is the number of rounds in the tournament (including winner)
export let numOfRoundsTable = { 
	4: 3,
	8: 4,
	16: 5,
	32: 6,
	64: 7
}

// Initialize the buttons, set up listeners
export const initializeTestBracketz = () => {
	// Grab participant entry elements
	const submitButton = document.getElementById('btnSubmit');
	const playerNames = document.getElementById('playerNameEntry');

	// If the submit button & player input fields exist...
	if (submitButton && playerNames) {
		// Create listener for the button click
		submitButton.addEventListener('click', function(event) {
			event.preventDefault();

			// Continue if there are no duplicate names
			if (duplicateNames == false) {
				// Begin the bracket generation process
				createBrackets(playerNames);
			} else {
				// There are dupes
				messenger('Duplicate players are not allowed');
			}

			// Hide landing page content for brackets
			// document.getElementsByClassName('landing-wrapper')[0].style.display = 'none';
		});
		highlightMatch();
	}
}

export const createBrackets = (playerNames) => {
	clearBrackets();

	// Cconvert the names into an object to match the database format
	let participants = createOrderedPlayerList(playerNames);

	// Identify who will be playing who in the first round
	// Returns an array of objects. Each array has 2 players that will play in the first round
	let roundOneMatchups = brackets.createMatchups(participants);	

	// Create the DOM elements for the 1st round of the tournament
	// Returns an array of DIVs that contain the DOM structure for the 1st round matchups
	let pairedBrackets = createRoundOneDOMElements(roundOneMatchups);
	
	// Create the parent container to hold the tournament layout
	let tContainer = document.createElement('div');
	tContainer.id = 'tournament-container';

	// Create a DIV element to hold the round one elements
	let roundOneDOM = document.createElement('div');
	roundOneDOM.classList = 'round-one-container';

	// Append each matchup to round One DOM element
	for (let i=0; i < pairedBrackets.length; i++) {
		roundOneDOM.appendChild(pairedBrackets[i]);
	}
	
	// Append round one to the tournament container
	tContainer.appendChild(roundOneDOM);
	
	// Append the entire container to the DOM
	document.body.appendChild(tContainer);

	// Determine the number of rounds left to create
	let firstRoundMatches = roundOneMatchups.length;

	// Lookup the number of *players* to determine the number of rounds
	let numberOfRounds = numOfRoundsTable[firstRoundMatches]

	createAllRounds(numberOfRounds, firstRoundMatches);

	// let outerBrackets = createOuterBrackets(pairedBrackets, 1);
	// let shellBrackets = createOuterBrackets(outerBrackets);

	// let total = createAllOuterBrackets(pairedBrackets)
	
	// let winner = createFinalBracket(total);

	// Append a reset button to the DOM element to be appended
	// winner.appendChild(createResetButton());

	

	// resetButtonInitialize();
	// addButtonListeners();
}

export const createAllRounds = (numberOfRounds, firstRoundMatches) => {
	let tContainer = document.getElementById('tournament-container');
	let roundCounter = 2;
	let matchupsThisRound = firstRoundMatches / 2;

	// Iterate for each *round*
	while ( numberOfRounds > 0) {
		// Create a DIV to contain this input field
		let roundContainer = document.createElement('div');
		roundContainer.classList = `round-${roundCounter}-container`;

		// Iterate for each *matchup*
		for (let i=0; i < matchupsThisRound; i++) {
			// Create parent DIV to contain this matchup
			let matchupDiv = document.createElement('div');
			matchupDiv.classList = `round-${roundCounter}`;
			
			// Insert 2 inputs for a round that still has competition
			if (matchupsThisRound >= 1) {
				// Append the element to matchupDiv
				matchupDiv.append( createPlayerDiv(null, roundCounter, null, i + 1) );
				matchupDiv.append( createPlayerDiv(null, roundCounter, null, i + 1) );
			} else {
				matchupDiv.append( createPlayerDiv(null, roundCounter, null, i + 1) );
			}
			
			roundContainer.append( matchupDiv )
		}

		tContainer.append( roundContainer );

		matchupsThisRound = matchupsThisRound / 2;
		roundCounter++;
		numberOfRounds--;
	}
}

// Take a string, isolate the names & store in an object
export const createOrderedPlayerList = (playerNames) => {
	// Store the provided names in an array
	let initialParticipants = playerNames.value.split('\n');

	// Remove any empty strings from initialParticipants
	let participants = initialParticipants.filter(function(el) {
		return el !== "";
	});

	// Does the user want to randomize the seeds?
	let randomizeOrder = document.getElementById('randomize').checked;

	// shuffle the array
	if (randomizeOrder == true) {
		participants = ranSeeding(participants);
	}
	
	participants = creatPlayerObject(participants);

	return participants;
}

export const creatPlayerObject = (participants) => {
	let playerObject = [];

	// Loop through the participants array and store each in an object to replicate the database structure
	for (let i=0; i < participants.length; i++) {
		let temp = {
			playername: participants[i],
			seed: i + 1,
			wins: 0
		}
		playerObject.push(temp);
	}
	return playerObject;
}

export const addButtonListeners = () => {
	// Add event listeners to all buttons to advance competitors
	const buttons = document.getElementsByClassName('btn-advance');

	for (let i = 0; i < buttons.length; i++) {
		let el = buttons[i];
		el.addEventListener('click', advance);
	}
}

// Create DOM elements for each matchup (pair of players)
export const createRoundOneDOMElements = (matchups) => {
	let playerDivs = []; // Stores one element for each player
	let playerPairDivs = []; // Stores combined playerDivs for each matchup
	
	// Create One DOM element for each player and store them in the array
	// Iterate over the matchups array
	for (let j=0; j < matchups.length; j++) {
		
		// Iterate over the nested array
		// For some reason there is a third array which requires the static [0] below.
		for (let k=0; k < matchups[j][0].length; k++) {

			let round = 1;
			let seed = matchups[j][0][k].seed;

			let playerElement = createPlayerDiv(matchups[j][0][k].playername, round, seed, j+1);

			playerDivs.push(playerElement);
		}
	}

	// Iterate through all playerDIVs and add each matchup into a parent DIV
	for (let i = 0; i < playerDivs.length; i = i + 2) {
		let matchupParentDiv = document.createElement('div');
		matchupParentDiv.classList = `round-one`;
		matchupParentDiv.classList = `round-one`;
		
		matchupParentDiv.appendChild(playerDivs[i]);
		matchupParentDiv.appendChild(playerDivs[i + 1]);
		
		playerPairDivs.push(matchupParentDiv);
	}
	return playerPairDivs;
}

// Create Single Bracket (DIV that will contain a single player)
export const createPlayerDiv = (playerName, round, seed, matchup) => {
	const singleBracket = document.createElement('div');
	singleBracket.classList = 'playerInputContainer';

	const input = document.createElement('input');
	const btn = document.createElement('button');
	if (playerName != null) {
		input.value = playerName;
	}
	input.setAttribute("disabled", "disabled");
	btn.innerText = '=>';
	btn.classList = `btn-advance round-${round} seed-${seed}`;
	btn.dataset.round = round;
	btn.dataset.seed = seed;
	btn.dataset.matchup = matchup;
	singleBracket.appendChild(input);
	singleBracket.appendChild(btn);

	return singleBracket;
}

// Create Outer Brackets
// export const createOuterBrackets = (pairedBrackets, bracketNumber) => { 
// 	// bracketNumber is the number of columns. ie. 1 = 1st round, 2 = 2nd round, etc

// 	const outerBracketArr = [];
	
// 	// Iterate through the array and identify
// 	for (let i = 0; i < pairedBrackets.length - 1; i = i + 2) {

// 		// Create Outer Bracket Container
// 		const outerBracket = document.createElement('div');
// 		outerBracket.classList = `bracket-wrapper-${bracketNumber} row`;

// 		// Right objects are everything that is not in round 1
// 		const obRight = document.createElement('div');
// 		obRight.classList = `right-object-${bracketNumber}`;

// 		// Left objects have an accompanying right object
// 		const obLeft = document.createElement('div');
// 		obLeft.classList = `left-object-${bracketNumber}`;
		
// 		// left-upper objects are all elements that are in the top left of any parent container
// 		const obTopLeft = document.createElement('div');
// 		obTopLeft.classList = `left-upper-container-${bracketNumber}`;

// 		// lower-container objects are all elements that are in the bottom of any parent container
// 		const obBottomLeft = document.createElement('div');
// 		obBottomLeft.classList = 'lower-container';

// 		// right-upper objects are all objects on the top right of a parent container. These do not exist in round 1
// 		const obTopRight = document.createElement('div');
// 		obTopRight.classList = `right-upper-container-${bracketNumber} top`;

// 		// right-bottom objects are all objects on the bottom right of a parent container. These do not exist in round 1.
// 		const obBottomRight = document.createElement('div');
// 		obBottomRight.classList = 'right-object bottom';

// 		// The top left object gets the previously created DIVs of matchups (2 players)
// 		obTopLeft.appendChild(pairedBrackets[i]);
// 		obBottomLeft.appendChild(pairedBrackets[i + 1]);

// 		// Fill in all brackets outside the first round with empty inputs
// 		// export const createPlayerDiv = (playerName, round, seed, matchup)
// 		const singleBracket1 = createPlayerDiv('');
// 		const singleBracket2 = createPlayerDiv('');

// 		singleBracket1.id = `round_${bracketNumber + i}__input_top`;
// 		singleBracket2.id = `round_${bracketNumber + i}__input_bottom`;	

// 		// Attach children to parents
// 		obTopRight.appendChild(singleBracket1);
// 		obBottomRight.appendChild(singleBracket2);

// 		obRight.appendChild(obTopRight);
// 		obRight.appendChild(obBottomRight);

// 		obLeft.appendChild(obTopLeft);
// 		obLeft.appendChild(obBottomLeft);

// 		outerBracket.appendChild(obLeft);
// 		outerBracket.appendChild(obRight);

// 		outerBracketArr.push(outerBracket);
// 	}

// 	return outerBracketArr;
// }

// Wrap all Outer Brackets within other Outer Brackets
// export const createAllOuterBrackets = (outerBrackets) => {
// 	// console.log(outerBrackets);
// 	let totalBrackets = outerBrackets;
// 	let counter = 2;
// 	while (totalBrackets.length > 1) {
// 		totalBrackets = createOuterBrackets(totalBrackets, counter);
// 		counter++;
// 	}
// 	return totalBrackets;
// }

// Create Final Bracket
export const createFinalBracket = (allOuterBrackets) => {

	const winnerBracket = document.createElement('div');
	winnerBracket.classList = 'tournament-container';

	const wbLeft = document.createElement('div');

	const wbRight = document.createElement('div');
	wbRight.classList = 'winner-container';

	const singleBracket = document.createElement('input');
	singleBracket.type = 'text';
	singleBracket.classList = 'final-bracket-input';

	// Move this into the CSS file
	wbRight.style.display = 'inline-block';
	wbLeft.style.display = 'inline-block';

	allOuterBrackets.forEach(bracket => {
		wbLeft.appendChild(bracket);	
	})
	
	wbRight.appendChild(singleBracket);

	winnerBracket.appendChild(wbLeft);
	winnerBracket.appendChild(wbRight);

	return winnerBracket;
}

// We don't need to do this with JS. Why not create it in the PUG file?
	export const createResetButton = () => {
		const resetButton = document.createElement('button');
		resetButton.innerText = 'Reset';
		resetButton.className = 'resetButton';
		resetButton.id = 'resetBtn';
		
		return resetButton;
	}

	export const resetButtonInitialize = () => {
		// document.getElementById('resetBtn').addEventListener('click', () => {
		// 	location.reload(true);
		// });
	}

// Advance competitor to next bracket
function advance(element) {
	element = this;
	// Get competitors name
	const value = element.previousElementSibling.value;

	if (element.parentElement.id === '') {
		// Find if competitor is in the top/bottom bracket
		const order = element.parentElement.parentElement.parentElement.className.search('top') > -1 ? 0 : 1;

		// Advance value to next round
		element.closest('.outer-bracket-1').children[1].children[order].children[0].children[0].value = value;
		
	} else {
		// Find if competitor is in the top/bottom bracket
		const order = element.closest('.out-bracket-wrapper').parentElement.className.search('top') > -1 ? 0 : 1;

		// Get current round
		const round = element.parentElement.id.slice(6,7);

		const nextRound = parseInt(round) + 1 + '';
		if (document.getElementsByClassName(`outer-bracket-${nextRound}`).length === 0) {
			document.getElementsByClassName('final-bracket-input')[0].value = value;
		}
		else{
			// Target next round
			element.closest(`.outer-bracket-${nextRound}`).children[1].children[order].children[0].children[0].value = value;
		}
	}
}

export const clearBrackets = () => {	
	// Target the brackets container
	const oldBrackets = document.getElementsByClassName('tournament-container')[0];
					
	// If the div exists delete it
	if (oldBrackets != undefined) {
		oldBrackets.remove();
	}
}

// Detect/Highlight duplicate entries
export const highlightMatch = () => {
  const playerNames = document.getElementById('playerNameEntry');
  const back = document.getElementById('backDrop');
  let text;

  playerNames.addEventListener('keyup', function(e) {

    text =  playerNames.value.split('\n').map(el => {
        return `<span>${el}</span><br>`
    });
    
    var indexes = [];
      
    for(let i = 0; i < text.length; i++) {
      for(let j = i+1; j < text.length; j++) {
        if (text[i] === text[j] && text[i] !== "<span></span><br>" && text[i] !== "<span>Bye</span><br>") {
          indexes.push(i,j)
        }
      }
    }

    // Array to dedupe index array
    let ind = [];

    // If index is not in ind push it to ind array
    indexes.forEach((el) => {
      if (ind.indexOf(el) === -1) {ind.push(el)}
    });
      
    // Add 'match' class to every index (ind) of text array
    ind.forEach(index => {
      let snippet = text[index].slice(6);
      text[index] = '<span class="match">' + snippet; 
    });

    // Flag app for dupes
    duplicateNames = ind.length > 0 ? true : false;

    // Add all spans to name list div
    back.innerHTML = text.join('')
    // Clear indexes of matches
    ind.length = 0;

    // Handle scroll of backdrop to textarea to match onkeydown
    back.scrollTop = e.target.scrollTop;
  });

  // Handle scroll of backdrop to textarea to match onscroll
  playerNames.onscroll = (event) => {
  	back.scrollTop = event.target.scrollTop;
  };
}

// Activate Messenger 
export const messenger = (text) => {
	// Grab messenger & 'X' to close messenger
	const msgr = document.getElementsByClassName('messenger')[0];
	const msg = document.getElementsByClassName('message')[0];
	const msgrX = document.getElementsByClassName('close-messenger')[0];

	// Show messenger block
	msgr.style.display = 'flex';

	// Assign Text
	msg.innerText = text;

	// Name function to close messenger
	const closeMessenger = () => {
		msg.innerText = '';
		msgr.style.display = 'none';
		msgrX.removeEventListener('click', closeMessenger);
	}

	// Add eventlistener to close messenger
	msgrX.addEventListener('click', closeMessenger);
}

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
// Clear and fill textarea with seeded list on randomize
// export const randomizeTextArea = (competitorPairs) => {
// 	let newText = '';
// 	competitorPairs.forEach((firstPairArr) => {
// 		firstPairArr.forEach((competitor) => {
// 			newText += competitor[0];
// 			newText += '\n';
// 			newText += competitor[1];
// 			newText += '\n';
// 		});
// 	});

// 	const txtArea = document.getElementById('playerNameEntry');
// 	const back = document.getElementById('backDrop');
// 	txtArea.value = newText;
// 	back.innerText = newText;
// }

// Create Component
// export const createBracketInputs = (competitors) => {
// 	const bracket = document.createElement('div');
// 	bracket.classList = 'tournament-container';

// 	competitors.forEach(el => {
// 		let pairedBracket = createRoundOneDOMElements(el);
// 		bracket.appendChild(pairedBracket);
// 	});

// 	document.body.appendChild(bracket);
// }
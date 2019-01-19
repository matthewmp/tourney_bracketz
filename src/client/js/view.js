import * as brackets from './brackets';

// Track if the user has entered duplicate names
export let duplicateNames = false;

// Key is the tournamentSize (number of matches int he first round), value is the number of rounds in the tournament (including winner)
export let numOfRoundsTable = { 
	2: 3,
	4: 4,
	8: 5,
	16: 6,
	32: 7
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

	// Convert the names into an object to match the database format
	let participants = createOrderedPlayerList(playerNames);

	console.log("participants")
	console.log(participants)

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
	roundOneDOM.classList = `round-one-container total-matchups-${pairedBrackets.length}`;

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

	// resetButtonInitialize();
	addButtonListeners();
}

export const createAllRounds = (numberOfRounds, firstRoundMatches) => {
	let tContainer = document.getElementById('tournament-container');
	let roundCounter = 2;
	let matchupsThisRound = firstRoundMatches / 2;

	// Iterate for each *round*
	while ( numberOfRounds > 1) {
		// Create a DIV to contain this input field
		let roundContainer = document.createElement('div');

		// Iterate for each *matchup*
		for (let i=0; i < matchupsThisRound; i++) {
			// Create parent DIV to contain this matchup
			let matchupDiv = document.createElement('div');
			matchupDiv.classList = `round-${roundCounter} matchups-${matchupsThisRound}`;
			
			// console.log(matchupsThisRound);
			// Insert 2 inputs for a round that still has competition
			if (matchupsThisRound >= 1) {
				roundContainer.classList = `round-${roundCounter}-container total-matchups-${matchupsThisRound}`;

				// Append the element to matchupDiv
				matchupDiv.append( createPlayerDiv(null, roundCounter, null, i + 1) );
				matchupDiv.append( createPlayerDiv(null, roundCounter, null, i + 1) );
			} else {
				roundContainer.classList = `winner-round`;
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

	// False by default. This allows the brackets to be drawn on the public page (no check box).
	let randomizeOrder = false;

	// Does the user want to randomize the seeds?
	if ( document.getElementById('randomize') != null ) {
		randomizeOrder = document.getElementById('randomize').checked;
	}

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
	// Add event listeners to all tournament buttons 
	const buttons = document.getElementsByClassName('btn-advance');

	for (let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', advance);
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
	btn.classList = `btn-advance btn-round-${round} btn-seed-${seed}`;
	btn.dataset.round = round;
	btn.dataset.seed = seed;
	btn.dataset.matchup = matchup;
	singleBracket.appendChild(input);
	singleBracket.appendChild(btn);

	return singleBracket;
}

// We don't need to do this with JS. Why not create it in the PUG file?
export const createResetButton = () => {
	const resetButton = document.createElement('button');
	resetButton.innerText = 'Reset';
	resetButton.className = 'resetButton';
	resetButton.id = 'resetBtn';
	
	return resetButton;
}

// export const resetButtonInitialize = () => {
// 	document.getElementById('resetBtn').addEventListener('click', () => {
// 		location.reload(true);
// 	});
// }

// Advance competitor to next bracket
function advance(element) {
	element = this;

	const playerName = element.previousElementSibling.value;
	const roundWon = this.dataset.round; 
	const matchWon = this.dataset.matchup;

	// Determine the input to populate with this information
	let roundToPopulate = parseInt(roundWon) + 1;
	let matchToPopulate = 0;

	// This determines if the winner was in the top position or the bottom position
	// ==0 means bottom; !=0 means top
	let winningPosition = matchWon % 2;

	// Divide the current match by 2 to determine the next round to populate
	if (winningPosition == 0) {
		matchToPopulate = parseInt(matchWon) / 2;
	} else {
		matchToPopulate = (parseInt(matchWon) + 1) / 2;
	}

	// Identify all buttons in the round that we will be populating
	let allButtons = document.getElementsByClassName(`btn-round-${roundToPopulate}`);

	// Iterate through the buttons until we find the matchup that we are looking for
	for (let i = 0; i < allButtons.length; i++) {
		if (allButtons[i].dataset.matchup == matchToPopulate) {
			// Determine if we punch the top or bottom input field
			if ( winningPosition == 0) {
				// Populate the first instance
				allButtons[i + 1].previousSibling.value = playerName;
				break;
			} else {
				// Populate the second instance
				allButtons[i].previousSibling.value = playerName;
				break;
			}
			
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

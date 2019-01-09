import * as brackets from './brackets';

// Track if the user has entered duplicate names
export let duplicateNames = false;

export const initializeTestBracketz = () => {	
	// Grab participant entry elements
	const submitButton = document.getElementById('btnSubmit');
	const playerNames = document.getElementById('playerNameEntry');

	// If the submit button & player input field exist...
	if (submitButton && playerNames) {
		// Create listener for the button click
		submitButton.addEventListener('click', function(event) {
			event.preventDefault();

			// Continue if there are no duplicate names
			if (duplicateNames == false) {
				// Target the brackets-wrapper DIV
				const oldBrackets = document.getElementsByClassName('brackets-wrapper')[0];
				
				// If the div exists...
				if (oldBrackets) {
					// Delete it
					oldBrackets.remove();
				}

				// Store the provided names in an array
				let initialParticipants = playerNames.value.split('\n');

				// Remove any empty lines from initialParticipants
				let participants = initialParticipants.filter(function(el) {
					return el !== "";
				});

				// Does the user want to randomize the seeds?
				let randomizeOrder = document.getElementById('randomize').checked;

				// Identify who will be playing who in the first round
				let matchups = brackets.createMatchups(participants, randomizeOrder);
				
				// randomizeTextArea(matchups);

				let pairedBrackets = generateMatchupsForDOM(matchups);

				let outerBrackets = createOuterBrackets(pairedBrackets);


				// let shellBrackets = createOuterBrackets(outerBrackets);
				let total = createAllOuterBrackets(outerBrackets)
				let winner = createFinalBracket(total);

				winner.appendChild(createResetButton());

				document.body.appendChild(winner);
				
				// Add event listeners to all buttons to advance competitors
				const buttons = document.getElementsByClassName('btn-advance');
				resetButtonInitialize();
				
				for(let i = 0; i < buttons.length; i++) {
					let el = buttons[i];
					el.addEventListener('click', advance);
				}
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


// Create Component
export const createBracketInputs = (competitors) => {
	const bracket = document.createElement('div');
	bracket.classList = 'brackets-wrapper';

	competitors.forEach(el => {
		let pairedBracket = generateMatchupsForDOM(el);
		bracket.appendChild(pairedBracket);
	});

	document.body.appendChild(bracket);
}

// Create DOM elements for each matchup (pair of players)
export const generateMatchupsForDOM = (matchups) => {
	let playerDivs = []; // Stores one element for each player
	let playerPairDivs = []; // Stores combined playerDivs for each matchup

	// Create One DOM element for each player and store them in the array
	matchups.toString().split(',').forEach((el) => {
		let playerElement = createPlayerDiv(el);

		playerDivs.push(playerElement);
	});

	// Iterate through all playerDIVs and add each matchup into a parent DIV
	for (let i = 0; i < playerDivs.length; i = i + 2) {
		let matchupParentDiv = document.createElement('div');
		matchupParentDiv.classList = 'paired-bracket';
		
		matchupParentDiv.appendChild(playerDivs[i]);
		matchupParentDiv.appendChild(playerDivs[i + 1]);
		
		playerPairDivs.push(matchupParentDiv);
	}
	return playerPairDivs;
}

// Create Single Bracket (DIV that will contain a single player)
export const createPlayerDiv = (competitor) => {
	const singleBracket = document.createElement('div');
	singleBracket.classList = 'single-bracket';

	const input = document.createElement('input');
	const btn = document.createElement('button');
	input.value = competitor;
	btn.innerText = '=>';
	btn.className = 'btn-advance';
	singleBracket.appendChild(input);
	singleBracket.appendChild(btn);

	return singleBracket;
}

// Create Outer Brackets
export const createOuterBrackets = (pairedBrackets, counter) => { 
	const outerBracketArr = [];
	
	for(let i = 0; i < pairedBrackets.length - 1; i = i + 2) {
		
		// Create Outer Bracket Container
		const outerBracket = document.createElement('div');
		outerBracket.classList = 'out-bracket-wrapper row';
		if (counter) {
			outerBracket.classList += ` outer-bracket-${counter}`;
		} else {
			outerBracket.classList += ' outer-bracket-1';
		}

		// Create 2 sections of Outer Bracket (right/left)
		const obLeft = document.createElement('div');
		obLeft.classList = 'ob-left';
		
		const obRight = document.createElement('div');
		obRight.classList = 'ob-right';

		// Create 2 sections for each left/right section (top/bottom)
		const obTopLeft = document.createElement('div');
		obTopLeft.classList = 'ob-top top left';

		// Fill in sections with paired brackets
		const obBottomLeft = document.createElement('div');
		obBottomLeft.classList = 'ob-bottom bottom left';

		const obTopRight = document.createElement('div');
		obTopRight.classList = 'ob-right top';

		const obBottomRight = document.createElement('div');
		obBottomRight.classList = 'ob-right bottom';

		obTopLeft.appendChild(pairedBrackets[i]);
		obBottomLeft.appendChild(pairedBrackets[i + 1]);

		// Fill in right side outer bracket with single brackets
		// let num = i;
		const singleBracket1 = createPlayerDiv('');
		const singleBracket2 = createPlayerDiv('');

		if (counter) {
			singleBracket1.id = `round_${counter}__input_top`;
			singleBracket2.id = `round_${counter}__input_bottom`;	
		} else {
			singleBracket1.id = 'round_1__input_top';
			singleBracket2.id = 'round_1__input_bottom';
		}
		

		// Attach children to parents
		obTopRight.appendChild(singleBracket1);
		obBottomRight.appendChild(singleBracket2);

		obRight.appendChild(obTopRight);
		obRight.appendChild(obBottomRight);

		obLeft.appendChild(obTopLeft);
		obLeft.appendChild(obBottomLeft);

		outerBracket.appendChild(obLeft);
		outerBracket.appendChild(obRight);

		outerBracketArr.push(outerBracket);
	}

	return outerBracketArr;
}

// Wrap all Outer Brackets within other Outer Brackets
export const createAllOuterBrackets = (outerBrackets) => {
	let totalBrackets = outerBrackets;
	let counter = 2;
	while(totalBrackets.length > 1) {
		totalBrackets = createOuterBrackets(totalBrackets, counter);
		counter++;
	}
	return totalBrackets;
}

// Create Final Bracket
export const createFinalBracket = (allOuterBrackets) => {

	const winnerBracket = document.createElement('div');
	winnerBracket.classList = 'brackets-wrapper';

	const wbLeft = document.createElement('div');
	wbLeft.classList = 'ob-left';
	wbLeft.style.display = 'inline-block';

	const wbRight = document.createElement('div');
	wbRight.classList = 'ob-right';
	wbRight.style.display = 'inline-block';

	const singleBracket = document.createElement('input');
	singleBracket.type = 'text';
	singleBracket.classList = 'final-bracket-input';

	allOuterBrackets.forEach(bracket => {
		wbLeft.appendChild(bracket);	
	})
	
	wbRight.appendChild(singleBracket);

	winnerBracket.appendChild(wbLeft);
	winnerBracket.appendChild(wbRight);

	return winnerBracket;
}

export const createResetButton = () => {
	const resetButton = document.createElement('button');
	resetButton.innerText = 'Reset';
	resetButton.className = 'resetButton';
	resetButton.id = 'resetBtn';
	
	return resetButton;
}

export const resetButtonInitialize = () => {
	document.getElementById('resetBtn').addEventListener('click', () => {
		location.reload(true);
	});
}

// Clear and fill textarea with seeded list on randomize
export const randomizeTextArea = (competitorPairs) => {
	let newText = '';
	competitorPairs.forEach((firstPairArr) => {
		firstPairArr.forEach((competitor) => {
			newText += competitor[0];
			newText += '\n';
			newText += competitor[1];
			newText += '\n';
		});
	});

	const txtArea = document.getElementById('playerNameEntry');
	const back = document.getElementById('backDrop');
	txtArea.value = newText;
	back.innerText = newText;


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
			// Traget next round
			element.closest(`.outer-bracket-${nextRound}`).children[1].children[order].children[0].children[0].value = value;
		}
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

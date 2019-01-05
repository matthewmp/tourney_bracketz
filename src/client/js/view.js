import * as brackets from './brackets';

// Create Component
export const createBracketInputs = (competitors) => {
	const bracket = document.createElement('div');
	bracket.classList = 'brackets-wrapper';

	competitors.forEach(el => {
		let pairedBracket = createPairedBrackets(el);
		bracket.appendChild(pairedBracket);
	});

	document.body.appendChild(bracket);
}

// Create Single Bracket
export const createSingleBracket = (competitor) => {
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

// Create Paired Brackets
export const createPairedBrackets = (competitorPairs) => {
	let singleBracketArray = [];
	let pairedBracketsArray = [];

	competitorPairs.toString().split(',').forEach((el) => {
		let singleBracket = createSingleBracket(el);

		singleBracketArray.push(singleBracket);
	});

	for(let i = 0; i < singleBracketArray.length; i = i + 2){
		let pairedBracket = document.createElement('div');
		pairedBracket.classList = 'paired-bracket';
		
		pairedBracket.appendChild(singleBracketArray[i]);
		pairedBracket.appendChild(singleBracketArray[i + 1]);
		
		pairedBracketsArray.push(pairedBracket);

	}
	return pairedBracketsArray;
}

// Create Outer Brackets
export const createOuterBrackets = (pairedBrackets, counter) => { 
	const outerBracketArr = [];
	
	for(let i = 0; i < pairedBrackets.length - 1; i = i + 2){
		
		// Create Outer Bracket Container
		const outerBracket = document.createElement('div');
		outerBracket.classList = 'out-bracket-wrapper row';
		if(counter){
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
		let num = i;
		const singleBracket1 = createSingleBracket('');
		const singleBracket2 = createSingleBracket('');

		if(counter){
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

// Wrapp all Outer Brackets within other Outer Brackets
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

//window.onload = () => {
export const initializeTestBracketz = () => {	
	// Grab participant entry elements
	const sub = document.getElementById('btnSubmit');
	const txt = document.getElementById('playerNameEntry');

	if(sub && txt){
		sub.addEventListener('click', function(e){
			e.preventDefault();
			if(!dupe){
				// Remove any existing bracket renderings
				const oldBrackets = document.getElementsByClassName('brackets-wrapper')[0];
				if(oldBrackets){
					oldBrackets.remove();
				}

				let initialParticipants = txt.value.split('\n');

				// Remove any empty characters from initialParticipants
				let participants = initialParticipants.filter(function(el){
					return el !== "";
				});

				let checked = document.getElementById('randomize').checked;
				var CompetitorPairs = brackets.createCompetitorPairs(participants, checked);
				randomizeTextArea(CompetitorPairs);
				var pairedBrackets = createPairedBrackets(CompetitorPairs);
				var outerBrackets = createOuterBrackets(pairedBrackets);
				var shellBrackets = createOuterBrackets(outerBrackets);
				var total = createAllOuterBrackets(outerBrackets)
				var winner = createFinalBracket(total);

				winner.appendChild(createResetButton());

				document.body.appendChild(winner);
				
				// Add event listeners to all buttons to advance competitors
				const buttons = document.getElementsByClassName('btn-advance');
				resetButtonInitialize();
				
				for(let i = 0; i < buttons.length; i++){
					let el = buttons[i];
					el.addEventListener('click', advance);
				}
			} else {
				// There are dupes
				messenger('Duplicate players are not allowed');
			}

			// Hide landing page content for brackets
			document.getElementsByClassName('landing-wrapper')[0].style.display = 'none';
		});
		highlightMatch();
	}
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
function advance(element){
	element = this;
	// Get competitors name
	const value = element.previousElementSibling.value;

	if(element.parentElement.id === ''){
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
		if(document.getElementsByClassName(`outer-bracket-${nextRound}`).length === 0){
			document.getElementsByClassName('final-bracket-input')[0].value = value;
		}
		else{
			// Traget next round
			element.closest(`.outer-bracket-${nextRound}`).children[1].children[order].children[0].children[0].value = value;
		}
	}
}

// Flag for dupes and prevent ability to generate brackets
export let dupe = false;

// Detect/Highlight duplicate entries
export const highlightMatch = () => {
  const txt = document.getElementById('playerNameEntry');
  const back = document.getElementById('backDrop');
  let text;

  txt.addEventListener('keyup', function(e){

    text =  txt.value.split('\n').map(el => {
        return `<span>${el}</span><br>`
    });
    
    var indexes = [];
      
    for(let i = 0; i < text.length; i++){
      for(let j = i+1; j < text.length; j++){
        if(text[i] === text[j] && text[i] !== "<span></span><br>" && text[i] !== "<span>Bye</span><br>") {
          indexes.push(i,j)
        }
      }
    }

    // Array to dedupe index array
    let ind = [];

    // If index is not in ind push it to ind array
    indexes.forEach((el) => {
      if(ind.indexOf(el) === -1){ind.push(el)}
    });
      
    // Add 'match' class to every index (ind) of text array
    ind.forEach(index => {
      let snippet = text[index].slice(6);
      text[index] = '<span class="match">' + snippet; 
    });

    // Flag app for dupes
    dupe = ind.length > 0 ? true : false;

    // Add all spans to name list div
    back.innerHTML = text.join('')
    // Clear indexes of matches
    ind.length = 0;

    // Handle scroll of backdrop to textarea to match onkeydown
    back.scrollTop = e.target.scrollTop;
  });

  // Handle scroll of backdrop to textarea to match onscroll
  txt.onscroll = (e) => {
  	back.scrollTop = e.target.scrollTop;
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

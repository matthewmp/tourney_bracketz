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
export const createOuterBrackets = (pairedBrackets) => { 
	const outerBracketArr = [];

	for(let i = 0; i < pairedBrackets.length; i = i + 2){
		// Create Outer Bracket Container
		const outerBracket = document.createElement('div');
		outerBracket.classList = 'out-bracket-wrapper row'

		// Create 2 sections of Outer Bracket (right/left)
		const obLeft = document.createElement('div');
		obLeft.classList = 'ob-left';
		
		const obRight = document.createElement('div');
		obRight.classList = 'ob-right';

		// Create 2 sections for each left/right section (top/bottom)
		const obTopLeft = document.createElement('div');
		obTopLeft.classList = 'ob-top left';

		// Fill in sections with paired brackets
		const obBottomLeft = document.createElement('div');
		obBottomLeft.classList = 'ob-bottom left';

		const obTopRight = document.createElement('div');
		obTopRight.classList = 'ob-right top';

		const obBottomRight = document.createElement('div');
		obBottomRight.classList = 'ob-right bottom';

		obTopLeft.appendChild(pairedBrackets[i]);
		if(pairedBrackets[i+1]){
			obBottomLeft.appendChild(pairedBrackets[i + 1]);
		}

		// Fill in right side outer bracket with single brackets
		const singleBracket1 = createSingleBracket('');
		const singleBracket2 = createSingleBracket('');

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
	
	while(totalBrackets.length > 2) {
		totalBrackets = createOuterBrackets(totalBrackets);
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

window.onload = () => {
	
	var sub = document.getElementById('btnS');
	var txt = document.getElementById('txtArea');

	if(sub && txt){
		sub.addEventListener('click', function(e){
			e.preventDefault();
			// Remove any existing bracket renderings
			const oldBrackets = document.getElementsByClassName('brackets-wrapper')[0];
			if(oldBrackets){
				oldBrackets.remove();
			}

			let initialParticipants = txt.value.split('\n');
			let participants = initialParticipants.filter(function(el){
				return el !== "";
			});
			
			var CompetitorPairs = brackets.createCompetitorPairs(participants);
			var pairedBrackets = createPairedBrackets(CompetitorPairs);
			var outerBrackets = createOuterBrackets(pairedBrackets);
			var shellBrackets = createOuterBrackets(outerBrackets);
			var total = createAllOuterBrackets(outerBrackets)
			var winner = createFinalBracket(total);

			document.body.appendChild(winner);
		});
	}
}
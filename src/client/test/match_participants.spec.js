const expect = require('chai').expect;
import { bracketGenerator, bracketArr, getBuys, matchParticipants } from '../js/brackets';

describe('matchParticipants', () => {
	let participants, numOfParticipants, numOfBrackets, numOfBuys, brackets;

	it('correctly matches all buys with top seeded', () => {
		participants = ['Tom', 'Brandon', 'Dean', 'Matt', 'Some Guy'];
		numOfParticipants = participants.length;
		numOfBrackets = bracketGenerator(bracketArr, participants.length);
		numOfBuys = getBuys(numOfParticipants, numOfBrackets);

		brackets = matchParticipants(participants, numOfBuys);
		expect(brackets).to.deep.equal([['Tom', 'Buy'], ['Brandon', 'Buy'], ['Dean', 'Buy'], ['Matt', 'Some Guy']]);
	});

	it('correctly matches all buys with top seeded', () => {
		participants = ['Tom', 'Brandon', 'Dean', 'Matt', 'Jose', 'Rich', 'Val', 'Gillian', 'Isabella', 'Dawn', 'Michelle'];
		numOfParticipants = participants.length;
		numOfBrackets = bracketGenerator(bracketArr, participants.length);
		numOfBuys = getBuys(numOfParticipants, numOfBrackets);
		
		brackets = matchParticipants(participants, numOfBuys);
		expect(brackets).to.deep.equal([['Tom', 'Buy'], ['Brandon', 'Buy'], ['Dean', 'Buy'], ['Matt', 'Buy'], ['Jose', 'Buy'], ['Rich', 'Michelle'], ['Val', 'Dawn'], ['Gillian', 'Isabella']]);
	});

	it('correctly matches all buys with top seeded', () => {
		participants = ['Tom', 'Gillian', 'Isabella', 'Dawn', 'Michelle'];
		numOfParticipants = participants.length;
		numOfBrackets = bracketGenerator(bracketArr, participants.length);
		numOfBuys = getBuys(numOfParticipants, numOfBrackets);
		
		brackets = matchParticipants(participants, numOfBuys);
		expect(brackets).to.deep.equal([['Tom', 'Buy'], ['Gillian', 'Buy'], ['Isabella', 'Buy'], ['Dawn', 'Michelle']]);
	});
});





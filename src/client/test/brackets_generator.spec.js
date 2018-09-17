const expect = require('chai').expect;
import { bracketGenerator, bracketArr } from '../js/brackets';

let num;
describe('Bracket Generator ', () => {
	it('Should return correct bracket #', () => {
		num = bracketGenerator(bracketArr, 0);
		expect(num).to.not.exist;

		num = bracketGenerator(bracketArr, 65);
		expect(num).to.not.exist;

		num = bracketGenerator(bracketArr, 1);
		expect(num).to.not.exist;

		num = bracketGenerator(bracketArr, 2);
		expect(num).to.equal(2);

		num = bracketGenerator(bracketArr, 3);
		expect(num).to.equal(4);

		num = bracketGenerator(bracketArr, 4);
		expect(num).to.equal(4);

		num = bracketGenerator(bracketArr, 5);
		expect(num).to.equal(8);

		num = bracketGenerator(bracketArr, 9);
		expect(num).to.equal(16);

		num = bracketGenerator(bracketArr, 10);
		expect(num).to.equal(16);

		num = bracketGenerator(bracketArr, 11);
		expect(num).to.equal(16);

		num = bracketGenerator(bracketArr, 12);
		expect(num).to.equal(16);

		num = bracketGenerator(bracketArr, 13);
		expect(num).to.equal(16);

		num = bracketGenerator(bracketArr, 14);
		expect(num).to.equal(16);

		num = bracketGenerator(bracketArr, 15);
		expect(num).to.equal(16);

		num = bracketGenerator(bracketArr, 16);
		expect(num).to.equal(16);

		num = bracketGenerator(bracketArr, 19);
		expect(num).to.equal(32);

		num = bracketGenerator(bracketArr, 20);
		expect(num).to.equal(32);

		num = bracketGenerator(bracketArr, 21);
		expect(num).to.equal(32);

		num = bracketGenerator(bracketArr, 22);
		expect(num).to.equal(32);

		num = bracketGenerator(bracketArr, 23);
		expect(num).to.equal(32);

		num = bracketGenerator(bracketArr, 24);
		expect(num).to.equal(32);

		num = bracketGenerator(bracketArr, 25);
		expect(num).to.equal(32);

		num = bracketGenerator(bracketArr, 26);
		expect(num).to.equal(32);

		num = bracketGenerator(bracketArr, 27);
		expect(num).to.equal(32);

		num = bracketGenerator(bracketArr, 28);
		expect(num).to.equal(32);

		num = bracketGenerator(bracketArr, 29);
		expect(num).to.equal(32);

		num = bracketGenerator(bracketArr, 30);
		expect(num).to.equal(32);

		num = bracketGenerator(bracketArr, 31);
		expect(num).to.equal(32);

		num = bracketGenerator(bracketArr, 32);
		expect(num).to.equal(32);

		num = bracketGenerator(bracketArr, 33);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 34);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 35);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 36);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 37);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 38);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 39);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 40);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 41);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 42);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 43);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 44);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 45);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 46);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 47);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 48);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 49);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 50);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 51);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 52);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 53);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 54);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 55);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 56);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 57);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 58);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 59);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 60);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 61);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 62);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 63);
		expect(num).to.equal(64);

		num = bracketGenerator(bracketArr, 64);
		expect(num).to.equal(64);
	});
});



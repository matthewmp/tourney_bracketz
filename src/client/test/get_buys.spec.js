const expect = require('chai').expect;
import { getByes } from '../js/brackets';

let Byes;
describe('getByes', () => {
	it('Return correct number of Byes', () => {
		Byes = getByes(5, 8);
		expect(Byes).to.equal(3);

		Byes = getByes(10, 16);
		expect(Byes).to.equal(6);

		Byes = getByes(2, 2);
		expect(Byes).to.equal(0);
	});
});
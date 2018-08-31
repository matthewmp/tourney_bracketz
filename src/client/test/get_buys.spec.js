const expect = require('chai').expect;
import { getBuys } from '../js/brackets';

let buys;
describe('getBuys', () => {
	it('Return correct number of buys', () => {
		buys = getBuys(5, 8);
		expect(buys).to.equal(3);

		buys = getBuys(10, 16);
		expect(buys).to.equal(6);

		buys = getBuys(2, 2);
		expect(buys).to.equal(0);
	});
});
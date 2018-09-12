const expect = require('chai').expect;
import { ranSeeding } from '../js/brackets';

let list;
let sortedList;
describe('ranSeeding', () => {
	it('returns a random list from a sorted/unsorted list', () => {
		sortedList = [1,2,3,4,5];
		list = ranSeeding(sortedList);
		expect(list).to.not.equal(sortedList);

		sortedList = [5,4,3,2,1];
		list = ranSeeding(sortedList);
		expect(list).to.not.deep.equal(sortedList);

		sortedList = ['Tom', 'Brandon', 'Dean', 'Matt', 'Jose', 'Rich', 'Val', 'Gillian', 'Isabella', 'Dawn', 'Michelle'];
		list = ranSeeding(sortedList);
		expect(list).to.not.deep.equal(sortedList);

		sortedList = ['Tom', 'Brandon', 'Dean', 'Matt', 'Jose', 'Rich', 'Val', 'Gillian', 'Isabella', 'Dawn'];
		list = ranSeeding(sortedList);
		expect(list).to.not.deep.equal(sortedList);

		sortedList = ['Tom', 'Brandon', 'Dean', 'Matt', 'Jose', 'Rich', 'Val', 'Gillian', 'Isabella'];
		list = ranSeeding(sortedList);
		expect(list).to.not.deep.equal(sortedList);

		sortedList = ['Tom', 'Brandon', 'Dean', 'Matt', 'Jose', 'Rich', 'Val', 'Gillian'];
		list = ranSeeding(sortedList);
		expect(list).to.not.deep.equal(sortedList);

		sortedList = ['Tom', 'Brandon', 'Dean', 'Matt', 'Jose', 'Rich', 'Val'];
		list = ranSeeding(sortedList);
		expect(list).to.not.deep.equal(sortedList);
	});
});
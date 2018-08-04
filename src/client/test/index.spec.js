const assert = require('chai').assert;
import { test } from '../js/test';

describe('test mocha es6', () => {
	it('testing es6', () => {
		assert.equal(test('hello'), 'hello');
	});
});
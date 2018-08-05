const assert = require('chai').assert;

function add(num1, num2){
	return num1 + num2;
}

describe('Testing server', () => {
	it('testing server', () => {
		const sum = add(1,2);
		console.log(sum);
		assert.equal(sum, 3);
	});
});
const fs = require('fs');
const test = require('tape');
const { setup, teardown } = require('./_fixtures');

const init = require('../lib/initialize-project');

test('Initialize Project', async function(assert) {
	await init(setup());

	{
		let message = 'creates `public/js` directory';
		let actual = fs.existsSync(`${__dirname}/test_dir/public/js`);
		let expected = true;

		assert.equal(actual, expected, message);
	}

	{
		let message = 'creates `public/img` directory';
		let actual = fs.existsSync(`${__dirname}/test_dir/public/img`);
		let expected = true;

		assert.equal(actual, expected, message);
	}

	{
		let message = 'creates `public/css` directory';
		let actual = fs.existsSync(`${__dirname}/test_dir/public/css`);
		let expected = true;

		assert.equal(actual, expected, message);
	}

	{
		let message = 'creates `public/css/main.css` file';
		let actual = fs.existsSync(`${__dirname}/test_dir/public/css/main.css`);
		let expected = true;

		assert.equal(actual, expected, message);
	}

	{
		let message = 'creates `meta` directory';
		let actual = fs.existsSync(`${__dirname}/test_dir/meta`);
		let expected = true;

		assert.equal(actual, expected, message);
	}

	{
		let message = 'creates `markdown` directory';
		let actual = fs.existsSync(`${__dirname}/test_dir/markdown`);
		let expected = true;

		assert.equal(actual, expected, message);
	}

	{
		let message = 'creates `public` directory';
		let actual = fs.existsSync(`${__dirname}/test_dir/public`);
		let expected = true;

		assert.equal(actual, expected, message);
	}

	{
		let message = 'creates `package.json` file';
		let actual = fs.existsSync(`${__dirname}/test_dir/package.json`);
		let expected = true;
		
		assert.equal(actual, expected, message);
	}

	{
		let message = 'creates `meta/default.json` file';
		let actual = fs.existsSync(`${__dirname}/test_dir/meta/default.json`);
		let expected = true;

		assert.equal(actual, expected, message);
	}

	teardown();
	assert.end();
});

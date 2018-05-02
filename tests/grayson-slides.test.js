const fs = require('fs');
const shell = require('shelljs');
const test = require('tape');
const generateSlides = require('../lib/generate-slides');

test('Generate Slides', function(assert){
	generateSlides(setup(5));

	{
		let message = 'creates one `.html` files from multiple `.md` files';
		let actual = fs.existsSync(`${output_dir}/slides.html`);
		let expected = true;

		assert.equal(actual, expected, message);
	}
	
	{
		let message = 'does not create `.html` file for *each* `.md` file';
		let actual = fs.readdirSync(`${output_dir}`).filter(key => key.match(/\.html/)).length;
		let expected = 1; 

		assert.equal(actual, expected, message);
	}

	teardown();
	assert.end();
});

var output_dir = `${__dirname}/public`;
var input_dir = `${__dirname}/markdown`;
var data_dir = `${__dirname}/meta`;

function setup(ln) {
	shell.mkdir('-p', output_dir);
	shell.mkdir('-p', input_dir);
	shell.mkdir('-p', data_dir);
	shell.cp(`${__dirname}/../lib/_defaults.json`, `${data_dir}/default.json`);

	for (let i = 1; i < ln; i++) {
		fs.writeFileSync(`${input_dir}/${i}.md`, `# Hello ${i}`);
	}

	return {
		output: output_dir,
		input: input_dir,
		data: data_dir,
		quiet: true,
	};
}

function teardown() {
	shell.rm('-rf', output_dir);
	shell.rm('-rf', input_dir);
	shell.rm('-rf', data_dir);
}

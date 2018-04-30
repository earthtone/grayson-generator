const fs = require('fs');
const shell = require('shelljs');
const test = require('tape');

const { setup, teardown } = require('./fixtures');

test('Grayson Gen', function(assert){
	setup('init', function(){
		for(let i = 1; i < 5; i++){
			fs.writeFileSync(`${__dirname}/test_dir/markdown/${i}.md`, `# Hello ${i}`);
		}

		shell.exec(`node ${__dirname}/../bin/grayson-gen.js`);
	});
	
	{
		let message = 'creates `.html` files from `.md` files';
		let actual = fs.existsSync(`${__dirname}/test_dir/public/index.html`);
		let expected = true;

		assert.equal(actual, expected, message);
	}
	
	{
		let message = 'creates `.html` file for *each* `.md` file';
		let actual = Object.keys(fs.readdirSync(`${__dirname}/test_dir/public`)).length;
		let expected = 5 + 3; // 5 generated files + 3 initialized directories

		assert.equal(actual, expected, message);
	}

	teardown();
	assert.end();
});

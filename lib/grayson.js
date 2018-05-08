const fs = require('fs');
const md = require('./markdown-settings');
const mdx = /(\.md$|\.markdown$)/
const template = require('./document-template');

function grayson(options){	
	try {
		let directory = fs.readdirSync(options.input).filter(file => file.match(mdx));
		let navigation = directory.map(filename => filename.match(/index/ig) ? '/' : `/${filename.replace(/(md$|markdown$)/ig, 'html')}`);
		let result = directory
			.map(source => {
				source = fs.readFileSync(options.input + '/' + source).toString();
				return options.slides ? `:::slide\n${source}\n:::` : source;
			});

		if(options.output){
			switch(options.mode){
				case 'slides':
					fs.writeFileSync(`${options.output.replace(/\/$/, '')}/slides.html`, template({
						content: {
							nav: null,
							body: md.render(result.join(''))
						}, 
						metadata: options.metadata
					}));
					break;
				case 'blog':
					fs.writeFileSync(`${options.output}/index.html`, template({
						content: {
							nav: navigation,
							body: md.render(result.join(''))
						}, 
						metadata: options.metadata
					}))
				default: 
					directory.forEach((file, i) => {
						let input = `${options.input.replace(/\/$/, '')}/${file}`;
						writeFile(Object.assign({}, options, { 
							input, 
							html: template({
								content: {
									body: md.render(result[i]),
									nav: navigation
								},	
								metadata: options.metadata
							})
						}));
					});	
					break;
			}
		}

		return result;
	} catch (err) {	
		if(err.message.match(/not a directory/ig) && options.input.match(mdx)){
			if(options.output){
				return writeFile(Object.assign({}, options, {  
					html: template({
						content: {
							body: md.render(fs.readFileSync(options.input).toString()),
							nav: null
						},
						metadata: options.metadata
					})
				}));
			}

			return template({
				content: {
					body: md.render(fs.readFileSync(options.input).toString()),
					nav: null
				},
				metadata: options.metadata
			});
		}	

		throw err;
	}
}

function writeFile(options){
	if(!options.output || !fs.existsSync(options.output)){
		throw new Error('Invalid output directory');
	}

	let source = options.input.slice(options.input.lastIndexOf('/'));
	let filename = `${options.output.replace(/\/$/, '')}/${source.replace(/(md$|markdown$)/, 'html')}`;

	return fs.writeFileSync(filename, options.html);	
}

module.exports = grayson;
const path = require('path')
const pug = require('pug')

let cachedFunc = {}

let render = (fileName, data = {}) => {

	if (!cachedFunc[fileName]) {
		cachedFunc[fileName] = pug.compileFile(path.join(__dirname, 'views', `${fileName}.pug`))
	}

	let html = ''

	switch (fileName) {
		case 'order': {
			let { name, orderID, products } = data

			html = cachedFunc[fileName]({
				name,
				orderID,
				products,
			})

			break;
		}
	}

	return html
}

module.exports = render

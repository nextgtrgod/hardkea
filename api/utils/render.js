const path = require('path')
const pug = require('pug')
const formatNumber = require('./formatNumber')
const auth = require('../data/auth')

let cachedFunc = {}

let render = (fileName, data = {}) => {

	if (!cachedFunc[fileName]) {
		cachedFunc[fileName] = pug.compileFile(path.join(__dirname, '..', 'views', `${fileName}.pug`))
	}

	let html = ''

	switch (fileName) {
		case 'order': {
			data.siteUrl = auth.url.site
			data.total = formatNumber(data.total)

			html = cachedFunc[fileName](data)

			break;
		}
	}

	return html
}

module.exports = render

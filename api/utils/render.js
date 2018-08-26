const path = require('path')
const pug = require('pug')
const readFile = require('./readFile')
const formatNumber = require('./formatNumber')
const formatPhone = require('./formatPhone')
const auth = require('../data/auth')

let cachedFunc = {}

let render = async (fileName, data = {}) => {

	if (!cachedFunc[fileName]) {
		cachedFunc[fileName] = pug.compileFile(path.join(__dirname, '..', 'views', `${fileName}.pug`))
	}

	let productsAll = await readFile(path.join(__dirname, '..', 'products.json'))

	data.products.map(product => {
		let productFull = productsAll.find(p => p.id === product.id)

		if (product.color) product.image = productFull.colors[product.color]
		else product.image = productFull.image.sidebar
	})

	data.companyPhone = auth.companyPhone
	data.companyPhoneFormatted = formatPhone(auth.companyPhone)

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

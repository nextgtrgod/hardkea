const path = require('path')
const pug = require('pug')
const formatNumber = require('./formatNumber')
const auth = require('../data/auth')

let cachedFunc = {}

let render = (fileName, data = {}) => {

	if (!cachedFunc[fileName]) {
		cachedFunc[fileName] = pug.compileFile(path.join(__dirname, 'views', `${fileName}.pug`))
	}

	let html = ''

	switch (fileName) {
		case 'order': {
			let { name, orderID, email, phone, details, products } = data

			let total = products.reduce((sum, product) => {
				let { count, price, size, sizes } = product

				let subtotal = count * (size ? sizes[size] : price)

				product.subtotal = formatNumber(subtotal)

				return sum += subtotal
			}, 0)

			total = formatNumber(total)

			html = cachedFunc[fileName]({
				name,
				orderID,
				email,
				phone,
				details,
				products,
				total,
				siteUrl: auth.url.site,
			})

			break;
		}
	}

	return html
}

module.exports = render

const fs = require('fs')
const path = require('path')
const readFile = require('../utils/readFile')
const writeFile = require('../utils/writeFile')

class ProductController {
	constructor() {

		this.busy = false
		this.path = path.join(__dirname, '..', 'products.json')
	}

	async get() {
		let products = await readFile(this.path)

		return products
	}

	async save(data) {
		let products = await readFile(this.path)

		let index = products.findIndex(product => product.id === data.id)

		products[index] = data

		let status = await writeFile(products, this.path)

		return status
	}

	async add(data) {
		let products = await readFile(this.path)

		let maxIndex = 0

		products.map(product => product.id > maxIndex && (maxIndex = product.id))

		data.id = maxIndex + 1

		products.push(data)

		let status = await writeFile(products, this.path)

		return status
	}

	async delete(id) {
		let products = await readFile(this.path)

		products = products.filter(product => product.id !== +id)

		let status = await writeFile(products, this.path)

		return status
	}
}

module.exports = ProductController


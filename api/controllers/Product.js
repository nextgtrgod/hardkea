const fs = require('fs')
const path = require('path')

class ProductController {
	constructor() {

		this.busy = false
		this.path = path.join(__dirname, '..', 'products.json')
	}

	async get() {
		let products = await this.readFile()

		return products
	}

	async save(data) {
		let products = await this.readFile()

		let index = products.findIndex(product => product.id === data.id)

		products[index] = data

		let status = await this.writeFile(products)

		return status
	}

	async add(data) {
		let products = await this.readFile()

		let maxIndex = 0

		products.map(product => product.id > maxIndex && (maxIndex = product.id))

		data.id = maxIndex + 1

		products.push(data)

		let status = await this.writeFile(products)

		return status
	}

	async delete(id) {
		let products = await this.readFile()

		products = products.filter(product => product.id !== +id)

		let status = await this.writeFile(products)

		return status
	}

	async writeFile(data) {
		return new Promise((resolve, reject) => {

			if (typeof data !== 'string') data = JSON.stringify(data)

			fs.writeFile(this.path, data, (err, data) => {
				if (err) {
					reject({ status: 'error', error: err })
					throw err
				}

				resolve({ status: 'success' })
			})
		})
	}

	async readFile() {
		return new Promise((resolve, reject) => {
			fs.readFile(this.path, 'utf8', (err, data) => {
				if (err) {
					reject(err)
					throw err
				}

				resolve(JSON.parse(data))
			})
		})
	}
}

module.exports = ProductController


const fs = require('fs')
const path = require('path')

class ProductController {
	constructor() {

		this.busy = false
	}

	async get() {
		let products = await this.readFile()

		return products
	}

	save(id) {
		console.log('saving: ', id)
	}

	add() {
		console.log('adding new')
	}

	delete(id) {
		console.log('deleting: ', id)
	}

	async readFile() {
		return new Promise((resolve, reject) => {
			fs.readFile(path.join(__dirname, '..', 'products.json'), 'utf8', (err, data) => {
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


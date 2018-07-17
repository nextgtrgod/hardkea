const fs = require('fs')
const path = require('path')
const readFile = require('../utils/readFile')
const writeFile = require('../utils/writeFile')

const ImageController = require('./Image')
let imageController = new ImageController()

class ProductController {
	constructor() {

		this.busy = false
		this.path = path.join(__dirname, '..', 'products.json')
	}

	async get() {
		let products = await readFile(this.path)

		return products
	}

	async update(data) {
		let products = await readFile(this.path)

		let index = products.findIndex(product => product.id === data.id)


		await this.uploadImages(data, products[index])


		products[index].image.desktop = ''
		products[index].image.mobile = ''
		products[index].image.sidebar = ''
		products[index].image.article = ''


		products[index] = data


		console.log('images saved!')

		await writeFile(products, this.path)

		return data
	}

	async create(data) {
		let products = await readFile(this.path)

		let maxIndex = 0

		products.map(product => product.id > maxIndex && (maxIndex = product.id))

		data.id = maxIndex + 1

		products.push(data)

		await writeFile(products, this.path)

		return data
	}

	async uploadImages(data, old) {

		let promises = [
			'desktop',
			'mobile',
			'sidebar',
			'article',
		].map(key => {

			return imageController.upload({
				input: data.image[key],
				cb: url => data.image[key] = url,
				productID: data.id,
				fileName: key,
				prevUrl: old.image[key],
			})

		})

		await Promise.all(promises)

	}

	async delete(id) {
		let products = await readFile(this.path)

		products = products.filter(product => product.id !== +id)

		let status = await writeFile(products, this.path)

		return status
	}
}

module.exports = ProductController


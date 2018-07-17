const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const apiBase = require('../data/config')

let pathPrefix = path.join(__dirname, '..', 'images', 'products')


class ImageController {
	constructor() {

	}

	upload({ input, cb, productID, fileName, prevUrl }) {
		return new Promise(async (resolve, reject) => {

			if (!input.startsWith('data:image/')) { // its an url already!
				resolve(input)
				return
			}

			let buffer = input.split(',')
	
			let meta = buffer[0]
			let img = buffer[1]
	
			let extension
	
			meta.includes('jp') && (extension = 'jpg');
			meta.includes('png') && (extension = 'png');
	
	
			let imgBuffer = Buffer.from(img, 'base64')
	
			// console.log('saving image...');
	
			sharp(imgBuffer)
				.toBuffer()
				.then(data => {
	
					let name = `${fileName}-${(Date.now()).toString(36)}.${extension}`
	
					fs.writeFile(path.join(pathPrefix, `${productID}`, name), data, 'base64', err => {
						if (err) throw err

						cb(`/images/products/${productID}/${name}`)
						resolve()
					})
				})
				.catch(err => {
					console.log(err)
					reject()
				})
		})
	}

	delete(path) {
		return new Promise((resolve, reject) => {

			fs.unlink(path, err => {
				if (err) {
					reject()
					throw err
				}

				resolve()
			})
		})
	}
}

module.exports = ImageController

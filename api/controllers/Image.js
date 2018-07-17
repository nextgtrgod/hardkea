const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const apiBase = require('../data/config')

let pathPrefix = path.join(__dirname, '..')


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
	
			sharp(imgBuffer)
				.toFormat(extension, { quality: 80, progressive: true, compressionLevel: 9 })
				.toBuffer()
				.then(async (data) => {
	
					let hash = (Date.now()).toString(36)

					let name = `${fileName}-${hash}.${extension}`


					if (!prevUrl.startsWith('http')) await this.delete(prevUrl)

	
					fs.writeFile(path.join(pathPrefix, 'images', 'products', `${productID}`, name), data, 'base64', err => {
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

	delete(filePath) {
		return new Promise((resolve, reject) => {

			fs.exists(pathPrefix + filePath, exists => {
				if (exists) {
					fs.unlink(pathPrefix + filePath, err => {
						if (err) {
							reject()
							throw err
						}
		
						resolve()
					})
				}

				resolve()
			})

		})
	}
}

module.exports = ImageController

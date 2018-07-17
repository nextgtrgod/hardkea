const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

let pathPrefix = path.join(__dirname, '..', 'images', 'products')


class ImageController {
	constructor() {

	}

	upload(inputBuffer, id = 1, name = 'output') {
		return new Promise(async (resolve, reject) => {

			let buffer = inputBuffer.split(',')
	
			let meta = buffer[0]
			let img = buffer[1]
	
			let extension
	
			meta.includes('jp') && (extension = 'jpg');
			meta.includes('png') && (extension = 'png');
	
	
			let imgBuffer = Buffer.from(img, 'base64')
	
			// console.log('saving image...');
	
			sharp(imgBuffer)
				.resize(320)
				.toBuffer()
				.then(data => {
	
					// console.log('success!');
	
					fs.writeFile(path.join(pathPrefix, `${id}`, `${name}.${extension}`), data, 'base64', err => {
						if (err) throw err

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

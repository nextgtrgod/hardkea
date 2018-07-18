const fs = require('fs')

let createFolder = async (path) => {
	return new Promise((resolve, reject) => {
		
		fs.mkdirSync(path)

		resolve()
	})
}

module.exports = createFolder

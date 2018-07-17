var fs = require('fs')

let createFolder = async (path) => {
	return new Promise((resolve, reject) => {
		
		fs.mkdirSync(path, mask = 0777, err => {
			if (err) {
				reject()
				throw err
			}

			resolve()
		})

	})
}

module.exports = createFolder

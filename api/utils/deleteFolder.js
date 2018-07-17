const fs = require('fs')
const rimraf = require('rimraf')

let deleteFolder = async (path) => {
	return new Promise((resolve, reject) => {

		rimraf(path, err => {
			if (err) {
				reject()
				throw err
			}

			resolve()
		})

	})
}

module.exports = deleteFolder

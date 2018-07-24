const jwt = require('jsonwebtoken')


let encodeJWT = ({ sessionData, maxAge = '1825d', }) => {
    return jwt.sign(
        {
            data: sessionData
        },
        process.env.JWT_SECRET,
        {
            expiresIn: maxAge,
            algorithm: 'HS256'
        }
    )
}


let decodeJWT = token => new Promise((resolve, reject) => {

	jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
		if (err || !decodedToken) {
			return reject(err)
		}

		resolve(decodedToken)
	})
})


module.exports = {
	encodeJWT,
	decodeJWT,
}

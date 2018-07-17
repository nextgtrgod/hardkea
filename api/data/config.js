
const apiBase = process.env.NODE_ENV === 'production'
	? 'https://hardkea.herokuapp.com'
	: `http://localhost:${(process.env.PORT || 4000)}`


module.exports = apiBase

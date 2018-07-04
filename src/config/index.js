
const apiBase = process.env.NODE_ENV === 'production'
	? 'https://hardkea.herokuapp.com/'
	: 'http://localhost:4000'

export {
	apiBase,
}

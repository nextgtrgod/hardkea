
const apiBase = process.env.NODE_ENV === 'production'
	? 'https://hardkea.herokuapp.com'
	: 'http://localhost:4000'

const API = {

	base: apiBase,

	sendOrder: apiBase + '/api/sendOrder',

	products: apiBase + '/api/products',

	categories: apiBase + '/api/categories',

}

export {
	apiBase,
	API,
}


const apiBase = process.env.NODE_ENV === 'production'
	? 'http://88.212.254.100:4000'
	: 'http://localhost:4000'

const API = {

	base: apiBase,

	sendOrder: apiBase + '/api/orders/new',

	products: apiBase + '/api/products',

	orders: apiBase + '/api/orders',

	categories: apiBase + '/api/categories',

	login: apiBase + '/api/login',

}

export {
	apiBase,
	API,
}

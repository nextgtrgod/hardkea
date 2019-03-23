const apiBase = process.env.NODE_ENV === 'production'
	? 'https://hardkea.com'
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

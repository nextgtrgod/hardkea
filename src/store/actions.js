import { API } from '@/config/index'
import makeRequest from '@/utils/makeRequest'

export default {

	async loadProducts({ commit }) {

		try {
			let res = await makeRequest({
				method: 'GET',
				url: API.products,
			})

			commit('setProducts', res.data)

		} catch (err) {
			console.log('damn! loading products error')
			console.log(err)
		}

	},

	async loadOrders({ commit }) {

		try {
			let res = await makeRequest({
				method: 'GET',
				url: API.orders,
			})

			commit('setOrders', res.data)

		} catch (err) {
			console.log('damn! loading orders error')
			console.log(err)
		}

	},

	async loadCategories({ commit }) {

		try {
			let res = await makeRequest({
				method: 'GET',
				url: API.categories,
			})

			commit('setCategories', res.data)

		} catch (err) {
			console.log('damn! loading categories error')
			console.log(err)
		}

	}

}

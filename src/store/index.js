import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

import categories from '../../api/data/categories'

Vue.use(Vuex)

localStorage.setItem('basket', null) // drop basket if structure changes

let orders = []

const state = {
	categories,
	orders,
	basket: JSON.parse(localStorage.getItem('basket')) || [],
}

const store = new Vuex.Store({
	strict: false,
	state,
	getters,
	actions,
	mutations,
})

store.watch(
	state => state.basket,
	data => {
		try {
			localStorage.setItem('basket', JSON.stringify(data))
		} catch (err) {
			(err == QUOTA_EXCEEDED_ERR) && (console.log('localStorage is full'))
		}	
	},
	{ deep: true }
)

export default store

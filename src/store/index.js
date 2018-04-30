import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

import products from '@/data/products'

Vue.use(Vuex)

const state = {
	products,
	basket: [
		{ name: 'бля' },
		{ name: 'ска' },
	],
}

const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state,
	getters,
	actions,
	mutations,
})

export default store

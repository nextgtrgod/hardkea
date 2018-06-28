import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import filters from './filters'

import VueInputMask from 'vue-inputmask'

Vue.config.productionTip = false

Vue.use(VueInputMask.default)

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App },
})

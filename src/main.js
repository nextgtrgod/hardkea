import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import filters from './filters'

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App },
})

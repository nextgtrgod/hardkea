import Vue from 'vue'

Vue.filter('getMonthName', value => [
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря'][(new Date(value)).getMonth()]
)

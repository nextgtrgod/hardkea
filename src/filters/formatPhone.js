import Vue from 'vue'

Vue.filter('formatPhone', s => s.slice(0, 2) + ' ' + s.slice(2, 5) + ' ' + s.slice(5, 8) + '-' + s.slice(8, 10) + '-' + s.slice(10, 12))

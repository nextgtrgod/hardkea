import Vue from 'vue'

Vue.filter('getDate', value => (new Date(value)).getDate())

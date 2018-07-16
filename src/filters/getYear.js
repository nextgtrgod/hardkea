import Vue from 'vue'

Vue.filter('getYear', value => (new Date(value)).getFullYear())

import Vue from 'vue'

Vue.filter('formatNumber', n => n && (n + '').replace(/\B(?=(\d{3})+(?!\d))/g, " "))

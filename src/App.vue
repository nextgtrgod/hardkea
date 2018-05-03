<script>
import AsideMenu from '@/components/Aside'
import Modal from '@/components/Modal/Index'

export default {
	name: "App",
	components: {
		AsideMenu,
		Modal,
	},
	data() {
		return {
			scrollPos: 0,
		}
	},
	watch: {
		'$route'(to, from) {
			if (from.name === 'MainPage' && to.name === 'ProductPage') {
				this.scrollPos = document.body.scrollTop
				document.body.scrollTop = 0
			}
			if (from.name === 'ProductPage' && to.name === 'MainPage') {
				document.body.scrollTop = this.scrollPos
			}
		}
	}
}
</script>


<template lang="pug">
#app
	aside-menu
	main
		router-view

	modal
</template>


<style lang="stylus">
@import './styles/normalize.styl'
@import './styles/variables.styl'

body
	font-family: $font.family.default
	-webkit-font-smoothing: antialiased
	-moz-osx-font-smoothing: grayscale
	font-family: $font.family.default
	color: $color-dark
	background-color: #EEE

main
	@media (min-width 960px)
		width: calc(100% - 50px) // menu width


h1, h2, h3
	font-family: $font.family.fira

</style>

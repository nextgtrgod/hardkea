<script>
	import AsideMenu from '@/components/Aside'
	import Modal from '@/components/Modal/Index'

	export default {
		name: "App",
		components: {
			AsideMenu,
			Modal,
		},
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
		background-color: #EEE
	
	main
		@media (min-width 960px)
			width: calc(100% - 50px) // menu width
	


</style>

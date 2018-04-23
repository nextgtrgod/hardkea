<script>
	import AsideView from './components/Aside'

	export default {
		name: "App",
		components: {
			AsideView,
		},
	}
</script>


<template lang="pug">
	#app
		aside-view
		main
			router-view
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

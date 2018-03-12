<script>
	export default {
		name: "App"
	}
</script>


<template lang="pug">
	#app
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

</style>

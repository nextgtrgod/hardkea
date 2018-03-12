<script>
	import Events from '@/events'

	export default {
		name: 'Header'
	}
</script>


<template lang="pug">
	header
		button.menu-toggle
		img(src="../assets/images/logo.svg")
		button.cart-open
</template>


<style lang="stylus" scoped>
	
	@import '../styles/variables.styl'


	header
		position relative
		display flex
		background-color: $color.dark
		align-items center
		justify-content space-between
		padding 15px 20px
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5)
		box-sizing border-box
		z-index 1
		
		img
			height 30px
			width auto

		button
			width 24px
			height 24px
			background-position center
			background-repeat: no-repeat

			&.menu-toggle
				background-image: url('../assets/images/menu.svg')
				background-size: 100% auto
			
			&.cart-open
				background-image: url('../assets/images/cart.png')
				background-size: auto 100%

</style>

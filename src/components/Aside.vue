<script>
	import Events from '@/events'

	export default {
		name: 'Aside',
		methods: {
			openMenu: name => Events.$emit('modal-open', { name }),
			imgUrl: name => require(`../assets/images/menu/${name}.svg`)
		}
	}
</script>


<template lang="pug">
	aside
		a.logo(href="/")
			img(src="../assets/images/logo.svg")
		ul
			li(v-for="name of ['delivery', 'payment', 'basket', 'messenger']")
				button(@click="openMenu(name)")
					img(:src="imgUrl(name)")

</template>


<style lang="stylus" scoped>

	@import '../styles/variables.styl'

	aside
		display flex
		align-items center
		background-color #FFF
		box-shadow: 0 7px 40px alpha(#111, .1)
		box-sizing border-box

		@media (min-width 960px)
			position fixed
			top 0
			right 0
			bottom 0
			width 50px
			flex-direction column
			background-color: #FFF
			box-shadow: -7px 0 40px alpha(#111, .1)
			z-index 99
	
	a.logo
		width 40px
		height 40px
		margin 5px
		margin-right 10px
		img
			width auto
			height 100%

		@media (min-width 960px)
			margin 5px
			margin-bottom 40px
			img
				width 100%
				height auto

	ul
		display flex
		align-items center
		justify-content center
		margin-left auto
		width 100%
		height 50px

		@media (min-width 960px)
			height 100%
			margin 0
			flex-direction column
			justify-content flex-start

		li
			display inline-flex
			align-items center
			justify-content center
			height 100%
			&:last-child
				margin-left auto

			button
				height 100%
				padding 0 15px

			@media (min-width 960px)
				margin 0
				width 100%
				height auto
				&:last-child
					margin-left 0
					margin-top: auto

				button
					padding 12px 10px

			img
				display block
				margin auto
				width 100%
				max-width 30px
				pointer-events none



</style>

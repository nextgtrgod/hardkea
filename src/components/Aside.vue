<script>
import { mapState } from 'vuex'
import Events from '@/events'

export default {
	name: 'Aside',
	methods: {
		openMenu: name => Events.$emit('modal-open', { name }),
	},
	computed: {
		...mapState({
			basketCount: state => state.basket.length
		})
	}
}
</script>


<template lang="pug">
	aside
		router-link(class="logo" to="/")
			img(src="../assets/images/logo.svg")
		ul
			li
				button(@click="openMenu('delivery')")
					svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 37")
						path(d="M2.8 0C1.3 0 0 1.3 0 2.8V29c0 1.7 1.3 3 3 3h4.1c.5 2.8 2.9 5 5.9 5s5.4-2.2 5.9-5h9.2c.7 0 1.4-.3 1.9-.8.5.5 1.2.8 1.9.8H33c.5 2.8 2.9 5 5.9 5 3.3 0 6-2.7 6-6s-2.7-6-6-6c-3 0-5.4 2.2-5.9 5h-1c-.2 0-.5-.1-.7-.3s-.3-.5-.3-.7V10c0-.4.6-1 1-1h8c.8 0 1.9.8 2.7 1.8l.2.2H38c-1.6 0-3 1.3-3 3v4c0 .8.4 1.6.9 2.1s1.3.9 2.1.9h10v8c0 .4-.6 1-1 1h-2v2h2c1.7 0 3-1.3 3-3v-9.6c0-2.3-1.6-4.3-1.6-4.3l-4.1-5.5C43.3 8.4 41.9 7 40 7h-8c-.4 0-.7.1-1 .2V2.9C31 1.4 29.8 0 28.2 0H2.8zm0 2h25.3c.5 0 .9.4.9.9v26.2c0 .5-.4.8-.8.8H19c-.5-2.8-2.9-5-5.9-5s-5.4 2.2-5.9 5H3c-.4 0-1-.6-1-1V2.8c0-.4.4-.8.8-.8zM38 13h6.3l2.4 3.2s.9 1.6 1.1 2.8H38c-.2 0-.4-.1-.7-.3s-.3-.5-.3-.7v-4c0-.5.6-1 1-1zM13 27c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm26 0c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4z")
			li
				button(@click="openMenu('payment')")
					svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50")
						path(d="M6 5C3.800781 5 2 6.800781 2 9v22c0 1.953125 1.421875 3.566406 3.28125 3.90625l1.3125 7.40625c.382813 2.164063 2.460938 3.632813 4.625 3.25l33.46875-5.96875c2.164063-.382812 3.632813-2.460937 3.25-4.625L44.09375 13.3125c-.015625-.097656-.046875-.191406-.09375-.28125V9c0-2.199219-1.800781-4-4-4zm0 2h34c1.117188 0 2 .882813 2 2v3H4V9c0-1.117187.882813-2 2-2zM4 17h38v14c0 1.117188-.882812 2-2 2H6c-1.117187 0-2-.882812-2-2zm5 3v2h16v-2zm35 4.21875l1.96875 11.09375c.195313 1.097656-.523437 2.117188-1.625 2.3125L10.875 43.59375c-1.097656.195313-2.117187-.523437-2.3125-1.625L7.3125 35H40c2.199219 0 4-1.800781 4-4z")
			li(class="basket", :data-count="basketCount", :class="{ enabled: basketCount > 0 }")
				button(@click="openMenu('basket')")
					svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48")
						path(d="M1.8 0C.7.2 0 1 0 2c0 1.1.9 2 2 2s2-.9 2-2h4.7c1.2 0 1.9.3 2.4.7.5.4.9 1.1 1.2 2.2l8 32.3c.3 1.1.6 2.3 1.4 3.3.3.4.8.7 1.3 1-.6.7-1 1.6-1 2.5 0 2.2 1.8 4 4 4s4-1.8 4-4c0-.7-.2-1.4-.6-2h6.1c-.3.6-.6 1.3-.6 2 0 2.2 1.8 4 4 4s4-1.8 4-4c0-1-.4-1.9-1.1-2.7.1-.3.1-.6-.1-.9-.1-.2-.4-.4-.7-.4H25.7c-1.5 0-2.2-.3-2.6-.8-.4-.5-.7-1.3-1-2.4l-.6-2.8h18.3c.4 0 .8-.3.9-.7l7.2-19c.1-.3.1-.6-.1-.9s-.5-.4-.8-.4H16.3l-2.1-8.5v-.1c-.4-1.3-.9-2.4-1.8-3.2S10.2 0 8.7 0H1.8zm15 15h28.8l-6.4 17H21l-4.2-17zM26 42c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm13 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z")
			li
				button(@click="openMenu('about')")
					svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50")
						path(d=d="M25 1C11.2 1 0 10.9 0 23.2c0 6 2.8 11.5 7.2 15.5-.7 2.1-2.2 3.7-3.7 5-.8.7-1.6 1.3-2.2 1.8-.3.2-.6.5-.8.9s-.4.8-.3 1.4l.1.4.3.2c1.3.7 2.9.9 4.6.8s3.6-.5 5.5-1c3.6-1 7-2.4 8.8-3.2 1.8.4 3.5.6 5.4.6 13.8 0 25-9.9 25-22.2C49.9 11 38.8 1 25 1zm0 2c12.8 0 22.9 9.2 22.9 20.3 0 11.1-10.2 20.2-23 20.2-1.8 0-3.6-.2-5.3-.6l-.3-.1-.3.2c-1.7.7-5.2 2.2-8.8 3.2-1.8.5-3.5.9-5.1 1-1 .1-1.6-.2-2.3-.3.5-.4 1.2-.9 2-1.6 1.7-1.4 3.8-3.5 4.6-6.4l.2-.6-.6-.5C4.6 34 2 28.9 2 23.2 2 12.1 12.2 3 25 3zm-1.2 9.8c-.3 0-.4.2-.4.4v2.6c0 .3.2.4.4.4h2.4c.3 0 .4-.2.4-.4v-2.6c0-.3-.2-.4-.4-.4h-2.4zm.1 7.3c-.3 0-.4.2-.4.4v13.4c0 .3.2.4.4.4v.1h2.3c.3 0 .4-.2.4-.4V20.5c0-.3-.2-.4-.4-.4h-2.3z")
			li
				button(@click="openMenu('messenger')")
					svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50")
						path(d="M25 2C12.347656 2 2 11.597656 2 23.5c0 6.507813 3.132813 12.285156 8 16.21875v8.9375l1.46875-.78125 7.21875-3.75C20.703125 44.664063 22.800781 45 25 45c12.652344 0 23-9.597656 23-21.5S37.652344 2 25 2zm0 2c11.644531 0 21 8.757813 21 19.5C46 34.242188 36.644531 43 25 43c-2.164062 0-4.257812-.3125-6.21875-.875l-.375-.09375-.34375.1875L12 45.375v-6.5625l-.375-.28125C6.960938 34.941406 4 29.539063 4 23.5 4 12.757813 13.355469 4 25 4zm-2.28125 13.71875l-12.03125 12.75L21.5 24.40625l5.78125 6.1875 11.875-12.875L28.625 23.625z")
</template>


<style lang="stylus" scoped>
@import '../styles/variables.styl'

aside
	position relative
	display flex
	align-items center
	background-color #FFF
	box-shadow: 0 7px 40px alpha(#111, .1)
	box-sizing border-box
	z-index 1

	@media (min-width 960px)
		position fixed
		top 0
		right 0
		bottom 0
		width 50px
		flex-direction column
		background-color: #FFF
		box-shadow: -7px 0 40px alpha(#111, .1)

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
		position relative
		display inline-flex
		align-items center
		justify-content center
		height 100%
		transition all .2s
		&:last-child
			margin-left auto
		
		&:hover
			background-color #EEE
			// svg
			// 	fill: #FFF


		&.basket
			opacity .25
			pointer-events none
			cursor default
			&.enabled
				opacity 1
				pointer-events all
				cursor pointer
				&:after
					content: attr(data-count)
					position absolute
					top 5px
					right 2px
					width 22px
					height 22px
					text-align center
					font-size: 11px
					line-height 22px
					background-color #333
					border-radius 50%
					color #FFF
					pointer-events none

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

		svg
			display block
			margin auto
			width 100%
			max-width 30px
			pointer-events none
			// fill #333
			// transition all .2s

</style>

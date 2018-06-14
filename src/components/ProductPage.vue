<script>
import Events from '@/events'
import formatNumber from '@/utils/formatNumber'

export default {
	name: 'ProductPage',
	data() {
		return {
			device: 'desktop',
			reqAnimFrameID: null,
		}
	},
	created() {
		this.reqAnimFrameID = this.checkDevice()
	},
	beforeDestroy: function() {
		cancelAnimationFrame(this.reqAnimFrameID)
	},
	methods: {
		checkDevice: function() {
			this.device = (window.innerWidth >= 960) ? 'desktop' : 'mobile'

			return requestAnimationFrame(this.checkDevice)
		},
		openDetails: id => Events.$emit('modal-open', { name: 'details', productID: id }),

		formatNumber: n => formatNumber(n),
	}

}
</script>


<template lang="pug">
.product-page(:class="device")
	template(v-if="device === 'mobile'")
		.text-block
			img(src="../assets/images/product/0.png")
			.text
				h3 Orgoramus
				p Ахуенный столи что бы колоть орехи на вечеринках и соло
				button(@click="openDetails(1)") {{ formatNumber(7500) }} ₽
		.description
			| Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi...

		.grid
			.grid__item(data-column='4' data-row='2')
				img(src="../assets/images/product/1.png")

			.grid__item(data-column='4' data-row='4')
				img(src="../assets/images/product/2.png")

			.grid__item(data-column='4' data-row='4')
				img(src="../assets/images/product/3.png")

			.grid__item(data-column='4' data-row='2')
				img(src="../assets/images/product/4.png")

			.grid__item(data-column='2' data-row='2')
				img(src="../assets/images/product/6.png")

			.grid__item(data-column='2' data-row='2')
				img(src="../assets/images/product/7.png")

			.grid__item(data-column='4' data-row='4')
				img(src="../assets/images/product/5.png")


	template(v-if="device === 'desktop'")
		.text-block(data-column='2' data-row='2')
			.text
				h3 Orgoramus
				p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi...
				button {{ formatNumber(7500) }} ₽
			.image
				img(src="../assets/images/product/0.png")

		.grid
			.grid__item(data-column='4' data-row='2')
				img(src="../assets/images/product/1.png")

			.grid__item(data-column='2' data-row='2')
				img(src="../assets/images/product/2.png")

			.grid__item(data-column='2' data-row='2')
				img(src="../assets/images/product/3.png")

			.grid__item(data-column='2' data-row='1')
				img(src="../assets/images/product/4.png")

			.grid__item(data-column='2' data-row='2')
				img(src="../assets/images/product/5.png")

			.grid__item(data-column='1' data-row='1')
				img(src="../assets/images/product/6.png")

			.grid__item(data-column='1' data-row='1')
				img(src="../assets/images/product/7.png")
</template>


<style lang="stylus" scoped>
@import '../styles/variables.styl'
@import '../styles/animations.styl'

.product-page
	max-width 1200px
	margin auto
	background-color: #FFF
	color: $color.dark
	box-shadow: 0 0 40px alpha(#111, .25)
	opacity 0
	animation fade-in .4s forwards

	&.mobile
		.text-block
			position relative
			color: $color.dark
			width 100vw
			padding-top 133%

			img, .text
				position absolute
			
			img
				position absolute
				left 0
				right 0
				bottom 0
				width 100%
				height auto

			.text
				top 0
				padding 20px
				padding-top 40px
				backface-visibility hidden
				pointer-events none

				h3
					margin-bottom 10px
					font-size 35px
					line-height 1
					letter-spacing 1px
					border-bottom: 2px solid transparent
					transition: border .2s

				p
					max-width 280px
					font-size 14px
					line-height 1.25
					letter-spacing .35px
					margin-bottom 18px
	
	&.desktop
		font-size 12px

		@media (min-width 960px)
			font-size 12px

		@media (min-width 1200px)
			font-size 16px

		@media (min-width 1400px)
			font-size 18px
	

		.text-block
			display flex
			align-items stretch
			justify-content space-around
			padding-left 4.4em

			.text, .image
				position relative
				flex 0 0 50%
			
			.image
				font-size 0
				overflow hidden

				img
					position absolute
					right 0
					top 0
					height 100%

			h3
				font-size 3.45em
				margin-top 1.2em
				margin-bottom 0.84em
			
			p
				font-size 1.18em
				line-height 1.5
				margin-bottom 2.5em
				max-width 75%


.description
	padding 20px
	font-size 14px
	line-height 1.5


button
	width 100px
	font-size 15px
	line-height 2
	color: $color.dark
	border 1px solid #333
	border-radius 6px
	transition background .2s, color .2s
	box-sizing border-box
	pointer-events: all
	&:hover
		color #FFF
		background-color: $color.dark

	@media (min-width 960px)
		width 120px
		font-size 16px
		margin-bottom 2.72em


.grid
	display grid
	height 100%
	grid-template-columns repeat(4, 25%)
	grid-auto-rows 25vw
	grid-auto-flow dense
	grid-row-gap 0

	@media (min-width 960px)
		grid-auto-rows 300px

	&__item
		position relative
		box-sizing border-box
		overflow hidden

		for i in 1..4
			&[data-column=\'{i}\']
				grid-column: auto / span i

		for i in 1..4
			&[data-row=\'{i}\']
				grid-row: auto / span i

		img
			position absolute
			top 0
			left 0
			right 0
			bottom 0
			width 100%


</style>

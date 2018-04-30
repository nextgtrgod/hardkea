<script>
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
		}

	}
</script>


<template lang="pug">
	.product-page(:class="device")
		template(v-if="device === 'mobile'")
			.text-block
				img(src="../assets/images/product/0.png")
				.text
					h3
						| Orgoramus
					p
						| Ахуенный столи что бы колоть орехи на вечеринках и соло
					button
						| 5 760 ₽
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
					h3
						| Orgoramus
					p
						| Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi...
					button
						| 5 760 ₽
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

	.product-page
		background-color: #FFF
		color: $color.dark

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
					padding 30px
					backface-visibility hidden
					pointer-events none
					h3
						font-size 2.2em
						line-height 1.05
						letter-spacing 1.2px
						font-family: $font.family.fira
						margin 0

					p
						font-size 1em
						margin-bottom 1.4em
						backface-visibility hidden
				
					button
						position relative
						font-size 1em
						color: currentColor
						border: 1px solid
						border-radius 6px
						padding .5em 2.2em
						transition-property: background, color, border
						transition-duration: .2s
						pointer-events all
						backface-visibility hidden
						z-index 1
						&:hover
						&:focus
							outline none
							color #FFF
							background-color: $color.dark
							border: 1px solid $color.dark

		.description
			padding 30px
			font-size 1.18em
			line-height 1.5

		
		&.desktop
			font-size 12px

			@media (min-width 960px)
				font-size 12px

			@media (min-width 1200px)
				font-size 16px

			@media (min-width 1400px)
				font-size 18px

			@media (min-width 1600px)
				font-size 20px
		

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

					img
						position absolute
						right 0
						bottom 0
						// height 100%
						width 100%

				h3
					font-size 3.45em
					margin-top 1.2em
					margin-bottom 0.84em
				
				p
					font-size 1.18em
					line-height 1.5
					margin-bottom 2.5em
					max-width 75%

				button
					font-size 1em
					width 7.72em
					height 2.272em
					margin-bottom 2.72em
					border 1px solid #333
					border-radius 0.45em
					transition background .2s, color .2s
					&:hover
						background-color #333
						color #FFF


	.grid
		display grid
		height 100vh
		grid-template-columns repeat(4, 25%)
		grid-auto-rows 25vw
		grid-auto-flow dense
		grid-row-gap 0

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
				// width 100%
				height 100%


</style>

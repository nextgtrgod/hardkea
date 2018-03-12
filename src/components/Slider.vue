<script>
	import { Carousel, Slide } from '@/components/VueCarousel'
	import Events from '@/events'
	import formatNumber from '@/utils/formatNumber'

	export default {
		name: 'Slider',
		props: {
			slides: {
				type: Array,
				default: [],
				required: true,
			},
			section: {
				type: String,
				default: 'товаров',
				required: false,	
			}
		},
		components: {
			Carousel,
			Slide,
		},
		methods: {
			imgUrl(name) {
				try {
					return require(`../assets/images/slides/${name}.jpg`)
				} catch (error) {
					return require(`../assets/images/slides/placeholder.jpg`)
				}	
			},
			openForm: () => Events.$emit('open-form'),

			formatPrice: price => formatNumber(price),
		},
	}
</script>


<template lang="pug">
	.slider
		carousel(class='carousel')
			slide(
				v-for="slide in slides"
				:key="slide.title"
				class="carousel__slide"
				:class="slide.color"
			)
				img(:src="imgUrl(slide.image)")
				a(href="/tables")
				.text
					h3
						| {{ slide.title }}
					p
						| {{ slide.description }}
					button(@click="openForm")
						| {{ formatPrice(slide.price) }} ₽
			
			slide.carousel__slide.last
				.text
					h2
						| Посмотреть ещё несколько {{ section }}
					a(href="/tables")
						| Перейти в раздел


</template>


<style lang="stylus" scoped>

	@import '../styles/variables.styl'

	.carousel
		&__slide
			position relative
			width 100vw
			padding-top 133%
			background-color: $color.dark
			color: $color.dark

			&.dark
				color #FFF
				p
					opacity .5
				.text
					button
						&:hover
						&:focus
							color: $color.dark
							background-color #FFF
							border 1px solid #FFF
			
			&.last
				color: #FFF


			a, img, .text
				position absolute
				top 0
				left 0

			a
				right 0
				bottom 0
				z-index 0
			
			img
				right 0
				bottom 0
				width 100%
				height auto

			.text
				padding 30px
				backface-visibility hidden
				pointer-events none
				h2, h3
					line-height 1.05
					letter-spacing 1.2px
					font-family: $font.family.fira
					margin 0
				h2
					font-size 2.4em
					margin-bottom 1em
				h3
					font-size 2.2em
				p
					font-size 1em
					margin-bottom 1.4em
					backface-visibility hidden
			
				button, a
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
				
				a
					&:hover
					&:focus
						color: $color.dark
						background-color: #FFF
						border 1px solid

</style>

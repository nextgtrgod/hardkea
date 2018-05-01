<script>
import { mapState } from 'vuex'
import Events from '@/events' 
import Slider from '@/components/Slider'

import formatNumber from '@/utils/formatNumber'

export default {
	name: 'MainPage',
	components: {
		Slider,
	},
	data() {
		return {
			device: 'desktop',
			reqAnimFrameID: null,
			sliders: [
				{
					section: 'столов',
					slides: [
						{
							title: 'Orgoramus',
							description: 'Ахуенный столи что бы колоть орехи на вечеринках и соло',
							price: 5760,
							image: 0,
							color: 'dark',
						},
					]
				},
				{
					section: 'кашпо',
					slides: [
						{
							title: 'Uglovatina',
							description: 'Описание кашпо в трех размерах и в трех оттенках бетона',
							price: 5760,
							image: 1
						},
					]
				},
				{
					section: 'светильников',
					slides: [
						{
							title: 'Svetosila',
							description: 'Ахуенный столи что бы колоть орехи на вечеринках и соло',
							price: 5760,
							image: 2,
						},
					]
				},
			],
			sections: [
				{
					title: 'Konusoobra',
					description: 'Ахуенный столи что бы колоть орехи на вечеринках и соло',
					price: 5760,
					link: 'lamps',
					image: ''
				},
				{
					title: 'Кашпо Samurai',
					description: 'Ахуенный столи что бы колоть орехи на вечеринках и соло',
					price: 17760,
					link: 'tables',
				},
				{
					title: 'Oldus',
					description: 'Ахуенный столи что бы колоть орехи на вечеринках и соло',
					price: 17760,
					link: 'tables',
				}
			]
		}
	},
	created() {
		this.reqAnimFrameID = this.checkDevice()
	},
	beforeDestroy: function() {
		cancelAnimationFrame(this.reqAnimFrameID)
	},
	computed: {
		...mapState({
			products: state => state.products
		}),
	},
	methods: {
		checkDevice: function() {
			this.device = (window.innerWidth >= 960) ? 'desktop' : 'mobile'

			return requestAnimationFrame(this.checkDevice)
		},
		imgUrl: id => {
			try {
				return require(`@/assets/products/${id}/desktop.jpg`)
			} catch (err) {
				console.log(err)
			}
		},
		openDetails: id => Events.$emit('modal-open', { name: 'details', productID: id }),

		formatNumber: n => formatNumber(n),

	}
}
</script>


<template lang="pug">
	.main-page
		//- multiple sliders on mobile
		template(v-if="device === 'mobile'")
			slider(
				v-for="(slider, index) in sliders"
				:key="index"
				:slides="slider.slides"
				:section="slider.section"
			)

		template(v-if="device === 'desktop'")
			section(
				v-for="product in products"
				:key="product.id"
				:class="{ inverted: product.inverted }"
			)
				router-link(:to="'/product/'+product.id")
					img(:src="imgUrl(product.id)")
				.text
					h3 {{ product.name }}
					p {{ product.description }}
					button(@click="openDetails(product.id)")
						| {{ formatNumber(product.price) }} ₽
			

</template>


<style lang="stylus" scoped>

	@import '../styles/variables.styl'

	section
		position relative
		padding-top: 52.08%
		font-size 14px
		color #333
		overflow hidden
		box-sizing border-box

		@media (min-width 960px)
			font-size 16px

		@media (min-width 1200px)
			font-size 18px

		@media (min-width 1400px)
			font-size 20px

		@media (min-width 1600px)
			font-size 22px

		&.inverted
			.text
				color: #FFF
				button
					color: #FFF
					border 1px solid #FFF
					&:hover
					&:focus
						background-color: #FFF
						color: #333

				a
					&:hover
						color: #FFF

		&:hover
			h3
				border-bottom: 2px solid !important

			img
				transform: scale(1.15)
				opacity: .9
		

		a
			position absolute
			top 0
			left 0
			right 0
			bottom 0

		img
			position absolute
			top 0
			right 0
			bottom 0
			height auto
			width 100%
			transition: opacity 1.5s cubic-bezier(.19,1,.22,1), transform 25s cubic-bezier(.215,.61,.355,1)
			will-change: transform, opacity
			user-select: none
			pointer-events: none
		
		.text
			position absolute
			top 0
			left 0
			bottom 0
			display flex
			flex-direction column
			align-items flex-start
			padding 6.4em 4.45em
			pointer-events none
			@media (min-width 960px)
				padding 240px 50px 0
				margin auto

			h3
				font-size 3.45em
				font-family: $font.family.fira
				font-weight: 700
				line-height 1
				margin 0
				margin-bottom 0.45em
				@media (min-width 960px)
					font-size 38px
					letter-spacing 1.75px
					margin-bottom 17px
					border-bottom: 2px solid transparent
					transition: border .2s
			
			p
				font-size 1em
				margin-top 0
				margin-bottom 1.68em
				max-width 16.9em
				@media (min-width 960px)
					font-size 16px
					line-height 20px
					letter-spacing .75px
					margin-bottom 24px

			button
				width: 7.72em
				height 2.27em
				font-size 1em
				border 1px solid #333
				border-radius 0.5em
				transition background .2s, color .2s
				pointer-events all
				&:hover
					background-color: #333
					color #FFF

				@media (min-width 960px)
					font-size 16px


			a
				position absolute
				left 4.45em
				bottom 6.4em
				font-size: 1em
				letter-spacing: 0.4px
				margin-top auto
				border-bottom 1px solid
				transition: color .2s
				pointer-events all
				&:hover
					color: #000



</style>

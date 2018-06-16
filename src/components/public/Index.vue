<template>
<div class="main-page">
	<section
		v-for="product in products"
		:key="product.id"
		:class="{ inverted: product.inverted }"
	>
		<router-link :to="'/product/'+product.id">
			<img :src="imgUrl(product.id)">
		</router-link>

		<div class="text">
			<h3>{{ product.name }}</h3>
			<p>{{ product.description }}</p> 
			<button @click="openDetails(product.id)">
				{{ product.price | formatNumber }} ₽
			</button>

		</div>
	</section>
</div>
</template>


<script>
import Events from '@/events' 
import { mapState } from 'vuex'
import checkDevice from '@/mixins/checkDevice'

export default {
	name: 'MainPage',
	mixins: [
		checkDevice,
	],
	computed: {
		...mapState({
			products: state => state.products
		}),
	},
	methods: {
		imgUrl(id) {
			try {
				return require(`@/assets/products/${id}/${this.device}.jpg`)
			} catch (err) {
				console.log(err)
			}
		},
		openDetails: id => {
			Events.$emit('modal-open', { name: 'details', productID: id })
		},
	}
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/animations.styl'

section
	position relative
	font-size 14px
	padding-top 133%
	color #333
	box-shadow: 0 -7px 40px alpha(#111, .1)
	overflow hidden
	opacity 0
	animation fade-in .4s forwards

	@media (min-width 960px)
		padding-top 50%
		&:hover
			h3
				border-bottom: 2px solid !important

			img
				transform: scale(1.15)
				opacity: .9


	@media (min-width 960px)
		&.inverted
			.text
				color: #FFF
				button
					color: #FFF
					border 1px solid #FFF
					&:hover
						background-color: #FFF
						color: #333

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
		transition: opacity 1.5s cubic-bezier(0.19, 1, 0.22, 1), transform 25s cubic-bezier(0.215, 0.61, 0.355, 1)
		will-change: transform, opacity
	
	.text
		position absolute
		top 0
		left 0
		bottom 0
		display flex
		flex-direction column
		align-items flex-start
		padding 20px
		padding-top 40px
		pointer-events none
		backface-visibility hidden

		@media (min-width 960px)
			justify-content center
			padding 50px

		h3
			margin-bottom 10px
			font-size 35px
			line-height 1
			letter-spacing 1px
			border-bottom: 2px solid transparent
			transition: border .2s
			@media (min-width 960px)
				margin-top -40px
				font-size 38px
				letter-spacing 1.75px
				margin-bottom 15px

			@media (min-width 1400px)
				margin-top -50px
				font-size 50px

			@media (min-width 1800px)
				margin-top -65px
				font-size 65px

			@media (min-width 2200px)
				margin-top -80px
				font-size 80px

		p
			max-width 280px
			font-size 14px
			line-height 1.25
			letter-spacing .35px
			margin-bottom 18px
			@media (min-width 960px)
				font-size 16px
				letter-spacing .75px
				margin-bottom 24px

			@media (min-width 1400px)
				max-width 380px
				font-size 20px

			@media (min-width 1800px)
				max-width 450px
				font-size 24px

			@media (min-width 2200px)
				max-width 540px
				font-size 30px

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

			@media (min-width 1400px)
				width 150px
				font-size 18px

			@media (min-width 1800px)
				width 180px
				font-size 22px
				border 2px solid #333
				font-weight 500

			@media (min-width 2200px)
				width 220px
				font-size 25px

</style>

<template>
<div v-if="product" id="product">

	<div class="text-block">
		<div class="text">
			<h3>{{ product.name }}</h3>
			<p v-html="product.article"/>
			<button @click="openDetails(product.id)">
				{{ lowestPrice | formatNumber }} ₽
			</button>
		</div>
		<div class="image-wrap">
			<img :src="product.image.article">
		</div>
	</div>

	<ul class="gallery">
		<li
			v-for="(image, index) in product.image.gallery"
			:key="index"
			:style="getBgStyle(image)"
		/>
	</ul>

</div>
</template>


<script>
import Events from '@/events'
import { mapState } from 'vuex'
import checkDevice from '@/mixins/checkDevice'
import openDetails from '@/mixins/openDetails'
import lowestPrice from '@/mixins/lowestPrice'

export default {
	mixins: [
		checkDevice,
		openDetails,
		lowestPrice,
	],
	created() {
		if (!this.product) this.$router.replace({ name: 'NotFound' })
	},
	methods: {
		checkInverted(product) {

			if (!product.inverted) return false

			return this.device === 'desktop'
				? product.inverted.desktop.inner
				: product.inverted.mobile.inner

		},

		getBgStyle: url => ({ backgroundImage: `url(${url})` }),
	},
	computed: {
		...mapState({
			products: state => state.products,
		}),
		product() {
			return this.products.find(product => product.id === +this.$route.params.id)
		},
	},
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/animations.styl'

#product
	max-width 1200px
	margin auto
	background-color: #FFF
	color: $color.dark
	opacity 0
	animation fade-in .4s forwards

	font-size 12px

	@media (min-width 960px)
		font-size 14px

	@media (min-width 1200px)
		font-size 16px

	@media (min-width 1400px)
		font-size 18px


	.text-block
		display: flex
		flex-wrap: wrap
		align-items: stretch
		justify-content: space-between

		.text
			padding: 20px
			padding-top: 40px
			padding-bottom: 35px

			@media (min-width: 960px)
				padding: 0
				padding-left: 4.4em

		h3
			font-size: 35px
			margin-bottom: 10px
			line-height: 1
			letter-spacing: 1px

			@media (min-width: 960px)
				font-size 3.45em
				margin-top 1.2em
				margin-bottom 0.7em
		
		p
			font-size: 16px
			letter-spacing: 0.35px
			line-height: 1.45
			margin-bottom: 18px

			@media (min-width: 960px)
				font-size 1.18em
				margin-bottom 2.5em
				max-width 75%

		
		.image-wrap
			padding-top: 135%
			font-size: 0
			overflow: hidden

			@media (min-width: 960px)
				padding: 0

			img
				position: absolute
				right: -1px // css is awesome
				top: 0
				height: 100%

		
		.text, .image-wrap
			position relative
			flex: 1 0 100%

			@media (min-width: 960px)
				flex 1 0 50%


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


ul.gallery
	display flex
	flex-wrap wrap

	li
		flex: 1 0 100%
		position: relative
		padding-top: 100%
		background-color: #EEE
		background-size: cover
		background-position: center

		&:first-child
			padding-top: 50%

		@media (min-width 960px)
			flex: 1 0 50%
			padding-top: 50%

			&:first-child
				flex: 1 0 100%

		// img
		// 	position: absolute
		// 	top: 0
		// 	left: 0
		// 	right: 0
		// 	bottom: 0
		// 	height: 100%
		// 	margin: auto


</style>

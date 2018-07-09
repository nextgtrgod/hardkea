<template>
<div v-if="product" id="product" :class="device">

	<template v-if="device === 'mobile'">
		<div class="text-block" :class="{ inverted: checkInverted(product) }">
			<img :src="product.image.article">
			<div class="text">
				<h3>{{ product.name }}</h3>
				<p>{{ product.description }}</p>
				<button @click="openDetails(product.id)">
					{{ lowestPrice | formatNumber }} ₽
				</button>
			</div>
		</div>
		<div class="description" v-html="product.article"/>
	</template>

	<template v-if="device === 'desktop'">
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
	</template>

	<ul class="gallery">
		<li v-for="(image, index) in product.image.gallery" :key="index">
			<img :src="image">
		</li>
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
	box-shadow: 0 0 40px alpha(#111, .25)
	opacity 0
	animation fade-in .4s forwards

	&.mobile
		.text-block
			position relative
			color: $color.dark
			width 100vw
			padding-top 133%

			&.inverted
				color: #FFF

				button
					color: #FFF
					border 1px solid #FFF
					&:hover
						background-color: #FFF
						color: #333

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
			display: flex
			align-items: stretch
			justify-content: space-between
			padding-left: 4.4em

			.text, .image-wrap
				position relative
				flex 1 0 50%
			
			.image-wrap
				font-size 0
				overflow hidden

				img
					position: absolute
					right: -1px // css is awesome
					top: 0
					height: 100%

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


ul.gallery
	display flex
	flex-wrap wrap

	li
		flex: 1 0 100%
		position: relative
		padding-top: 100%
		background-color: #EEE

		&:first-child
			padding-top: 50%

		@media (min-width 960px)
			flex: 1 0 50%
			padding-top: 50%

			&:first-child
				flex: 1 0 100%

		img
			position: absolute
			top: 0
			left: 0
			right: 0
			bottom: 0
			height: 100%
			margin: auto


</style>

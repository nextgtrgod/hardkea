<template>
<div id="product-list">
	<h2>Товары</h2>
	<router-link
		:to="{ name: 'EditProduct', params: { id: 'new' } }"
		class="new-product"
	>
		<img src="../../assets/images/icons/plus.svg">
		<span>Добавить товар</span>
	</router-link>
	<ul>
		<li
			v-for="product in products"
			:key="product.id"
			class="product"
			:class="{ inverted: checkInverted(product) }"
		>
			<img :src="getImage(product.id)">
			<router-link :to="{ name: 'EditProduct', params: { id: product.id } }">
				<h3>{{ product.name }}</h3>
				<p>{{ product.description }}</p>
			</router-link>
		</li>
	</ul>
</div>
</template>


<script>
import { mapState } from 'vuex'
import Events from '@/events'

export default {
	name: 'ProductList',
	methods: {
		getImage(id) {
			try {
				return require(`@/assets/products/${id}/mobile.jpg`)
			} catch (err) {
				console.log(err)
			}
		},
		checkInverted(product) {
			console.log(product)

			if (!product.inverted) return false

			return this.device === 'desktop'
				? product.inverted.desktop.main
				: product.inverted.mobile.main

		}
	},
	computed: {
		...mapState({
			products: state => state.products
		}),
	}
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/animations.styl'


#product-list
	opacity 0
	animation fade-in .4s forwards


h2
	margin-bottom: 30px


a.new-product
	display: inline-flex
	align-items: center
	margin-top: 10px
	margin-bottom: 30px
	font-family: $font.family.fira

	&:hover
		// img
		// 	transform: rotate(1turn)

		span
			border-bottom: 1px dashed

	img
		width: 35px
		margin-right: 10px
		transition: all .4s ease-in-out

	span
		border-bottom: 1px dashed transparent
		transition: all .2s


ul
	display: flex
	flex-wrap: wrap
	align-items: center


li.product
	flex: 0 0 300px
	position: relative
	width: 300px
	height: 400px
	margin-right: 30px
	margin-bottom: 30px
	padding: 20px
	padding-top: 40px
	background-color: #FFF
	box-shadow: 0 25px 60px -10px alpha(#000, .3)
	border-radius: 10px
	transition: all .4s
	box-sizing: border-box
	overflow: hidden


	&:hover
		filter: saturate(120%) contrast(120%)

		img
			transform: scale(1.15)

	&.inverted
		color: #FFF
		background-color: #333

	a
		position: relative
		display: block
		height: 100%

	img
		display: none
		position: absolute
		top: 0
		left: 0
		right: 0
		bottom: 0
		width: 100%
		height: 100%
		transition: transform 25s cubic-bezier(0.215, 0.61, 0.355, 1)

		&[src*='jpg']
		&[src*='png']
			display: block


h3
	margin-bottom: 12px
	font-size: 35px
	line-height: 1
	letter-spacing: 1px

p
	max-width: 280px
	font-size: 14px
	line-height: 1.25
	letter-spacing: 0.35px
	margin-bottom: 18px
	



</style>
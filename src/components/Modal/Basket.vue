<script>
import Events from '@/events'
import Count from '@/components/Count'

import formatNumber from '@/utils/formatNumber'

export default {
	name: 'Basket',
	components: {
		Count,
	},
	data() {
		return {
			products: [
				{
					id: 1,
					name: 'Кашпо Samurai',
					size: 'm',
					count: 2,
					price: 4250,
					color: 1,
				},
				{
					id: 1,
					name: 'Кашпо Samurai',
					size: 'l',
					count: 3,
					price: 7250,
					color: 1,
				}
			],
		}
	},
	computed: {
		total() {
			let sum = 0

			this.products.map(({ count, price }) => {
				sum += count * price
			})

			return sum
		}
	},
	methods: {
		imgUrl: (id, color) => {
			try {
				return require(`@/assets/products/${id}/${color}.jpg`)
			} catch (err) {
				console.log(err)
			}
		},
		formatNumber: n => formatNumber(n),

		deleteProduct: id => {
			console.log(`ща будем удалять #${id}`)
		}
	}
}
</script>


<template lang="pug">
	section.basket
		h2 Ваша корзина

		ul
			li(v-for="(product, index) in products", :key="index" class="product")
				button.delete(@click="deleteProduct(product.id)")
				img(:src="imgUrl(product.id, product.color)")
				.description
					h5 {{ product.name }} {{ product.size.toUpperCase() }}
					count(:value="product.count")
				.price
					| {{ formatNumber(product.price * product.count) }} ₽
		
		.total
			h5 Итого:
			span {{ formatNumber(total) }} ₽

		button.checkout Оформить заказ



</template>


<style lang="stylus" scoped>
	
	@import '../../styles/variables.styl'
	@import '../../styles/modal.styl'


	ul
		margin-top 40px


	li.product
		position relative
		display flex
		align-items flex-start
		justify-content flex-start
		margin-bottom 35px
		color #333
		&:last-child
			margin-bottom 75px

		button.delete
			position absolute
			top 0
			left -32px
			bottom 0
			width 32px
			height 32px
			margin auto
			background-image url('../../assets/images/delete.png')
			background-position center
			background-size 8px auto
			background-repeat no-repeat

		img
			height 100px

		.description
			margin-left 10px

		.price
			margin-top 30px
			margin-left auto
			font-size 16px
			font-weight 700
			letter-spacing .6px


	h5
		margin-top 30px
		margin-bottom 20px
		font-size: 16px
		font-weight: 700
		letter-spacing .5px


	.total
		h5
			position relative
			&:after
				content ''
				position absolute
				left 0
				bottom -10px
				width 100%
				height 1px
				background-color #333

		span
			display block
			text-align right
			font-size 24px
			color #333
			line-height 40px


	button.checkout
		display block
		width 230px
		margin auto
		margin-top 50px
		padding 0
		font-size: 16px
		color: #333
		font-weight: 500
		line-height: 50px
		letter-spacing .4px
		border 1px solid
		border-radius 8px
		transition all .2s
		box-sizing border-box

		&:hover
			background-color #333
			color: #FFF

</style>

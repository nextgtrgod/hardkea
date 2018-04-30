<script>
import { mapGetters } from 'vuex'
import Events from '@/events' 
import Count from '@/components/Count'

import formatNumber from '@/utils/formatNumber'

export default {
	name: 'Details',
	components: {
		Count,
	},
	data() {
		return {
			product: {},
			sizes: null,
			total: 5760,
			selected: {
				size: '',
				color: null,
				count: 1,
			} 
		}
	},
	mounted() {
		Events.$on('modal-open', ({ name, productID }) => {
			if (name !== 'details') return
			this.product = this.$store.getters.product(productID)
			
			this.product.sizes && (this.selected.size = Object.keys(this.product.sizes)[0])
			this.product.colors && (this.selected.color = this.product.colors[0])
		})
	},
	computed: {
		imgUrl() {
			try {
				return require(`@/assets/products/${this.product.id}/1.jpg`)
			} catch(err) {
				console.log(err)
			}
		},
	},
	methods: {
		formatNumber: n => formatNumber(n),

		selectSize(size) {
			this.selected.size = size
		},

		selectColor(color) {
			this.selected.color = color
		},

		addToBasket() {
			console.log('товар добавлен в корзину')
		},
	},
}
</script>


<template lang="pug">
	section.details(v-if="product.id")
		h3 {{ product.name }}
		img(:src="imgUrl")
		p {{ product.text }}

		.sizes(v-if="product.sizes")
			h5 Размер модели:
			.size(
				v-for="(price, size) in product.sizes"
				:key="price"
				:class="{ selected: selected.size === size }"
				@click="selectSize(size)"
			)
				div {{ size }}
				span {{ formatNumber(price) }} ₽

		.colors(v-if="product.colors")
			h5 Цвет бетона:
			.color(
				v-for="(color, index) in product.colors"
				:key="index"
				:class="{ selected: selected.color === color }"
				:data-color="color"
				@click="selectColor(color)"
			)
				svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.2 35")
					path(d="M37 0s-.1 0 0 0c-.4.1-.6.3-.7.5L15.8 32.2l-14-12.7c-.2-.3-.7-.4-1-.3-.4.1-.7.4-.8.8-.1.4.1.8.5 1l14.9 13.5c.2.2.5.3.8.2.3 0 .5-.2.7-.5L38 1.6c.2-.3.2-.8 0-1.1s-.6-.5-1-.5z")


		.amount
			h5 Количество
			count(:value="selected.count")

		.total
			h5 Итого:
			span {{ formatNumber(total) }} ₽

		button(@click="addToBasket") Добавить в корзину
</template>


<style lang="stylus" scoped>
	
	@import '../../styles/variables.styl'
	@import '../../styles/modal.styl'


	h3
		font-size: 32px
		font-weight 700
		line-height 40px
		color: #333
		margin-top 20px
		margin-bottom 30px

	p
		font-size 16px
		margin 15px auto 50px
	
	h5
		margin-top 40px
		margin-bottom 15px
		font-size: 16px
		font-weight: 700
		letter-spacing .5px
	
	.size
		display inline-flex
		flex-direction column
		justify-content center
		align-items center
		margin-right 30px
		cursor pointer
		&:hover
		&.selected
			div
				color #FFF
				background-color #333

			span
				color #000

		&:last-of-type
			margin-right 0

		div
			width 64px
			height 64px
			margin-bottom 10px
			color #333
			font-size 25px
			line-height 62px
			font-weight 300
			text-transform uppercase
			text-align center
			border 1px solid #333
			border-radius 50%
			box-sizing border-box
			transition all .2s
			user-select none
		
		span
			font-size 16px
			font-weight 400
			letter-spacing .6px
			transition all .2s
	
	.color
		position relative
		display inline-flex
		margin-right 30px
		width 64px
		height 64px
		background-size 105% 105%
		background-position center
		border 1px solid #FFF
		border-radius 50%
		cursor pointer
		overflow hidden
		box-sizing border-box
		transition all .2s
		&:last-of-type
			margin-right 0

		svg
			position absolute
			top 0
			left 0
			right 0
			bottom 0
			margin auto
			width 25px
			opacity 0
			pointer-events none

		&.selected
			border 1px solid #333

			svg
				opacity 1
				transition all .2s

		for i in 1..4
			&[data-color=\'{i}\']
				background-image: url('../../assets/images/colors/'+i+'.png')

		for i in 3..4
			&[data-color=\'{i}\']
				svg
					fill #FFF
	
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

	button
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

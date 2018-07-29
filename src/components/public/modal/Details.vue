<template>
<section v-if="product.id" class="details">
	<h3>{{ product.name }}</h3>

	<div class="product-image" :style="productImageStyle"/>

	<p>{{ product.description }}</p>

	<h5 v-if="!anySizes">
		{{ product.dimensions.x }}×{{ product.dimensions.y }}×{{ product.dimensions.z }}см,
		{{ product.dimensions.w }}кг,
		{{ product.material }}	
	</h5>

	<h5 v-else>
		{{ size.x }}×{{ size.y }}×{{ size.z }}см,
		{{ size.w }}кг,
		{{ product.material }}
	</h5>

	<div v-if="anySizes" class="sizes">
		<h5>Размер модели:</h5>
		<div
			v-for="(params, size) in product.sizes"
			:key="size"
			v-if="params.price > 0"
			class="size"
			:class="{ selected: selected.size === size }"
			@click="selectSize(size)"
		>
			<div>{{ size }}</div>
			<span>{{ params.price | formatNumber }} ₽</span>
		</div>
	</div>

	<div v-if="anyColors" class="colors">
		<h5>Цвет бетона:</h5>
		<div
			v-for="(url, key) in product.colors"
			:key="key"
			v-if="url.length"
			:class="{ selected: selected.color === key }"
			class="color"
			:data-color="key"
			@click="selectColor(key)"
		>
			<img :src="apiBase + '/images/colors/color-' + key + '.png'">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.2 35">
				<path d="M37 0s-.1 0 0 0c-.4.1-.6.3-.7.5L15.8 32.2l-14-12.7c-.2-.3-.7-.4-1-.3-.4.1-.7.4-.8.8-.1.4.1.8.5 1l14.9 13.5c.2.2.5.3.8.2.3 0 .5-.2.7-.5L38 1.6c.2-.3.2-.8 0-1.1s-.6-.5-1-.5z"/>
			</svg>
		</div>
	</div>

	<div class="amount">
		<h5>Количество</h5>
		<count v-model="selected.count"/>
	</div>

	<div class="total">
		<h5>Итого:</h5>
		<span>{{ total | formatNumber }} ₽</span>
	</div>

	<button @click="addToBasket">Добавить в корзину</button>

</section>
</template>


<script>
import { mapGetters } from 'vuex'
import Events from '@/events' 
import Count from '@/components/ui/Count'

import formatNumber from '@/utils/formatNumber'

import { apiBase } from '@/config'

export default {
	name: 'Details',
	components: {
		Count,
	},
	data() {
		return {
			product: {},
			sizes: null,
			total: 0,
			selected: {
				size: '',
				color: null,
				count: 1,
			},
			apiBase,
		}
	},
	mounted() {
		Events.$on('modal-open', ({ name, productID }) => {
			if (name !== 'details') return

			// drop previous selections
			this.selected = {
				size: '',
				color: null,
				count: 1,
			}

			this.product = this.$store.getters.product(productID)
			
			this.selected.size = Object.keys(this.product.sizes).filter(key => {
				return this.product.sizes[key].price > 0
			})[0] || ''

			this.selected.color = Object.keys(this.product.colors).filter(key => {
				return this.product.colors[key].length
			})[0] || null
		})
	},
	computed: {
		anySizes() {
			return !!Object.values(this.product.sizes).find(size => size.price)
		},

		anyColors() {
			return !!Object.values(this.product.colors).find(url => url.length)
		},

		size() {
			return this.product.sizes[this.selected.size]
		},

		productImageStyle() {
			let src = this.anyColors
				? this.product.colors[this.selected.color]
				: this.product.image.sidebar

			return { backgroundImage: `url(${src})` }
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
			let { size, color, count } = this.selected

			let data = {
				id: this.product.id,
				name: this.product.name,
				count,
			}

			size.length && (data['size'] = size)
			color && (data['color'] = color)

			this.$store.commit('addToBasket', data)
			Events.$emit('modal-close')
		},
	},
	beforeUpdate() {
		let { size, count } = this.selected

		this.total = count * (size ? this.product.sizes[size].price : this.product.price)
	},
}
</script>


<style lang="stylus" scoped>	
@import '../../../styles/variables.styl'
@import '../../../styles/modal.styl'


h3
	font-size: 32px
	font-weight 700
	line-height 40px
	color: #333
	margin-top 20px
	margin-bottom 30px

p
	font-size 16px
	line-height 1.25
	margin-top 15px
	margin-bottom 16px

	&+h5
		margin-top 0
		margin-bottom 50px
		font-size 14px


.product-image
	padding-top: 100%
	background-size: cover
	background-position: center


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
	margin-right 20px
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
		width 50px
		height 50px
		margin-bottom 10px
		color #333
		font-size 20px
		line-height 48px
		font-weight 300
		text-transform uppercase
		text-align center
		border 1px solid #333
		border-radius 50%
		box-sizing border-box
		transition all .2s
		user-select none

		@media (min-width 960px)
			width 64px
			height 64px
			font-size 25px
			line-height 62px

	span
		font-size 12px
		font-weight 400
		letter-spacing .2px
		transition all .2s
		
		@media (min-width 960px)
			font-size 16px
			letter-spacing .6px

.color
	position relative
	display inline-flex
	margin-right 20px
	width 50px
	height 50px
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

	@media (min-width 960px)
		width 64px
		height 64px
		margin-right 30px

	svg
		position absolute
		top 0
		left 0
		right 0
		bottom 0
		margin auto
		width 40%
		opacity 0
		pointer-events none

	&.selected
		border 1px solid #333

		svg
			opacity 1
			transition all .2s

	for i in 1..4
		&[data-color=\'{i}\']
			background-image: url('../../../assets/images/colors/'+i+'.png')

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
	line-height: 49px
	letter-spacing .4px
	border: 1px solid #333
	border-radius 8px
	transition all .2s
	box-sizing border-box

	&:hover
		background-color #333
		color: #FFF

</style>

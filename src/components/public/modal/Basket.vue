<template>
<section class="basket">

	<div class="inner">
		<h2>Ваша корзина</h2>

		<transition-group tag="ul" name="product-list" class="product-list">
			<li
				v-for="product in products"
				:key="product.basketID"
				class="product"
			>
				<button class="delete" @click="deleteProduct(product.basketID)"/>

				<div class="product-image" :style="{ backgroundImage: 'url(' + imgUrl(product) + ')' }"/>

				<div class="description">
					<h5>{{ product.name }} {{ (product.size || '').toUpperCase() }}</h5>
					<count
						v-model="product.count"
						:min="0"
						:onLowest="() => deleteProduct(product.basketID)"
					/>
				</div>
				<div class="price">{{ getPrice(product) | formatNumber }} ₽</div>
			</li>
		</transition-group>

		<div class="total">
			<h5>Итого:</h5>
			<span>{{ total | formatNumber }} ₽</span>
		</div>
	</div>

	<ui-button class="showForm" @click.native="openForm">Оформить заказ</ui-button>

</section>
</template>


<script>
import { mapState } from 'vuex'
import Events from '@/events'
import Count from '@/components/ui/Count'
import uiButton from '@/components/ui/Button'

export default {
	name: 'Basket',
	components: {
		Count,
		uiButton,
	},
	data() {
		return {
			request: {
				status: '',
				response: '',
			},
		}
	},
	computed: {
		...mapState({
			products: state => state.basket,
			productsAll: state => state.products,
		}),

		total() {
			let sum = 0

			this.products.map(product => sum += this.getPrice(product))

			Events.$emit('total-update', { total: sum })

			return sum
		},
	},
	methods: {
		imgUrl(product) {

			let productFull = this.productsAll.find(p => p.id === product.id)

			return product.color
				? productFull.colors[+product.color]
				: productFull.image.sidebar
		},

		deleteProduct(basketID) {
			this.$store.commit('deleteFromBasket', basketID)
		},

		getPrice({ id, count, price, size, sizes }) {

			let productFull = this.productsAll.find(p => p.id === id)

			return count * (size
				? productFull.sizes[size].price
				: productFull.price
			)
		},

		openForm() {
			Events.$emit('form-open', { total: this.total })
		},
	},
	watch: {
		products() {
			!this.products.length && Events.$emit('modal-close')
		},
	},
}
</script>


<style lang="stylus" scoped>
@import '../../../styles/variables.styl'
@import '../../../styles/modal.styl'


section
	position relative
	min-height 100%
	// overflow hidden

.inner
	position: relative


// transition-group
.product {
	transition: transform .4s, opacity .4s
}

.product-list-enter, .product-list-leave-to {
	transform: translateX(100%)
	opacity: 0
}


ul.product-list
	margin-top 40px


li.product
	position relative
	display flex
	// align-items flex-end
	justify-content flex-start
	margin-bottom 35px
	color #333
	&:last-child
		margin-bottom 45px

	button.delete
		position absolute
		top 0
		left -27px
		bottom 0
		width 32px
		height 32px
		margin auto
		background-image url('../../../assets/images/icons/delete.svg')
		background-position center
		background-size 16px auto
		background-repeat no-repeat
		@media (min-width 960px)
			left -32px

	.product-image
		flex-shrink: 0
		width: 80px
		height: 80px
		background-size: cover
		background-position: center
		border-radius: 6px

		@media (min-width 960px)
			width: 100px
			height: 100px

	.description
		display: inline-flex
		flex-direction: column
		align-items: flex-start
		justify-content: space-between
		// font-family: $font.family.fira
		margin-left: 10px
		@media (min-width 960px)
			margin-left: 15px

	.price
		margin-top: 15px
		margin-left auto
		font-size 15px
		font-weight 700
		white-space: nowrap

		@media (min-width 960px)
			font-size 16px
			letter-spacing .6px
			margin-top: 28px


h5
	// margin-bottom 20px
	font-size: 15px
	font-weight: 700
	@media (min-width 375px)
		margin-top: 15px

	@media (min-width 420px)
		font-size: 16px
		letter-spacing .5px

	@media (min-width 960px)
		margin-top: 28px


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
		margin-top: 15px
		text-align right
		font-size 24px
		color #333
		line-height 40px


button.showForm
	margin auto
	margin-top 40px

	@media (min-width 960px)
		margin-top 50px


</style>

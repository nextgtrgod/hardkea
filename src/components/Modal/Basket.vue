<script>
import { mapState } from 'vuex'
import Events from '@/events'
import Count from '@/components/Count'

import formatNumber from '@/utils/formatNumber'
import validateEmail from '@/utils/validateEmail'
import makeRequest from '@/utils/makeRequest'

export default {
	name: 'Basket',
	components: {
		Count,
	},
	data() {
		return {
			form: {
				visible: false,
				username: '',
				email: '',
				errors: [],
			}
		}
	},
	created() {
		Events.$on('modal-close', () => this.form.visible = false)
	},
	computed: {
		...mapState({
			products: state => state.basket
		}),

		total() {
			let sum = 0

			this.products.map(product => sum += this.getPrice(product))

			return sum
		}
	},
	methods: {
		imgUrl: (id, color) => {
			try {
				return color
					? require(`@/assets/products/${id}/product-${color}.jpg`)
					: require(`@/assets/products/${id}/product.jpg`)
			} catch(err) {
				console.log(err)
			}
		},
		formatNumber: n => formatNumber(n),

		deleteProduct(basketID) {
			this.$store.commit('deleteFromBasket', basketID)
		},

		getPrice: ({ count, price, size, sizes }) => count * (size ? sizes[size] : price),

		closeForm() {
			this.form.visible = false
		},

		async handleSubmit() {
			if (!this.form.visible) {
				this.form.visible = true
				return
			}
			// clear prev errors
			this.form.errors = []

			let { username, email } = this.form

			// check user data
			!username.length && this.form.errors.push('username');

			(!email.length || !validateEmail(email)) && 
			this.form.errors.push('email') &&
			(this.form.email = '')

			if (!this.form.errors.length) {
				await makeRequest({
					url: '/api/sendOrder',
					data: {
						orderID: Date.now(),
						username,
						email,
						products: JSON.stringify(this.products),
					},
				})
			}
		},
	},
	watch: {
		products() {
			!this.products.length && Events.$emit('modal-close')
		},

		'form.visible'() {
			Events.$emit(`form-${ this.form.visible ? 'open' : 'close' }`)
		},
		
		'form.username'(to, from) {
			to.length && (this.form.errors = this.form.errors.filter(error => error !== 'username'))
		},
		'form.email'(to, from) {
			to.length && (this.form.errors = this.form.errors.filter(error => error !== 'email'))
		}
	},
}
</script>


<template lang="pug">
	section.basket
		.inner
			h2 Ваша корзина

			transition-group(
				tag="ul"
				name="product-list"
				class="product-list"
			)
				li(v-for="(product, index) in products", :key="product.basketID" class="product")
					button.delete(@click="deleteProduct(product.basketID)")
					img(:src="imgUrl(product.id, product.color)")
					.description
						h5 {{ product.name }} {{ (product.size || '').toUpperCase() }}
						count(
							v-model="product.count"
							:min="0"
							:onLowest="() => deleteProduct(product.basketID)"
						)
					.price
						| {{ formatNumber(getPrice(product)) }} ₽

			.total
				h5 Итого:
				span {{ formatNumber(total) }} ₽
			
			form(:class="{ visible: form.visible }")
				button(type="button" class="back" @click="closeForm")
					img(src="../../assets/images/back.svg")

				input(
					type="text"
					v-model="form.username"
					:placeholder="form.errors.includes('username') ? 'Введите имя' : 'Имя'"
					:class="{ error: form.errors.includes('username') }"
					maxlength="64"
				)
				input(
					type="email"
					v-model="form.email" 
					:placeholder="form.errors.includes('email') ? 'Введите e-mail' : 'e-mail'"
					:class="{ error: form.errors.includes('email') }"
				)

		button.checkout(@click="handleSubmit") Оформить заказ

</template>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/modal.styl'


section
	overflow hidden

.inner
	position relative

	form
		position absolute
		top -50px
		left -50px
		bottom 0
		right 0
		display flex
		flex-direction column
		align-items center
		justify-content flex-end
		width: calc(100% + 100px)
		padding 0 50px
		background-color #FFF
		transform: translateX(100%)
		transition: transform .3s
		pointer-events: none
		box-sizing border-box

		&.visible
			transform: translateX(0)
			pointer-events: all

		button.back
			position absolute
			bottom 50vh
			left 0
			width 50px
			height 50px
			background-color #333
			img
				position relative
				left -1px
				height 30px

		input
			width 80%
			margin 20px 0
			padding 12px 15px
			color #333
			text-align left
			font-size 17px
			line-height 25px
			border 1px solid
			border-radius 8px
			transition all .2s
			box-sizing border-box

			&::placeholder
				color: alpha(#333, .5)
				transition all .2s

			&.error
				color: #F00

				&::placeholder
					color: alpha(#F00, .5)
			


ul.product-list
	margin-top 40px


// transition-group
.product {
	transition: all .4s
}

.product-list-enter, .product-list-leave-to {
	transform: translateX(100%)
	opacity: 0
}


li.product
	position relative
	display flex
	align-items flex-end
	justify-content flex-start
	margin-bottom 35px
	color #333
	&:last-child
		margin-bottom 75px

	button.delete
		position absolute
		top 0
		left -22px
		bottom 0
		width 32px
		height 32px
		margin auto
		background-image url('../../assets/images/delete.svg')
		background-position center
		background-size 16px auto
		background-repeat no-repeat
		@media (min-width 960px)
			left -32px

	img
		height 80px
		@media (min-width 960px)
			height 100px

	.description
		margin-left 5px
		@media (min-width 960px)
			margin-left 10px

	.price
		margin-left auto
		font-size 14px
		font-weight 700
		margin-bottom 53px

		@media (min-width 960px)
			font-size 16px
			letter-spacing .6px


h5
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
	line-height: 49px
	letter-spacing .4px
	border: 1px solid #333
	border-radius 8px
	transition: color .2s, background-color .2s
	box-sizing border-box

	&:hover
		background-color #333
		color: #FFF

</style>

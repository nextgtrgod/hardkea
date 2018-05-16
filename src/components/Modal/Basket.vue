<script>
import { mapState } from 'vuex'
import Events from '@/events'
import Count from '@/components/Count'
import maskedInput from 'vue-masked-input'

import formatNumber from '@/utils/formatNumber'
import validateEmail from '@/utils/validateEmail'
import makeRequest from '@/utils/makeRequest'
import createOrderID from '@/utils/createOrderID'

export default {
	name: 'Basket',
	components: {
		Count,
		maskedInput,
	},
	data() {
		return {
			form: {
				visible: false,
				username: '',
				email: '',
				phone: '',
				rawPhone: '',
				details: '',
				errors: [],
			},
			buttonOffsetTop: 0,
			request: {
				status: '',
				response: '',
			},
		}
	},
	created() {
		Events.$on('modal-close', () => this.form.visible = false)
	},
	mounted() {
		this.buttonOffsetTop = this.getButtonOffsetTop()
	},
	computed: {
		...mapState({
			products: state => state.basket
		}),

		total() {
			let sum = 0

			this.products.map(product => sum += this.getPrice(product))

			Events.$emit('total-update', { total: sum })

			return sum
		},
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


			let { username, email, phone, rawPhone, details } = this.form

			// check user data
			!username.length && this.form.errors.push('username');
			(rawPhone.length < 11) && this.form.errors.push('phone');

			(!email.length || !validateEmail(email)) && 
			this.form.errors.push('email') &&
			(this.form.email = '')


			// send request
			if (!this.form.errors.length) {

				this.request.status = 'loading'

				try {
					let res = await makeRequest({
						url: '/api/sendOrder',
						data: {	
							orderID: createOrderID({ username, email, rawPhone }),
							username,
							email,
							phone,
							rawPhone,
							details,
							products: JSON.stringify(this.products),
						}
					})

					this.request.status = 'done'
					this.request.response = res.status

				} catch (error) {
					console.log(error)
					this.request.status = 'done'
					this.request.response = 'Произошла ошибка :('
				}
			}
		},

		getButtonOffsetTop() {
			let node = this.$refs['container']
			if (!node) return 0

			let hiddenModalHeight = (window.innerHeight - 50)

			let offset = node.scrollHeight - hiddenModalHeight - window.innerHeight

			return (offset < 0)
				? 0
				: offset
		}
	},
	watch: {
		products() {
			!this.products.length && Events.$emit('modal-close')
		},

		'form.visible'(newVal) {
			Events.$emit(`form-${ newVal ? 'open' : 'close' }`)

			this.request.status = ''

			if (newVal) this.buttonOffsetTop = this.getButtonOffsetTop()
		},
		
		'form.username'(to, from) {
			to.length && (this.form.errors = this.form.errors.filter(error => error !== 'username'))
		},
		'form.email'(to, from) {
			to.length && (this.form.errors = this.form.errors.filter(error => error !== 'email'))
		},
		'form.rawPhone'(to, from) {
			(to.length === 11) && (this.form.errors = this.form.errors.filter(error => error !== 'phone'))
		}
	},
}
</script>


<template lang="pug">
	section(class="basket" ref="container")
		.send-status(:class="{ visible: request.status.length }")

			svg.spinner(v-if="request.status === 'loading'" fill='none', stroke='#333', viewbox='0 0 60 60', version='1.1', xmlns='http://www.w3.org/2000/svg')
				circle(cx='30', cy='30', r='25')

			h2(v-if="request.status === 'done'") {{ request.response }}

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
				button(
					type="button"
					class="back"
					@click="closeForm"
					:style="{ top: buttonOffsetTop + 'px' }"
				)
					img(src="../../assets/images/back.svg")

				.field
					input(
						type="text"
						v-model="form.username"
						:class="{ error: form.errors.includes('username') }"
						maxlength="64"
						required
						spellcheck="false"
					)
					span.placeholder {{ form.errors.includes('username') ? 'Введите имя' : 'Имя' }}
					span.line

				.field
					input(
						type="text"
						v-model="form.email"
						:class="{ error: form.errors.includes('email') }"
						maxlength="64"
						required
						spellcheck="false"
					)
					span.placeholder {{ form.errors.includes('email') ? 'Введите e-mail' : 'E-mail' }}
					span.line

				.field
					masked-input(
						type="phone"
						v-model="form.phone"
						@input="form.rawPhone = arguments[1]"
						mask='\+\1 111 111 1111'
						placeholder-char=" "
						:class="{ error: form.errors.includes('phone') }"
						required
						spellcheck="false"
					)
					span.placeholder {{ form.errors.includes('phone') ? 'Введите телефон' : 'Телефон' }}
					span.line

				.field
					input(
						type="text"
						v-model="form.details"
						:class="{ error: form.errors.includes('details') }"
						maxlength="120"
						required
						spellcheck="false"
					)
					span.placeholder Адрес / комментарий
					span.line

		button.checkout(@click="handleSubmit") Оформить заказ

</template>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/modal.styl'


section
	position relative
	min-height 100%
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

		@media (max-width 959px)
			padding-bottom 5vh

		&.visible
			transform: translateX(0)
			pointer-events: all

		button.back
			position absolute
			top 0
			left 30px
			width 50px
			height 50px
			background-color #333

			@media (min-width 960px)
				left 0

			img
				position relative
				left -1px
				height 30px

		.field
			position relative
			width 80%
			margin 25px 0

			input
				width 100%
				padding 8px 0
				color #333
				text-align left
				font-size 17px
				line-height 1
				border-bottom 1px solid
				transition all .2s
				box-sizing border-box

				// &::placeholder
				// 	color: alpha(#333, .5)
				// 	transition all .2s

				&.error
					color: #F00

					// &::placeholder
					&~span.line
						background-color: alpha(#F00, .5)

					&~span.placeholder
						color: alpha(#F00, .5)

				&:focus
				&:valid
					&~span.line
						width 100%

					&~span.placeholder
						transform: translateY(-125%) scale(0.75)

			span
				position absolute
				pointer-events none

				&.placeholder
					left 0
					bottom 10px
					font-size 17px
					line-height 1
					color: alpha(#333, .5)
					transition all .2s, color .3s
					transform-origin 0 0
			
				&.line
					left 0
					right 0
					bottom 0
					height 2px
					width 0
					margin auto
					background-color #333
					transition: width .3s, background-color .3s
			


ul.product-list
	margin-top 40px


// transition-group
.product {
	transition: transform .4s, opacity .4s
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
	margin-top 30px
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

	@media (min-width 960px)
		margin-top 50px

	&:hover
		background-color #333
		color: #FFF


.send-status
	position absolute
	left 0
	right 0
	bottom 0
	height calc(100vh - 50px)
	display flex
	align-items center
	justify-content center
	background-color #FFF
	transform translateY(100%)
	transition transform .3s
	overflow hidden
	z-index 9001

	&.visible
		transform translateX(0)

	&>*
		margin-top -50px


.spinner
	position relative
	width: 60px
	height: 60px
	stroke-width: 3
	stroke-dasharray: 100
	animation: spin .75s, grow 2s
	animation-iteration-count: infinite
	animation-timing-function: linear

@keyframes spin
	0%
		transform rotate(0deg)
	100%
		transform rotate(360deg)

@keyframes grow
	0%
		stroke-dashoffset 0
  	50%
		stroke-dashoffset 100
  	100%
		stroke-dashoffset 0


</style>

<template>
<section class="basket">

	<div class="send-status" :class="{ visible: request.status.length }">
		<ui-spinner v-if="request.status === 'loading'"/>

		<h2 v-if="request.status === 'done'">{{ request.response }}</h2>
	</div>

	<div class="inner">
		<h2>Ваша корзина</h2>

		<transition-group tag="ul" name="product-list" class="product-list">
			<li
				v-for="product in products"
				:key="product.basketID"
				class="product"
			>
				<button class="delete" @click="deleteProduct(product.basketID)"/>
				<img :src="imgUrl(product.id, product.color)">
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

	<form :class="{ visible: form.visible }" :style="formStyle">
		<div class="scroll">
			<button type="button" class="back" @click="closeForm">
				<img src="../../../assets/images/icons/back.svg">
			</button>

			<ui-input
				v-model="form.username"
				:error="form.errors.includes('username')"
				placeholder="Имя"
				class="field"
			/>

			<ui-input
				v-model="form.email"
				:error="form.errors.includes('email')"
				placeholder="E-mail"
				class="field"
			/>

			<ui-input
				type="phone"
				v-model="form.phone"
				:error="form.errors.includes('phone')"
				placeholder="Телефон"
				class="field"
			/>

			<ui-input
				v-model="form.address"
				:error="form.errors.includes('address')"
				placeholder="Адрес"
				class="field"
			/>

			<ui-input
				v-model="form.details"
				:error="form.errors.includes('details')"
				placeholder="Комментарий"
				class="field"
			/>

			<ui-button class="checkout" @click.native="handleSubmit">Отправить</ui-button>
		</div>
	</form>

</section>
</template>


<script>
import { mapState } from 'vuex'
import Events from '@/events'
import Count from '@/components/ui/Count'
import uiInput from '@/components/ui/Input'
import uiButton from '@/components/ui/Button'
import uiSpinner from '@/components/ui/Spinner'

import validateEmail from '@/utils/validateEmail'
import makeRequest from '@/utils/makeRequest'
import createOrderID from '@/utils/createOrderID'

import { API } from '@/config/index'

export default {
	name: 'Basket',
	components: {
		Count,
		uiInput,
		uiButton,
		uiSpinner,
	},
	data() {
		return {
			form: {
				visible: false,
				username: '',
				email: '',
				phone: '',
				address: '',
				details: '',
				errors: [],
			},
			request: {
				status: '',
				response: '',
			},
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

			Events.$emit('total-update', { total: sum })

			return sum
		},

		formStyle: () => ({ height: `${window.innerHeight}px` })
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

		deleteProduct(basketID) {
			this.$store.commit('deleteFromBasket', basketID)
		},

		getPrice: ({ count, price, size, sizes }) => count * (size ? sizes[size] : price),

		openForm() {
			this.form.visible = true
		},

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


			let { username, email, phone, address, details } = this.form

			let rawPhone = phone.replace(/ /g,'');

			// check user data
			!username.length && this.form.errors.push('username');

			(rawPhone.length < 12) && this.form.errors.push('phone');

			(!email.length || !validateEmail(email)) && 
			this.form.errors.push('email') &&
			(this.form.email = '')

			!address.length && this.form.errors.push('address');


			// send request
			if (!this.form.errors.length) {

				this.request.status = 'loading'

				console.log(createOrderID({ username, email, rawPhone }))

				try {
					let res = await makeRequest({
						url: API.sendOrder,
						data: {	
							orderID: createOrderID({ username, email, rawPhone }),
							username,
							email,
							phone: rawPhone,
							address,
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
	},
	watch: {
		products() {
			!this.products.length && Events.$emit('modal-close')
		},

		'form.visible'(newVal) {
			Events.$emit(`form-${ newVal ? 'open' : 'close' }`)

			this.request.status = ''
		},
		
		'form.username'(to, from) {
			to.length && (this.form.errors = this.form.errors.filter(error => error !== 'username'))
		},
		'form.email'(to, from) {
			to.length && (this.form.errors = this.form.errors.filter(error => error !== 'email'))
		},
		'form.phone'(to, from) {
			let rawPhone = to.replace(/ /g,'');

			(rawPhone.length === 12) && (this.form.errors = this.form.errors.filter(error => error !== 'phone'))
		},
		'form.address'(to, from) {
			to.length && (this.form.errors = this.form.errors.filter(error => error !== 'address'))
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
	overflow hidden

.inner
	position relative


form
	position absolute
	left 0
	right 0
	bottom 0
	width: 100%
	height 100vh
	padding 50px
	background-color #FFF
	transform: translateX(100%)
	transition: transform .3s
	pointer-events: none
	box-sizing border-box
	z-index 1
	overflow auto

	.scroll
		min-height 100%
		display flex
		flex-direction column
		align-items center
		justify-content center


	@media (max-width 959px)
		padding 60px 25px
		

	&.visible
		transform: translateX(0)
		pointer-events: all

	button.back
		position absolute
		top 0
		left 0
		width 50px
		height 50px
		background-color #333

		img
			position relative
			left -1px
			height 30px

	.field
		position relative
		width 100%
		margin 25px 0

		@media (min-width 960px)
			width 80%


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
		margin-bottom 45px

	button.delete
		position absolute
		top 0
		left -22px
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




button.showForm
	margin auto


button.showForm,
button.checkout
	margin-top 40px

	@media (min-width 960px)
		margin-top 50px


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

</style>

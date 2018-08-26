<template>
<form :class="{ visible }" :style="formStyle">

	<div class="send-status" :class="{ visible: request.status.length }">
		<ui-spinner v-if="request.status === 'loading'"/>

		<h2 v-if="request.status === 'done'">{{ request.response }}</h2>
	</div>

	<div class="scroll">
		<button type="button" class="back" @click="close">
			<img src="../../assets/images/icons/back.svg">
		</button>

		<ui-input
			v-model="username"
			:error="errors.includes('username')"
			placeholder="Имя"
			class="field"
		/>

		<ui-input
			v-model="email"
			:error="errors.includes('email')"
			placeholder="E-mail"
			class="field"
		/>

		<ui-input
			type="phone"
			v-model="phone"
			:error="errors.includes('phone')"
			placeholder="Телефон"
			class="field"
		/>

		<ui-input
			v-model="address"
			:error="errors.includes('address')"
			placeholder="Адрес"
			class="field"
		/>

		<ui-input
			v-model="details"
			:error="errors.includes('details')"
			placeholder="Комментарий"
			class="field"
		/>

		<ui-button class="checkout" @click.native="handleSubmit">Отправить</ui-button>
	</div>
</form>
</template>


<script>
import { mapState } from 'vuex'
import Events from '@/events'
import uiInput from '@/components/ui/Input'
import uiButton from '@/components/ui/Button'
import uiSpinner from '@/components/ui/Spinner'

import validateEmail from '@/utils/validateEmail'
import makeRequest from '@/utils/makeRequest'

import { API } from '@/config/index'

import checkDevice from '@/mixins/checkDevice'

export default {
	name: 'Form',
	mixins: [
		checkDevice,
	],
	components: {
		uiInput,
		uiButton,
		uiSpinner,
	},
	data() {
		return {
			visible: false,
			username: '',
			email: '',
			phone: '',
			address: '',
			details: '',
			errors: [],
			request: {
				status: '',
				response: '',
			},
			total: 0,
			height: window.innerHeight,
		}
	},
	created() {
		Events.$on('form-open', ({ total }) => {
			this.total = total
			this.open()
		})
		Events.$on('form-close', () => this.visible = false)
		Events.$on('modal-close', () => this.close())

		window.addEventListener('resize', () => this.height = window.innerHeight)
	},
	methods: {
		open() {
			this.visible = true
		},

		close: () => Events.$emit('form-close'),

		getPrice({ id, count, price, size, sizes }) {

			let productFull = this.productsAll.find(p => p.id === id)

			return count * (size
				? productFull.sizes[size].price
				: productFull.price
			)
		},

		async handleSubmit() {

			// clear prev errors
			this.errors = []
			
			let username = this.username
			let email = this.email
			let phone = this.phone
			let address = this.address
			let details = this.details

			let rawPhone = phone.replace(/ /g,'');

			// check user data
			!username.length && this.errors.push('username');

			(rawPhone.length < 12) && this.errors.push('phone');

			(!email.length || !validateEmail(email)) && 
			this.errors.push('email') &&
			(this.email = '')

			!address.length && this.errors.push('address');


			// send request
			if (!this.errors.length) {

				this.request.status = 'loading'

				let products = this.products.map(product => {

					let copyProduct = Object.assign({}, product)

					delete copyProduct.basketID

					copyProduct.subtotal = this.getPrice(copyProduct)

					return copyProduct
				})

				try {
					let res = await makeRequest({
						url: API.sendOrder,
						data: {
							username,
							// email: email.toLowerCase(),
							email,
							phone: rawPhone,
							address,
							details,
							products,
							total: this.total,
						}
					})

					this.request.status = 'done'
					this.request.response = res.data.status === 'success'
						? 'Ваш заказ принят'
						: 'Произошла ошибка :('

				} catch (error) {
					console.log(error)
					this.request.status = 'done'
					this.request.response = 'Произошла ошибка :('
				}
			}
		},
	},
	computed: {
		...mapState({
			products: state => state.basket,
			productsAll: state => state.products,
		}),

		formStyle() {
			return { height: this.height + 'px' }
		}
	},
	watch: {
		visible(newVal) {
			this.request.status = ''
		},

		username(to, from) {
			to.length && (this.errors = this.errors.filter(error => error !== 'username'))
		},
		email(to, from) {
			to.length && (this.errors = this.errors.filter(error => error !== 'email'))
		},
		phone(to, from) {
			let rawPhone = to.replace(/ /g,'');

			(rawPhone.length === 12) && (this.errors = this.errors.filter(error => error !== 'phone'))
		},
		address(to, from) {
			to.length && (this.errors = this.errors.filter(error => error !== 'address'))
		},
	},
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/modal.styl'


form
	position: fixed
	top 0
	right 0
	bottom 0
	width: 100%
	height: 100vh
	padding: 60px 25px
	padding-bottom: 25px
	background-color #FFF
	transform: translateX(100%)
	transition: transform .4s
	box-shadow: 0 -5px 20px alpha(#000, .1)
	pointer-events: none
	box-sizing border-box
	z-index: 9001
	overflow: auto

	@media (min-width 960px)
		padding 50px
		width: 500px

	&.visible
		transform: translateX(0px)
		pointer-events: all


	.field
		position relative
		width 100%
		margin 25px 0

		&:first-of-type
			margin-top: auto

		// &:last-of-type
		// 	margin-bottom: auto

		@media (min-width 960px)
			width 80%


.scroll
	min-height 100%
	display flex
	flex-direction column
	align-items center
	justify-content center


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


button.checkout
	margin-top: auto


.send-status
	position absolute
	left 0
	right 0
	bottom 0
	display flex
	align-items center
	justify-content center
	background-color #FFF
	transition: height .3s
	overflow hidden
	z-index 9001

	&.visible
		height: calc(100% - 50px)

	&>*
		margin-top -50px


</style>

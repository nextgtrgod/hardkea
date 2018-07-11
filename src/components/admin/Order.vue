<template>
<li
	class="order"
	@click="expand"
>
	<div class="grid">
		<span class="order-id">{{ order.orderID }}</span>
		<span class="status">{{ statuses[order.status] }}</span>
		<span class="price">{{ '999 999' }} ₽</span>
		<span>{{ order.username }}</span>
		<span>{{ order.email }}</span>
		<span class="phone">{{ order.phone }}</span>
		<span class="address">{{ order.address }}</span>
	</div>

	<div class="details" :class="{ visible: expanded }">
		<div class="inner">
			<div class="products">
				<ul class="product-list">
					<li class="head">
						<span class="name">Название</span>
						<span class="count">Количество</span>
						<span class="subtotal">Стоимость</span>
					</li>
					<li
						v-for="(product, index) in products"
						:key="index"
						class="product"
					>
						<span class="image-wrap">
							<img :src="product.image.sidebar">
						</span>
						<h4>{{ product.name }} {{ (product.size || '').toUpperCase() }}</h4>
						<span class="count">×{{ product.count }}</span>
						<span class="subtotal">{{ '999 999' }} ₽</span>
					</li>
				</ul>

				<div class="total">{{ '999 999' }} ₽</div>
			</div>

			<ui-dropdown
				v-model="order.statusName"
				:options="statusList"
				placeholder="Статус заказа"
				class="field dropdown"
			/>

			<ui-input
				v-model="order.address"
				placeholder="Адрес"
				class="field"
			/>

			<!-- <ui-button @click.native="save">Сохранить</ui-button> -->

		</div>
	</div>
</li>
</template>


<script>
import { mapState } from 'vuex'
import Events from '@/events'
import uiDropdown from '@/components/ui/Dropdown'
import uiInput from '@/components/ui/Input'
import uiButton from '@/components/ui/Button'

import statuses from '../../../api/data/orderStatus'

import { apiBase } from '@/config'

import makeRequest from '@/utils/makeRequest'

export default {
	name: 'Order',
	components: {
		uiDropdown,
		uiInput,
		uiButton,
	},
	props: {
		id: {
			type: Number,
		}
	},
	data() {
		return {
			statuses,
			expanded: false,
		}
	},
	created() {
		Events.$on('order-details-expand', ({ id }) => {
			this.id !== id && (this.expanded = false)
		})
	},
	methods: {
		expand() {
			Events.$emit('order-details-expand', { id: this.id })
			this.expanded = true
		},

		async save() {
			let data = Object.assign({}, this.order)

			status = Object.keys(this.statuses).find(key => {
				return this.statuses[key] === data.statusName
			})

			data.status = +status
			this.order.status = +status

			delete data.statusName

			let res = await makeRequest({
				method: 'POST',
				url: `${apiBase}/api/orders/${data.id}`,
				data,
			})
		},
	},
	computed: {
		...mapState({
			orders: state => state.orders,
			productsAll: state => state.products,
		}),

		order() {
			let order = this.orders.find(order => order.id === this.id)

			order.statusName = this.statuses[order.status]

			return order
		},

		products() {
			return this.order.products.map(product => {
				
				let productFull = Object.assign({}, this.productsAll.find(item => item.id === product.id))

				productFull.count = product.count
				productFull.size = product.size

				return productFull
			})
		},

		statusList() {
			return Object.values(this.statuses)
		},
	}
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/animations.styl'
@import '../../styles/order.styl'


.order
	margin-bottom: 30px
	background-color: #FFF
	box-shadow: 0 4px 40px -10px rgba(0,0,0, .05)

	.grid
		cursor: pointer


.details
	width: 100%
	height: 0
	border-top: 1px solid #EEE
	transition: height .2s
	transition-delay: .2s
	box-sizing: border-box
	pointer-events: none

	&.visible
		height: 400px
		transition-delay: 0s
		pointer-events: all

		.inner
			opacity: 1
			transition-delay: .2s
	
	.inner
		display: flex
		align-items: flex-start
		padding: 20px
		padding-top: 30px
		opacity: 0
		transition: opacity .2s 0s

	.field
		width: 220px
		margin-top: 15px
		margin-right: 40px
		margin-bottom: 0

		&.dropdown
			width: 150px


.products
	margin-right: 100px


ul.product-list
	display: flex
	flex-direction: column
	width: 400px
	height: 300px
	// border-right: 1px dashed alpha(#333, .5)

	li
		display: flex
		align-items: center
		margin-bottom: 20px

		.image-wrap
			position: relative
			width: 100px
			height: 100px
			margin-right: 10px

			img
				width: 100%

		h4
			width: 140px
			font-size: 18px
			font-family: $font.family.fira

		.name
			margin-left: 110px

		.count
			width: 40px
			margin-left: auto
		
		.subtotal
			width: 100px
			margin-left: auto
			margin-right: 10px
			text-align: right
			font-weight: 600

	li.head
		font-size: 14px
		margin-bottom: 10px

		.subtotal
			font-weight: normal


.total
	padding-top: 5px
	border-top: 1px solid
	font-size: 24px
	text-align: right


</style>
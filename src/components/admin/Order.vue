<template>
<li class="order" :class="{ expanded }">
	<div class="grid">
		<span class="order-id">{{ order.orderID }}</span>
		<span class="status">{{ statuses[order.status] }}</span>
		<span class="price">{{ total | formatNumber }} ₽</span>
		<span>{{ order.username }}</span>
		<span>
			<a :href="'mailto:' + order.email">{{ order.email }}</a>
		</span>
		<span class="phone">
			<a :href="'tel:' + order.phone">{{ order.phone | formatPhone }}</a>
		</span>
		<span class="date">
			{{ order.created_at | getDate | pad }}
			{{ order.created_at | getMonthName }}
			{{ order.created_at | getYear }}
			- 
			{{ order.created_at | getTime }}
		</span>
		<button class="toggle" @click.stop="toggle">
			<img src="../../assets/images/icons/chevron.svg">
		</button>
	</div>

	<div
		class="details"
		:class="{ visible: expanded }"
		:style="{
			height: expanded
				? height + 'px'
				: '0px'
		}"
	>
		<div class="inner" ref="inner">
			<div class="column">
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
								<template v-if="product.color">
									<img :src="product.colors[product.color]">
									<span class="color">
										<img :src="apiBase + '/images/colors/color-' + product.color + '.png'">
									</span>
								</template>

								<template v-else>
									<img :src="product.image.sidebar">
								</template>
							</span>
							<h4>
								<a :href="apiBase + '/products/' + product.id" target="_blank">
									{{ product.name }}
									<span v-if="product.size">
										{{ (product.size || '').toUpperCase() }}
									</span>
								</a>
							</h4>
							<span class="count">×{{ product.count }}</span>
							<span class="subtotal">{{ getPrice(product) | formatNumber }} ₽</span>
						</li>
					</ul>

					<h5>Итого:</h5>
					<div class="total">{{ total | formatNumber }} ₽</div>
				</div>
			</div>

			<div class="column">
				<div class="row">
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
				</div>

				<div class="row">
					<div
						v-if="order.details.length"
						class="textfield-wrap filled"
						data-label="Детали"
					>
						<ui-textfield
							v-model="order.details"
							:readonly="true"
						/>
					</div>
				</div>

				<div class="row buttons">
					<ui-button class="save" @click.native="save">Сохранить</ui-button>
					<ui-button class="delete" @click.native="openDialog">Удалить</ui-button>
				</div>
			</div>
		</div>
	</div>
</li>
</template>


<script>
import Store from '@/store'
import { mapState } from 'vuex'
import Events from '@/events'
import uiDropdown from '@/components/ui/Dropdown'
import uiInput from '@/components/ui/Input'
import uiButton from '@/components/ui/Button'
import uiTextfield from '@/components/ui/Textfield'

import statuses from '../../../api/data/orderStatus'

import { apiBase } from '@/config'

import makeRequest from '@/utils/makeRequest'

export default {
	name: 'Order',
	components: {
		uiDropdown,
		uiInput,
		uiButton,
		uiTextfield,
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
			height: 0,
			apiBase,
		}
	},
	created() {
		Events.$on('order-details-expand', ({ id }) => {
			this.id !== id && (this.expanded = false)
		})
	},
	mounted() {
		this.height = this.$refs['inner'].offsetHeight
	},
	methods: {
		toggle() {
			if (!this.expanded) {
				Events.$emit('order-details-expand', { id: this.id })
				this.expanded = true
			} else {
				this.expanded = false
			}
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

			Store.commit('setOrders', res.data)
		},

		async handleDelete() {
			let res = await makeRequest({
				method: 'DELETE',
				url: `${apiBase}/api/orders/${this.order.id}`,
			})

			Store.commit('setOrders', res.data)
		},

		openDialog() {
			Events.$emit('modal-open', {
				content: `Удалить заказ #${this.order.orderID} ?`,
				accept: this.handleDelete,
			})
		},

		getPrice(product) {

			let { id, count, price, size, sizes } = product

			return count * (size
				? product.sizes[size].price
				: product.price
			)
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
				productFull.color = product.color

				return productFull
			})
		},

		statusList() {
			return Object.values(this.statuses)
		},

		total() {
			return this.products.reduce((sum, product) => sum += this.getPrice(product), 0)
		}
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
	overflow: hidden

	&:hover
		.toggle
			opacity: 1
			pointer-events: all

	.grid		
		span
			border-right: 1px solid #EEE

			&:last-of-type
				border: none


	&.expanded
		overflow: visible

		.grid
			cursor: default

		.toggle
			transform: rotate(180deg)
			pointer-events: all
			opacity: 1


a
	border-bottom: 1px dashed


button.toggle
	position: absolute
	top: 0
	right: 0
	width: 60px
	height: 100%
	padding: 0
	cursor: pointer
	pointer-events: none
	opacity: 0
	transition: opacity .2s, transform .4s
	transform-origin: 50% 50%
	z-index: 1

	img
		position: absolute
		top: 0
		left: 0
		right: 0
		bottom: 0
		margin: auto
		width: 25%


.details
	width: 100%
	height: 0
	border-top: 1px solid #EEE
	transition: height .2s
	transition-delay: .2s
	box-sizing: border-box
	pointer-events: none

	&.visible
		// height: 395px
		transition-delay: 0s
		pointer-events: all

		.inner
			opacity: 1
			transition-delay: .2s
	
	.inner
		display: flex
		opacity: 0
		transition: opacity .2s 0s

	.field
		width: 250px
		margin-top: 15px
		margin-right: 40px
		margin-bottom: 0

		&.dropdown
			width: 150px


.column
	display: inline-flex
	flex-direction: column
	align-items: flex-start
	padding: 30px 20px

.row
	display: flex
	align-items: flex-start


.buttons
	margin-top: auto


button.delete
	margin-left: 20px

	&:hover
		background-color: #ff3d3d
		border: 1px solid #ff3d3d


.products
	height: 100%
	margin-right: 10px
	padding-right: 40px
	border-right: 1px solid #EEE


ul.product-list
	display: flex
	flex-direction: column
	width: 460px
	margin-bottom: 10px

	li
		display: flex
		align-items: center
		margin-bottom: 20px

		.image-wrap
			position: relative
			width: 100px
			height: 100px
			margin-right: 15px

			img
				width: 100%
				height: 100%
				object-fit: cover
				object-position: center
				border-radius: 6px

			.color
				position: absolute
				right: 0
				bottom: 0
				width: 25px
				height: 25px
				border-radius: 50%
				filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, .1))
				img
					width: 100%


		h4
			width: 180px
			font-size: 16px
			font-family: $font.family.fira

		.name
			width: 120px
			margin-left: 110px

		.count
			width: 40px
			margin-left: auto
			font-weight: 600
			text-align: right
		
		.subtotal
			width: 100px
			margin-left: auto
			margin-right: 10px
			text-align: right
			font-weight: 600

	li.head
		font-size: 14px
		margin-bottom: 10px

		&>*
			font-weight: normal


h4
	span
		margin: 0 2px
		font-size: 1.2em

	// a
	// 	border-bottom: 1px solid transparent
	// 	transition: border .2s

	// 	&:hover
	// 		border-bottom: 1px solid #333


h5
	font-size: 16px
	margin-bottom: 5px


.total
	padding-top: 8px
	border-top: 1px solid
	font-size: 24px
	text-align: right


.textfield-wrap
	width: 440px
	margin: 50px 0
	position: relative
	font-size: 0

	&.filled
		&:before
			transform: translateY(-125%) scale(0.75)

		&:after
			width 100%

	&:before
		content: attr(data-label)
		position absolute
		left 0
		top: 7px
		font-size 17px
		line-height 1
		color: alpha(#333, .5)
		transition all .2s, color .3s
		transform-origin 0 0
		pointer-events none

	&:after
		content: ''
		position absolute
		left 0
		right 0
		bottom 0
		height 2px
		width 0
		margin auto
		background-color #333
		transition: width .3s, background-color .3s


</style>
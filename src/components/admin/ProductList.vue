<template>
<div id="product-list">
	<h2>Товары</h2>
	<router-link
		:to="{ name: 'EditProduct', params: { id: 'new' } }"
		class="new-product"
	>
		<img src="../../assets/images/icons/plus.svg">
		<span>Добавить товар</span>
	</router-link>

	<div class="filter">
		<ui-dropdown
			v-model="selected.categoryName"
			:options="categoryList"
			placeholder="Показать"
			class="dropdown"
		/>

		<template v-if="!selected.categoryId">
			<button
				@click="toggleSort"
				class="sort"
				:class="{ active: sort }"
			>
				<img src="../../assets/images/icons/swap.svg">
				Менять местами
			</button>

			<ui-button
				@click.native="handleSubmit"
				class="save"
				:class="{ visible: showSave }"
				:disabled="loading"
			>
				Сохранить
			</ui-button>
		</template>
	</div>

	<ul class="products" ref="products">
		<li
			v-for="product in filteredProducts"
			:key="product.id"
			:data-id="product.id"
			class="product"
			:class="{ inverted: checkInverted(product), sort }"
			ref="product"
		>
			<img :src="product.image.mobile">
			<router-link :to="{ name: 'EditProduct', params: { id: product.id } }">
				<h3>{{ product.name }}</h3>
				<p>{{ product.description }}</p>
			</router-link>
		</li>
	</ul>
</div>
</template>


<script>
import { mapState } from 'vuex'
import Events from '@/events'
import uiDropdown from '@/components/ui/Dropdown'
import uiButton from '@/components/ui/Button'

import makeRequest from '@/utils/makeRequest'
import { API } from '@/config/index'

import { Sortable } from '@shopify/draggable'

export default {
	name: 'ProductList',
	components: {
		uiDropdown,
		uiButton,
	},
	data() {
		return {
			loading: false,
			selected: {
				categoryName: 'Все',
				categoryId: 0,
			},
			showSave: false,
			sort: false,
		}
	},
	created() {
		Events.$on('api-loading', () => this.loading = true)
		Events.$on('api-loaded', () => this.loading = false)
	},
	mounted() {

		// lib/draggable.bundle.js
		// mirror.style.boxShadow = '0 25px 60px 0 rgba(0,0,0, .2)'
		// mirror.style.filter = 'saturate(120%) contrast(120%)'

		// mirror.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.05)`;

		
		const sortable = new Sortable(this.$refs['products'], {
			draggable: '.product',
			mirror: {
				appentTo: this.$refs['products'],
				constrainDimensions: true,
			},
		})

		sortable.on('sortable:start', e => {
			if (this.selected.categoryId) return e.cancel()

			if (!this.sort) return e.cancel()

			document.documentElement.style.cursor = 'move'
		})

		sortable.on('sortable:stop', e => {
			document.documentElement.style.cursor = 'default'

			if (e.oldIndex !== e.newIndex) this.showSave = true
		})

	},
	methods: {
		checkInverted(product) {

			if (!product.inverted) return false
 
			return this.device === 'desktop'
				? product.inverted.desktop.main
				: product.inverted.mobile.main

		},

		toggleSort() {
			this.sort = !this.sort
		},

		async handleSubmit() {

			// temp
			console.log(this.products)
			return

			let res = await makeRequest({
				method: 'POST',
				url: API.products,
				data: this.products,
			})

			this.showSave = false

			Store.commit('setProducts', res.data)
		},
	},
	computed: {
		...mapState({
			products: state => state.products,
			categories: state => state.categories,
		}),
		categoryList() {
			let list = Object.values(this.categories)

			list.push('Все')

			return list
		},
		filteredProducts() {
			return this.selected.categoryName === 'Все'
				? this.products
				: this.products.filter(product => product.category === +this.selected.categoryId)
		},
	},
	watch: {
		'selected.categoryName'() {
			this.selected.categoryId = this.categoryName === 'Все'
				? 0
				: Object.keys(this.categories).find(key => this.categories[key] === this.selected.categoryName)

			if (this.selected.categoryId) this.sort = false
		},
	},
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/animations.styl'


#product-list
	opacity 0
	animation fade-in .4s forwards


h2
	font-size: 30px
	margin-bottom: 25px


a.new-product
	display: inline-flex
	align-items: center
	height: 50px
	margin-top: 0
	margin-bottom: 30px
	font-family: $font.family.fira

	&:hover
		// img
		// 	transform: rotate(1turn)

		span
			border-bottom: 1px dashed

	img
		width: 35px
		margin-right: 10px
		transition: all .4s ease-in-out

	span
		border-bottom: 1px dashed transparent
		transition: all .2s


.filter
	display: flex
	align-items: flex-start
	margin: 20px 0
	margin-bottom: 40px

	&>*
		margin-right: 40px

		&:last-child
			margin-right: 0

	.dropdown
		max-width: 150px

	button.sort
		display: inline-flex
		align-items: center
		font-size: 14px
		white-space: nowrap
		opacity: .5
		transition: opacity .2s

		&:hover
		&.active
			opacity: 1

		img
			height: 30px
			margin-right: 10px

	button.save
		width: 135px
		min-width: auto
		line-height: 35px
		font-size: 14px
		opacity: 0
		pointer-events: none

		&.visible
			opacity: 1
			pointer-events: all


ul.products
	display: flex
	flex-wrap: wrap
	align-items: center
	margin-left: -30px
	outline: none

	&.draggable-container--is-dragging
		cursor: move



li.product
	flex: 0 0 300px
	position: relative
	width: 300px
	height: 400px
	margin-left: 30px
	margin-bottom: 30px
	padding: 20px
	padding-top: 40px
	background-color: #FFF
	box-shadow: 0 25px 60px -10px alpha(#000, .1)
	border-radius: 10px
	transition: filter .4s
	box-sizing: border-box
	overflow: hidden
	// -webkit-mask-image: -webkit-radial-gradient(white, black)
	outline: none

	&:after
		content: ''
		position: absolute
		top: 0
		left: 0
		right: 0
		bottom: 0
		border-radius: 10px
		background: repeating-linear-gradient(
			-45deg,
			#EEE,
			#EEE 10px,
			#AAA 10px,
			#AAA 20px
		)
		opacity: 0
		transition: opacity .4s
		pointer-events: none

	&.sort
		cursor: move
		a
			pointer-events: none

	&.draggable-mirror
		z-index: 1

	&.draggable-source--is-dragging
		cursor: move

		&:after
			opacity: 1

		a
			pointer-events: none



	&:hover
		filter: saturate(120%) contrast(120%)

		// img
		// 	transform: scale(1.15)

	&.inverted
		color: #FFF
		background-color: #333

	a
		position: relative
		display: block
		height: 100%

	img
		display: none
		position: absolute
		top: 0
		left: 0
		right: 0
		bottom: 0
		width: 100%
		height: 100%
		transition: transform 25s cubic-bezier(0.215, 0.61, 0.355, 1)

		&[src*='jpg']
		&[src*='png']
			display: block


h3
	margin-bottom: 12px
	font-size: 35px
	line-height: 1
	letter-spacing: 1px
	user-select: none

p
	max-width: 280px
	font-size: 14px
	line-height: 1.25
	letter-spacing: 0.35px
	margin-bottom: 18px
	user-select: none
	

</style>
<template>
<aside>
	<template v-if="device === 'desktop'">
		<template v-if="$route.path === '/'">
			<div class="logo">
				<img src="../../assets/images/logo.svg">
			</div>
		</template>

		<template v-else>
			<router-link class="logo" to="/">
				<img src="../../assets/images/home.svg">
			</router-link> 
		</template>
	</template>

	<template v-else>
		<template v-if="$route.path === '/'">
			<div class="logo">
				<img src="../../assets/images/logo-alt.png">
			</div>
		</template>

		<template v-else>
			<router-link class="logo mobile-back" to="/">
				<img src="../../assets/images/icons/back-invert.svg">
				Назад
			</router-link> 
		</template>
	</template>
		
	<ul>
		<li data-label="Доставка">
			<button @click="openMenu('delivery')">
				<img src="../../assets/images/icons/delivery.svg">
			</button>
		</li>

		<li data-label="Оплата">
			<button @click="openMenu('payment')">
				<img src="../../assets/images/icons/payment.svg">
			</button>
		</li>

		<li
			class="basket"
			:class="{ enabled: basketCount > 0 }"
			:data-count="basketCount"
			:data-total="formatNumber(total) + ' ₽'"
		>
			<button @click="openMenu('basket')">
				<img src="../../assets/images/icons/basket.svg">
			</button>
		</li>

		<li data-label="О компании">
			<button @click="openMenu('about')">
				<img src="../../assets/images/icons/about.svg">
			</button>
		</li>

		<!-- <li data-label="Чат">
			<button @click="openMenu('messenger')">
				<img src="../../assets/images/icons/messenger.svg">
			</button>
		</li> -->
	</ul>
</aside>
</template>


<script>
import { mapState } from 'vuex'
import Events from '@/events'
import checkDevice from '@/mixins/checkDevice'

import formatNumber from '@/utils/formatNumber'

export default {
	name: 'Aside',
	mixins: [
		checkDevice,
	],
	data() {
		return {
			total: 0
		}
	},
	created() {
		Events.$on('total-update', ({ total }) => this.total = total)
	},
	methods: {
		openMenu: name => Events.$emit('modal-open', { name }),

		formatNumber: n => formatNumber(n),
	},
	computed: {
		...mapState({
			basketCount: state => state.basket.length
		}),
	}
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'

aside
	position relative
	display flex
	align-items center
	background-color #FFF
	box-shadow: 0 7px 40px alpha(#111, .1)
	box-sizing border-box
	z-index 1

	@media (min-width 960px)
		position fixed
		top 0
		right 0
		bottom 0
		width 50px
		flex-direction column
		background-color: #FFF
		box-shadow: -7px 0 40px alpha(#111, .1)

.logo
	width 85px
	height 25px
	padding-left: 5px
	margin-right: auto
	img
		width auto
		height 100%

	@media (min-width 375px)
		height: 30px
		padding-left: 20px

	@media (min-width 960px)
		width 40px
		height 40px
		margin 5px
		margin-bottom 40px
		padding: 0

		img
			width 100%
			height auto

.mobile-back
	display: inline-flex
	align-items: center
	font-size: 16px
	font-weight: 500
	img
		height: 25px
		margin-right: 10px


ul
	position relative
	display flex
	align-items center
	justify-content center
	margin-left auto
	width 100%
	height 50px
	z-index 1

	@media (min-width 960px)
		height 100%
		margin 0
		flex-direction column
		justify-content flex-start

li
	position relative
	display inline-flex
	align-items center
	justify-content center
	height 100%
	font-family: $font.family.default
	background-color #FFF
	transition all .2s

	&:before
		position absolute
		top 0
		bottom 0
		right 50px
		width 100px
		height 50px
		margin auto
		padding 0 15px
		font-family: $font.family.default
		font-size 16px
		letter-spacing .5px
		line-height 50px
		background-color: #FFF
		transform: translateX(100%)
		transition: transform .2s
		z-index -1

	&:hover
		background-color #EEE
		&:before
			transform: translateX(0)

	&:first-child
		margin-left: auto

	&:last-child
		// margin-left auto
		@media (min-width: 960px)
			margin-right: auto // temp

	@media (min-width 960px)
		margin 0
		width 100%
		height 50px
		flex 0 0 auto
		margin-bottom 5px

		&:before
			content: attr(data-label)

		// &:last-child
		// 	margin-left 0
		// 	margin-top: auto


li
	button
		width: 100%
		height: 100%
		padding: 0 15px

		@media (min-width 960px)
			padding 12px 10px

	img
		display block
		margin auto
		width 100%
		max-width 30px
		pointer-events none


li.basket
	opacity .25
	pointer-events none
	cursor default
	@media (min-width 960px)
		&:before
			content: attr(data-total)
			display none

	&.enabled
		opacity 1
		pointer-events all
		cursor pointer
		&:before
			display block

		&:after
			content: attr(data-count)
			position absolute
			top 5px
			right 2px
			width 22px
			height 22px
			text-align center
			font-size: 11px
			line-height 23px
			background-color #333
			border-radius 50%
			color #FFF
			pointer-events none

</style>

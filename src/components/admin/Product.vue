<template>
<div id="product" v-if="current.id">
	<div class="edit">
		<h2>
			{{
				current.name.length
					? current.name
					: current.id === 'new'
						? 'Новый товар'
						: 'Какой-то товар'
			}}
		</h2>

		<form>
			<ui-input
				v-model="current.name"
				placeholder="Название"
				class="field"
			/>
			<ui-input
				v-model="current.description"
				placeholder="Описание"
				class="field"
			/>
			<div class="dimensions">
				<ui-input
					v-model="current.dimensions.width"
					placeholder="Ширина"
					class="field"
				/>
				<ui-input
					v-model="current.dimensions.height"
					placeholder="Высота"
					class="field"
				/>
				<ui-input
					v-model="current.dimensions.depth"
					placeholder="Глубина"
					class="field"
				/>
				<ui-input
					v-model="current.weight"
					placeholder="Вес"
					class="field"
				/>
			</div>
			<ui-input
				v-model="current.material"
				placeholder="Материал"
				class="field"
			/>
			<ui-input
				v-model="current.article"
				placeholder="Подробно"
				class="field"
			/>
		</form>
	</div>

	<div class="preview">
		<ul class="tabs">
			<li @click="toggleView('desktop')" :class="{ active: view === 'desktop' }">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 548.2 475.1">
					<path d="M534.8 13.4C525.8 4.5 515.1 0 502.5 0H45.7C33.1 0 22.4 4.5 13.4 13.4 4.5 22.4 0 33.1 0 45.7v310.6c0 12.6 4.5 23.3 13.4 32.3 9 8.9 19.7 13.4 32.3 13.4H201c0 7.2-1.5 14.7-4.6 22.3-3 7.6-6.1 14.3-9.1 20-3 5.7-4.6 9.9-4.6 12.6 0 4.9 1.8 9.2 5.4 12.8 3.6 3.6 7.9 5.4 12.8 5.4h146.2c4.9 0 9.2-1.8 12.8-5.4 3.6-3.6 5.4-7.9 5.4-12.8 0-2.5-1.5-6.6-4.6-12.4-3-5.8-6.1-12.6-9.1-20.3-3-7.7-4.6-15.1-4.6-22.1h155.3c12.6 0 23.3-4.5 32.3-13.4 8.9-8.9 13.4-19.7 13.4-32.3V45.7c.2-12.6-4.3-23.3-13.2-32.3zm-23.2 269.8c0 2.5-.9 4.6-2.7 6.4-1.8 1.8-4 2.7-6.4 2.7H45.7c-2.5 0-4.6-.9-6.4-2.7-1.8-1.8-2.7-3.9-2.7-6.4V45.7c0-2.5.9-4.6 2.7-6.4 1.8-1.8 4-2.7 6.4-2.7h456.8c2.5 0 4.6.9 6.4 2.7 1.8 1.8 2.7 3.9 2.7 6.4v237.5z"/>
				</svg>
			</li>
			<li @click="toggleView('mobile')" :class="{ active: view === 'mobile' }">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.3 35">
					<path d="M18 0H2.4C1.1 0 0 1.1 0 2.4v30.3C0 33.9 1.1 35 2.4 35H18c1.3 0 2.4-1.1 2.4-2.4V2.4C20.3 1.1 19.3 0 18 0zM7.7 1.7h5c.2 0 .3.1.3.3 0 .2-.1.3-.3.3h-5c-.2 0-.3-.2-.3-.3 0-.2.1-.3.3-.3zm2.5 32.1c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2 1.2.5 1.2 1.2-.6 1.2-1.2 1.2zm8.5-3.2h-17V3.7h17v26.9z"/>
				</svg>
			</li>
			<li @click="toggleView('article')" :class="{ active: view === 'article' }">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 783.8 957.6">
					<path d="M731 108.4h-28v687.9c0 45.7-37.2 82.9-82.9 82.9H110.8v25.5c0 29.2 23.7 52.9 52.9 52.9h567.2c29.2 0 52.9-23.7 52.9-52.9V161.3c0-29.2-23.6-52.9-52.8-52.9z"/>
					<path d="M336.4 849.2H620c29.2 0 52.9-23.7 52.9-52.9V52.9C672.9 23.7 649.2 0 620 0H242.1v17.5c.2 1.8.3 3.7.3 5.6V168c0 41.1-33.4 74.5-74.5 74.5H23c-1.5 0-3.1-.1-4.6-.2H0v554c0 29.2 23.7 52.9 52.9 52.9h283.5zm10.7-179.8H162.2c-13.8 0-25-11.2-25-25s11.2-25 25-25h185c13.8 0 25 11.2 25 25s-11.3 25-25.1 25zm185-127.6H162.2c-13.8 0-25-11.2-25-25s11.2-25 25-25h369.9c13.8 0 25 11.2 25 25s-11.2 25-25 25zM162.2 356.3h369.9c13.8 0 25 11.2 25 25s-11.2 25-25 25H162.2c-13.8 0-25-11.2-25-25s11.2-25 25-25z"/>
					<path d="M23 212.5h145.3c24.2-.2 43.8-19.8 44-44V23.1c0-13.4-11-22.3-22.4-22.3-5.5 0-11 2-15.6 6.6L7.2 174.5c-14 14-4.1 38 15.8 38z"/>
				</svg>
			</li>
		</ul>
		<ul class="views" :class="{ 'stop-interaction': !interaction }">
			<li
				class="desktop"
				:class="{
					active: view === 'desktop',
					inverted: current.inverted.desktop.main
				}"
			>
				<img :src="current.image.desktop">
				<span class="text">
					<h3>{{ current.name }}</h3>
					<p v-html="current.description"/> 
					<button v-if="current.price">{{ current.price | formatNumber }} ₽</button>
				</span>
				<span class="text-color">
					<button
						class="black"
						:class="{ active: !current.inverted.desktop.main }"
						@click="() => current.inverted.desktop.main = false"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.2 35">
							<path fill="#FFF" d="M37 0s-.1 0 0 0c-.4.1-.6.3-.7.5L15.8 32.2l-14-12.7c-.2-.3-.7-.4-1-.3-.4.1-.7.4-.8.8-.1.4.1.8.5 1l14.9 13.5c.2.2.5.3.8.2.3 0 .5-.2.7-.5L38 1.6c.2-.3.2-.8 0-1.1s-.6-.5-1-.5z"/>
						</svg>
					</button>
					<button
						class="white"
						:class="{ active: current.inverted.desktop.main }"
						@click="() => current.inverted.desktop.main = true"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.2 35">
							<path fill="#333" d="M37 0s-.1 0 0 0c-.4.1-.6.3-.7.5L15.8 32.2l-14-12.7c-.2-.3-.7-.4-1-.3-.4.1-.7.4-.8.8-.1.4.1.8.5 1l14.9 13.5c.2.2.5.3.8.2.3 0 .5-.2.7-.5L38 1.6c.2-.3.2-.8 0-1.1s-.6-.5-1-.5z"/>
						</svg>
					</button>
				</span>
			</li>

			<li
				class="mobile"
				:class="{
					active: view === 'mobile',
					inverted: current.inverted.mobile.main
				}"
			>
				<img :src="current.image.mobile">
				<span class="text">
					<h3>{{ current.name }}</h3>
					<p v-html="current.description"/>
					<button v-if="current.price">{{ current.price | formatNumber }} ₽</button>
				</span>

				<span class="text-color">
					<button
						class="black"
						:class="{ active: !current.inverted.mobile.main }"
						@click="() => current.inverted.mobile.main = false"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.2 35">
							<path fill="#FFF" d="M37 0s-.1 0 0 0c-.4.1-.6.3-.7.5L15.8 32.2l-14-12.7c-.2-.3-.7-.4-1-.3-.4.1-.7.4-.8.8-.1.4.1.8.5 1l14.9 13.5c.2.2.5.3.8.2.3 0 .5-.2.7-.5L38 1.6c.2-.3.2-.8 0-1.1s-.6-.5-1-.5z"/>
						</svg>
					</button>
					<button
						class="white"
						:class="{ active: current.inverted.mobile.main }"
						@click="() => current.inverted.mobile.main = true"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.2 35">
							<path fill="#333" d="M37 0s-.1 0 0 0c-.4.1-.6.3-.7.5L15.8 32.2l-14-12.7c-.2-.3-.7-.4-1-.3-.4.1-.7.4-.8.8-.1.4.1.8.5 1l14.9 13.5c.2.2.5.3.8.2.3 0 .5-.2.7-.5L38 1.6c.2-.3.2-.8 0-1.1s-.6-.5-1-.5z"/>
						</svg>
					</button>
				</span>
			</li>

			<li class="article" :class="{ active: view === 'article' }">

			</li>
		</ul>
	</div>
</div>
</template>


<script>
import { mapState } from 'vuex'
import Events from '@/events'
import uiInput from '@/components/ui/Input'

export default {
	name: 'Product',
	components: {
		uiInput,
	},
	data() {
		return {
			current: {
				name: '',
				dimensions: {
					height: 0,
					width: 0,
					depth: 0,
				},
				material: '',
				weight: 0,
				description: '',
				article: '',
				image: {
					desktop: '',
					mobile: '',
					gallery: ['', '', '', '', ''],
				},
				colors: [1, 2, 3, 4],
				price: 0,
				sizes: {
					s: 2500,
					m: 5500,
					l: 11700,
					xl: 20500,
				},
				inverted: {
					mobile: {
						main: false,
						inner: false,
					},
					desktop: {
						main: false,
						inner: false,
					},
				},
			},
			view: 'desktop',
			interaction: true,
		}
	},
	created() {
		if (this.$route.params.id !== 'new') {

			this.current = this.products.find(product => +product.id === +this.$route.params.id)

			if (!this.current) this.$router.replace({ name: 'NotFound' })

		} else {
			this.current.id = 'new'
		}
	},
	methods: {
		toggleView(name) {
			this.view = name
		},
		dropEdit() {

		},
	},
	computed: {
		...mapState({
			products: state => state.products
		}),
		// product() {
		// 	return this.products.find(product => product.id === this.$route.params.id)
		// },
	}
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/animations.styl'

#product
	display: flex
	flex-wrap: wrap
	align-items: flex-start
	justify-content: space-between
	opacity: 0
	animation: fade-in .4s forwards

	&>*
		flex: 0 0 auto


.edit
	width: 280px
	margin-right: 30px


h2
	font-size: 30px
	margin-bottom: 30px


form
	.field
		margin: 40px 0


.dimensions
	display: flex
	flex-wrap: wrap
	align-items: center
	justify-content: space-between

	.field
		width: 30%
		margin: 20px 0


.preview
	width: 720px
	margin-left: 10px


ul.tabs
	display: flex
	align-items: center
	margin-bottom: 12px

	li
		display: inline-flex
		align-items: center
		justify-content: center
		width: 35px
		height: 30px
		margin-right: 20px
		opacity: .5
		cursor: pointer
		transition: opacity .2s

		&:hover
		&.active
			opacity: 1

		svg
			height: 100%


ul.views
	position: relative

	&.stop-interaction
		h3, p, button
			pointer-events: none
			user-select: none

	li
		position: absolute
		top: 0
		left: 0
		right: 0
		min-height: 360px
		border-radius: 4px
		box-shadow: 0 25px 60px -10px alpha(#000, .2)
		opacity: 0
		transition: opacity .2s, color .2s
		pointer-events: none
		overflow: hidden

		&.active
			// position: relative
			pointer-events: all
			opacity: 1
	
	li.desktop
		color: #333

		&.inverted
			color: #FFF

			.text
				button
					color: #FFF
					border: 1px solid alpha(#FFF, 75%)

					&:hover
						background-color: #FFF
						color: #333
						border: 1px solid alpha(#FFF, 75%)

		&:hover
			img
				transform: scale(1.15)
				opacity: .9

		img
			width: 100%
			transition: opacity 1.5s cubic-bezier(0.19, 1, 0.22, 1), transform 25s cubic-bezier(0.215, 0.61, 0.355, 1)

		.text
			position: absolute
			top: 50%
			left: 30px
			transform: translateY(-50%)

			h3
				margin-top: -24px
				margin-bottom: 9px
				font-size: 23px
				letter-spacing: .5px
			
			p
				font-size: 12px
				line-height: 1.2
				max-width: 170px
				margin-bottom 14px

			button
				width: 72px
				color: #333
				font-size: 10px
				letter-spacing: 0.2px
				line-height: 19px
				border: 1px solid alpha(#333, 75%)
				border-radius: 4px
				transition: all .2s
				box-sizing: border-box

				&:hover
					background-color: #333
					color: #FFF

	
	li.mobile
		width: 320px
		height: 425px
		padding: 20px
		padding-top: 40px
		color: #333
		box-sizing: border-box

		&.inverted
			color: #FFF

			.text
				button
					color: #FFF
					border: 1px solid #FFF

					&:hover
						background-color: #FFF
						color: #333

		img
			position: absolute
			top: 0
			left: 0
			right: 0
			bottom: 0
			width: 320px

		.text
			position: relative
			display: block

			h3
				margin-bottom: 10px
				font-size: 35px
				letter-spacing: 1px

			p
				max-width: 215px
				margin-bottom: 18px
				font-size: 14px
				line-height: 1.25
				letter-spacing: 0.35px

			button
				width: 100px
				font-size: 15px
				line-height: 2
				color: #333
				border: 1px solid #333
				border-radius: 6px
				transition: all .2s
				box-sizing: border-box

				&:hover
					background-color: #333
					color: #FFF


.text-color
	position: absolute
	left: 10px
	bottom: 10px
	display: flex
	align-items: center

	button
		display: inline-flex
		align-items: center
		justify-content: center
		width: 35px
		height: 35px
		border-radius: 50%
		margin-right: 10px
		box-shadow: 0 2px 6px alpha(#000, .1)

		&.white
			background-color: #FFF
		
		&.black
			background-color: #333

		&:hover
			svg
				opacity: .75

		&.active
			svg
				opacity: 1

		svg
			width: 45%
			opacity: 0
			transition: opacity .2s

</style>
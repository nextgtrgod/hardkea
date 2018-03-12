<script>
	import HeaderView from '@/components/Header'
	import Slider from '@/components/Slider'

	export default {
		name: 'MainPage',
		components: {
			HeaderView,
			Slider,
		},
		data() {
			return {
				device: 'desktop',
				reqAnimFrameID: null,
				sliders: [
					{
						section: 'столов',
						slides: [
							{
								title: 'Orgoramus',
								description: 'Ахуенный столи что бы колоть орехи на вечеринках и соло',
								price: 5760,
								image: 0,
								color: 'dark',
							},
						]
					},
					{
						section: 'кашпо',
						slides: [
							{
								title: 'Uglovatina',
								description: 'Описание кашпо в трех размерах и в трех оттенках бетона',
								price: 5760,
								image: 1
							},
						]
					},
					{
						section: 'светильников',
						slides: [
							{
								title: 'Svetosila',
								description: 'Ахуенный столи что бы колоть орехи на вечеринках и соло',
								price: 5760,
								image: 2,
							},
						]
					},
				],
				sections: [
					{
						title: 'Konusoobra',
						description: 'Ахуенный столи что бы колоть орехи на вечеринках и соло',
						price: 5760,
						link: 'lamps',
						image: ''
					},
					{
						title: 'Wandick',
						description: 'Ахуенный столи что бы колоть орехи на вечеринках и соло',
						price: 17760,
						link: 'tables',
					},
					{
						title: 'Oldus',
						description: 'Ахуенный столи что бы колоть орехи на вечеринках и соло',
						price: 17760,
						link: 'tables',
					}
				]
			}
		},
		created() {
			this.reqAnimFrameID = this.handleScroll()
		},
		beforeDestroy: function() {
			cancelAnimationFrame(this.reqAnimFrameID)
		},
		methods: {
			handleScroll: function() {
				this.device = (window.innerWidth >= 960) ? 'desktop' : 'mobile'

				return requestAnimationFrame(this.handleScroll)
			},
		}
	}
</script>


<template lang="pug">
	.main-page
		header-view

		//- multiple sliders on mobile
		template(v-if="device === 'mobile'")
			slider(
				v-for="(slider, index) in sliders"
				:key="index"
				:slides="slider.slides"
				:section="slider.section"
			)
		
		template(v-if="device === 'desktop'")
			section
				img(src="../assets/images/konusoobra.jpg" alt="konusoobra")
				.text
					h3
						| Konusoobra
					p
						| Ахуенный столи что бы колоть орехи на вечеринках и соло
					button
						| 5 760 ₽
					a(href="/lamps")
						| Посмотреть все светильники

			section.inverted
				img(src="../assets/images/wandick.jpg" alt="konusoobra")
				.text
					h3
						| Wandick
					p
						| Ахуенный столи что бы колоть орехи на вечеринках и соло
					button
						| 17 760 ₽
					a(href="/tables")
						| Посмотреть все столы

			section
				img(src="../assets/images/oldus.jpg" alt="konusoobra")
				.text
					h3
						| Oldus
					p
						| Ахуенный столи что бы колоть орехи на вечеринках и соло
					button
						| 17 760 ₽
					a(href="/tables")
						| Посмотреть все столы
			

</template>


<style lang="stylus" scoped>

	@import '../styles/variables.styl'

	section
		position relative
		padding-top: 56.89%
		font-size 22px
		color #333
		overflow hidden
		box-sizing border-box

		@media (min-width 960px)
			font-size 16px

		@media (min-width 1200px)
			font-size 18px

		@media (min-width 1400px)
			font-size 20px

		@media (min-width 1600px)
			font-size 22px

		&.inverted
			color: #FFF
			button
				color: #FFF
				border 1px solid #FFF
				&:hover
				&:focus
					background-color: #FFF
					color: #333

			a
				&:hover
					color: #FFF

		&:hover
			img
				transform: scale(1.15)
				opacity: .9


		img
			position absolute
			top 0
			right 0
			bottom 0
			height auto
			width 100%
			transition: opacity .5s cubic-bezier(.19,1,.22,1), transform 25s cubic-bezier(.215,.61,.355,1)
			will-change: transform, opacity
			user-select: none
			pointer-events: none
		
		.text
			position absolute
			top 0
			left 0
			bottom 0
			padding 6.4em 4.45em

		h3
			font-size 3.45em
			font-family: $font.family.fira
			line-height 1
			margin 0
			margin-bottom 0.45em
		
		p
			font-size 1em
			margin-top 0
			margin-bottom 1.68em
			max-width 16.9em

		button
			width: 7.72em
			height 2.27em
			font-size 1em
			border 1px solid #333
			border-radius 0.5em
			transition background .2s, color .2s
			&:hover
			&:focus
				background-color: #333
				color #FFF
				outline none

		a
			position absolute
			left 4.45em
			bottom 6.4em
			font-size: 1em
			letter-spacing: 0.4px
			margin-top auto
			border-bottom 1px solid
			transition: color .2s
			&:hover
				color: #000



</style>

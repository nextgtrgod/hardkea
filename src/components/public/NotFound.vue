<template>
<div id="not-found">
	<div class="bg" ref="bg" data-speed="-2"/>
	<div class="inner" ref="inner">
		<h1 ref="heading" data-speed="-2">404</h1>
		<h3 ref="text" data-speed="-1">Страница не найдена</h3>
	</div>
</div>
</template>


<script>
import Events from '@/events'
import checkDevice from '@/mixins/checkDevice'
import Parallax from '@/utils/parallax'

export default {
	name: 'NotFound',
	mixins: [
		checkDevice,
	],
	mounted() {
		if (this.device === 'desktop') {
			this.animation = new Parallax()

			this.$refs['heading']._animationMode = 'textShadow'
			this.animation.add(this.$refs['heading'])

			this.$refs['text']._animationMode = 'textShadow'
			this.animation.add(this.$refs['text'])

			this.$refs['bg']._animationMode = 'transform'
			this.animation.add(this.$refs['bg'])

			this.$refs['inner']._animationMode = 'transform'
			this.animation.add(this.$refs['inner'])
			

			this.animation.start()
		}
	},
	beforeDestroy() {
		if (this.animation) this.animation.stop()
	},
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/animations.styl'

#not-found
	display: flex
	flex-direction: column
	align-items: center
	justify-content: center
	height: 100vh
	opacity: 0
	animation: fade-in .4s forwards
	transform-style: preserve-3d
	perspective: 500px
	overflow: hidden

.bg
	position: absolute
	top: -10%
	left: -10%
	right: -10%
	bottom: -10%
	width: 120%
	height: 120%
	background-image: url('../../assets/images/404.jpg')

.inner
	position: relative
	max-width: 320px
	text-align: center
	pointer-events: none
	transform-style: preserve-3d
	perspective: 500px

h1
	font-size: 120px
	text-shadow: 10px -5px 5px alpha($color.dark, .2)

h3
	text-shadow: 10px -3px 5px alpha($color.dark, .25)


</style>

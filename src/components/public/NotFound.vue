<template>
<div id="not-found">
	<div class="inner">
		<h1>404</h1>
		<h3>Страница не найдена</h3>
	</div>
</div>
</template>


<script>
export default {
	name: 'NotFound',
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
	background-image: url('../../assets/images/404.jpg')

.inner
	max-width: 320px
	text-align: center

h1
	font-size: 120px
	text-shadow: 10px -5px 5px alpha($color.dark, .2)

h3
	text-shadow: 10px -3px 5px alpha($color.dark, .25)


</style>

<template>
<svg
	class="spinner" 
	xmlns="http://www.w3.org/2000/svg"
	version="1.1"
	fill="none"
	stroke="#333"
	viewbox="0 0 60 60"
>
	<circle cx="30" cy="30" r="25"/>
</svg>
</template>


<script>
export default {
	name: 'uiSpinner',
}
</script>


<style lang="stylus" scoped>

.spinner
	position: relative
	width: 60px
	height: 60px
	stroke-width: 3
	stroke-dasharray: 100
	animation: spin .75s, grow 2s
	animation-iteration-count: infinite
	animation-timing-function: linear

@keyframes spin
	0%
		transform rotate(0deg)
	100%
		transform rotate(360deg)

@keyframes grow
	0%
		stroke-dashoffset 0
  	50%
		stroke-dashoffset 100
  	100%
		stroke-dashoffset 0

</style>

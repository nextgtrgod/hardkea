<template>
<button class="ui-button" :type="type">
	<slot/>
</button>
</template>


<script>
import Events from '@/events'

export default {
	name: 'uiButton',
	props: {
		type: {
			type: String,
			default: 'button'
		}
	},
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/animations.styl'

.ui-button
	display block
	min-width 230px
	padding 0
	font-size: 16px
	color: #333
	font-weight: 500
	line-height: 49px
	letter-spacing .4px
	border: 1px solid #333
	border-radius 8px
	transition: color .2s, background-color .2s, border .2s
	box-sizing border-box

	&:hover
		background-color #333
		color: #FFF

</style>

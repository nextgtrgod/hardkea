<template>
<input
	class="ui-input-simple"
	type="number"
	v-model="innerValue"
>
</template>


<script>
import Events from '@/events'

export default {
	name: 'uiInputSimple',
	props: {
		value: {
			type: Number,
		},
		max: {
			type: Number,
			default: 999999,
		},
	},
	data() {
		return {
			innerValue: +this.value,
		}
	},
	watch: {
		value(newVal) {
			this.innerValue = +newVal
		},
		innerValue(newVal) {
			this.$emit('input', +newVal)
		},
	}
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/animations.styl'

.ui-input-simple
	width: 64px
	padding: 4px 0
	font-size: 17px
	border-bottom: 1px dashed

</style>

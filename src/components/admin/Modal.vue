<template>
<div id="modal" :class="{ visible }">
	<div class="overlay" @click="close"/>
	<div class="content">
		<slot/>

		<button>Да</button>
		<button @click="close">Нет</button>
	</div>
</div>
</template>


<script>
import Events from '@/events'

export default {
	name: 'Modal',
	data() {
		return {
			visible: false,
		}
	},
	created() {
		Events.$on('modal-open', this.open)
	},
	methods: {
		open() {
			this.visible = true
		},
		close() {
			this.visible = false
			Events.$emit('modal-close')
		}
	},
}
</script>


<style lang="less" scoped>

#modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: fade(#000, 50%);
	opacity: 0;
	transition: opacity .2s;
	pointer-events: none;

	&.visible {
		opacity: 1;
		pointer-events: all;
	}
}

.overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

.content {
	position: relative;
	width: 360px;
	height: 200px;
	padding: 20px;
	background-color: #FFF;
	box-shadow: 0 25px 60px -10px alpha(#000, .3);
	border-radius: 4px;
}

</style>

<template>
<div id="modal" :class="{ visible }">
	<div class="overlay" @click="close"/>
	<div class="content">
		<slot/>

		<h2>Удалить {{ content }}?</h2>

		<div class="buttons">
			<ui-button @click.native="handleAccept">Да</ui-button>
			<ui-button @click.native="handleDecline">Нет</ui-button>
		</div>
	</div>
</div>
</template>


<script>
import Events from '@/events'
import uiButton from '@/components/ui/Button'

export default {
	name: 'Modal',
	components: {
		uiButton,
	},
	data() {
		return {
			visible: false,
			content: 'Кашпо',
		}
	},
	created() {
		Events.$on('modal-open', ({ content, accept, decline }) => {
			this.content = content

			this.accept = accept
			this.decline = decline

			this.open()
		})
	},
	methods: {
		open() {
			this.visible = true
		},
		close() {
			this.visible = false
			Events.$emit('modal-close')
		},
		handleAccept() {
			if (this.accept) this.accept()
			this.close()
		},
		handleDecline() {
			if (this.decline) this.decline()
			this.close()
		},
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
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 360px;
	height: 180px;
	padding: 30px;
	background-color: #FFF;
	box-shadow: 0 25px 60px -10px alpha(#000, .3);
	border-radius: 10px;
}

// h2 {
// 	letter-spacing: .5px;
// }

.buttons {
	display: inline-flex;
	justify-content: center;

	button {
		min-width: 90px;
		line-height: 45px;
		margin: 0 10px;
	}
}

</style>

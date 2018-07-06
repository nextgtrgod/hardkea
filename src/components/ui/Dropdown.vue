<template>
<div class="dropdown">
	<div
		class="ui-select"
		:class="{ disabled: !options.length, opened }"
		@blur="opened = false"
	>
		<input
			type="text"
			v-model="selected"
			@focus="opened = true"
			readonly
		>
		<span class="placeholder">
			{{ placeholder }}
		</span>
		<svg xmlns="http://www.w3.org/2000/svg" width="11" height="6">
			<path fill="none" stroke="#333" stroke-width="2" d="M.78125.90625l5 4 5-4"/>
		</svg>
		<ul>
			<li @click="select(selected)">
				{{ selected | capitalize }}
			</li>
			<li
				v-for="(item, index) in list"
				:key="index"
				@click="select(item)"
			>
				{{ item | capitalize }}
			</li>
		</ul>
	</div>
</div>
</template>


<script>
export default {
	name: 'uiDropdown',
	props: {
		options: {
			type: Array,
			required: false,
			default() {
				return []
			}
		},
		value: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			selected: this.value,
			opened: false,
		}
	},
	created() {
		document.addEventListener('click', this.documentClick)
    },
	methods: {
		select(value) {
			this.selected = value
			this.opened = false
		},
		documentClick(e) {
			if ((this.$el !== e.target) && !this.$el.contains(e.target)) {
				this.opened = false
			}
		}
	},
	computed: {
		list() {
			if (this.options.includes(this.selected)) {
				return this.options.filter(item => item !== this.selected)
			}

			return this.options.filter(item => item.toLowerCase().includes(this.selected.toLowerCase()))
		}
	},
	watch: {
		value(value) {
			this.selected = value.trim()
		},
		selected(value) {
			this.$emit('input', value.trim())
		}
	},
	filters: {
		capitalize(value) {
			if (!value) return ''
	
			value = value.toString()
	
			return value.charAt(0).toUpperCase() + value.slice(1)
		},
	},
    beforeDestroy() {
		document.removeEventListener('click', this.documentClick)
	},
}
</script>


<style lang="less" scoped>

@color-dark: #333;

.ui-select {
	position: relative;
	color: @color-dark;
	font-size: 17px;
	font-family: 'SF', sans-serif;
	font-weight: 500;
	line-height: 20px;
	cursor: pointer;
	z-index: 1;

	&.opened {
		ul {
			opacity: 1;
			pointer-events: all;
		}

		svg {
			transform: rotate(.5turn);
		}
	}

	&.disabled {
		pointer-events: none;
	}
}

input {
	position: relative;
	display: block;
	width: 100%;
	padding: 6px 0;
	color: @color-dark;
	font-size: 17px;
	line-height: 19px;
	text-align: left;
	border-bottom: 2px solid;
	transition: all .2s;
	box-sizing: border-box;
	cursor: pointer;

	&:first-letter {
		text-transform: uppercase;
	}
}

span {
	position: absolute;
	pointer-events: none;

	&.placeholder {
		left: 0;
		bottom: 8px;
		font-size: 17px;
		line-height: 1;
		color: fade(#333, 50%);
		transition: all .2s, color .3s;
		transform-origin: 0 0;
		transform: translateY(-125%) scale(0.75)
	}
}

svg {
	position: absolute;
	top: 15px;
	right: 0;
	margin: auto;
	transition: all .2s;
	pointer-events: none;
}

ul {
	position: absolute;
	width: calc(~'100% + 30px');
	left: -15px;
	right: 0;
	top: -4px;
	margin-bottom: 50px;
	// max-height: 5 * 50px;
	display: flex;
	flex-direction: column;
	background-color: #FFF;
	box-shadow: 0 20px 60px fade(#000, 10%);
	opacity: 0;
	transition: opacity .2s;
	pointer-events: none;
	overflow-y: scroll;
	cursor: pointer;
	z-index: 1;

	&:empty {
		opacity: 0 !important;
	}

	li {
		font-size: 17px;
		line-height: 19px;
		font-weight: 400;
		padding: 10px 15px;
		transition: background-color .1s, color .1s;
		box-sizing: border-box;
		cursor: pointer;

		// &:first-child {
		// 	padding-top: 10px
		// }

		// &:last-child {
		// 	padding-bottom: 10px
		// }

		&:hover {
			background-color: @color-dark;
			color: #FFF;
		}
	}
}

</style>

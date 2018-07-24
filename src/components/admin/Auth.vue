<template>
<div id="auth">

	<router-link :to="{ name: 'List' }">
		<img src="../../assets/images/logo.svg" class="logo">
	</router-link>

	<ui-input
		class="field"
		v-model="username"
		placeholder="Имя"
		:error="error"
	/>

	<ui-input
		class="field"
		type="password"
		v-model="password"
		placeholder="Пароль"
		:error="error"
	/>

	<ui-button
		class="submit"
		@click.native="handleSubmit"
		:disabled="loading"
	>
		Войти
	</ui-button>

</div>
</template>


<script>
import Events from '@/events'
import uiInput from '@/components/ui/Input'
import uiButton from '@/components/ui/Button'

import { API } from '@/config/index'

import login from '@/utils/login'

export default {
	name: 'Auth',
	components: {
		uiInput,
		uiButton,
	},
	data() {
		return {
			loading: false,
			username: '',
			password: '',
			error: false,
		}
	},
	created() {
		Events.$on('api-loading', () => this.loading = true)
		Events.$on('api-loaded', () => this.loading = false)
	},
	methods: {
		async handleSubmit() {

			if (!this.username.length || !this.password.length) return

			let res = await login(this.username, this.password)
			
			if (res.auth) {

				this.$router.replace({ name: 'Admin' })

			} else {
				this.username = ''
				this.password = ''
				this.error = true

				console.log(res.message)
			}	
		},
	},
	watch: {
		username(to) {
			to.length && (this.error = false)
		},

		password(to) {
			to.length && (this.error = false)
		},
	},
}
</script>


<style lang="less" scoped>

#auth {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 100vh;

	.logo {
		width: 50px;
		margin-bottom: 50px;
	}

	.field {
		max-width: 260px;
		margin-top: 0;
		margin-bottom: 50px;
	}

	.submit {
		width: 130px;
		min-width: auto;
		margin-top: 10px;
	}
}


</style>

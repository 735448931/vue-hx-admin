<template>
	<div class="login-form">
		<div class="logo">
			Logo
		</div>
		<el-form :model="form" label-width="auto" style="max-width: 600px">
			<el-form-item label="用户名">
				<el-input v-model="form.username" />
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="form.password" />
			</el-form-item>
			<el-form-item>
				<el-checkbox v-model="form.checked1" label="7天内免登录" size="large" />
				<el-button text class="forget-password">忘记密码?</el-button>
			</el-form-item>
			<el-form-item>
				<el-button :style="{ width: '100%' }" type="primary" @click="onSubmit">登录</el-button>
			</el-form-item>
		</el-form>

		<div class="login-method">
			<el-button>手机登录</el-button>
			<el-button>二维码登录</el-button>
			<el-button>注册</el-button>
		</div>
		<div>
			<div class="row">
				<div class="border"></div>
				<div class="title">第三方登录</div>
				<div class="border"></div>
			</div>

			<div class="threeway">
				<Icon name="icon-wechat"></Icon>
				<Icon name="icon-qq"></Icon>
				<Icon name="icon-z-alipay"></Icon>
				<Icon name="icon-weibo"></Icon>
			</div>
		</div>
	</div>

	<Vcode :show="isShow" @success="onSuccess" @close="onClose" />
	<button @click="onShow">开始验证</button>
</template>

<script setup lang="ts">
import { reactive } from 'vue'


import { ref } from "vue";
import Vcode from "vue3-puzzle-vcode";

const isShow = ref(false);

const onShow = () => {
	isShow.value = true;
};

const onClose = () => {
	isShow.value = false;
};

const onSuccess = () => {
	onClose(); // 验证成功，手动关闭模态框
};


const form = reactive({
	username: '',
	password: '',
	checked1: ''
})

const onSubmit = () => {
	console.log('submit!')
}
</script>

<style scoped lang="scss">
.login-form {
	.logo {
		width: 100%;
		height: 150px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30px
	}

	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 360px;
	height: 550px;

	.login-method {
		display: flex;
		justify-content: space-between;

		.el-button {
			width: 100px;
		}
	}

	.forget-password {
		margin-left: 160px;
	}

	.row {
		display: flex;
		justify-content: space-between;
		height: 50px;

		.border {
			border-bottom: 1px solid #999;
			height: 30px;
			width: 100px;
		}

		.title {
			margin-top: 20px;
			font-size: 12px;
		}

	}

	.threeway {
		display: flex;
		justify-content: space-around;
	}
}
</style>

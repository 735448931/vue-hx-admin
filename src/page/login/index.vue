<template>
	<div class="login-form">
		<div class="logo">
			<Icon name="icon-home" size="30"></Icon>
			HX-Admin
		</div>
		<!-- 用户名登录 -->
		<div v-if="showLoginMethod === 'default'" class="animate__animated animate__fadeIn">
			<el-form hide-required-asterisk :model="loginForm" ref="ruleFormRef" label-width="auto" :rules="rules">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="loginForm.username" placeholder="用户名">
						<template #prefix>
							<Icon name="icon-user2"></Icon>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="loginForm.password" placeholder="密码">
						<template #prefix>
							<Icon name="icon-lock"></Icon>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-checkbox v-model="loginForm.checked" label="7天内免登录" size="large" />
					<el-button text class="forget-password">忘记密码?</el-button>
				</el-form-item>
				<el-form-item>
					<el-button :style="{ width: '100%' }" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
				</el-form-item>
			</el-form>

			<div class="login-method">
				<el-button @click="showLoginMethod = 'phone'">手机登录</el-button>
				<el-button @click="qrcodeLogin">二维码登录</el-button>
				<el-button @click="showLoginMethod = 'register'">注册</el-button>
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
		<!-- 手机登录 -->
		<div v-if="showLoginMethod === 'phone'" class="animate__animated animate__fadeIn">
			<el-form hide-required-asterisk :model="phoneLoginForm" ref="ruleFormRef" label-width="auto"
				:rules="phoneRules">
				<el-form-item prop="phone">
					<el-input v-model="phoneLoginForm.phone" placeholder="手机号码">
						<template #prefix>
							<Icon name="icon-phone"></Icon>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="code">
					<div class="phone-flex">
						<div class="phone-code">
							<el-input v-model="phoneLoginForm.code" placeholder="短信验证码">
								<template #prefix>
									<Icon name="icon-guard"></Icon>
								</template>
							</el-input>
						</div>
						<div class="phone-code-btn">
							<el-button @click="getPhoneCode">获取验证码</el-button>
						</div>
					</div>
				</el-form-item>
				<el-form-item>
					<el-button :style="{ width: '100%' }" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
				</el-form-item>
				<el-form-item>
					<el-button :style="{ width: '100%' }" @click="showLoginMethod = 'default'">返回</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 二维码登录 -->
		<div v-if="showLoginMethod === 'QRcode'" class="animate__animated animate__fadeIn">
			<div class="qr-code">
				<img :src="imageUrl" />
				<div class="qc-code-desc">扫码后点击"确认",即可完成登录</div>
				<el-button :style="{ width: '60%' }" @click="showLoginMethod = 'default'">返回</el-button>
			</div>
		</div>
		<!-- 注册 -->
		<div v-if="showLoginMethod === 'register'" class="animate__animated animate__fadeIn">
			<el-form hide-required-asterisk :model="registerForm" ref="registerFormRef" label-width="auto"
				:rules="rules">
				<el-form-item prop="username">
					<el-input v-model="registerForm.username" placeholder="用户名">
						<template #prefix>
							<Icon name="icon-user2"></Icon>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="phone">
					<el-input v-model="registerForm.phone" placeholder="手机号码">
						<template #prefix>
							<Icon name="icon-phone"></Icon>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="code">
					<div class="phone-flex">
						<div class="phone-code">
							<el-input v-model="registerForm.code" placeholder="短信验证码">
								<template #prefix>
									<Icon name="icon-guard"></Icon>
								</template>
							</el-input>
						</div>
						<div class="phone-code-btn">
							<el-button @click="getPhoneCode">获取验证码</el-button>
						</div>
					</div>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="registerForm.password" placeholder="密码">
						<template #prefix>
							<Icon name="icon-lock_fill"></Icon>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="registerForm.password" placeholder="确认密码">
						<template #prefix>
							<Icon name="icon-lock_fill"></Icon>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-checkbox v-model="registerForm.confirm_password" label="我已仔细阅读并接受" size="large" />
					<a href="#">《隐私政策》</a>
				</el-form-item>
				<el-form-item>
					<el-button :style="{ width: '100%' }" type="primary"
						@click="handleRegister(registerFormRef)">注册</el-button>
				</el-form-item>
				<el-form-item>
					<el-button :style="{ width: '100%' }" @click="showLoginMethod = 'default'">返回</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, useTemplateRef, h } from 'vue'
import { ElNotification, type FormInstance, type FormRules } from 'element-plus'
import type { LoginFormInfo } from '@/api/interface/user';
import { userLoginApi } from '@/api/user';

import { useRouter } from 'vue-router';
import useUserStore from '@/store/user';
import QRCode from 'qrcode'
const router = useRouter()
const userStore = useUserStore()

type LoginMethod = 'default' | 'phone' | 'QRcode' | 'register'

// 默认登录方式
const showLoginMethod = ref<LoginMethod>('default')

const loginForm: LoginFormInfo = reactive({
	username: '',
	password: '',
	checked: false
})

const ruleFormRef = useTemplateRef<FormInstance>('ruleFormRef')

const rules = reactive<FormRules<typeof loginForm>>({
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [{ required: true, message: '密码长度为5-20位', min: 5, max: 20, trigger: 'blur' },],
})

const submitForm = async (formEl: FormInstance | null) => {
	if (!formEl) return
	formEl.validate(async (valid) => {
		if (valid) {
			try {
				const { user, token } = await userLoginApi(loginForm)
				router.push('/dashboard')
				userStore.user = user
				userStore.token = token
			} catch (error: any) {
				ElNotification({
					title: '登录失败' + error.code,
					message: h('i', {}, error.msg),
					type: 'error'
				})
			}
		}
	})
}

// 手机登录
const phoneLoginForm = reactive({
	phone: '',
	code: ''
})

const phoneRules = reactive<FormRules<typeof phoneLoginForm>>({
	phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
	code: [{ required: true, message: '请输入正确的验证码', trigger: 'blur' },],
})

const getPhoneCode = () => {

}

// 二维码登录
const imageUrl = ref()
const qrcodeLogin = async () => {
	showLoginMethod.value = 'QRcode'
	try {
		const res = await QRCode.toDataURL('测试生成二维码')
		imageUrl.value = res
	} catch (error) {
		console.error(error)
	}

}

// 注册
const registerFormRef = useTemplateRef<FormInstance>('registerFormRef')

const registerForm = reactive({
	username: '',
	phone: '',
	code: '',
	password: '',
	confirm_password: ''
})

const handleRegister = (formEl: FormInstance | null) => {

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

.phone-flex {
	display: flex;
	justify-content: space-between;
	width: 100%;

	.phone-code {
		width: 80%;
	}

	.phone-code-btn {
		margin-left: 10px;
	}
}

.qr-code {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.qc-code-desc {
		margin: 20px 0;
	}
}
</style>

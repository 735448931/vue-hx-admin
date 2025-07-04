import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/Layout/index.vue'

export const staticRoutes: RouteRecordRaw[] = [
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/page/login/index.vue')
	},
	{
		path: '/',
		component: Layout,
		name: 'Layout',
		children: [
			{
				path: 'dashboard',
				component: () => import('@/page/dashboard/index.vue')
			},
			{
				path: 'account-setting',
				component: () => import('@/page/account-setting/index.vue')
			},
			{
				path: 'user',
				component: () => import('@/page/user/index.vue')
			},
			{
				path: 'role',
				component: () => import('@/page/role/index.vue')
			},
			{
				path: 'department',
				component: () => import('@/page/department/index.vue')
			},
			{
				path: 'department/:id',
				component: () => import('@/page/department/detail.vue')
			},
			{
				path: 'wavesurfer',
				component: () => import('@/page/able/wavesurfer/index.vue')
			},
			{
				path: 'survey_list',
				component: () => import('@/page/survey/surveyList.vue')
			},
			{
				path: 'survey_trash',
				component: () => import('@/page/survey/surveyTrash.vue')
			},
			{
				path: '/survey/:id',
				component: () => import('@/page/survey/Edit/index.vue')
			}
		]
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes: staticRoutes,
	scrollBehavior: () => ({ left: 0, top: 0 })
})

export { router }

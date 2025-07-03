export interface User {
	_id?: string
	name: string
	username: string
	password: string
	status: 'enable' | 'disabled'
	email: string
	phone: number | null
	avatar?: string
	createdAt: string
}

export interface LoginFormInfo {
	username: string
	password: string
	checked: boolean
}

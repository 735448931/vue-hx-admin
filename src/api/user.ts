import type { LoginFormInfo, User } from './interface/user'
import request from './request'

export const userLoginApi = (query: LoginFormInfo) => {
	return request.post<{ user: User; token: string | null }>(
		'/api/login',
		query
	)
}

export const userListApi = (query: Record<string, any>) => {
	return request.get<IListRes<User>>('/api/user', query)
}

export const userCreateApi = (data: Omit<User, '_id' | 'createdAt'>) => {
	return request.post('/api/user', data)
}

export const userDetailApi = (id: string) => {
	return request.get(`/api/user/${id}`)
}

export const userUpdateApi = (
	id: string,
	fields: Partial<Omit<User, '_id' | 'createdAt'>>
) => {
	return request.patch(`/api/user/${id}`, fields)
}

export const userDeleteApi = (id: string) => {
	return request.delete(`/api/user/${id}`)
}

export const loginByGithubApi = (data: any) => {
	return request.post<{ msg: string; token: string }>(
		'/api/user/loginByGithub',
		data
	)
}

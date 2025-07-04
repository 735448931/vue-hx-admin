import request from './request'

interface Customer {
	_id: string
	name: string
	age: number
	tag: Array<string>
	area: Array<string>
	able: Array<string>
	appointment: Array<string>
	memo: string
	sex: 'man' | 'woman'
	level: string
	status: 'enable' | 'disabled'
	time: string
}

export const customerListApi = (query?: Record<string, any>) => {
	return request.get<IListRes<Customer>>('/api/customer', query)
}

import type { Department } from './interface/department'
import request from './request'

export const departmentListApi = (query?: Record<string, any>) => {
	return request.get<IListRes<Department>>('/api/department', query)
}

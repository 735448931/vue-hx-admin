export interface Role {
	_id: string
	name: string
	identification: string
	status: 'enable' | 'disabled'
	desc?: string
	createdAt?: Date
}

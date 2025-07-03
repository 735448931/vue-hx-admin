export const subBefore = (val: string, character: string) => {
	const index = val.indexOf(character)
	return index === -1 ? val : val.substring(0, index)
}

export const subAfter = (val: string, character: string) => {
	const index = val.indexOf(character)
	return index === -1 ? val : val.substring(index + character.length)
}

// 排除对象中 属性值为'' [] {} null undefined 的情况
export const excludeInvalidField = (obj: Record<string, any>): any => {
	const result: any = {}

	for (const [key, value] of Object.entries(obj)) {
		if (value === undefined || value === null) continue

		if (typeof value === 'string' && value !== '') {
			result[key] = value
		} else if (Array.isArray(value) && value.length > 0) {
			result[key] = value
		} else if (typeof value === 'object' && Object.keys(value).length > 0) {
			result[key] = value
		}
	}

	return result
}

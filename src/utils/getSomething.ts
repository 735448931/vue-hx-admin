export const subBefore = (val: string, character: string) => {
	const index = val.indexOf(character)
	return index === -1 ? val : val.substring(0, index)
}

export const subAfter = (val: string, character: string) => {
	const index = val.indexOf(character)
	return index === -1 ? val : val.substring(index + character.length)
}

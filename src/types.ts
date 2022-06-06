type FilterFunctionType = (filename: string) => boolean

export interface IOptions extends IFilesTreeOptions {
	presets?: string[]
	regexps?: RegExp[]
}

export interface IFilesTreeOptions {
	entry: string
	depth?: number
	filter?: RegExp | FilterFunctionType
}

// TODO 支持 presets 对于固定格式进行提取
// TODO 支持自定义正则表达式提取

/**
 * IFile
 */
export interface IFile {
	filename: string
	path: string
	texts: IText[]
}

/**
 * IText
 * @param {string} row row
 * @param {[number, number]} pos position - [start, end]
 * @param {string} content text content
 */
export interface IText {
	row: string
	pos: [number, number]
	content: string
}
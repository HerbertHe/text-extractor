import { PresetsType } from "./presets"

type FilterFunctionType = (filename: string) => boolean

export interface ISpecificRule {
	test: RegExp
	rules: [RegExp[], RegExp[]]
}

export interface IOptions extends IFilesTreeOptions {
	presets?: PresetsType[]
	rules?: Map<string, RegExp> | ISpecificRule[]
}

export interface IFilesTreeOptions {
	entry: string | string[]
	depth?: number
	filter?: RegExp | FilterFunctionType
}

/**
 * IFile
 */
export interface IFile {
	filename: string
	path: string
	files: IFile[]
	texts: IText[]
}

/**
 * IText
 */
export interface IText {
	idx: number
	offset: number
	content: string
}